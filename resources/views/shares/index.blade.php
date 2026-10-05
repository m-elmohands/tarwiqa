@extends('layouts.app')
@section('title', 'App Shares')
@section('eyebrow', 'Marketing insights')
@section('heading', 'App Shares')
@section('subtitle', 'Review customer sharing activity and campaign attribution.')
@section('content')
<section class="overview-metrics" aria-label="Share metrics"><article class="metric-card"><span>Total shares</span><strong>{{ $metrics['total_shares'] }}</strong></article><article class="metric-card"><span>Customers shared</span><strong>{{ $metrics['customers_shared'] }}</strong></article><article class="metric-card"><span>Top sharer</span><strong>{{ $metrics['top_sharer'] }}</strong></article><article class="metric-card"><span>Latest share</span><strong>{{ $metrics['latest_share'] }}</strong></article></section>
<div class="workspace-page"><section class="surface-card"><div class="card-head"><div><p class="eyebrow">Share activity</p><h2>Customers who shared the app</h2></div></div><div class="data-table-shell"><table><thead><tr><th>Customer</th><th>Platform</th><th>Campaign</th><th>Referral</th><th>Shared</th><th>Conversions</th></tr></thead><tbody>@forelse($shares as $share)<tr><td>{{ $share->user?->name ?? 'Guest' }}</td><td>{{ $share->platform ?: '—' }}</td><td>{{ $share->campaign ?: '—' }}</td><td>{{ $share->referral_code ?: '—' }}</td><td>{{ $share->shared_at?->format('d M Y, H:i') }}</td><td>{{ $share->conversion_count }}</td></tr>@empty<tr><td colspan="6" class="empty-table">No app shares recorded yet.</td></tr>@endforelse</tbody></table></div>{{ $shares->links() }}</section></div>
@endsection
