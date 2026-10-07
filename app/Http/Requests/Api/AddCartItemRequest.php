<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class AddCartItemRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'item_type' => ['required', Rule::in(['service', 'product', 'package'])],
            'item_id' => ['required', 'integer', 'min:1'],
            'quantity' => ['sometimes', 'integer', 'min:1', 'max:20'],
        ];
    }

    public function withValidator($validator): void
    {
        $validator->after(function ($validator): void {
            $type = $this->input('item_type');
            $table = match ($type) {
                'service' => 'services',
                'product' => 'products',
                'package' => 'packages',
                default => null,
            };

            if ($table && ! DB::table($table)->where('id', $this->input('item_id'))->where('is_active', true)->exists()) {
                $validator->errors()->add('item_id', 'The selected item is not available.');
            }
        });
    }
}
