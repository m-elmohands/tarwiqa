<?php

namespace App\Http\Controllers;

use App\Contracts\Services\WalletServiceInterface;
use App\Http\Requests\Wallets\AdjustWalletRequest;
use App\Models\User;
use App\Models\Wallet;
use App\Models\WalletTransaction;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\View\View;
use Yajra\DataTables\Facades\DataTables;

class WalletController extends Controller
{
    public function __construct(private readonly WalletServiceInterface $wallets) {}

    public function index(): View
    {
        return view('wallets.index', [
            'users' => User::query()->where('status', 'active')->orderBy('name')->get(['id', 'name', 'email']),
            'metrics' => [
                'current_balance' => (float) Wallet::sum('balance'),
                'risk' => WalletTransaction::whereIn('status', ['pending', 'failed'])->count(),
                'bank_transfer' => (float) DB::table('payments')->whereIn('status', ['paid', 'captured'])->where('method', 'like', '%bank%')->sum('amount'),
                'e_wallet' => (float) DB::table('payments')->whereIn('status', ['paid', 'captured'])->where(function ($query): void {
                    $query->where('method', 'like', '%wallet%')->orWhere('method', 'like', '%mobile%');
                })->sum('amount'),
                'refunds' => (float) DB::table('refunds')->whereIn('status', ['processed', 'completed'])->sum('amount'),
                'ledger_entries' => WalletTransaction::count(),
            ],
        ]);
    }

    public function data(): JsonResponse
    {
        return DataTables::eloquent($this->wallets->ledgerQuery())
            ->addColumn('user_name', fn (WalletTransaction $row) => $row->wallet?->user?->name ?? 'Deleted user')
            ->addColumn('creator_name', fn (WalletTransaction $row) => $row->creator?->name ?? 'System')
            ->addColumn('created_at_label', fn (WalletTransaction $row) => $row->created_at?->format('d M Y, H:i') ?? '—')
            ->filter(function (Builder $query): void {
                $search = trim((string) request('search.value'));
                $query->when($search, fn (Builder $query) => $query->where(fn (Builder $inner) => $inner->where('reference', 'like', "%{$search}%")->orWhere('description', 'like', "%{$search}%")->orWhereHas('wallet.user', fn (Builder $user) => $user->where('name', 'like', "%{$search}%"))));
            }, true)->toJson();
    }

    public function adjust(AdjustWalletRequest $request): RedirectResponse
    {
        $user = User::query()->findOrFail($request->integer('user_id'));
        $this->wallets->adjust($user, $request->validated('type'), (float) $request->validated('amount'), $request->validated('description'), $request->user(), $request->validated('reference'));

        return to_route('admin.wallets.index')->with('status', 'Wallet adjusted successfully.');
    }
}
