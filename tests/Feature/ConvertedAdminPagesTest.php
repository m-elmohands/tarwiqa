<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class ConvertedAdminPagesTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_open_converted_cancelled_orders_and_packages_pages(): void
    {
        $this->seed();
        $admin = User::query()->where('email', 'admin@tarwiqa.test')->firstOrFail();
        $customer = User::factory()->create();
        DB::table('orders')->insert([
            'customer_id' => $customer->id, 'status' => 'cancelled', 'service_date' => today(),
            'payment_status' => 'unpaid', 'total' => 350, 'cancellation_reason' => 'Customer request',
            'cancelled_at' => now(), 'created_at' => now(), 'updated_at' => now(),
        ]);

        $this->actingAs($admin)->get(route('admin.orders.cancelled'))->assertOk()->assertSee('Cancellation queue');
        $this->getJson(route('admin.orders.cancelled.data', [
            'draw' => 1, 'start' => 0, 'length' => 10, 'search' => ['value' => 'Customer request'],
        ]))->assertOk()->assertJsonPath('recordsFiltered', 1);
        $this->get(route('admin.custom-packages.index'))->assertOk()->assertSee('Available Packages');
    }

    public function test_admin_can_send_a_native_message(): void
    {
        $this->seed();
        $admin = User::query()->where('email', 'admin@tarwiqa.test')->firstOrFail();
        $recipient = User::factory()->create(['role' => User::ROLE_PARTNER, 'status' => 'active']);

        $this->actingAs($admin)->get(route('admin.messages.index'))->assertOk()->assertSee('Your inbox is empty');
        $this->get(route('admin.messages.create'))->assertOk()->assertSee($recipient->name);
        $this->post(route('admin.messages.store'), [
            'recipient_id' => $recipient->id, 'channel' => 'in_app',
            'subject' => 'Order update', 'body' => 'Your booking has been updated.',
        ])->assertRedirect(route('admin.messages.index'));

        $this->assertDatabaseHas('conversations', ['subject' => 'Order update', 'created_by' => $admin->id]);
        $this->assertDatabaseHas('messages', ['sender_id' => $admin->id, 'body' => 'Your booking has been updated.']);
        $this->assertDatabaseCount('conversation_participants', 2);
    }
}
