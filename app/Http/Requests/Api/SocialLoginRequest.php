<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SocialLoginRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'provider' => ['required', Rule::in(['google', 'apple', 'facebook'])],
            'token' => ['required', 'string', 'max:10000'],
            'name' => ['nullable', 'string', 'max:255'],
        ];
    }
}
