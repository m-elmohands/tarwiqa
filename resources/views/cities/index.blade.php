@extends('layouts.app')
@section('title', 'Cities')
@section('eyebrow', 'Location management')
@section('heading', 'Cities')
@section('subtitle', 'Manage the cities available for user profiles, service areas, and operational coverage.')

@section('content')
    <div class="workspace-page cities-page">
        <div class="page-actions">
            <a class="ui-button accent" href="{{ route('admin.cities.create') }}">Add City</a>
        </div>

        @if (session('status'))
            <div class="notice success" role="status">{{ session('status') }}</div>
        @endif

        <div class="page-stack">
            <section class="stats-grid" aria-label="City statistics">
                <article class="stat-card"><span>Total cities</span><strong>{{ $metrics['total_cities'] }}</strong><small>Available location records</small></article>
                <article class="stat-card"><span>Active cities</span><strong>{{ $metrics['active_cities'] }}</strong><small>Enabled for operations</small></article>
                <article class="stat-card"><span>Governorates</span><strong>{{ $metrics['total_governorates'] }}</strong><small>Coverage groups</small></article>
                <article class="stat-card"><span>Locations</span><strong>{{ $metrics['total_locations'] }}</strong><small>Configured service locations</small></article>
                <article class="stat-card"><span>Displayed</span><strong data-table-displayed>—</strong><small>Matching the current search</small></article>
            </section>

            <section class="surface-card">
                <div class="card-head cities-card-head">
                    <div><p class="eyebrow">Directory</p><h2>City Structure</h2></div>
                    <div class="city-filters" data-table-filters>
                        <label><span>Search</span><input data-table-search type="search" placeholder="English or Arabic name"></label>
                        <button class="ui-button ghost" data-table-reset type="button">Reset</button>
                    </div>
                </div>

                <div class="data-table-shell">
                    <table data-yajra-table data-source="{{ route('admin.cities.data') }}" data-kind="cities">
                        <caption class="sr-only">Available cities</caption>
                        <thead><tr><th>City</th><th>Arabic name</th><th>Users</th><th>Status</th><th>Actions</th></tr></thead>
                        <tbody><tr><td class="empty-table" colspan="5">Loading cities…</td></tr></tbody>
                    </table>
                </div>
                <div class="yajra-table-footer" data-table-footer></div>
            </section>
        </div>
    </div>
@endsection
