<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class CheckoutOrderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return ['address_id' => ['required', 'integer', 'exists:addresses,id'], 'package_id' => ['nullable', 'integer', 'exists:packages,id'], 'service_date' => ['required', 'date', 'after_or_equal:today'], 'arrival_time' => ['nullable', 'date_format:H:i'], 'payment_method' => ['required', 'string', 'max:30'], 'customer_notes' => ['nullable', 'string', 'max:2000'], 'additional_phone' => ['nullable', 'string', 'max:30'], 'services' => ['nullable', 'array'], 'services.*.service_id' => ['required', 'integer', 'exists:services,id'], 'services.*.quantity' => ['required', 'integer', 'min:1', 'max:20'], 'products' => ['nullable', 'array'], 'products.*.product_id' => ['required', 'integer', 'exists:products,id'], 'products.*.quantity' => ['required', 'integer', 'min:1', 'max:20']];
    }

    protected function prepareForValidation(): void
    {
        $services = collect($this->input('services', []))->map(function (array $item): array {
            if (! isset($item['service_id']) && isset($item['widget_id'])) {
                $item['service_id'] = $item['widget_id'];
            }

            return $item;
        })->all();

        $this->merge(['services' => $services]);
    }

    public function withValidator($validator): void
    {
        $validator->after(fn ($validator) => empty($this->input('services')) && empty($this->input('products')) ? $validator->errors()->add('items', 'At least one service or product is required.') : null);
    }
}
