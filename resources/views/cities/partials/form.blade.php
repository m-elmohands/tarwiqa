@if ($errors->any())
    <div class="notice danger" role="alert">
        <strong>Please correct the following:</strong>
        <ul>@foreach ($errors->all() as $error)<li>{{ $error }}</li>@endforeach</ul>
    </div>
@endif

<div class="city-form-grid">
    <label class="field">
        <span>English name</span>
        <input name="name" type="text" value="{{ old('name', $city?->name) }}" maxlength="120" required placeholder="Example: Nasr City">
    </label>
    <label class="field">
        <span>Arabic name</span>
        <input name="name_ar" type="text" dir="rtl" value="{{ old('name_ar', $city?->name_ar) }}" maxlength="120" placeholder="مثال: مدينة نصر">
    </label>
    <label class="field city-status-field">
        <span>Availability</span>
        <span class="switch-row"><input name="is_active" type="hidden" value="0"><input name="is_active" type="checkbox" value="1" @checked((bool) old('is_active', $city?->is_active ?? true))><span>Active and available for selection</span></span>
    </label>
</div>

<div class="form-actions city-form-actions">
    <a class="ui-button ghost" href="{{ route('admin.cities.index') }}">Cancel</a>
    <button class="ui-button primary" type="submit">{{ $submitLabel }}</button>
</div>
