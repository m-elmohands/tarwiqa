<?php

namespace App\Services;

use App\Contracts\Services\SocialIdentityProviderInterface;
use Firebase\JWT\JWK;
use Firebase\JWT\JWT;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Validation\ValidationException;
use Throwable;

class SocialIdentityProvider implements SocialIdentityProviderInterface
{
    public function verify(string $provider, string $token): array
    {
        try {
            return match ($provider) {
                'google' => $this->verifyGoogle($token),
                'facebook' => $this->verifyFacebook($token),
                'apple' => $this->verifyApple($token),
            };
        } catch (ValidationException $exception) {
            throw $exception;
        } catch (Throwable) {
            throw $this->invalidToken();
        }
    }

    private function verifyGoogle(string $token): array
    {
        $payload = Http::acceptJson()->timeout(8)->retry(2, 200)
            ->get('https://oauth2.googleapis.com/tokeninfo', ['id_token' => $token])
            ->throw()->json();

        if (($payload['aud'] ?? null) !== config('services.google.client_id') || ! filter_var($payload['email_verified'] ?? false, FILTER_VALIDATE_BOOL)) {
            throw $this->invalidToken();
        }

        return $this->identity($payload['sub'] ?? null, $payload['email'] ?? null, $payload['name'] ?? null);
    }

    private function verifyFacebook(string $token): array
    {
        $appId = config('services.facebook.client_id');
        $appSecret = config('services.facebook.client_secret');
        $debug = Http::acceptJson()->timeout(8)->retry(2, 200)
            ->get('https://graph.facebook.com/debug_token', ['input_token' => $token, 'access_token' => "{$appId}|{$appSecret}"])
            ->throw()->json('data');

        if (! ($debug['is_valid'] ?? false) || ($debug['app_id'] ?? null) !== $appId) {
            throw $this->invalidToken();
        }

        $payload = Http::acceptJson()->timeout(8)->retry(2, 200)
            ->get('https://graph.facebook.com/me', ['fields' => 'id,name,email', 'access_token' => $token])
            ->throw()->json();

        return $this->identity($payload['id'] ?? null, $payload['email'] ?? null, $payload['name'] ?? null);
    }

    private function verifyApple(string $token): array
    {
        $keys = Cache::remember('auth:social:apple-jwks', now()->addHours(6), fn (): array => Http::acceptJson()
            ->timeout(8)->retry(2, 200)->get('https://appleid.apple.com/auth/keys')->throw()->json());
        $payload = (array) JWT::decode($token, JWK::parseKeySet($keys));
        $audience = $payload['aud'] ?? null;

        if (($payload['iss'] ?? null) !== 'https://appleid.apple.com' || ! in_array(config('services.apple.client_id'), (array) $audience, true)) {
            throw $this->invalidToken();
        }

        return $this->identity($payload['sub'] ?? null, $payload['email'] ?? null, null);
    }

    private function identity(mixed $id, mixed $email, mixed $name): array
    {
        if (! is_string($id) || $id === '') {
            throw $this->invalidToken();
        }

        return [
            'id' => $id,
            'email' => is_string($email) && filter_var($email, FILTER_VALIDATE_EMAIL) ? strtolower($email) : null,
            'name' => is_string($name) && trim($name) !== '' ? trim($name) : null,
        ];
    }

    private function invalidToken(): ValidationException
    {
        return ValidationException::withMessages(['token' => ['The social provider token is invalid or expired.']]);
    }
}
