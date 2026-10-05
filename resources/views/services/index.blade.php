@extends('layouts.app')
@section('title', 'Services')
@section('eyebrow', 'Catalog management')
@section('heading', 'Services')
@section('subtitle', 'Manage customer-facing services, categories, availability, pricing, and media.')
@section('content')
<div class="workspace-page services-page">
    <div class="page-actions"><a class="ui-button accent" href="{{ route('admin.services.create') }}">Add Service</a></div>
    @if(session('status'))<div class="catalog-notice" role="status">{{ session('status') }}</div>@endif
    <div class="page-stack">
        <section class="stats-grid" aria-label="Service statistics">
            <article class="stat-card"><span>Total services</span><strong data-table-total>—</strong><small>Catalog records</small></article>
            <article class="stat-card"><span>Categories</span><strong>{{ $categories->count() }}</strong><small>Active categories</small></article>
        </section>
        <section class="surface-card">
            <div class="card-head catalog-head">
                <div><p class="eyebrow">Service directory</p><h2>Service Catalog</h2></div>
                <div class="catalog-filters" data-table-filters>
                    <input data-table-search type="search" placeholder="Title or slug">
                    <select data-table-filter="category_id"><option value="">All categories</option>@foreach($categories as $category)<option value="{{ $category->id }}">{{ $category->title }}</option>@endforeach</select>
                    <select data-table-filter="city_id"><option value="">All cities</option>@foreach($cities as $city)<option value="{{ $city->id }}">{{ $city->name }}</option>@endforeach</select>
                    <button class="ui-button ghost" data-table-reset type="button">Reset</button>
                </div>
            </div>
            <div class="data-table-shell"><table data-yajra-table data-source="{{ route('admin.services.data') }}" data-kind="services"><caption class="sr-only">Services catalog</caption>
                <thead><tr><th>Service</th><th>Category</th><th>City</th><th>Price</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody><tr><td class="empty-table" colspan="6">Loading services…</td></tr></tbody>
            </table></div>
            <div class="yajra-table-footer" data-table-footer></div>
        </section>
    </div>
</div>
@endsection
