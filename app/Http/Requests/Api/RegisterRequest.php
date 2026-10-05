<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:160'], 'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'phone' => ['nullable', 'string', 'max:30', 'unique:users,phone'], 'password' => ['required', 'string', 'min:8', 'confirmed'],
            'governorate_id' => ['nullable', 'integer', 'exists:governorates,id'], 'device_name' => ['nullable', 'string', 'max:100'],
        ];
    }
}
