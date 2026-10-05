<?php

namespace App\Http\Requests\Maids;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;

class SaveRequest extends FormRequest
{
    public function authorize(): bool
    {
        return can_access_page('users.manage');
    }

    public function rules(): array
    {
        $maid = $this->route('maid');

        return [
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:30', Rule::unique('maids')->ignore($maid)],
            'address' => ['nullable', 'string', 'max:255'],
            'partner_id' => ['required', 'integer', Rule::exists('users', 'id')->whereNull('deleted_at')],
            'status' => ['required', Rule::in(['active', 'inactive'])],
            'gender' => ['required', Rule::in(['male', 'female'])],
            'off_day' => ['nullable', 'integer', 'min:1', 'max:7'],
            'doc_type' => ['nullable', Rule::in(['personal_id', 'contract', 'medical_report', 'police_clearance', 'training_certificate', 'profile_photo', 'other'])],
            'start_date' => ['required', 'date'],
            'age' => ['required', 'integer'],
            'notes' => ['nullable', 'string'],
            'personal_id' => ['nullable', 'string'],
            'salary' => ['required', 'decimal:0,2'],
            'attachment' => ['nullable', File::types(['pdf', 'jpg', 'jpeg', 'png', 'doc', 'docx'])->max('10mb')],
        ];
    }
}
