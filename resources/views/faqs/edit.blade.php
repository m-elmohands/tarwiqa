@extends('layouts.app')
@section('title', 'Edit FAQ')
@section('eyebrow', 'Support content')
@section('heading', 'Edit FAQ')
@section('subtitle', 'Update the answer, visibility, or display order.')
@section('content')
<div class="workspace-page faqs-page catalog-editor-page"><section class="surface-card"><div class="card-head"><div><p class="eyebrow">Knowledge entry</p><h2>{{ $faq->question }}</h2></div></div><form method="POST" action="{{ route('admin.faqs.update', $faq) }}">@csrf @method('PUT') @include('faqs.partials.form', ['submitLabel' => 'Save Changes'])</form></section></div>
@endsection
