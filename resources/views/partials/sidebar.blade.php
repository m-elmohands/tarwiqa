@php
    $user = auth()->user();
    $workspace = user_role();
    $dashboardRoute = $user->dashboardRoute();
    $roleLabel = str($user->role)->replace('_', ' ')->title();
    $navigation = match ($user->role) {
        \App\Models\User::ROLE_SUPER_ADMIN => [
            'Workspace' => [
                ['label' => 'Overview', 'icon' => 'grid', 'route' => $dashboardRoute],
                [
                    'label' => 'Approval center',
                    'icon' => 'support',
                    'permission' => 'approvals.manage',
                    'route' => 'admin.approvals.index',
                ],
                [
                    'label' => 'Orders',
                    'icon' => 'orders',
                    'permission' => 'orders.view',
                    'dropdown' => [
                        [
                            'label' => 'Under review',
                            'route' => 'admin.orders.lifecycle',
                            'params' => ['status' => 'under_review'],
                        ],
                        [
                            'label' => 'Waiting list',
                            'route' => 'admin.orders.lifecycle',
                            'params' => ['status' => 'waiting'],
                        ],
                        [
                            'label' => 'Scheduled',
                            'route' => 'admin.orders.lifecycle',
                            'params' => ['status' => 'scheduled'],
                        ],
                        ['label' => 'Accepted', 'route' => 'admin.orders.accepted'],
                        ['label' => 'Done', 'route' => 'admin.orders.done'],
                        ['label' => 'Cancelled', 'route' => 'admin.orders.cancelled'],
                        ['label' => 'Reviews', 'route' => 'admin.orders.reviews'],
                    ],
                ],
                [
                    'label' => 'Messages',
                    'icon' => 'messages',
                    'permission' => 'messages.manage',
                    'route' => 'admin.messages.index',
                ],
                [
                    'label' => 'Wallets',
                    'icon' => 'wallet',
                    'permission' => 'wallets.manage',
                    'route' => 'admin.wallets.index',
                ],
            ],
            'People' => [
                [
                    'label' => 'Customers',
                    'icon' => 'users',
                    'permission' => 'users.manage',
                    'route' => 'admin.users.index',
                    'params' => ['role' => 'customer'],
                ],
                [
                    'label' => 'Partners',
                    'icon' => 'users',
                    'permission' => 'users.manage',
                    'route' => 'admin.users.index',
                    'params' => ['role' => 'partner'],
                ],
                [
                    'label' => 'Supporters',
                    'icon' => 'users',
                    'permission' => 'users.manage',
                    'route' => 'admin.users.index',
                    'params' => ['role' => 'supporter'],
                ],
                ['label' => 'Maids', 'icon' => 'users', 'permission' => 'maids.manage', 'route' => 'admin.maids.index'],
            ],
            'Catalog' => [
                [
                    'label' => 'Widgets',
                    'icon' => 'layers',
                    'permission' => 'catalog.manage',
                    'route' => 'admin.catalog.index',
                    'params' => ['resource' => 'service-types'],
                ],
                [
                    'label' => 'Categories',
                    'icon' => 'category',
                    'permission' => 'catalog.manage',
                    'route' => 'admin.catalog.index',
                    'params' => ['resource' => 'service-categories'],
                ],
                [
                    'label' => 'Services',
                    'icon' => 'products',
                    'permission' => 'services.manage',
                    'route' => 'admin.services.index',
                ],
                [
                    'label' => 'Products',
                    'icon' => 'shopping-bag',
                    'permission' => 'products.manage',
                    'route' => 'admin.products.index',
                ],
                [
                    'label' => 'Packages',
                    'icon' => 'package',
                    'permission' => 'catalog.manage',
                    'route' => 'admin.custom-packages.index',
                ],
                ['label' => 'Full Control', 'icon' => 'layers', 'permission' => 'catalog.manage', 'route' => 'admin.catalog.full'],
                [
                    'label' => 'Extras',
                    'icon' => 'layers',
                    'permission' => 'extras.manage',
                    'route' => 'admin.extras.index',
                ],
            ],
            'Configuration' => [
                [
                    'label' => 'Locations',
                    'icon' => 'cities',
                    'permission' => 'locations.manage',
                    'route' => 'admin.coverage.index',
                ],
                ['label' => 'FAQs', 'icon' => 'support', 'permission' => 'faqs.manage', 'route' => 'admin.faqs.index'],
                ['label' => 'Ads', 'icon' => 'campaign', 'permission' => 'ads.manage', 'route' => 'admin.ads.index'],
                [
                    'label' => 'App shares',
                    'icon' => 'campaign',
                    'permission' => 'shares.view',
                    'route' => 'admin.shares.index',
                ],
            ],
        ],
        \App\Models\User::ROLE_PARTNER => [
            'Workspace' => [
                ['label' => 'Overview', 'icon' => 'grid', 'route' => $dashboardRoute],
                ['label' => 'Users', 'icon' => 'users', 'permission' => 'users.view', 'file' => 'supporter-users.html'],
                [
                    'label' => 'Messages',
                    'icon' => 'messages',
                    'permission' => 'messages.view',
                    'file' => 'supporter-messages.html',
                ],
                [
                    'label' => 'Partners',
                    'icon' => 'partners',
                    'permission' => 'partners.view',
                    'file' => 'supporter-partner-profile.html',
                ],
            ],
            'Account' => [['label' => 'My profile', 'icon' => 'profile', 'file' => 'supporter-profile.html']],
        ],
        \App\Models\User::ROLE_SUPPORTER => [
            'Workspace' => [
                ['label' => 'Overview', 'icon' => 'grid', 'route' => $dashboardRoute],
                [
                    'label' => 'Orders',
                    'icon' => 'orders',
                    'permission' => 'orders.view',
                    'file' => 'partner-done-orders.html',
                ],
                ['label' => 'Maids', 'icon' => 'maids', 'permission' => 'maids.view', 'file' => 'maid-details.html'],
            ],
            'Account' => [
                ['label' => 'My profile', 'icon' => 'profile', 'file' => 'partner-profile.html'],
                ['label' => 'Security', 'icon' => 'lock', 'file' => 'partner-change-password.html'],
            ],
        ],
        default => [],
    };
@endphp

<aside class="sidebar" id="appSidebar" aria-label="Primary navigation">
    <div class="sidebar-brand">
        <a class="sidebar-logo" href="{{ route($dashboardRoute) }}" aria-label="TARWIQA dashboard">
            <span class="sidebar-logo-mark" aria-hidden="true">T</span>
            <span><strong>TARWIQA</strong><small>Operations suite</small></span>
        </a>
        <button class="sidebar-close" type="button" aria-label="Close navigation" data-sidebar-close>&times;</button>
    </div>
    <div class="sidebar-context">
        <span class="sidebar-context-dot" aria-hidden="true"></span>
        <span><small>Current workspace</small><strong>{{ $roleLabel }}</strong></span>
    </div>
    <nav class="sidebar-nav">
        @foreach ($navigation as $section => $items)
            <section class="sidebar-nav-group" aria-labelledby="nav-{{ str($section)->slug() }}">
                <h2 id="nav-{{ str($section)->slug() }}">{{ $section }}</h2>
                @foreach ($items as $item)
                    @if (!isset($item['permission']) || can_access_page($item['permission']))
                        @php
                            $itemIsDropdown = isset($item['dropdown']);
                            $href = isset($item['route']) ? route($item['route'], $item['params'] ?? []) : null;
                            $active = isset($item['route']) && request()->routeIs($item['route']);
                            if ($active && isset($item['params']['resource'])) {
                                $active = request()->route('resource') === $item['params']['resource'];
                            }
                            if ($active && isset($item['params']['role'])) {
                                $active = request()->route('role') === $item['params']['role'];
                            }
                            $dropdownActive =
                                $itemIsDropdown &&
                                collect($item['dropdown'])->contains(
                                    fn(array $child): bool => request()->routeIs($child['route']),
                                );
                        @endphp
                        @if ($itemIsDropdown)
                            <details class="sidebar-item-dropdown" @if ($dropdownActive) open @endif>
                                <summary
                                    class="sidebar-link sidebar-dropdown-parent {{ $dropdownActive ? 'active' : '' }}">
                                    <svg aria-hidden="true">
                                        <use href="#sidebar-icon-{{ $item['icon'] }}" />
                                    </svg>
                                    <div class="sidebar-dropdown-parent-content">
                                        <span>{{ $item['label'] }}</span>
                                        <span class="sidebar-dropdown-caret" aria-hidden="true"></span>
                                    </div>
                                </summary>
                                <div class="sidebar-item-dropdown-menu">
                                    @foreach ($item['dropdown'] as $child)
                                        @php
                                            $childActive = request()->routeIs($child['route']);
                                            if ($childActive && isset($child['params']['status'])) {
                                                $childActive =
                                                    request()->route('status') === $child['params']['status'];
                                            }
                                        @endphp
                                        <a class="sidebar-link sidebar-child-link {{ $childActive ? 'active' : '' }}"
                                            href="{{ route($child['route'], $child['params'] ?? []) }}"
                                            @if ($childActive) aria-current="page" @endif><span>{{ $child['label'] }}</span>
                                            @if ($childActive)
                                                <span class="sidebar-active-dot" aria-hidden="true"></span>
                                            @endif
                                        </a>
                                    @endforeach
                                </div>
                            </details>
                        @else
                            @if (!isset($href))
                                @php $href = route('design.'.$workspace.'.file', ['file' => $item['file']]); @endphp
                            @endif
                            <a class="sidebar-link {{ $active ? 'active' : '' }}" href="{{ $href }}"
                                @if ($active) aria-current="page" @endif><svg aria-hidden="true">
                                    <use href="#sidebar-icon-{{ $item['icon'] }}" />
                                </svg><span>{{ $item['label'] }}</span>
                                @if ($active)
                                    <span class="sidebar-active-dot" aria-hidden="true"></span>
                                @endif
                            </a>
                        @endif
                    @endif
                @endforeach
            </section>
        @endforeach
    </nav>
    <div class="sidebar-account">
        <span
            class="sidebar-avatar">{{ str($user->name)->trim()->explode(' ')->take(2)->map(fn($part) => str($part)->substr(0, 1))->join('') }}</span>
        <span
            class="sidebar-account-copy"><strong>{{ $user->name }}</strong><small>{{ $user->email }}</small></span>
        <form method="POST" action="{{ route('logout') }}">@csrf
            <button type="submit" aria-label="Log out" title="Log out"><svg aria-hidden="true">
                    <use href="#sidebar-icon-logout" />
                </svg></button>
        </form>
    </div>
    <svg class="sidebar-symbols" aria-hidden="true">
        <symbol id="sidebar-icon-grid" viewBox="0 0 24 24">
            <rect x="3" y="3" width="7" height="7" rx="2" />
            <rect x="14" y="3" width="7" height="7" rx="2" />
            <rect x="3" y="14" width="7" height="7" rx="2" />
            <rect x="14" y="14" width="7" height="7" rx="2" />
        </symbol>
        <symbol id="sidebar-icon-orders" viewBox="0 0 24 24">
            <path d="M6 3h12l2 4v14H4V7l2-4Z" />
            <path d="M4 8h16M9 12h6" />
        </symbol>
        <symbol id="sidebar-icon-users" viewBox="0 0 24 24">
            <circle cx="9" cy="8" r="4" />
            <path d="M2 21v-2a6 6 0 0 1 12 0v2M16 4a4 4 0 0 1 0 8M17 15a6 6 0 0 1 5 6" />
        </symbol>
        <symbol id="sidebar-icon-maids" viewBox="0 0 24 24">
            <path d="m12 3 2.2 5.2L20 10l-4.5 3.8.2 5.8L12 17l-3.7 2.6.2-5.8L4 10l5.8-1.8L12 3Z" />
        </symbol>
        <symbol id="sidebar-icon-partners" viewBox="0 0 24 24">
            <path d="M4 21V7l8-4 8 4v14M8 21v-4h8v4M8 9h2M14 9h2M8 13h2M14 13h2" />
        </symbol>
        <symbol id="sidebar-icon-support" viewBox="0 0 24 24">
            <path
                d="M4 13v-2a8 8 0 0 1 16 0v2M4 13a3 3 0 0 0 3 3h1v-6H7a3 3 0 0 0-3 3ZM20 13a3 3 0 0 1-3 3h-1v-6h1a3 3 0 0 1 3 3ZM17 16c0 3-2 5-5 5" />
        </symbol>
        <symbol id="sidebar-icon-campaign" viewBox="0 0 24 24">
            <path d="m3 11 14-6v14L3 13v-2ZM7 15l1 5h4l-2-4" />
            <path d="M21 9v6" />
        </symbol>
        <symbol id="sidebar-icon-products" viewBox="0 0 24 24">
            <path d="M4 8 12 4l8 4-8 4-8-4Z" />
            <path d="m4 8v8l8 4 8-4V8M12 12v8" />
        </symbol>
        <symbol id="sidebar-icon-layers" viewBox="0 0 24 24">
            <path d="m12 3 9 5-9 5-9-5 9-5Z" />
            <path d="m3 12 9 5 9-5M3 16l9 5 9-5" />
        </symbol>
        <symbol id="sidebar-icon-category" viewBox="0 0 24 24">
            <rect x="3" y="3" width="8" height="8" rx="2" />
            <rect x="13" y="3" width="8" height="8" rx="2" />
            <rect x="3" y="13" width="8" height="8" rx="2" />
            <rect x="13" y="13" width="8" height="8" rx="2" />
        </symbol>
        <symbol id="sidebar-icon-package" viewBox="0 0 24 24">
            <path d="M4 7.5 12 3l8 4.5v9L12 21l-8-4.5v-9Z" />
            <path d="m4 7.5 8 4.5 8-4.5M12 12v9" />
        </symbol>
        <symbol id="sidebar-icon-shopping-bag" viewBox="0 0 24 24">
            <path d="M5 8h14l1 13H4L5 8Z" />
            <path d="M9 10V6a3 3 0 0 1 6 0v4" />
        </symbol>
        <symbol id="sidebar-icon-cities" viewBox="0 0 24 24">
            <path d="M4 21V9l5-3v15M9 21V4l7 3v14M16 21v-9l4-2v11M2 21h20" />
            <path d="M12 9h1M12 13h1M12 17h1M6 12h1M6 16h1" />
        </symbol>
        <symbol id="sidebar-icon-wallet" viewBox="0 0 24 24">
            <path d="M3 6h16a2 2 0 0 1 2 2v11H5a2 2 0 0 1-2-2V6Zm0 0 14-3v3" />
            <path d="M16 11h5v4h-5a2 2 0 0 1 0-4Z" />
        </symbol>
        <symbol id="sidebar-icon-messages" viewBox="0 0 24 24">
            <path d="M4 4h16v13H8l-4 4V4Z" />
            <path d="M8 9h8M8 13h5" />
        </symbol>
        <symbol id="sidebar-icon-profile" viewBox="0 0 24 24">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21a8 8 0 0 1 16 0" />
        </symbol>
        <symbol id="sidebar-icon-lock" viewBox="0 0 24 24">
            <rect x="4" y="10" width="16" height="11" rx="2" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" />
        </symbol>
        <symbol id="sidebar-icon-logout" viewBox="0 0 24 24">
            <path d="M10 4H4v16h6M14 8l4 4-4 4M8 12h10" />
        </symbol>
    </svg>
</aside>
<button class="sidebar-backdrop" type="button" aria-label="Close navigation" data-sidebar-close></button>
