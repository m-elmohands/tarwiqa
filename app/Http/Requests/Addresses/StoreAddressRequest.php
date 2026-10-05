<?php

namespace App\Http\Requests\Addresses;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreAddressRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'city_id' => 'nullable|exists:cities,id',
            'governorate_id' => 'required|exists:governorates,id',
            'label' => 'required|string',
            'contact_name' => 'nullable|string',
            'contact_phone' => 'nullable|string',
            'street' => 'required|string',
            'building' => 'nullable|string',
            'floor' => 'nullable|string',
            'apartment' => 'nullable|string',
            'landmark' => 'nullable|string',
            'is_default' => 'nullable|boolean',
        ];
    }
}
