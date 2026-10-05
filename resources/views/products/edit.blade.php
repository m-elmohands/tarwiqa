@extends('layouts.app')
@section('title', 'Edit Product')
@section('eyebrow', 'Catalog management')
@section('heading', 'Edit Product')
@section('subtitle', 'Update product information, pricing, availability, video, or logo.')
@section('content')<div class="workspace-page products-page catalog-editor-page"><section class="surface-card"><div class="card-head"><div><p class="eyebrow">Catalog item</p><h2>{{ $product->title }}</h2></div></div><form method="POST" action="{{ route('admin.products.update', $product) }}" enctype="multipart/form-data">@csrf @method('PUT') @include('products.partials.form')</form></section></div>@endsection
