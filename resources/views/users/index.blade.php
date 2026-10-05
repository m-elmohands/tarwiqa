@extends('layouts.app')
@section('title', str($role)->title() . 's')
@section('eyebrow', 'People and access')
@section('heading', str($role)->title() . 's')
@section('subtitle', 'Manage ' . $role . 's and workspace accounts, roles, status, and city assignments.')
@section('content')
    <section class="overview-metrics" aria-label="Business summary">
        <x-metrics title="Active Users" type="users" value="{{ $active_users }}" />
        <x-metrics title="Total Users" type="users" value="{{ $total_users }}" />
        <x-metrics title="Active Today" type="users" value="{{ $active_today }}" />
        <x-metrics title="Restricted Accounts" type="users" value="{{ $restricted_users }}" />
        <x-metrics title="Banned Accounts" type="users" value="{{ $banned_users }}" />
        @if ($role == 'customer')
            <x-metrics title="Total Wallet" type="revenue" value="{{ $total_wallet }}" />
        @endif
        @if ($role == 'partner')
            <x-metrics title="Managed Maids" type="users" value="{{ $managed_maids }}" />
            <x-metrics title="Completed Orders" type="orders" value="{{ $completed_orders }}" />
        @endif
        @if ($role == 'supporter')
            <x-metrics title="Covered Governorates" type="users" value="{{ $covered_governorates }}" />
            <x-metrics title="Scoped Orders" type="orders" value="{{ $scoped_orders }}" />
        @endif
    </section>

    <div class="workspace-page users-page">
        <div class="page-actions">
            <a class="ui-button accent" href="{{ route('admin.users.create', ['role' => $role]) }}">Add
                {{ str($role)->title() }}</a>
        </div>

        @if (session('status'))
            <div class="catalog-notice">{{ session('status') }}</div>
        @endif

        <section class="surface-card">
            <div class="card-head catalog-head">
                <div>
                    <p class="eyebrow">Account directory</p>
                    <h2>All {{ str($role)->title() }}s</h2>
                </div>
                <div class="catalog-filters" data-table-filters>
                    <input data-table-search type="search" placeholder="Name, email or phone">
                    <button class="ui-button ghost" data-table-reset type="button">Reset</button>
                </div>
            </div>
            <div class="data-table-shell">
                <table data-yajra-table data-source="{{ route('admin.users.data', $role) }}"
                    data-kind="{{ $role }}s">
                    <thead>
                        <tr>
                            {{-- <th class="text-center">
                                <input type="checkbox" id="select-all-users">
                            </th> --}}
                            <x-roles_table_columns role="{{ $role }}" />

                            <th class="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="5" class="empty-table">Loading users…</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="yajra-table-footer" data-table-footer></div>
        </section>
    </div>
@endsection
