@extends('layouts.app')
@section('title', 'Admin Overview')
@section('eyebrow', 'Administration')
@section('heading', 'Overview')
@section('subtitle', 'A focused view of current activity, revenue, and catalog readiness.')
@section('content')
    <div class="workspace-page admin-overview-page">
        <section class="overview-welcome">
            <div>
                <p class="eyebrow">{{ now()->format('l, j F') }}</p>
                <h2>Welcome back, {{ str(auth()->user()->name)->before(' ') }}</h2>
                <p>Review live operational totals and continue to the areas that need attention.</p>
            </div>
            <div class="overview-primary-actions">
                @pageAccess('orders.view')
                    <a class="ui-button primary" href="{{ route('admin.orders.accepted') }}">Review orders</a>
                @endpageAccess
                @pageAccess('services.manage')
                    <a class="ui-button accent" href="{{ route('admin.services.create') }}">Add service</a>
                @endpageAccess
            </div>
        </section>

        <section class="overview-metrics" aria-label="Business summary">
            @foreach ($metrics as $key => $data)
                @if (!is_array($data))
                    <x-metrics title="{{ $key }}" type="{{ in_array($key, ['revenue', 'total_order_amount', 'total_order_price', 'total_maids_revenue', 'total_discounts', 'total_wallet'], true) ? 'revenue' : 'users' }}" value="{{ is_numeric($data) && in_array($key, ['revenue', 'total_order_amount', 'total_order_price', 'total_maids_revenue', 'total_discounts', 'total_wallet'], true) ? 'EGP '.format_amount($data) : $data }}" />
                    @continue
                @endif
                @foreach ($data as $supKey => $value)
                    <x-metrics title="{{ $supKey }} {{ $key }}" type="{{ $key }}"
                        value="{{ number_format($value) }}" />
                @endforeach
            @endforeach

        </section>

        <div class="overview-grid">
            <section class="overview-orders-card">
                <section class="surface-card">
                    <div class="card-head overview-card-head">
                        <div>
                            <p class="eyebrow">Ranking</p>
                            <h2>Top 10 Maids</h2>
                        </div>
                    </div>
                    @if ($topMaids->isEmpty())
                        <div class="overview-empty">
                            <span aria-hidden="true">M</span>
                            <strong>No orders yet</strong>
                            <p>Top 10 Maids will appear here as soon as they are ordered.</p>
                        </div>
                    @else
                        <div class="overview-order-list">
                            @foreach ($topMaids as $maid)
                                <article>
                                    <span class="overview-order-id">{{ $loop->iteration }}</span>
                                    <div>
                                        <strong>{{ $maid->name }}</strong>
                                        <small>{{ $maid->orders_count }} completed orders</small>
                                    </div>
                                    <span class="status-pill active">Top performer</span>
                                </article>
                            @endforeach
                        </div>
                    @endif
                </section>
                <section class="surface-card">
                    <div class="card-head overview-card-head">
                        <div>
                            <p class="eyebrow">Catalog ranking</p>
                            <h2>Top 10 Extras</h2>
                        </div>
                        @pageAccess('extras.manage')
                            <a href="{{ route('admin.extras.index') }}">Manage extras</a>
                        @endpageAccess
                    </div>
                    @if ($topExtras->isEmpty())
                        <div class="overview-empty">
                            <span aria-hidden="true">E</span>
                            <strong>No extra usage yet</strong>
                            <p>Top extras will appear here after they are added to orders.</p>
                        </div>
                    @else
                        <div class="overview-order-list">
                            @foreach ($topExtras as $extra)
                                <article>
                                    <span class="overview-order-id">{{ $loop->iteration }}</span>
                                    <div>
                                        <strong>{{ $extra->name ?: 'Unnamed extra' }}</strong>
                                        <small>{{ number_format((int) $extra->usage_count) }} uses</small>
                                    </div>
                                    <span class="status-pill active">Popular</span>
                                </article>
                            @endforeach
                        </div>
                    @endif
                </section>
                <section class="surface-card">
                    <div class="card-head overview-card-head">
                        <div>
                            <p class="eyebrow">Latest activity</p>
                            <h2>Recent Orders</h2>
                        </div>
                        @pageAccess('orders.view')
                            <a href="{{ route('admin.orders.accepted') }}">View orders</a>
                        @endpageAccess
                    </div>
                    @if (empty($recentOrders))
                        <div class="overview-empty">
                            <span aria-hidden="true">O</span>
                            <strong>No orders yet</strong>
                            <p>New customer bookings will appear here as soon as they are created.</p>
                        </div>
                    @else
                        <div class="overview-order-list">
                            @foreach ($recentOrders as $order)
                                <article>
                                    <span class="overview-order-id">#{{ $order['id'] }}</span>
                                    <div>
                                        <strong>{{ $order['customer_name'] }}</strong>
                                        <small>{{ $order['service_date'] }} ·
                                            EGP {{ format_amount($order['total']) }}</small>
                                    </div>
                                    <span class="status-pill {{ $order['status'] == 'completed' ? 'active' : 'pending' }}">
                                        {{ str($order['status'])->replace('_', ' ')->title() }}
                                    </span>
                                </article>
                            @endforeach
                        </div>
                    @endif
                </section>
            </section>

            <aside class="overview-side-stack">
                <section class="surface-card">
                    <div class="card-head">
                        <div>
                            <p class="eyebrow">Workflow</p>
                            <h2>Order Status</h2>
                        </div>
                    </div>
                    <div class="overview-status-list">
                        @foreach (['under_review' => 'Under review', 'accepted' => 'Accepted', 'completed' => 'Done', 'cancelled' => 'Cancelled'] as $status => $label)
                            <div>
                                <span>{{ $label }}</span><strong>{{ number_format((int) ($orderCounts[$status] ?? 0)) }}</strong>
                            </div>
                        @endforeach
                    </div>
                </section>

                <section class="surface-card overview-shortcuts">
                    <div class="card-head">
                        <div>
                            <p class="eyebrow">Management</p>
                            <h2>Quick Access</h2>
                        </div>
                    </div>
                    <div>
                        @pageAccess('users.manage')
                            <a href="{{ route('admin.users.index', 'customer') }}">
                                <strong>Customers</strong>
                                <span>Manage accounts →</span>
                            </a>
                            <a href="{{ route('admin.users.index', 'supporter') }}">
                                <strong>Supporter</strong>
                                <span>Manage accounts →</span>
                            </a>
                            <a href="{{ route('admin.users.index', 'partner') }}">
                                <strong>Partner</strong>
                                <span>Manage accounts →</span>
                            </a>
                        @endpageAccess
                        @pageAccess('locations.manage')
                            <a href="{{ route('admin.coverage.index') }}"><strong>Governorates</strong><span>Coverage structure
                                    →</span></a>
                        @endpageAccess
                        {{-- @pageAccess('faqs.manage')
                            <a href="{{ route('admin.faqs.index') }}"><strong>FAQs</strong><span>{{ $metrics['published_faqs'] }}
                                    published →</span></a>
                        @endpageAccess --}}
                        @pageAccess('products.manage')
                            <a href="{{ route('admin.products.index') }}"><strong>Products</strong><span>Open catalog
                                    →</span></a>
                        @endpageAccess
                    </div>
                </section>
            </aside>
        </div>
    </div>
@endsection
