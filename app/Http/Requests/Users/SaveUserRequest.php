<?php

namespace App\Http\Requests\Users;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SaveUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return can_access_page('users.manage');
    }

    public function rules(): array
    {
        $user = $this->route('user');

        return [
            'name' => ['required', 'string', 'max:255'],
            'username' => ['nullable', 'string', 'max:100', Rule::unique('users')->ignore($user)],
            'email' => ['required', 'email', 'max:255', Rule::unique('users')->ignore($user)],
            'phone' => ['nullable', 'string', 'max:30', Rule::unique('users')->ignore($user)],
            'additional_phone' => ['nullable', 'string', 'max:30'],
            'national_id' => ['nullable', 'string', 'max:30'],
            'address' => ['nullable', 'string', 'max:2000'],
            'notes' => ['nullable', 'string', 'max:5000'],
            'gender' => ['nullable', Rule::in(['male', 'female'])],
            'dob' => ['nullable', 'date', 'before:today'],
            'platform' => ['nullable', Rule::in(['android', 'ios'])],
            'verification_status' => ['nullable', Rule::in(['pending', 'verified', 'manual_review'])],
            'screenshot_allowed' => ['nullable', 'boolean'],
            'governorate_ids' => ['nullable', 'array'],
            'governorate_ids.*' => ['integer', 'exists:governorates,id'],
            'area_ids' => ['nullable', 'array'],
            'area_ids.*' => ['integer', 'exists:areas,id'],
            'access_role' => ['nullable', Rule::in(['viewer', 'editor'])],
            'can_view_orders' => ['nullable', 'boolean'],
            'can_view_partners' => ['nullable', 'boolean'],
            'can_export_reports' => ['nullable', 'boolean'],
            'permissions' => ['nullable', 'array'],
            'permissions.*' => ['string', 'max:180'],
            'account_type' => ['nullable', Rule::in(['individual', 'company'])],
            'emergency_name' => ['nullable', 'string', 'max:255'],
            'emergency_phone' => ['nullable', 'string', 'max:30'],
            'max_daily_orders' => ['nullable', 'integer', 'min:1', 'max:100'],
            'commission_percent' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'settlement_method' => ['nullable', Rule::in(['bank', 'wallet', 'cash'])],
            'working_days' => ['nullable', 'array'],
            'working_days.*' => ['string', Rule::in(['sat', 'sun', 'mon', 'tue', 'wed', 'thu', 'fri'])],
            'work_start' => ['nullable', 'date_format:H:i'],
            'work_end' => ['nullable', 'date_format:H:i', 'after:work_start'],
            'service_ids' => ['nullable', 'array'],
            'service_ids.*' => ['integer', 'exists:service_categories,id'],
            'maid_ids' => ['nullable', 'array'],
            'maid_ids.*' => ['string', 'exists:maids,id'],
            'bank_name' => ['nullable', 'string', 'max:255'],
            'account_holder' => ['nullable', 'string', 'max:255'],
            'bank_account' => ['nullable', 'string', 'max:100'],
            'wallet_phone' => ['nullable', 'string', 'max:30'],
            'document_expiry' => ['nullable', 'date'],
            'commercial_registration' => ['nullable', 'string', 'max:100'],
            'tax_number' => ['nullable', 'string', 'max:100'],
            'workspace_role' => ['nullable', Rule::in(['viewer', 'editor'])],
            'city_id' => ['nullable', 'integer', Rule::exists('cities', 'id')->whereNull('deleted_at')],
            'governorate_id' => ['nullable', 'integer', Rule::exists('governorates', 'id')->whereNull('deleted_at')],
            'role' => ['required', Rule::in([User::ROLE_SUPER_ADMIN, User::ROLE_SUPPORTER, User::ROLE_PARTNER, 'customer'])],
            'status' => ['required', Rule::in(['active', 'inactive', 'suspended'])],
            'password' => [$user ? 'nullable' : 'required', 'string', 'min:8', 'confirmed'],
        ];
    }
}
