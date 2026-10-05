@extends('layouts.app')
@section('title', 'Edit Maid')
@section('eyebrow', 'Workforce onboarding')
@section('heading', 'Edit Maid')
@section('subtitle', 'Update identity, assignment, availability, compensation, and compliance details.')
@section('content')
<div class="workspace-page catalog-editor-page">
    <section class="surface-card">
        <div class="card-head"><div><p class="eyebrow">Maid record</p><h2>{{ $maid->name }}</h2></div><span class="status-pill {{ $maid->status === 'active' ? 'active' : 'pending' }}">{{ str($maid->status)->title() }}</span></div>
        <form method="POST" action="{{ route('admin.maids.update', $maid) }}" enctype="multipart/form-data">@csrf @method('PUT') @include('maids.partials.form')</form>
    </section>
</div>
@endsection
