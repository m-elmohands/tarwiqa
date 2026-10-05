@extends('layouts.app')
@section('title', 'Add Service')
@section('eyebrow', 'Catalog management')
@section('heading', 'Add Service')
@section('subtitle', 'Create a priced service and publish it to the customer catalog.')
@section('content')
    <div class="workspace-page services-page catalog-editor-page">
        <section class="surface-card">
            <div class="card-head">
                <div>
                    <p class="eyebrow">New catalog item</p>
                    <h2>Service Details</h2>
                </div>
            </div>
            <form method="POST" action="{{ route('admin.services.store') }}" enctype="multipart/form-data">@csrf
                @include('services.partials.form', ['service' => null, 'submitLabel' => 'Create Service'])</form>
        </section>
    </div>
@endsection
