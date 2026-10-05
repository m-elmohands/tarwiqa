@extends('layouts.app')
@section('title', 'Order Reviews')
@section('eyebrow', 'Voice of customer')
@section('heading', 'Order Reviews')
@section('subtitle', 'Monitor verified customer ratings and feedback across completed orders.')
@section('content')
<div class="workspace-page order-page">
    @include('orders.partials.navigation')
    <section class="overview-metrics" aria-label="Review metrics"><article class="metric-card"><span>Total reviews</span><strong>{{ $metrics['total_reviews'] }}</strong></article><article class="metric-card"><span>Provider rating</span><strong>{{ $metrics['provider_rating'] }}</strong></article><article class="metric-card"><span>Customer service</span><strong>{{ $metrics['customer_service_rating'] }}</strong></article><article class="metric-card"><span>Low rating alerts</span><strong>{{ $metrics['low_rating_alerts'] }}</strong></article></section>
    <section class="surface-card"><div class="card-head catalog-head"><div><p class="eyebrow">Review feed</p><h2>Customer Reviews</h2></div><div class="catalog-filters" data-table-filters><input data-table-search type="search" placeholder="Order, customer, or comment"><button class="ui-button ghost" data-table-reset type="button">Reset</button></div></div><div class="data-table-shell"><table data-yajra-table data-source="{{ route('admin.orders.reviews.data') }}" data-kind="order-reviews-db"><thead><tr><th>Order</th><th>Customer</th><th>Service date</th><th>Rating</th><th>Comment</th><th>Status</th></tr></thead><tbody><tr><td colspan="6" class="empty-table">Loading reviews…</td></tr></tbody></table></div><div class="yajra-table-footer" data-table-footer></div></section>
</div>
@endsection
