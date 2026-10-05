@extends('layouts.app')
@section('title', 'Maids')
@section('eyebrow', 'People and access')
@section('heading', 'Maids')
@section('subtitle', 'Manage maids and workspace accounts, roles, status, and city assignments.')
@section('content')
    <section class="overview-metrics" aria-label="Business summary">
        <x-metrics title="Total Maids" type="revenue" value="{{ $total_maids }}" />
        <x-metrics title="Active Maids" type="revenue" value="{{ $active_maids }}" />
        <x-metrics title="Available Today" type="revenue" value="{{ $avaliable_today }}" />
        <x-metrics title="Done Orders" type="revenue" value="{{ $done_orders }}" />
        <x-metrics title="Documents Pending" type="revenue" value="{{ $doc_pending }}" />
    </section>

    <div class="workspace-page users-page">
        <div class="page-actions">
            <a class="ui-button accent" href="{{ route('admin.maids.create') }}">Add Maid</a>
        </div>

        @if (session('status'))
            <div class="catalog-notice">{{ session('status') }}</div>
        @endif

        <section class="surface-card">
            <div class="card-head catalog-head">
                <div>
                    <p class="eyebrow">Account directory</p>
                    <h2>All Maids</h2>
                </div>
                <div class="catalog-filters" data-table-filters>
                    <input data-table-search type="search" placeholder="Name, email or phone">
                    <button class="ui-button ghost" data-table-reset type="button">Reset</button>
                </div>
            </div>
            <div class="data-table-shell">
                <table data-yajra-table data-source="{{ route('admin.maids.data') }}" data-kind="maids">
                    <thead>
                        <tr>
                            <th>Maid</th>
                            <th>Phone</th>
                            <th>Status</th>
                            <th>Gender</th>
                            <th>Off day</th>
                            <th>Partner</th>
                            <th>Salary</th>
                            <th>Done orders</th>
                            <th>Documents</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="5" class="empty-table">Loading maids</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="yajra-table-footer" data-table-footer></div>
        </section>
    </div>
@endsection
