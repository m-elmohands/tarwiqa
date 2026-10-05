<?php

namespace App\Http\Requests\Faqs;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreFaqRequest extends FormRequest
{
    public function authorize(): bool
    {
        return can_access_page('faqs.manage');
    }

    public function rules(): array
    {
        return [
            'question' => ['required', 'string', 'max:255', 'unique:faqs,question'],
            'answer' => ['required', 'string', 'max:10000'],
            'audience' => ['required', Rule::in(['all', 'customer', 'partner', 'supporter'])],
            'sort_order' => ['required', 'integer', 'min:0', 'max:65535'],
            'is_active' => ['required', 'boolean'],
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'question' => trim((string) $this->input('question')),
            'answer' => trim((string) $this->input('answer')),
            'audience' => $this->input('audience', 'all'),
            'sort_order' => $this->integer('sort_order'),
            'is_active' => $this->boolean('is_active'),
        ]);
    }
}
