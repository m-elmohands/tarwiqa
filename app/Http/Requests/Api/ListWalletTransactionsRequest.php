<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class ListWalletTransactionsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return ['type' => ['nullable', 'string', 'in:deposit,withdrawal,purchase'], 'per_page' => ['nullable', 'integer', 'min:1', 'max:50']];
    }
}
