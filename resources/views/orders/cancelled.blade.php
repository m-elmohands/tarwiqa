@extends('layouts.app')
@section('title', 'Cancelled Orders')
@section('eyebrow', 'Orders archive')
@section('heading', 'Cancelled Orders')
@section('subtitle', 'Review cancelled bookings, cancellation dates, reasons, and final values.')
@section('content')
<div class="workspace-page order-page">@include('orders.partials.navigation')<section class="surface-card"><div class="card-head catalog-head"><div><p class="eyebrow">Cancellation queue</p><h2>Cancelled Orders</h2></div><div class="catalog-filters" data-table-filters><input data-table-search type="search" placeholder="Order, customer, city, or reason"><button class="ui-button ghost" data-table-reset type="button">Reset</button></div></div><div class="data-table-shell"><table data-yajra-table data-source="{{ route('admin.orders.cancelled.data') }}" data-kind="cancelled-orders-db"><thead><tr><th>Order</th><th>Customer</th><th>Partner</th><th>City</th><th>Services</th><th>Service date</th><th>Cancelled</th><th>Reason</th><th>Total</th><th>Status</th></tr></thead><tbody><tr><td colspan="10" class="empty-table">Loading cancelled orders…</td></tr></tbody></table></div><div class="yajra-table-footer" data-table-footer></div></section></div>
@endsection
