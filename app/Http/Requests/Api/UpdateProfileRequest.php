<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;

class UpdateProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['sometimes', 'required', 'string', 'max:160'],
            'email' => ['sometimes', 'required', 'email', 'max:255', Rule::unique('users', 'email')->ignore($this->user())],
            'phone' => ['sometimes', 'nullable', 'string', 'max:30', Rule::unique('users', 'phone')->ignore($this->user())],
            'gender' => ['sometimes', 'nullable', Rule::in(['male', 'female', 'other'])],
            'dob' => ['sometimes', 'nullable', 'date', 'before:today'],
            'governorate_id' => ['sometimes', 'nullable', 'integer', 'exists:governorates,id'],
            'locale' => ['sometimes', Rule::in(['en', 'ar'])], 'timezone' => ['sometimes', 'timezone'],
            'avatar' => ['sometimes', 'nullable', File::image()->types(['jpg', 'jpeg', 'png', 'webp'])->max('5mb')],
        ];
    }
}
