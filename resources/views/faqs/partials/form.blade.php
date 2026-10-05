@if($errors->any())<div class="catalog-notice danger" role="alert"><strong>Please correct the form:</strong><ul>@foreach($errors->all() as $error)<li>{{ $error }}</li>@endforeach</ul></div>@endif
<div class="service-form-grid">
    <label class="field wide"><span>Question</span><input name="question" value="{{ old('question', $faq?->question) }}" maxlength="255" required></label>
    <label class="field wide"><span>Answer</span><textarea name="answer" rows="8" maxlength="10000" required>{{ old('answer', $faq?->answer) }}</textarea></label>
    <label class="field"><span>Audience</span><select name="audience" required>@foreach(['all' => 'Everyone', 'customer' => 'Customers', 'partner' => 'Partners', 'supporter' => 'Supporters'] as $value => $label)<option value="{{ $value }}" @selected(old('audience', $faq?->audience ?? 'all') === $value)>{{ $label }}</option>@endforeach</select></label>
    <label class="field"><span>Display order</span><input name="sort_order" type="number" min="0" max="65535" value="{{ old('sort_order', $faq?->sort_order ?? 0) }}" required></label>
    <label class="field wide"><span>Availability</span><span class="switch-row"><input name="is_active" type="hidden" value="0"><input name="is_active" type="checkbox" value="1" @checked((bool)old('is_active', $faq?->is_active ?? true))><span>Active and available to its audience</span></span></label>
</div>
<div class="form-actions catalog-form-actions"><a class="ui-button ghost" href="{{ route('admin.faqs.index') }}">Cancel</a><button class="ui-button primary" type="submit">{{ $submitLabel }}</button></div>
