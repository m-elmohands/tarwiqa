<?php

namespace Tests\Feature;

use App\Contracts\Services\WalletServiceInterface;
use App\Models\City;
use App\Models\Service;
use App\Models\ServiceCategory;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Tests\TestCase;

class WalletSystemTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_deposit_withdraw_and_view_wallet_ledger(): void
    {
        $this->seed();
        $admin = User::query()->where('email', 'admin@tarwiqa.test')->firstOrFail();
        $customer = User::factory()->create(['role' => 'customer', 'status' => 'active']);
        $this->actingAs($admin)->get(route('admin.wallets.index'))->assertOk()->assertSee('Wallet Ledger');
        $this->post(route('admin.wallets.adjust'), ['user_id' => $customer->id, 'type' => 'deposit', 'amount' => 500, 'description' => 'Customer service deposit'])->assertRedirect(route('admin.wallets.index'));
        $this->post(route('admin.wallets.adjust'), ['user_id' => $customer->id, 'type' => 'withdrawal', 'amount' => 125, 'description' => 'Manual correction'])->assertRedirect(route('admin.wallets.index'));
        $this->assertDatabaseHas('wallets', ['user_id' => $customer->id, 'balance' => 375]);
        $this->assertDatabaseCount('wallet_transactions', 2);
        $this->assertDatabaseHas('wallet_transactions', ['wallet_id' => $customer->wallet->id, 'type' => 'deposit', 'amount' => 500]);
        $this->assertDatabaseHas('wallet_transactions', ['wallet_id' => $customer->wallet->id, 'type' => 'withdrawal', 'amount' => 125]);
        $this->getJson(route('admin.wallets.data', ['draw' => 1, 'start' => 0, 'length' => 10, 'search' => ['value' => $customer->name]]))->assertOk()->assertJsonPath('recordsFiltered', 2);
    }

    public function test_wallet_api_and_order_payment_are_atomic_and_cancellation_refunds(): void
    {
        $this->seed();
        $city = City::query()->firstOrFail();
        $customer = User::factory()->create(['password' => 'secret-password', 'role' => 'customer', 'status' => 'active', 'city_id' => $city->id]);
        app(WalletServiceInterface::class)->adjust($customer, 'deposit', 1000, 'Initial test balance');
        $addressId = DB::table('addresses')->insertGetId(['user_id' => $customer->id, 'city_id' => $city->id, 'street' => 'Wallet Street', 'created_at' => now(), 'updated_at' => now()]);
        $category = ServiceCategory::query()->firstOrFail();
        $service = Service::query()->create(['category_id' => $category->id, 'city_id' => $city->id, 'title' => 'Wallet Cleaning', 'slug' => 'wallet-cleaning', 'base_price' => 400, 'is_active' => true]);
        $token = $this->postJson('/api/v1/auth/login', ['email' => $customer->email, 'password' => 'secret-password'])->json('data.token');
        $this->withToken($token)->getJson('/api/v1/wallet')->assertOk()->assertJsonPath('data.balance', 1000);
        $checkout = $this->withToken($token)->postJson('/api/v1/order/checkout', ['address_id' => $addressId, 'service_date' => now()->addDay()->toDateString(), 'payment_method' => 'wallet', 'services' => [['service_id' => $service->id, 'quantity' => 1]]])->assertCreated()->assertJsonPath('data.payment_status', 'paid')->assertJsonPath('data.wallet_amount', 400);
        $orderId = $checkout->json('data.id');
        $this->withToken($token)->getJson('/api/v1/wallet')->assertJsonPath('data.balance', 600);
        $this->withToken($token)->putJson('/api/v1/order/cancel', ['order_id' => $orderId, 'reason' => 'Changed plans'])->assertOk()->assertJsonPath('data.payment_status', 'refunded');
        $this->withToken($token)->getJson('/api/v1/wallet')->assertJsonPath('data.balance', 1000);
        $this->withToken($token)->getJson('/api/v1/wallet/transactions')->assertOk()->assertJsonCount(3, 'data');
        $this->assertSame(2, $customer->wallet->transactions()->where('type', 'deposit')->count());
        $this->assertSame(1, $customer->wallet->transactions()->where('type', 'purchase')->count());
    }

    public function test_wallet_cannot_be_overdrawn(): void
    {
        $customer = User::factory()->create(['role' => 'customer', 'status' => 'active']);
        $this->expectException(ValidationException::class);
        app(WalletServiceInterface::class)->adjust($customer, 'withdrawal', 1, 'Invalid withdrawal');
    }
}
