<?php

namespace Tests\Feature;

use App\Models\City;
use App\Models\Service;
use App\Models\ServiceCategory;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class ApiV1Test extends TestCase
{
    use RefreshDatabase;

    public function test_jwt_login_profile_and_cached_catalog_endpoints(): void
    {
        Cache::flush();
        $this->seed();
        $user = User::factory()->create(['password' => 'secret-password', 'role' => 'customer', 'status' => 'active']);
        $login = $this->postJson('/api/v1/auth/login', ['email' => $user->email, 'password' => 'secret-password'])
            ->assertOk()->assertJsonStructure(['success', 'message', 'data' => ['user' => ['id', 'name', 'email'], 'token', 'token_type', 'expires_in'], 'status_code']);
        $token = $login->json('data.token');
        $this->withToken($token)->getJson('/api/v1/auth/profile')->assertOk()->assertJsonPath('data.email', $user->email);
        $this->getJson('/api/v1/service-types')->assertOk()->assertJsonStructure(['data']);
        $this->assertTrue(Cache::has('api:v1:catalog:v1:types'));
    }

    public function test_customer_can_checkout_list_show_get_statistics_and_cancel_order(): void
    {
        $this->seed();
        $city = City::query()->firstOrFail();
        $user = User::factory()->create(['password' => 'secret-password', 'role' => 'customer', 'status' => 'active', 'city_id' => $city->id]);
        $addressId = DB::table('addresses')->insertGetId(['user_id' => $user->id, 'city_id' => $city->id, 'street' => 'Nile Street', 'created_at' => now(), 'updated_at' => now()]);
        $category = ServiceCategory::query()->firstOrFail();
        $service = Service::query()->create(['category_id' => $category->id, 'city_id' => $city->id, 'title' => 'API Cleaning', 'slug' => 'api-cleaning', 'base_price' => 250, 'is_active' => true]);
        $token = $this->postJson('/api/v1/auth/login', ['email' => $user->email, 'password' => 'secret-password'])->json('data.token');

        $checkout = $this->withToken($token)->postJson('/api/v1/order/checkout', [
            'address_id' => $addressId, 'service_date' => now()->addDay()->toDateString(), 'payment_method' => 'cash',
            'services' => [['service_id' => $service->id, 'quantity' => 2]],
        ])->assertCreated()->assertJsonPath('data.total', 500);
        $orderId = $checkout->json('data.id');
        $this->withToken($token)->getJson('/api/v1/orders')->assertOk()->assertJsonCount(1, 'data');
        $this->withToken($token)->getJson("/api/v1/orders/{$orderId}")->assertOk()->assertJsonPath('data.id', $orderId);
        $this->withToken($token)->getJson('/api/v1/orders/statistics')->assertOk()->assertJsonPath('data.total', 1);
        $this->withToken($token)->putJson('/api/v1/order/cancel', ['order_id' => $orderId, 'reason' => 'Plans changed'])->assertOk()->assertJsonPath('data.status', 'cancelled');
    }

    public function test_protected_api_rejects_requests_without_jwt(): void
    {
        $this->getJson('/api/v1/auth/profile')->assertUnauthorized()
            ->assertJson(['success' => false, 'message' => 'Unauthenticated.', 'status_code' => 401]);
        $this->getJson('/api/v1/orders')->assertUnauthorized()->assertJsonStructure(['success', 'message', 'data', 'errors', 'status_code']);
        $this->getJson('/api/v1/services/999999')->assertNotFound()
            ->assertJson(['success' => false, 'message' => 'Resource not found.', 'status_code' => 404]);
    }

    public function test_catalog_filters_are_validated_by_form_request(): void
    {
        $this->getJson('/api/v1/services?category_id=not-an-id')->assertUnprocessable()
            ->assertJsonPath('errors.category_id.0', 'The category id field must be an integer.');
        $this->getJson('/api/v1/products?city_id=999999')->assertUnprocessable()
            ->assertJsonStructure(['success', 'message', 'data', 'errors' => ['city_id'], 'status_code']);
    }
}
