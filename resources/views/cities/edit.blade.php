@extends('layouts.app')
@section('title', 'Edit City')
@section('eyebrow', 'Location management')
@section('heading', 'Edit City')
@section('subtitle', 'Update the city name or availability.')

@section('content')
    <div class="workspace-page cities-page city-editor-page">
        <section class="surface-card city-editor-card">
            <div class="card-head"><div><p class="eyebrow">Location record</p><h2>{{ $city->name }}</h2></div></div>
            <form method="POST" action="{{ route('admin.cities.update', $city) }}">
                @csrf @method('PUT')
                @include('cities.partials.form', ['submitLabel' => 'Save Changes'])
            </form>
        </section>
    </div>
@endsection
