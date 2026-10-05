@extends('layouts.app')
@section('title', 'Add City')
@section('eyebrow', 'Location management')
@section('heading', 'Add City')
@section('subtitle', 'Create a city available for users and addresses.')

@section('content')
    <div class="workspace-page cities-page city-editor-page">
        <section class="surface-card city-editor-card">
            <div class="card-head"><div><p class="eyebrow">New location</p><h2>City Details</h2></div></div>
            <form method="POST" action="{{ route('admin.cities.store') }}">
                @csrf
                @include('cities.partials.form', ['city' => null, 'submitLabel' => 'Create City'])
            </form>
        </section>
    </div>
@endsection
