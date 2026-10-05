<?php

namespace App\Services;

use App\Contracts\Repositories\PermissionRepositoryInterface;
use App\Contracts\Services\AccessServiceInterface;
use App\Models\User;

class AccessService implements AccessServiceInterface
{
    public function __construct(private readonly PermissionRepositoryInterface $permissions) {}

    public function allows(?User $user, string $permission): bool
    {
        if (! $user || $user->status !== 'active') {
            return false;
        }

        if ($user->isRole(User::ROLE_SUPER_ADMIN)) {
            return true;
        }

        $override = $this->permissions->userOverride($user, $permission);

        return $override ?? $this->permissions->roleAllows($user->role, $permission);
    }

    public function denies(?User $user, string $permission): bool
    {
        return ! $this->allows($user, $permission);
    }
}
