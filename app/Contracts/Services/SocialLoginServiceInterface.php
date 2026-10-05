<?php

namespace App\Contracts\Services;

use App\Models\User;

interface SocialLoginServiceInterface
{
    public function authenticate(string $provider, string $token, ?string $name = null): User;
}
