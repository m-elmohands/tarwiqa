<?php

namespace App\Repositories;

use App\Contracts\Repositories\PermissionRepositoryInterface;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class EloquentPermissionRepository implements PermissionRepositoryInterface
{
    public function userOverride(User $user, string $permission): ?bool
    {
        $value = DB::table('user_permissions')
            ->join('permissions', 'permissions.id', '=', 'user_permissions.permission_id')
            ->where('user_permissions.user_id', $user->id)
            ->where('permissions.key', $permission)
            ->value('user_permissions.allowed');

        return $value === null ? null : (bool) $value;
    }

    public function roleAllows(string $role, string $permission): bool
    {
        return DB::table('role_permissions')
            ->join('permissions', 'permissions.id', '=', 'role_permissions.permission_id')
            ->where('role_permissions.role', $role)
            ->where('permissions.key', $permission)
            ->where('role_permissions.can_view', true)
            ->exists();
    }
}
