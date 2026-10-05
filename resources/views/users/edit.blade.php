@extends('layouts.app')
@section('title', 'Edit User')
@section('eyebrow', 'People and access')
@section('heading', 'Edit User')
@section('subtitle', 'Update account identity, access role, status, or city.')
@section('content')
    <div class="workspace-page catalog-editor-page">
        <section class="surface-card">
            <div class="card-head">
                <div>
                    <p class="eyebrow">Account record</p>
                    <h2>{{ $user->name }}</h2>
                </div>
            </div>
            <form method="POST" action="{{ route('admin.users.update', $user) }}">
                @csrf
                @method('PUT')
                @include('users.partials.form')
            </form>
        </section>
    </div>

    @includeIf("users.partials.{$user->role}_role_form")
    
@endsection


