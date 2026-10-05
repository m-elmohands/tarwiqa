<?php

namespace App\Services;

use App\Contracts\Services\WalletServiceInterface;
use App\Models\User;
use App\Models\Wallet;
use App\Models\WalletTransaction;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class WalletService implements WalletServiceInterface
{
    public function __construct(
        private PaymentPaymobService $checkoutService
    ){}

    public function walletFor(User $user): Wallet
    {
        return Wallet::query()->firstOrCreate(['user_id' => $user->id], ['currency' => 'EGP']);
    }

    public function ledgerQuery(): Builder
    {
        return WalletTransaction::query()->with(['wallet.user:id,name,email', 'creator:id,name'])->latest();
    }

    public function adjust(User $user, string $type, float $amount, string $description, ?User $actor = null, ?string $reference = null, ?int $orderId = null, $status = 'completed'): WalletTransaction
    {
        if (! in_array($type, WalletTransaction::TYPES, true)) {
            throw ValidationException::withMessages(['type' => 'The selected wallet transaction type is invalid.']);
        }

        return DB::transaction(function () use ($user, $type, $amount, $description, $actor, $reference, $orderId, $status): WalletTransaction {
            $reference ??= (string) Str::uuid();
            $existing = WalletTransaction::query()->with('wallet:id,user_id')->where('reference', $reference)->first();
            if ($existing) {
                if ($existing->wallet?->user_id !== $user->id || $existing->type !== $type || (float) $existing->amount !== round($amount, 2)) {
                    throw ValidationException::withMessages(['reference' => 'This idempotency reference is already used by a different adjustment.']);
                }

                return $existing;
            }
            $wallet = $this->walletFor($user);
            $wallet = Wallet::query()->lockForUpdate()->findOrFail($wallet->id);
            $amount = round($amount, 2);

            $isDebit = in_array($type, [WalletTransaction::TYPE_WITHDRAWAL, WalletTransaction::TYPE_PURCHASE], true);
            if ($amount <= 0) {
                throw ValidationException::withMessages(['amount' => 'The wallet amount must be greater than zero.']);
            }
            if ($isDebit && (float) $wallet->balance - (float) $wallet->locked_balance < $amount) {
                throw ValidationException::withMessages(['amount' => 'The wallet has insufficient available balance.']);
            }

            if ($isDebit) {
                $wallet->decrement('balance', $amount);
            }
            else {
                $wallet->increment('balance', $amount);
                if ($status == 'pending') {
                    $wallet->increment('locked_balance', $amount);
                }
            }

            return $wallet->transactions()->create([
                'reference' => $reference,
                'order_id' => $orderId,
                'type' => $type,
                'amount' => $amount,
                'balance_after' => $wallet->balance,
                'status' => $status,
                'description' => $description,
                'created_by' => $actor?->id
            ]);
        });
    }

    public function charge(float $amount)
    {
        $user = request()->user();

        $description = "Charge Wallet";
        
        $transaction = $this->adjust($user, WalletTransaction::TYPE_DEPOSIT, $amount, $description, status: 'pending');
        
        $amount *= 100;

        return $this->checkoutService->makeOrder($transaction->reference, $amount, $description);
    }
}
