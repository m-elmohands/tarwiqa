@extends('layouts.app')
@section('title', 'Edit '.$config['singular'])
@section('eyebrow', 'Catalog structure')
@section('heading', 'Edit '.$config['singular'])
@section('subtitle', 'Update this catalog record and its availability.')
@section('content')
<div class="workspace-page catalog-editor-page"><section class="surface-card"><div class="card-head"><div><p class="eyebrow">Catalog record</p><h2>{{ $record->title }}</h2></div></div><form method="POST" action="{{ route('admin.catalog.update', [$resource, $record->getKey()]) }}" enctype="multipart/form-data">@csrf @method('PUT') @include('catalog.partials.form')</form></section></div>
@endsection
