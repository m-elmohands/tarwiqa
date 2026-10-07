@php
    $orderTabs = [
        ['label' => 'Under review', 'route' => 'admin.orders.lifecycle', 'params' => ['status' => 'under_review'], 'status' => 'under_review'],
        ['label' => 'Waiting list', 'route' => 'admin.orders.lifecycle', 'params' => ['status' => 'waiting'], 'status' => 'waiting'],
        ['label' => 'Accepted', 'route' => 'admin.orders.accepted'],
        ['label' => 'Done', 'route' => 'admin.orders.done'],
        ['label' => 'Cancelled', 'route' => 'admin.orders.cancelled'],
        ['label' => 'Reviews', 'route' => 'admin.orders.reviews'],
    ];
@endphp
<nav class="view-tabs order-view-nav" aria-label="Order views">
    @foreach ($orderTabs as $tab)
        @php
            $active = request()->routeIs($tab['route']);
            if ($active && isset($tab['status'])) {
                $active = request()->route('status') === $tab['status'];
            }
        @endphp
        <a class="{{ $active ? 'active' : '' }}" href="{{ route($tab['route'], $tab['params'] ?? []) }}" @if ($active) aria-current="page" @endif><span aria-hidden="true"></span>{{ $tab['label'] }}</a>
    @endforeach
</nav>
