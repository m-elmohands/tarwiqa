<?php

namespace App\Contracts\Services;

use App\Models\User;

interface AccessServiceInterface
{
    public function allows(?User $user, string $permission): bool;

    public function denies(?User $user, string $permission): bool;
}
