<?php

namespace App\Contracts\Repositories;

use App\Models\User;

interface PermissionRepositoryInterface
{
    public function userOverride(User $user, string $permission): ?bool;

    public function roleAllows(string $role, string $permission): bool;
}
