<?php

namespace App\Contracts\Services;

use App\Models\User;
use App\Models\Wallet;
use App\Models\WalletTransaction;
use Illuminate\Database\Eloquent\Builder;

interface WalletServiceInterface
{
    public function walletFor(User $user): Wallet;

    public function ledgerQuery(): Builder;

    public function adjust(User $user, string $type, float $amount, string $description, ?User $actor = null, ?string $reference = null, ?int $orderId = null): WalletTransaction;

    public function charge(float $amount);
}
