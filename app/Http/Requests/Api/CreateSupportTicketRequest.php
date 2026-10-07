<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class CreateSupportTicketRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'subject' => ['required', 'string', 'max:255'],
            'details' => ['required', 'string', 'max:5000'],
            'channel' => ['nullable', 'string', 'max:30'],
            'order_id' => ['nullable', 'integer', 'exists:orders,id'],
        ];
    }
}
