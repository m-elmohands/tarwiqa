<?php

namespace App\Http\Requests\Cities;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCityRequest extends FormRequest
{
    public function authorize(): bool
    {
        return can_access_page('cities.manage');
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:120', Rule::unique('cities', 'name')->ignore($this->route('city'))],
            'name_ar' => ['nullable', 'string', 'max:120'],
            'is_active' => ['required', 'boolean'],
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'name' => trim((string) $this->input('name')),
            'name_ar' => filled($this->input('name_ar')) ? trim((string) $this->input('name_ar')) : null,
            'is_active' => $this->boolean('is_active'),
        ]);
    }
}
