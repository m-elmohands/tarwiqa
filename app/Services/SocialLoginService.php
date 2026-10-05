<?php

namespace App\Services;

use App\Contracts\Services\SocialIdentityProviderInterface;
use App\Contracts\Services\SocialLoginServiceInterface;
use App\Models\SocialAccount;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class SocialLoginService implements SocialLoginServiceInterface
{
    public function __construct(private readonly SocialIdentityProviderInterface $providers) {}

    public function authenticate(string $provider, string $token, ?string $name = null): User
    {
        $identity = $this->providers->verify($provider, $token);

        return DB::transaction(function () use ($provider, $identity, $name): User {
            $account = SocialAccount::query()->with('user')->where('provider', $provider)
                ->where('provider_user_id', $identity['id'])->lockForUpdate()->first();

            if ($account) {
                $this->ensureActive($account->user);

                return $account->user;
            }

            if (! $identity['email']) {
                throw ValidationException::withMessages(['email' => ['The provider did not return an email address. Sign in once with email sharing enabled.']]);
            }

            $user = User::withTrashed()->where('email', $identity['email'])->lockForUpdate()->first();
            if ($user?->trashed()) {
                throw ValidationException::withMessages(['email' => ['This account is no longer available.']]);
            }

            $user ??= User::query()->create([
                'name' => $identity['name'] ?? $name ?? Str::before($identity['email'], '@'),
                'email' => $identity['email'],
                'email_verified_at' => now(),
                'password' => Str::password(40),
                'role' => 'customer',
                'status' => 'active',
            ]);
            $this->ensureActive($user);

            if ($user->socialAccounts()->where('provider', $provider)->exists()) {
                throw ValidationException::withMessages(['provider' => ['This provider is already linked to the account.']]);
            }

            $user->socialAccounts()->create([
                'provider' => $provider,
                'provider_user_id' => $identity['id'],
                'provider_email' => $identity['email'],
            ]);

            return $user;
        });
    }

    private function ensureActive(User $user): void
    {
        if ($user->status !== 'active') {
            throw ValidationException::withMessages(['account' => ['This account is not active.']]);
        }
    }
}
