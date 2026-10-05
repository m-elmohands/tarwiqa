<?php

namespace Tests\Feature;

use App\Contracts\Services\SocialIdentityProviderInterface;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Mockery\MockInterface;
use Tests\TestCase;

class SocialLoginApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_google_apple_and_facebook_accounts_can_login_and_receive_jwt_tokens(): void
    {
        $this->mock(SocialIdentityProviderInterface::class, function (MockInterface $mock): void {
            $mock->shouldReceive('verify')->times(3)->andReturnUsing(fn (string $provider): array => [
                'id' => "{$provider}-user",
                'email' => "{$provider}@example.test",
                'name' => ucfirst($provider).' User',
            ]);
        });

        foreach (['google', 'apple', 'facebook'] as $provider) {
            $response = $this->postJson('/api/v1/auth/social-login', [
                'provider' => $provider,
                'token' => "valid-{$provider}-token",
            ])->assertOk()->assertJsonStructure([
                'success', 'message', 'data' => ['user' => ['id', 'name', 'email'], 'token', 'token_type', 'expires_in'], 'status_code',
            ]);

            $this->assertSame("{$provider}@example.test", $response->json('data.user.email'));
            $this->assertDatabaseHas('social_accounts', ['provider' => $provider, 'provider_user_id' => "{$provider}-user"]);
        }
    }

    public function test_social_login_reuses_an_existing_verified_email_account(): void
    {
        $user = User::factory()->create(['email' => 'linked@example.test', 'status' => 'active']);
        $this->mockProvider('google', 'google-linked', $user->email, $user->name);

        $this->postJson('/api/v1/auth/social-login', ['provider' => 'google', 'token' => 'valid-token'])
            ->assertOk()->assertJsonPath('data.user.id', $user->id);

        $this->assertDatabaseCount('users', 1);
        $this->assertDatabaseHas('social_accounts', ['user_id' => $user->id, 'provider' => 'google']);
    }

    public function test_social_login_request_is_validated(): void
    {
        $this->postJson('/api/v1/auth/social-login', ['provider' => 'github'])
            ->assertUnprocessable()
            ->assertJsonStructure(['errors' => ['provider', 'token']]);
    }

    private function mockProvider(string $provider, string $id, string $email, string $name): void
    {
        $this->mock(SocialIdentityProviderInterface::class, function (MockInterface $mock) use ($provider, $id, $email, $name): void {
            $mock->shouldReceive('verify')->once()->with($provider, \Mockery::type('string'))
                ->andReturn(compact('id', 'email', 'name'));
        });
    }
}
