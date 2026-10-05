@extends('layouts.app')
@section('title', 'Add '.$config['singular'])
@section('eyebrow', 'Catalog structure')
@section('heading', 'Add '.$config['singular'])
@section('subtitle', 'Add a new record to the service catalog structure.')
@section('content')
<div class="workspace-page catalog-editor-page"><section class="surface-card"><div class="card-head"><div><p class="eyebrow">New record</p><h2>{{ $config['singular'] }} Details</h2></div></div><form method="POST" action="{{ route('admin.catalog.store', $resource) }}" enctype="multipart/form-data">@csrf @include('catalog.partials.form', ['record' => null])</form></section></div>
@endsection
