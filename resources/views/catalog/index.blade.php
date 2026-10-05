@extends('layouts.app')
@section('title', $config['title'])
@section('eyebrow', 'Catalog structure')
@section('heading', $config['title'])
@section('subtitle', 'Create and maintain the master data used by services and customer bookings.')
@section('content')
<div class="workspace-page catalog-admin-page">
    <div class="page-actions"><a class="ui-button accent" href="{{ route('admin.catalog.create', $resource) }}">Add {{ $config['singular'] }}</a></div>
    @if(session('status'))<div class="catalog-notice" role="status">{{ session('status') }}</div>@endif
    <section class="surface-card">
        <div class="card-head catalog-head">
            <div><p class="eyebrow">Master data</p><h2>{{ $config['title'] }}</h2></div>
            <div class="catalog-filters" data-table-filters><input data-table-search type="search" placeholder="Search title or slug"><button class="ui-button ghost" data-table-reset type="button">Reset</button></div>
        </div>
        <div class="data-table-shell"><table data-yajra-table data-source="{{ route('admin.catalog.data', $resource) }}" data-kind="{{ $config['kind'] }}">
            <caption class="sr-only">{{ $config['title'] }}</caption>
            <thead><tr><th>Title</th>@if($resource === 'service-categories')<th>Service type</th><th>Subtitle</th>@elseif($resource === 'packages')<th>Price</th><th>Discount</th>@else<th>Subtitle</th>@endif<th>Status</th><th>Actions</th></tr></thead>
            <tbody><tr><td colspan="{{ $resource === 'service-categories' ? 6 : ($resource === 'packages' ? 5 : 4) }}" class="empty-table">Loading records…</td></tr></tbody>
        </table></div>
        <div class="yajra-table-footer" data-table-footer></div>
    </section>
</div>
@endsection
