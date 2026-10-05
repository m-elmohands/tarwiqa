@extends('layouts.app')
@php($creatingRole = str(request('role', 'customer'))->replace('_', ' ')->title())
@section('title', 'Add '.$creatingRole)
@section('eyebrow', 'People and access')
@section('heading', 'Add '.$creatingRole)
@section('subtitle', 'Create a new profile with identity details, access controls, and onboarding defaults.')
@section('content')
    <div class="workspace-page catalog-editor-page">
        <section class="surface-card">
            <div class="card-head">
                <div>
                    <p class="eyebrow">New account</p>
                    <h2>{{ $creatingRole }} Details</h2>
                    <p class="card-description">Complete the required identity fields, then configure status and onboarding preferences before creation.</p>
                </div>
            </div>
            <form method="POST" action="{{ route('admin.users.store') }}">
                @csrf
                @include('users.partials.form', ['user' => null])
            </form>
        </section>
    </div>
@endsection
