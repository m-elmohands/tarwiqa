@extends('layouts.app')
@section('title', 'Products')
@section('eyebrow', 'Catalog management')
@section('heading', 'Products')
@section('subtitle', 'Manage customer-facing products, city availability, pricing, video links, and media.')
@section('content')
<div class="workspace-page products-page">
    <div class="page-actions"><a class="ui-button accent" href="{{ route('admin.products.create') }}">Add Product</a></div>
    @if(session('status'))<div class="catalog-notice" role="status">{{ session('status') }}</div>@endif
    <section class="surface-card"><div class="card-head catalog-head"><div><p class="eyebrow">Product directory</p><h2>Product Catalog</h2></div><div class="catalog-filters" data-table-filters><input data-table-search type="search" placeholder="Title or slug"><select data-table-filter="category_id"><option value="">All categories</option>@foreach($categories as $category)<option value="{{ $category->id }}">{{ $category->title }}</option>@endforeach</select><select data-table-filter="city_id"><option value="">All cities</option>@foreach($cities as $city)<option value="{{ $city->id }}">{{ $city->name }}</option>@endforeach</select><button class="ui-button ghost" data-table-reset type="button">Reset</button></div></div><div class="data-table-shell"><table data-yajra-table data-source="{{ route('admin.products.data') }}" data-kind="products"><thead><tr><th>Product</th><th>Category</th><th>City</th><th>Price</th><th>Status</th><th>Actions</th></tr></thead><tbody><tr><td colspan="6" class="empty-table">Loading products…</td></tr></tbody></table></div><div class="yajra-table-footer" data-table-footer></div></section>
</div>
@endsection
