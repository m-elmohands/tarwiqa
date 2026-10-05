<?php

namespace App\Contracts\Services;

use App\Models\User;

interface AuthServiceInterface
{
    public function attempt(array $credentials, bool $remember = false): ?User;

    public function logout(): void;
}
