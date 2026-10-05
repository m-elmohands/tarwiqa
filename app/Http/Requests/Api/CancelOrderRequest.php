<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class CancelOrderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return ['order_id' => ['required', 'integer', 'exists:orders,id'], 'reason' => ['required', 'string', 'max:1000']];
    }
}
