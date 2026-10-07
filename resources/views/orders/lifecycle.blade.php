@extends('layouts.app')
@section('title', str($status)->replace('_', ' ')->title().' Orders')
@section('eyebrow', 'Order operations')
@section('heading', str($status)->replace('_', ' ')->title().' Orders')
@section('subtitle', 'Move bookings through the operational lifecycle and keep assignments visible to the team.')
@section('content')
<div class="workspace-page order-page">
    @include('orders.partials.navigation')
    <section class="overview-metrics" aria-label="Queue metrics"><article class="metric-card"><span>In queue</span><strong>{{ $metrics['orders_in_queue'] }}</strong></article><article class="metric-card"><span>Highest price</span><strong>EGP {{ number_format($metrics['highest_price'], 2) }}</strong></article><article class="metric-card"><span>Today requests</span><strong>{{ $metrics['today_requests'] }}</strong></article><article class="metric-card"><span>Earliest arrival</span><strong>{{ $metrics['earliest_arrival'] }}</strong></article></section>
    @if(session('status'))<div class="catalog-notice" role="status">{{ session('status') }}</div>@endif
    <section class="surface-card">
        <div class="card-head catalog-head"><div><p class="eyebrow">Operational queue</p><h2>{{ $orders->total() }} bookings</h2></div></div>
        <div class="data-table-shell"><table><thead><tr><th>Order</th><th>Customer</th><th>City</th><th>Partner</th><th>Services</th><th>Service date</th><th>Total</th><th>Workflow</th></tr></thead><tbody>
        @forelse($orders as $order)
            <tr><td>#{{ str_pad($order->id, 6, '0', STR_PAD_LEFT) }}</td><td>{{ $order->customer?->name ?? 'Deleted customer' }}</td><td>{{ $order->address?->city?->name ?? '—' }}</td><td>{{ $order->partner?->name ?? 'Unassigned' }}</td><td>{{ $order->lines->pluck('name')->join(', ') ?: '—' }}</td><td>{{ $order->service_date?->format('d M Y') }}</td><td>EGP {{ number_format((float) $order->total, 2) }}</td><td><details><summary class="table-action-btn edit">Update</summary><form method="POST" action="{{ route('admin.orders.workflow.update', $order) }}" class="inline-form">@csrf @method('PATCH')<label>Status<select name="status"><option value="under_review" @selected($order->status === 'under_review')>Under review</option><option value="waiting" @selected(in_array($order->status, ['waiting','waiting_list'], true))>Waiting</option><option value="accepted" @selected(in_array($order->status, ['accepted','accepted_orders'], true))>Accepted</option><option value="completed" @selected(in_array($order->status, ['completed','done','done_orders'], true))>Done</option><option value="cancelled" @selected(in_array($order->status, ['cancelled','canceled'], true))>Cancelled</option></select></label><label>Partner<select name="partner_id"><option value="">Unassigned</option>@foreach($partners as $partner)<option value="{{ $partner->id }}" @selected($order->partner_id === $partner->id)>{{ $partner->name }}</option>@endforeach</select></label><label>Internal notes<textarea name="internal_notes" rows="2">{{ $order->internal_notes }}</textarea></label><button class="ui-button primary" type="submit">Save</button></form></details></td></tr>
        @empty<tr><td colspan="8" class="empty-table">No orders in this queue.</td></tr>@endforelse
        </tbody></table></div>
        <div class="yajra-table-footer">{{ $orders->links() }}</div>
    </section>
</div>
@endsection
