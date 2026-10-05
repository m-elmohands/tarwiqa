@extends('layouts.app')
@section('title', 'Custom Packages')
@section('eyebrow', 'Catalog management')
@section('heading', 'Custom Packages')
@section('subtitle', 'Configure package pricing, discounts, availability windows, and publication status.')
@section('content')
<div class="workspace-page catalog-admin-page"><div class="page-actions"><a class="ui-button accent" href="{{ route('admin.catalog.create', 'packages') }}">Add Package</a></div>@if(session('status'))<div class="catalog-notice" role="status">{{ session('status') }}</div>@endif<section class="surface-card"><div class="card-head catalog-head"><div><p class="eyebrow">Package directory</p><h2>Available Packages</h2></div><div class="catalog-filters" data-table-filters><input data-table-search type="search" placeholder="Search title or slug"><button class="ui-button ghost" data-table-reset type="button">Reset</button></div></div><div class="data-table-shell"><table data-yajra-table data-source="{{ route('admin.catalog.data', 'packages') }}" data-kind="packages"><thead><tr><th>Title</th><th>Price</th><th>Discount</th><th>Status</th><th>Actions</th></tr></thead><tbody><tr><td colspan="5" class="empty-table">Loading packages…</td></tr></tbody></table></div><div class="yajra-table-footer" data-table-footer></div></section></div>
@endsection
