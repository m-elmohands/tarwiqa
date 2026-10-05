@if($errors->any())<div class="catalog-notice danger" role="alert"><strong>Please correct the form:</strong><ul>@foreach($errors->all() as $error)<li>{{ $error }}</li>@endforeach</ul></div>@endif
<div class="service-form-grid">
    <label class="field"><span>Governorate</span><select name="governorate_id"><option value="">All governorates</option>@foreach($governorates as $governorate)<option value="{{ $governorate->id }}" @selected((string) old('governorate_id', $record?->governorate_id) === (string) $governorate->id)>{{ $governorate->name }}</option>@endforeach</select></label>
    @if($resource === 'service-categories')<label class="field"><span>Widget type</span><select name="type_id"><option value="">Unassigned</option>@foreach($types as $type)<option value="{{ $type->id }}" @selected((string)old('type_id', $record?->type_id) === (string)$type->id)>{{ $type->title }}</option>@endforeach</select></label>@endif
    <label class="field"><span>Title</span><input name="title" value="{{ old('title', $record?->title) }}" maxlength="160" required></label>
    <label class="field"><span>Slug</span><input name="slug" value="{{ old('slug', $record?->slug) }}" placeholder="Generated from title"></label>
    @if($resource !== 'packages')
        <label class="field wide"><span>Subtitle</span><input name="subtitle" value="{{ old('subtitle', $record?->subtitle) }}" maxlength="255"></label>
        <label class="field wide image-upload-field"><span>Logo</span><input name="logo" type="file" accept="image/jpeg,image/png,image/webp,image/svg+xml"><small>JPEG, PNG, WebP or SVG. Maximum 5 MB.</small></label>
    @else
        <label class="field"><span>Price (EGP)</span><input name="price" type="number" min="0" step="0.01" value="{{ old('price', $record?->price) }}" required></label>
        <label class="field"><span>Discount</span><input name="discount_value" type="number" min="0" step="0.01" value="{{ old('discount_value', $record?->discount_value ?? 0) }}" required></label>
        <label class="field"><span>Discount type</span><select name="discount_type"><option value="fixed" @selected(old('discount_type', $record?->discount_type) === 'fixed')>Fixed amount</option><option value="percentage" @selected(old('discount_type', $record?->discount_type) === 'percentage')>Percentage</option></select></label>
        <label class="field"><span>Starts at</span><input name="starts_at" type="datetime-local" value="{{ old('starts_at', $record?->starts_at?->format('Y-m-d\TH:i')) }}"></label>
        <label class="field"><span>Ends at</span><input name="ends_at" type="datetime-local" value="{{ old('ends_at', $record?->ends_at?->format('Y-m-d\TH:i')) }}"></label>
        <label class="field wide"><span>Description</span><textarea name="description" rows="5">{{ old('description', $record?->description) }}</textarea></label>
    @endif
    <label class="field wide"><span>Availability</span><span class="switch-row"><input name="is_active" type="hidden" value="0"><input name="is_active" type="checkbox" value="1" @checked((bool)old('is_active', $record?->is_active ?? true))><span>Active and available for use</span></span></label>
</div>
<div class="form-actions catalog-form-actions"><a class="ui-button ghost" href="{{ route('admin.catalog.index', $resource) }}">Cancel</a><button class="ui-button primary" type="submit">Save {{ $config['singular'] }}</button></div>
