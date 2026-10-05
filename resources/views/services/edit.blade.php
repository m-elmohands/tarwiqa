@extends('layouts.app')
@section('title', 'Edit Service')
@section('eyebrow', 'Catalog management')
@section('heading', 'Edit Service')
@section('subtitle', 'Update service content, pricing, availability, or image.')
@section('content')
    <div class="workspace-page services-page catalog-editor-page">
        <section class="surface-card">
            <div class="card-head">
                <div>
                    <p class="eyebrow">Catalog item</p>
                    <h2>{{ $service->title }}</h2>
                </div>
            </div>
            <form method="POST" action="{{ route('admin.services.update', $service) }}" enctype="multipart/form-data">@csrf
                @method('PUT') @include('services.partials.form', ['submitLabel' => 'Save Changes'])</form>
        </section>
    </div>
@endsection
