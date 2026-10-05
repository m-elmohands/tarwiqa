@if ($errors->any())
    <div class="catalog-notice danger" role="alert">
        <strong>Please correct the form:</strong>
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif
<div class="service-form-grid">
    <label class="field"><span>Category</span><select name="category_id">
            <option value="">Uncategorized</option>
            @foreach ($categories as $category)
                <option value="{{ $category->id }}" @selected((string) old('category_id', $service?->category_id) === (string) $category->id)>{{ $category->title }}</option>
            @endforeach
        </select>
    </label>
    <label class="field"><span>City</span><select name="city_id">
            <option value="">Available in all cities</option>
            @foreach ($cities as $city)
                <option value="{{ $city->id }}" @selected((string) old('city_id', $service?->city_id) === (string) $city->id)>{{ $city->name }}</option>
            @endforeach
        </select></label>
    <label class="field"><span>Service title</span><input name="title" value="{{ old('title', $service?->title) }}"
            maxlength="160" required></label>
    <label class="field"><span>Slug</span><input name="slug" value="{{ old('slug', $service?->slug) }}"
            placeholder="Generated from name"></label>
    <label class="field"><span>Base price (EGP)</span><input name="base_price" type="number" min="0"
            step="0.01" value="{{ old('base_price', $service?->base_price) }}" required></label>
    <label class="field wide"><span>Service description</span>
        <textarea name="description" rows="5">{{ old('description', $service?->description) }}</textarea>
    </label>
    <label class="field wide image-upload-field"><span>Service logo</span><input name="logo" type="file"
            accept="image/jpeg,image/png,image/webp"><small>Stored in the Media Library logo collection. Maximum 5
            MB.</small></label>
    <label class="field wide"><span>Availability</span><span class="switch-row"><input name="is_active" type="hidden"
                value="0"><input name="is_active" type="checkbox" value="1"
                @checked((bool) old('is_active', $service?->is_active ?? true))><span>Active and visible to customers</span></span></label>
</div>
<div class="form-actions catalog-form-actions"><a class="ui-button ghost"
        href="{{ route('admin.services.index') }}">Cancel</a><button class="ui-button primary"
        type="submit">{{ $submitLabel }}</button></div>
