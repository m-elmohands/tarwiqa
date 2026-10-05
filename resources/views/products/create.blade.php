@extends('layouts.app')
@section('title', 'Add Product')
@section('eyebrow', 'Catalog management')
@section('heading', 'Add Product')
@section('subtitle', 'Create a priced product and publish it to selected cities or the complete catalog.')
@section('content')<div class="workspace-page products-page catalog-editor-page"><section class="surface-card"><div class="card-head"><div><p class="eyebrow">New catalog item</p><h2>Product Details</h2></div></div><form method="POST" action="{{ route('admin.products.store') }}" enctype="multipart/form-data">@csrf @include('products.partials.form', ['product' => null])</form></section></div>@endsection
