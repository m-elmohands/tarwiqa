@extends('layouts.app')
@section('title', 'Accepted Orders')
@section('eyebrow', 'Orders queue')
@section('heading', 'Accepted Orders')
@section('subtitle', 'Review confirmed booking requests, schedules, service lines, and pricing.')
@section('content')
<div class="workspace-page order-page">
    @include('orders.partials.navigation')
    <section class="overview-metrics" aria-label="Accepted order metrics"><article class="metric-card"><span>In queue</span><strong>{{ $metrics['orders_in_queue'] }}</strong></article><article class="metric-card"><span>Highest price</span><strong>EGP {{ number_format($metrics['highest_price'], 2) }}</strong></article><article class="metric-card"><span>Today requests</span><strong>{{ $metrics['today_requests'] }}</strong></article><article class="metric-card"><span>Earliest arrival</span><strong>{{ $metrics['earliest_arrival'] }}</strong></article></section>
    <section class="surface-card"><div class="card-head catalog-head"><div><p class="eyebrow">Active queue</p><h2>Accepted Booking Requests</h2></div><div class="catalog-filters" data-table-filters><input data-table-search type="search" placeholder="Order, customer, or status"><button class="ui-button ghost" data-table-reset type="button">Reset</button></div></div><div class="data-table-shell"><table data-yajra-table data-source="{{ route('admin.orders.accepted.data') }}" data-kind="accepted-orders-db"><thead><tr><th>Order</th><th>Customer</th><th>Partner</th><th>City</th><th>Services</th><th>Package</th><th>Service date</th><th>Total</th><th>Status</th></tr></thead><tbody><tr><td colspan="9" class="empty-table">Loading accepted orders…</td></tr></tbody></table></div><div class="yajra-table-footer" data-table-footer></div></section>
</div>
@endsection
