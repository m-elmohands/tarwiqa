<?php

namespace App\Http\Requests\Products;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;

class SaveProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return can_access_page('products.manage');
    }

    public function rules(): array
    {
        return [
            'category_id' => ['nullable', 'integer', Rule::exists('service_categories', 'id')->whereNull('deleted_at')],
            'city_id' => ['nullable', 'integer', Rule::exists('cities', 'id')->whereNull('deleted_at')->where('is_active', true)],
            'title' => ['required', 'string', 'max:160'],
            'slug' => ['required', 'string', 'max:180', Rule::unique('products', 'slug')->ignore($this->route('product'))],
            'description' => ['nullable', 'string', 'max:5000'],
            'youtube_url' => ['nullable', 'url:http,https', 'max:2000'],
            'base_price' => ['required', 'numeric', 'min:0', 'max:9999999999.99'],
            'is_active' => ['required', 'boolean'],
            'logo' => ['nullable', File::image()->types(['jpg', 'jpeg', 'png', 'webp'])->max('5mb')],
        ];
    }

    protected function prepareForValidation(): void
    {
        $title = trim((string) $this->input('title'));
        $this->merge([
            'title' => $title,
            'slug' => Str::slug($this->input('slug') ?: $title),
            'description' => filled($this->input('description')) ? trim((string) $this->input('description')) : null,
            'youtube_url' => filled($this->input('youtube_url')) ? trim((string) $this->input('youtube_url')) : null,
            'is_active' => $this->boolean('is_active'),
        ]);
    }
}
