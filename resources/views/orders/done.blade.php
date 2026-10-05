@extends('layouts.app')
@section('title', 'Done Orders')
@section('eyebrow', 'Orders archive')
@section('heading', 'Done Orders')
@section('subtitle', 'Review completed bookings, final value, service lines, and completion time.')
@section('content')
<div class="workspace-page order-page">
    @include('orders.partials.navigation')
    <section class="overview-metrics" aria-label="Completed order metrics"><article class="metric-card"><span>Completed this week</span><strong>{{ $metrics['completed_this_week'] }}</strong></article><article class="metric-card"><span>Revenue</span><strong>EGP {{ number_format($metrics['total_revenue'], 2) }}</strong></article><article class="metric-card"><span>Top city</span><strong>{{ $metrics['top_city'] }}</strong></article><article class="metric-card"><span>Average completion</span><strong>{{ $metrics['average_completion'] }}</strong></article></section>
    <section class="surface-card"><div class="card-head catalog-head"><div><p class="eyebrow">Completed queue</p><h2>Finished Orders</h2></div><div class="catalog-filters" data-table-filters><input data-table-search type="search" placeholder="Order, customer, or city"><button class="ui-button ghost" data-table-reset type="button">Reset</button></div></div><div class="data-table-shell"><table data-yajra-table data-source="{{ route('admin.orders.done.data') }}" data-kind="done-orders-db"><thead><tr><th>Order</th><th>Customer</th><th>Partner</th><th>City</th><th>Services</th><th>Package</th><th>Service date</th><th>Completed</th><th>Total</th><th>Status</th></tr></thead><tbody><tr><td colspan="10" class="empty-table">Loading completed orders…</td></tr></tbody></table></div><div class="yajra-table-footer" data-table-footer></div></section>
</div>
@endsection
