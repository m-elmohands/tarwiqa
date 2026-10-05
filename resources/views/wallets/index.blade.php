@extends('layouts.app')
@section('title', 'Wallet Ledger')
@section('eyebrow', 'Finance operations')
@section('heading', 'Wallets')
@section('subtitle', 'Review immutable wallet activity and apply controlled customer balance adjustments.')
@section('content')
    <div class="workspace-page wallets-page">
        <section class="overview-metrics" aria-label="Wallet metrics"><article class="metric-card"><span>Current balance</span><strong>EGP {{ number_format($metrics['current_balance'], 2) }}</strong></article><article class="metric-card"><span>Risk entries</span><strong>{{ $metrics['risk'] }}</strong></article><article class="metric-card"><span>Bank transfer</span><strong>EGP {{ number_format($metrics['bank_transfer'], 2) }}</strong></article><article class="metric-card"><span>E-wallet</span><strong>EGP {{ number_format($metrics['e_wallet'], 2) }}</strong></article><article class="metric-card"><span>Refunds</span><strong>EGP {{ number_format($metrics['refunds'], 2) }}</strong></article><article class="metric-card"><span>Ledger entries</span><strong>{{ $metrics['ledger_entries'] }}</strong></article></section>
        @if (session('status'))
            <div class="catalog-notice" role="status">{{ session('status') }}</div>
        @endif
        @if ($errors->any())
            <div class="catalog-notice danger" role="alert">
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif
        <div class="wallet-layout">
            <section class="surface-card wallet-adjust-card">
                <div class="card-head">
                    <div>
                        <p class="eyebrow">Controlled adjustment</p>
                        <h2>Adjust Wallet</h2>
                    </div>
                </div>
                <p class="wallet-help">Every adjustment creates an immutable ledger entry. Withdrawals cannot exceed the
                    available balance.</p>
                <form method="POST" action="{{ route('admin.wallets.adjust') }}">@csrf<div class="wallet-form-grid"><label
                            class="field"><span>Customer</span><select name="user_id" required>
                                <option value="">Select account</option>
                                @foreach ($users as $user)
                                    <option value="{{ $user->id }}" @selected((string) old('user_id') === (string) $user->id)>{{ $user->name }} ·
                                        {{ $user->email }}</option>
                                @endforeach
                            </select></label><label class="field"><span>Adjustment</span><select name="type">
                                <option value="deposit">Deposit funds</option>
                                <option value="withdrawal">Withdraw funds</option>
                            </select></label><label class="field"><span>Amount (EGP)</span><input name="amount"
                                type="number" min="0.01" step="0.01" value="{{ old('amount') }}"
                                required></label><label class="field"><span>Idempotency reference</span><input
                                name="reference" value="{{ old('reference') }}" placeholder="Optional UUID"></label><label
                            class="field wide"><span>Reason</span>
                            <textarea name="description" rows="4" maxlength="1000" required>{{ old('description') }}</textarea>
                        </label></div>
                    <div class="form-actions"><button class="ui-button primary" type="submit"
                            data-confirm="Apply this wallet adjustment?">Record Adjustment</button></div>
                </form>
            </section>
            <section class="surface-card wallet-ledger-card">
                <div class="card-head catalog-head">
                    <div>
                        <p class="eyebrow">Financial history</p>
                        <h2>Wallet Ledger</h2>
                    </div>
                    <div class="catalog-filters" data-table-filters>
                        <input data-table-search type="search"
                            placeholder="User, reference"><button class="ui-button ghost" data-table-reset
                            type="button">Reset</button></div>
                </div>
                <div class="data-table-shell">
                    <table data-yajra-table data-source="{{ route('admin.wallets.data') }}" data-kind="wallets">
                        <thead>
                            <tr>
                                <th>Reference</th>
                                <th>User</th>
                                <th>Type</th>
                                <th>Amount</th>
                                <th>Balance</th>
                                <th>Created by</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colspan="7" class="empty-table">Loading wallet ledger…</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="yajra-table-footer" data-table-footer></div>
            </section>
        </div>
    </div>
@endsection
