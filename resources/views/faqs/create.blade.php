@extends('layouts.app')
@section('title', 'Add FAQ')
@section('eyebrow', 'Support content')
@section('heading', 'Add FAQ')
@section('subtitle', 'Publish a clear answer for the appropriate audience.')
@section('content')
<div class="workspace-page faqs-page catalog-editor-page"><section class="surface-card"><div class="card-head"><div><p class="eyebrow">New answer</p><h2>FAQ Details</h2></div></div><form method="POST" action="{{ route('admin.faqs.store') }}">@csrf @include('faqs.partials.form', ['faq' => null, 'submitLabel' => 'Create FAQ'])</form></section></div>
@endsection
