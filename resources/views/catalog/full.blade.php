@extends('layouts.app')
@section('title', 'Full Control')
@section('eyebrow', 'Operational architecture')
@section('heading', 'Full Control')
@section('subtitle', 'Organize governorates, widgets, categories, and packages in one scalable workspace.')
@section('content')
    <div class="workspace-page full-control-page">
        <div class="page-actions"><a class="ui-button primary" href="{{ route('admin.coverage.index') }}">Add Governorate</a><a
                class="ui-button ghost"
                href="{{ route('admin.catalog.full', ['governorate' => $selectedGovernorateId]) }}">Sync Structure</a></div>
        <section class="overview-metrics" aria-label="Structure summary">
            <article class="metric-card"><span>Total
                    Governorates</span><strong>{{ $governorates->count() }}</strong><small>{{ $governorates->sum('areas_count') }}
                    locations covered</small></article>
            <article class="metric-card"><span>Active
                    Widgets</span><strong>{{ $widgets->where('is_active', true)->count() }}</strong><small>{{ $widgets->count() }}
                    configured sources</small></article>
            <article class="metric-card">
                <span>Categories</span><strong>{{ $categories->count() }}</strong><small>{{ $categories->sum('services_count') }}
                    linked services</small></article>
            <article class="metric-card">
                <span>Packages</span><strong>{{ $packages->count() }}</strong><small>{{ $packages->where('is_active', true)->count() }}
                    eligible for assignment</small></article>
        </section>
    @php
        $selectedGovernorate = $governorates->firstWhere('id', $selectedGovernorateId);
    @endphp
        <section class="full-control-hero">
            <div class="hero-content">
                <p class="eyebrow">Selected Governorate</p>
                <div class="hero-row">
                    <div>
                        <h2 data-governorate-name>{{ $selectedGovernorate?->name ?? 'No governorate configured' }}</h2>
                        <p class="hero-meta"><span data-governorate-market>{{ $selectedGovernorate?->areas_count ?? 0 }}
                                locations covered</span><span class="dot"></span>{{ $widgets->count() }} widgets
                            configured<span class="dot"></span>Live structure</p>
                    </div>
                    <div class="hero-pills"><span class="pill success">Operational</span><span
                            class="pill subtle">{{ $selectedGovernorate?->areas_count ?? 0 }} locations</span></div>
                </div>
                <div class="hero-actions"><a class="inline-btn"
                        href="{{ route('admin.catalog.create', 'service-types') }}">Create Widget</a><a
                        class="inline-btn secondary"
                        href="{{ route('admin.catalog.create', 'service-categories') }}">Create Category</a><a
                        class="inline-btn secondary" href="{{ route('admin.catalog.create', 'packages') }}">Create
                        Package</a></div>
            </div>
            <aside class="hero-aside">
                <div class="mini-stat"><span>Widgets in focus</span><strong data-focus-widget-count>{{ $widgets->count() }}</strong></div>
                <div class="mini-stat"><span>Categories in focus</span><strong data-focus-category-count>{{ $categories->count() }}</strong></div>
                <div class="mini-stat"><span>Packages in focus</span><strong data-focus-package-count>{{ $packages->count() }}</strong></div>
            </aside>
        </section>
        <section class="workspace-grid full-control-workspace">
            <article class="panel-card">
                <div class="panel-head">
                    <div>
                        <p class="eyebrow">Governorates</p>
                        <h3>Application Regions</h3>
                    </div><a class="small-btn" href="{{ route('admin.coverage.index') }}">New</a>
                </div>
                <div class="stack-list" data-governorate-list>
                    @forelse($governorates as $governorate)
                        <a class="stack-item {{ $governorate->id === $selectedGovernorateId ? 'active' : '' }}"
                            href="{{ route('admin.catalog.full.data', ['governorate' => $governorate->id]) }}"
                            data-governorate="{{ $governorate->id }}" data-name="{{ $governorate->name }}"
                            data-areas="{{ $governorate->areas_count }}">
                            <h4>{{ $governorate->name }}</h4>
                            <p>{{ $governorate->areas_count }} locations</p>
                    </a>@empty<p class="empty-table">No governorates configured.</p>
                    @endforelse
                </div>
            </article>
            <article class="panel-card">
                <div class="panel-head">
                    <div>
                        <p class="eyebrow">Widgets</p>
                        <h3>Functional Modules</h3>
                    </div><a class="small-btn" href="{{ route('admin.catalog.create', 'service-types') }}">Add Widget</a>
                </div>
                <div class="stack-list" data-widget-list>
                    @forelse($widgets as $widget)
                        <div class="stack-item">
                            <h4>{{ $widget->title }}</h4>
                            <p>{{ $widget->categories_count }} categories · {{ $widget->is_active ? 'Active' : 'Paused' }}
                            </p>
                    </div>@empty<p class="empty-table">No widgets configured.</p>
                    @endforelse
                </div>
            </article>
            <article class="panel-card">
                <div class="panel-head">
                    <div>
                        <p class="eyebrow">Categories</p>
                        <h3>Widget Categories</h3>
                    </div><a class="small-btn" href="{{ route('admin.catalog.create', 'service-categories') }}">Add
                        Category</a>
                </div>
                <div class="stack-list" data-category-list>
                    @forelse($categories as $category)
                        <div class="stack-item">
                            <h4>{{ $category->title }}</h4>
                            <p>{{ $category->type?->title ?? 'Unassigned' }} · {{ $category->services_count }} services</p>
                    </div>@empty<p class="empty-table">No categories configured.</p>
                    @endforelse
                </div>
            </article>
        </section>
        <section class="bottom-grid full-control-bottom">
            <article class="packages-card">
                <div class="panel-head">
                    <div>
                        <p class="eyebrow">Packages</p>
                        <h3 data-packages-title>Configured widget packages</h3>
                    </div><a class="small-btn" href="{{ route('admin.catalog.create', 'packages') }}">Add Package</a>
                </div>
                <div class="packages-grid" data-package-grid>
                    @forelse($packages as $package)
                        <article class="package-card">
                            <h4>{{ $package->title }}</h4>
                            <p>{{ $package->description ?: 'Package ready for assignment.' }}</p>
                            <div class="package-meta"><span class="tag">{{ $package->services_count }}
                                    services</span><span
                                    class="tag {{ $package->is_active ? '' : 'warn' }}">{{ $package->is_active ? 'Active' : 'Paused' }}</span>
                            </div>
                    </article>@empty<p class="empty-table">No packages configured.</p>
                    @endforelse
                </div>
            </article>
            <article class="structure-card">
                <div class="panel-head">
                    <div>
                        <p class="eyebrow">Structure preview</p>
                        <h3>Current Hierarchy</h3>
                    </div>
                </div>
                <div class="structure-tree" data-structure-tree>
                    @forelse($widgets as $widget)
                        <div class="tree-group">
                            <article class="tree-item">
                                <h4>{{ $widget->title }}</h4>
                                <p>{{ $widget->categories_count }} categories attached</p>
                            </article>
                            @foreach ($widget->categories as $category)
                                <article class="tree-item">
                                    <h4>{{ $category->title }}</h4>
                                    <p>{{ $category->services_count }} services inside this category</p>
                                </article>
                            @endforeach
                        </div>
                    @empty<p class="empty-table">Add a widget to preview the hierarchy.</p>
                    @endforelse
                </div>
            </article>
        </section>
    </div>
    @push('scripts')
        <script>
            const widgetList = document.querySelector('[data-widget-list]');
            const categoryList = document.querySelector('[data-category-list]');
            const packageGrid = document.querySelector('[data-package-grid]');
            const structureTree = document.querySelector('[data-structure-tree]');
            const escapeHtml = (value) => String(value ?? '').replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' })[character]);
            let state = { widgets: [], categories: [], packages: [], widgetId: null, categoryId: null };

            const renderState = () => {
                const selectedWidget = state.widgets.find((widget) => widget.id === state.widgetId) ?? state.widgets[0];
                state.widgetId = selectedWidget?.id ?? null;
                const visibleCategories = state.categories.filter((category) => !selectedWidget || selectedWidget.category_ids.includes(category.id));
                state.categoryId = visibleCategories.some((category) => category.id === state.categoryId) ? state.categoryId : visibleCategories[0]?.id ?? null;
                const visiblePackages = state.packages.filter((item) => !state.categoryId || item.category_ids.includes(state.categoryId));
                if (widgetList) widgetList.innerHTML = state.widgets.length ? state.widgets.map((widget) => `<button class="stack-item ${widget.id === state.widgetId ? 'active' : ''}" type="button" data-widget-id="${widget.id}"><h4>${escapeHtml(widget.title)}</h4><p>${widget.categories_count} categories · ${widget.is_active ? 'Active' : 'Paused'}</p></button>`).join('') : '<p class="empty-table">No widgets configured for this governorate.</p>';
                if (categoryList) categoryList.innerHTML = visibleCategories.length ? visibleCategories.map((category) => `<button class="stack-item ${category.id === state.categoryId ? 'active' : ''}" type="button" data-category-id="${category.id}"><h4>${escapeHtml(category.title)}</h4><p>${escapeHtml(category.type_title)} · ${category.services_count} services</p></button>`).join('') : '<p class="empty-table">No categories configured for this widget.</p>';
                if (packageGrid) packageGrid.innerHTML = visiblePackages.length ? visiblePackages.map((item) => `<article class="package-card"><h4>${escapeHtml(item.title)}</h4><p>${escapeHtml(item.description || 'Package ready for assignment.')}</p><div class="package-meta"><span class="tag">Widget package</span><span class="tag ${item.is_active ? '' : 'warn'}">${item.is_active ? 'Active' : 'Paused'}</span></div></article>`).join('') : '<p class="empty-table">No packages configured for this category.</p>';
                if (structureTree) structureTree.innerHTML = state.widgets.map((widget) => { const widgetCategories = state.categories.filter((category) => widget.category_ids.includes(category.id)); return `<div class="tree-group"><article class="tree-item"><h4>${escapeHtml(widget.title)}</h4><p>${widgetCategories.length} categories attached</p></article>${widgetCategories.map((category) => `<article class="tree-item"><h4>${escapeHtml(category.title)}</h4><p>${category.services_count} services inside this category</p></article>`).join('')}</div>`; }).join('');
                document.querySelector('[data-focus-widget-count]')?.replaceChildren(document.createTextNode(String(state.widgets.length)));
                document.querySelector('[data-focus-category-count]')?.replaceChildren(document.createTextNode(String(visibleCategories.length)));
                document.querySelector('[data-focus-package-count]')?.replaceChildren(document.createTextNode(String(visiblePackages.length)));
            };

            document.addEventListener('click', async (event) => {
                if (!(event.target instanceof Element)) return;

                const governorateItem = event.target.closest('[data-governorate]');
                if (governorateItem) {
                    event.preventDefault();
                    document.querySelectorAll('[data-governorate]').forEach((item) => item.classList.remove('active'));
                    governorateItem.classList.add('active');
                    try {
                        const response = await fetch(governorateItem.href, { headers: { Accept: 'application/json' } });
                        if (!response.ok) throw new Error('Unable to load structure.');
                        const payload = await response.json();
                        state = { ...payload, widgetId: payload.widgets[0]?.id ?? null, categoryId: null };
                        renderState();
                        window.history.replaceState({}, '', `{{ route('admin.catalog.full') }}?governorate=${governorateItem.dataset.governorate}`);
                    } catch (error) {
                        window.location.assign(`{{ route('admin.catalog.full') }}?governorate=${governorateItem.dataset.governorate}`);
                    }
                    return;
                }

                const widgetItem = event.target.closest('[data-widget-id]');
                if (widgetItem) {
                    event.preventDefault();
                    state.widgetId = Number(widgetItem.dataset.widgetId);
                    state.categoryId = null;
                    renderState();
                    return;
                }
                const categoryItem = event.target.closest('[data-category-id]');
                if (categoryItem) {
                    event.preventDefault();
                    state.categoryId = Number(categoryItem.dataset.categoryId);
                    renderState();
                    return;
                }
                const structureItem = event.target.closest('.full-control-workspace .stack-item');
                if (!structureItem) return;

                event.preventDefault();
                structureItem.closest('.stack-list')?.querySelectorAll('.stack-item').forEach((entry) => entry.classList.remove('active'));
                structureItem.classList.add('active');
            });
        </script>
    @endpush
@endsection
