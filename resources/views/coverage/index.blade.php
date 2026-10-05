@extends('layouts.app')
@section('title', 'Locations Management')
@section('eyebrow', 'Coverage control')
@section('heading', 'Locations')
@section('subtitle', 'Manage governorates and the location lists shown to customers during address selection.')
@section('content')
    <div class="workspace-page locations-page">
        {{-- <div class="page-actions"><button class="ui-button primary" type="button" data-open-location-form>Add Location</button><button class="ui-button ghost" type="button" data-sync-coverage>Sync App Coverage</button></div> --}}
        @if (session('status'))
            <div class="catalog-notice" role="status">{{ session('status') }}</div>
        @endif
        <section class="overview-metrics" aria-label="Location metrics">
            <article class="metric-card">
                <span>Total Governorates</span><strong>{{ $metrics['total_governorates'] }}</strong>
                <small>Coverage-ready governorates</small>
            </article>
            <article class="metric-card">
                <span>Total Locations</span>
                <strong>{{ $metrics['total_locations'] }}</strong><small>Active and inactive areas</small>
            </article>
            <article class="metric-card">
                <span>Most Covered</span>
                <strong>{{ $metrics['most_covered'] }}</strong>
                <small>Highest number of areas</small>
            </article>
            <article class="metric-card">
                <span>App Sync Status</span>
                <strong>{{ $metrics['sync_status'] }}</strong>
                <small>Lists ready for the app</small>
            </article>
        </section>
        <section class="locations-workspace">
            <article class="surface-card location-manager-card">
                <div class="card-head">
                    <div>
                        <p class="eyebrow">Admin setup</p>
                        <h2>Governorates and Locations</h2>
                    </div>
                    <span class="section-note">Manual coverage control</span>
                </div>
                <div class="location-tabs" role="tablist" aria-label="Governorates">
                    @foreach ($governorates as $governorate)
                        <button type="button" role="tab" class="location-tab {{ $loop->first ? 'active' : '' }}" data-governorate-tab="{{ $governorate->id }}">
                            {{ $governorate->name }}
                            <small>{{ $governorate->areas_count }}</small>
                        </button>
                    @endforeach
                </div>
                <div class="location-manager-grid">
                    <form method="POST" action="{{ route('admin.governorates.store') }}" class="location-create-panel">
                        @csrf<h3>Add Governorate</h3><label class="field"><span>Name</span><input name="name"
                                required></label><label class="field"><span>Arabic name</span><input
                                name="name_ar"></label><button class="ui-button ghost" type="submit">Add
                            Governorate</button></form>
                    <form method="POST" action="{{ route('admin.areas.store', $governorates->first()) }}"
                        class="location-create-panel" data-area-form>@csrf<h3>Add Location</h3><input type="hidden"
                            name="governorate_id" data-selected-governorate><label class="field"><span>Selected
                                Governorate</span><input type="text" data-selected-governorate-name
                                value="{{ $governorates->first()?->name }}" readonly></label><label
                            class="field"><span>New Location Name</span><input name="name" placeholder="Example: Maadi"
                                required></label><label class="field"><span>Arabic name</span><input
                                name="name_ar"></label><button class="ui-button primary" type="submit">Add To
                            Governorate</button></form>
                    <div class="locations-list-panel">
                        <div class="panel-title">
                            <h3>Locations under <span data-panel-governorate>{{ $governorates->first()?->name }}</span>
                            </h3><span data-location-count>{{ $governorates->first()?->areas_count ?? 0 }} locations</span>
                        </div>
                        @foreach ($governorates as $governorate)
                            <div class="location-group" data-governorate-group="{{ $governorate->id }}"
                                @if (!$loop->first) hidden @endif>
                                @forelse($governorate->areas as $area)
                                    <div class="location-row"><span><strong>{{ $area->name }}</strong>
                                            @if ($area->name_ar)
                                                <small>{{ $area->name_ar }}</small>
                                            @endif
                                        </span>
                                        <span
                                            class="location-status {{ $area->is_active ? 'active' : 'paused' }}">{{ $area->is_active ? 'Active' : 'Paused' }}</span>
                                        <form method="POST" action="{{ route('admin.areas.toggle', $area) }}">@csrf
                                            @method('PATCH')<button class="table-action-btn edit"
                                                type="submit">{{ $area->is_active ? 'Pause' : 'Activate' }}</button>
                                        </form>
                                </div>@empty<div class="overview-empty"><strong>No locations yet</strong>
                                        <p>Add the first location for this governorate.</p>
                                    </div>
                                @endforelse
                            </div>
                        @endforeach
                    </div>
                </div>
            </article>
            <aside class="surface-card location-preview-card">
                <div class="card-head">
                    <div>
                        <p class="eyebrow">App preview</p>
                        <h2>Customer Address Flow</h2>
                    </div>
                </div>
                <div class="location-app-preview"><label class="field"><span>Governorate</span><input
                            value="{{ $governorates->first()?->name }}" data-preview-governorate readonly></label><label
                        class="field"><span>Location</span><select data-preview-location>
                            @foreach ($governorates->first()?->areas ?? [] as $area)
                                <option>{{ $area->name }}</option>
                            @endforeach
                        </select></label>
                    <div class="catalog-notice"><strong>Flow behavior</strong>
                        <p>The governorate is selected first, then the app loads only locations assigned to it.</p>
                    </div>
                </div>
            </aside>
        </section>
    </div>
    @push('scripts')
        <script>
            const locationData = @json($governorates->mapWithKeys(fn($g) => [$g->id => ['name' => $g->name, 'areas' => $g->areas->map(fn($a) => $a->name)->values()]]));
            document.querySelectorAll('[data-governorate-tab]').forEach((tab) => tab.addEventListener('click', () => {
                const id = tab.dataset.governorateTab;
                const item = locationData[id];
                document.querySelectorAll('[data-governorate-tab]').forEach((el) => el.classList.toggle('active',
                    el === tab));
                document.querySelectorAll('[data-governorate-group]').forEach((el) => {
                    el.hidden = el.dataset.governorateGroup !== id;
                });
                document.querySelector('[data-panel-governorate]').textContent = item.name;
                document.querySelector('[data-location-count]').textContent = `${item.areas.length} locations`;
                document.querySelector('[data-preview-governorate]').value = item.name;
                document.querySelector('[data-selected-governorate]').value = id;
                document.querySelector('[data-selected-governorate-name]').value = item.name;
                document.querySelector('[data-area-form]').action = `{{ url('/governorates') }}/${id}/areas`;
                const select = document.querySelector('[data-preview-location]');
                select.replaceChildren(...item.areas.map((name) => new Option(name, name)));
            }));
            document.querySelector('[data-selected-governorate]')?.setAttribute('value', '{{ $governorates->first()?->id }}');
        </script>
    @endpush
@endsection
