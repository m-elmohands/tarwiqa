<?php

namespace App\Services;

use App\Contracts\Repositories\UserRepositoryInterface;
use App\Contracts\Services\AuthServiceInterface;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthService implements AuthServiceInterface
{
    public function __construct(private readonly UserRepositoryInterface $users) {}

    public function attempt(array $credentials, bool $remember = false): ?User
    {
        if (! Auth::attempt([...$credentials, 'status' => 'active'], $remember)) {
            return null;
        }

        $user = $this->users->findByEmail($credentials['email']);

        if ($user) {
            $this->users->recordLogin($user);
        }

        return $user;
    }

    public function logout(): void
    {
        Auth::logout();
    }
}
