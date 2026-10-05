@extends('layouts.app')
@section('title', 'Add Maid')
@section('eyebrow', 'People and access')
@section('heading', 'Add Maid')
@section('subtitle', 'Create a maid')
@section('content')
    <div class="workspace-page catalog-editor-page">
        <section class="surface-card">
            <div class="card-head">
                <div>
                    <p class="eyebrow">New Maid</p>
                    <h2>Maid Details</h2>
                </div>
            </div>
            <form method="POST" action="{{ route('admin.maids.store') }}" enctype="multipart/form-data">
                @csrf
                @include('maids.partials.form', ['maid' => null])
            </form>
        </section>
    </div>
@endsection
