@extends('layouts.app')
@section('title', 'Messages Inbox')
@section('eyebrow', 'Customer communication')
@section('heading', 'Messages')
@section('subtitle', 'Review direct conversations and recent customer communication.')
@section('content')
<section class="overview-metrics" aria-label="Message metrics"><article class="metric-card"><span>Total messages</span><strong>{{ $metrics['total_messages'] }}</strong></article><article class="metric-card"><span>Unread</span><strong>{{ $metrics['unread'] }}</strong></article><article class="metric-card"><span>Pending replies</span><strong>{{ $metrics['pending_replies'] }}</strong></article><article class="metric-card"><span>Starred threads</span><strong>{{ $metrics['starred_threads'] }}</strong></article><article class="metric-card"><span>Junk</span><strong>{{ $metrics['junk'] }}</strong></article></section>
<div class="workspace-page messages-page"><div class="page-actions"><a class="ui-button accent" href="{{ route('admin.messages.create') }}">Send Message</a></div>@if(session('status'))<div class="catalog-notice" role="status">{{ session('status') }}</div>@endif<section class="surface-card"><div class="card-head"><div><p class="eyebrow">Inbox</p><h2>Conversations</h2></div></div>
@forelse($conversations as $conversation)<article class="message-thread-row"><span class="message-thread-avatar">{{ str($conversation->participants->firstWhere('id', '!=', auth()->id())?->name ?? 'Conversation')->substr(0, 1) }}</span><div><strong>{{ $conversation->subject ?: 'Direct message' }}</strong><p>{{ str($conversation->latestMessage?->body)->limit(120) }}</p><small>{{ $conversation->participants->where('id', '!=', auth()->id())->pluck('name')->join(', ') ?: 'No recipient' }}</small></div><time>{{ $conversation->last_message_at?->diffForHumans() }}</time></article>@empty<div class="overview-empty"><span aria-hidden="true">M</span><strong>Your inbox is empty</strong><p>Messages sent to customers and replies will appear here.</p><a class="ui-button primary" href="{{ route('admin.messages.create') }}">Compose first message</a></div>@endforelse
</section></div>
@endsection
