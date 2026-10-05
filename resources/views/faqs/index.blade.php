@extends('layouts.app')
@section('title', 'FAQs')
@section('eyebrow', 'Support content')
@section('heading', 'Frequently Asked Questions')
@section('subtitle', 'Manage the answers shown to customers, partners, and support teams.')
@section('content')
<div class="workspace-page faqs-page">
    <div class="page-actions"><a class="ui-button accent" href="{{ route('admin.faqs.create') }}">Add FAQ</a></div>
    @if(session('status'))<div class="catalog-notice" role="status">{{ session('status') }}</div>@endif
    <section class="surface-card">
        <div class="card-head catalog-head">
            <div><p class="eyebrow">Knowledge base</p><h2>FAQ Directory</h2></div>
            <div class="catalog-filters" data-table-filters><input data-table-search type="search" placeholder="Search questions or answers"><button class="ui-button ghost" data-table-reset type="button">Reset</button></div>
        </div>
        <div class="data-table-shell"><table data-yajra-table data-source="{{ route('admin.faqs.data') }}" data-kind="faqs">
            <caption class="sr-only">Frequently asked questions</caption>
            <thead><tr><th>Question</th><th>Audience</th><th>Order</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody><tr><td colspan="5" class="empty-table">Loading FAQs…</td></tr></tbody>
        </table></div>
        <div class="yajra-table-footer" data-table-footer></div>
    </section>
</div>
@endsection
