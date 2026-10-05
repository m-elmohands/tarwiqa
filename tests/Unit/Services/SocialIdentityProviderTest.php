<?php

namespace Tests\Unit\Services;

use App\Services\SocialIdentityProvider;
use Firebase\JWT\JWT;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class SocialIdentityProviderTest extends TestCase
{
    public function test_google_identity_token_is_verified(): void
    {
        config(['services.google.client_id' => 'google-client']);
        Http::fake(['oauth2.googleapis.com/*' => Http::response([
            'sub' => 'google-user', 'aud' => 'google-client', 'email' => 'USER@example.test',
            'email_verified' => true, 'name' => 'Google User',
        ])]);

        $identity = app(SocialIdentityProvider::class)->verify('google', 'identity-token');

        $this->assertSame(['id' => 'google-user', 'email' => 'user@example.test', 'name' => 'Google User'], $identity);
    }

    public function test_facebook_access_token_and_application_are_verified(): void
    {
        config(['services.facebook.client_id' => 'facebook-app', 'services.facebook.client_secret' => 'secret']);
        Http::fake([
            'graph.facebook.com/debug_token*' => Http::response(['data' => ['is_valid' => true, 'app_id' => 'facebook-app']]),
            'graph.facebook.com/me*' => Http::response(['id' => 'facebook-user', 'email' => 'fb@example.test', 'name' => 'Facebook User']),
        ]);

        $identity = app(SocialIdentityProvider::class)->verify('facebook', 'access-token');

        $this->assertSame('facebook-user', $identity['id']);
    }

    public function test_apple_identity_token_signature_issuer_and_audience_are_verified(): void
    {
        Cache::forget('auth:social:apple-jwks');
        config(['services.apple.client_id' => 'apple-client']);
        $privateKey = openssl_pkey_new(['private_key_bits' => 2048, 'private_key_type' => OPENSSL_KEYTYPE_RSA]);
        openssl_pkey_export($privateKey, $privatePem);
        $details = openssl_pkey_get_details($privateKey);
        $jwk = [
            'kty' => 'RSA', 'kid' => 'test-key', 'use' => 'sig', 'alg' => 'RS256',
            'n' => JWT::urlsafeB64Encode($details['rsa']['n']),
            'e' => JWT::urlsafeB64Encode($details['rsa']['e']),
        ];
        Http::fake(['appleid.apple.com/auth/keys' => Http::response(['keys' => [$jwk]])]);
        $token = JWT::encode([
            'iss' => 'https://appleid.apple.com', 'aud' => 'apple-client', 'sub' => 'apple-user',
            'email' => 'apple@example.test', 'iat' => time(), 'exp' => time() + 300,
        ], $privatePem, 'RS256', 'test-key');

        $identity = app(SocialIdentityProvider::class)->verify('apple', $token);

        $this->assertSame('apple-user', $identity['id']);
    }
}
