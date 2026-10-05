<?php

namespace App\Services;

use App\Contracts\Repositories\UserRepositoryInterface;
use App\Contracts\Services\UserManagementInterface;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;

class UserManagement implements UserManagementInterface
{
    public function __construct(private readonly UserRepositoryInterface $users) {}

    public function query(): Builder
    {
        return $this->users->query();
    }

    public function create(array $data): User
    {
        $user = $this->users->create($this->profileData($data));
        $this->syncScopes($user, $data);

        return $user;
    }

    public function update(User $user, array $data): User
    {
        if (blank($data['password'] ?? null)) {
            unset($data['password']);
        }

        $user = $this->users->update($user, $this->profileData($data));
        $this->syncScopes($user, $data);

        return $user;
    }

    public function delete(User $user): void
    {
        $this->users->delete($user);
    }

    private function profileData(array $data): array
    {
        $settings = $data['settings'] ?? [];
        foreach (['account_type', 'access_role', 'can_view_orders', 'can_view_partners', 'can_export_reports', 'permissions', 'workspace_role', 'emergency_name', 'emergency_phone', 'max_daily_orders', 'commission_percent', 'settlement_method', 'working_days', 'work_start', 'work_end', 'service_ids', 'maid_ids', 'bank_name', 'account_holder', 'bank_account', 'wallet_phone', 'document_expiry', 'commercial_registration', 'tax_number'] as $key) {
            if (array_key_exists($key, $data)) {
                $settings[$key] = $data[$key];
            }
        }
        if (($data['access_role'] ?? null) === 'viewer') {
            $settings['permissions'] = collect($settings['permissions'] ?? [])->reject(fn ($permission): bool => str_ends_with((string) $permission, '.edit'))->values()->all();
        }
        unset($data['governorate_ids'], $data['area_ids'], $data['account_type'], $data['access_role'], $data['can_view_orders'], $data['can_view_partners'], $data['can_export_reports'], $data['permissions'], $data['workspace_role'], $data['emergency_name'], $data['emergency_phone'], $data['max_daily_orders'], $data['commission_percent'], $data['settlement_method'], $data['working_days'], $data['work_start'], $data['work_end'], $data['service_ids'], $data['maid_ids'], $data['bank_name'], $data['account_holder'], $data['bank_account'], $data['wallet_phone'], $data['document_expiry'], $data['commercial_registration'], $data['tax_number']);
        $data['settings'] = $settings;

        return $data;
    }

    private function syncScopes(User $user, array $data): void
    {
        if ($user->role === User::ROLE_SUPPORTER) {
            $user->governorates()->sync($data['governorate_ids'] ?? []);
        }
        if ($user->role === User::ROLE_PARTNER) {
            $user->partnerAreas()->sync($data['area_ids'] ?? []);
        }
    }
}
