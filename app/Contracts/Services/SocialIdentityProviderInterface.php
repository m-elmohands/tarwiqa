<?php

namespace App\Contracts\Services;

interface SocialIdentityProviderInterface
{
    /** @return array{id: string, email: ?string, name: ?string} */
    public function verify(string $provider, string $token): array;
}
