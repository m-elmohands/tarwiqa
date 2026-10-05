<?php

namespace App\Http\Requests\Messages;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SendMessageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return can_access_page('messages.manage');
    }

    public function rules(): array
    {
        return [
            'recipient_id' => ['required', 'integer', Rule::exists('users', 'id')->where('status', 'active')],
            'channel' => ['required', Rule::in(['in_app', 'email', 'sms'])],
            'subject' => ['required', 'string', 'max:255'],
            'body' => ['required', 'string', 'max:10000'],
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge(['subject' => trim((string) $this->input('subject')), 'body' => trim((string) $this->input('body'))]);
    }
}
