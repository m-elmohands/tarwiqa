<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class OrderDataTablesTest extends TestCase
{
    use RefreshDatabase;

    public function test_order_and_review_data_endpoints_return_the_correct_workflow_records(): void
    {
        $this->seed();
        $admin = User::query()->where('email', 'admin@tarwiqa.test')->firstOrFail();
        $customer = User::factory()->create(['name' => 'Order Customer', 'role' => 'customer']);
        $acceptedId = $this->createOrder($customer->id, 'accepted', 750);
        $doneId = $this->createOrder($customer->id, 'completed', 950, now());
        DB::table('order_services')->insert([
            'order_id' => $acceptedId, 'name' => 'Home Cleaning', 'type' => 'service',
            'quantity' => 1, 'unit_price' => 750, 'total' => 750, 'created_at' => now(), 'updated_at' => now(),
        ]);
        DB::table('order_reviews')->insert([
            'order_id' => $doneId, 'customer_id' => $customer->id, 'rating' => 5,
            'comment' => 'Excellent service', 'status' => 'published', 'created_at' => now(), 'updated_at' => now(),
        ]);

        $this->actingAs($admin)->getJson($this->dataUrl('admin.orders.accepted.data'))
            ->assertOk()->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.customer_name', 'Order Customer')
            ->assertJsonPath('data.0.service_names', 'Home Cleaning');
        $this->actingAs($admin)->getJson($this->dataUrl('admin.orders.done.data'))
            ->assertOk()->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.total', '950.00');
        $this->actingAs($admin)->getJson($this->dataUrl('admin.orders.reviews.data'))
            ->assertOk()->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.rating_label', '5/5')
            ->assertJsonPath('data.0.comment', 'Excellent service');
    }

    public function test_order_data_searches_customer_relationships(): void
    {
        $this->seed();
        $admin = User::query()->where('email', 'admin@tarwiqa.test')->firstOrFail();
        $customer = User::factory()->create(['name' => 'Distinctive Customer', 'role' => 'customer']);
        $this->createOrder($customer->id, 'accepted', 500);

        $this->actingAs($admin)->getJson($this->dataUrl('admin.orders.accepted.data', 'Distinctive'))
            ->assertOk()->assertJsonCount(1, 'data');
    }

    private function createOrder(int $customerId, string $status, float $total, $completedAt = null): int
    {
        return DB::table('orders')->insertGetId([
            'customer_id' => $customerId, 'status' => $status, 'service_date' => now()->toDateString(),
            'payment_status' => 'paid', 'total' => $total, 'completed_at' => $completedAt,
            'created_at' => now(), 'updated_at' => now(),
        ]);
    }

    private function dataUrl(string $route, string $search = ''): string
    {
        return route($route, [
            'draw' => 1, 'start' => 0, 'length' => 10,
            'search' => ['value' => $search, 'regex' => 'false'],
        ]);
    }
}
