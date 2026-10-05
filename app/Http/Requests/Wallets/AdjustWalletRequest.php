<?php

namespace App\Http\Requests\Wallets;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AdjustWalletRequest extends FormRequest
{
    public function authorize(): bool
    {
        return can_access_page('wallets.manage');
    }

    public function rules(): array
    {
        return ['user_id' => ['required', 'integer', 'exists:users,id'], 'type' => ['required', Rule::in(['deposit', 'withdrawal'])], 'amount' => ['required', 'numeric', 'gt:0', 'max:999999999999.99'], 'description' => ['required', 'string', 'max:1000'], 'reference' => ['nullable', 'uuid']];
    }
}
