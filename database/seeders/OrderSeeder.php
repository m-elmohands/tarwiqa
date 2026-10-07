<?php

namespace Database\Seeders;

use App\Models\Address;
use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class OrderSeeder extends Seeder
{
    /**
     * Seed one representative order for every supported order workflow status.
     */
    public function run(): void
    {
        $customer = User::updateOrCreate(
            ['email' => 'orders.customer@tarwiqa.test'],
            [
                'name' => 'Orders Demo Customer',
                'uuid' => (string) Str::uuid(),
                'role' => 'customer',
                'status' => 'active',
                'password' => Hash::make('password'),
            ],
        );

        $cityId = DB::table('cities')->where('name', 'Cairo')->value('id');
        $address = Address::firstOrCreate(
            ['user_id' => $customer->id, 'label' => 'Seeded home address'],
            [
                'city_id' => $cityId,
                'contact_name' => $customer->name,
                'contact_phone' => '+201000000000',
                'street' => 'Demo Street',
                'building' => '10',
                'floor' => '2',
                'apartment' => '4',
                'is_default' => true,
            ],
        );

        $services = DB::table('services')->orderBy('id')->get();
        $package = DB::table('packages')->orderBy('id')->first();

        if ($services->count() < 4) {
            $this->command?->warn('OrderSeeder skipped: at least four services are required. Run CatalogSeeder first.');

            return;
        }

        $statuses = [
            'under_review' => [
                'service_date' => now()->addDays(2),
                'payment_status' => 'unpaid',
                'payment_method' => 'cash',
            ],
            'waiting' => [
                'service_date' => now()->addDays(3),
                'payment_status' => 'pending',
                'payment_method' => 'card',
            ],
            'accepted' => [
                'service_date' => now()->addDay(),
                'payment_status' => 'paid',
                'payment_method' => 'wallet',
                'accepted_at' => now()->subHour(),
            ],
            'completed' => [
                'service_date' => now()->subDays(2),
                'payment_status' => 'paid',
                'payment_method' => 'card',
                'accepted_at' => now()->subDays(3),
                'started_at' => now()->subDays(2)->setTime(9, 0),
                'completed_at' => now()->subDays(2)->setTime(12, 0),
            ],
            'cancelled' => [
                'service_date' => now()->subDay(),
                'payment_status' => 'refunded',
                'payment_method' => 'card',
                'cancelled_at' => now()->subHours(12),
                'cancellation_reason' => 'Customer requested cancellation',
            ],
        ];

        $serviceIndex = 0;
        foreach ($statuses as $status => $state) {
            $service = $services->get($serviceIndex++);
            $price = (float) ($service->base_price ?? 450);
            $order = Order::updateOrCreate(
                [
                    'customer_id' => $customer->id,
                    'internal_notes' => "Seeded order: {$status}",
                ],
                [
                    'address_id' => $address->id,
                    'package_id' => $package?->id,
                    'status' => $status,
                    'service_date' => $state['service_date']->toDateString(),
                    'arrival_time' => '09:00:00',
                    'duration_minutes' => 180,
                    'payment_method' => $state['payment_method'],
                    'payment_status' => $state['payment_status'],
                    'subtotal' => $price,
                    'extras_total' => 0,
                    'discount_total' => 0,
                    'wallet_amount' => $state['payment_method'] === 'wallet' ? $price : 0,
                    'deposit_amount' => 0,
                    'tax_total' => 0,
                    'total' => $price,
                    'customer_notes' => 'Created by the order status demo seeder.',
                    'additional_phone' => '+201000000000',
                    'cancellation_reason' => $state['cancellation_reason'] ?? null,
                ],
            );

            $order->forceFill(array_intersect_key(
                $state,
                array_flip(['accepted_at', 'started_at', 'completed_at', 'cancelled_at']),
            ))->save();

            DB::table('order_services')->where('order_id', $order->id)->delete();
            DB::table('order_services')->insert([
                'order_id' => $order->id,
                'service_id' => $service->id,
                'name' => $service->title,
                'type' => 'service',
                'quantity' => 1,
                'unit_price' => $price,
                'total' => $price,
                'metadata' => json_encode(['seed_status' => $status], JSON_THROW_ON_ERROR),
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            DB::table('order_status_history')->updateOrInsert(
                ['order_id' => $order->id, 'to_status' => $status],
                [
                    'from_status' => null,
                    'note' => 'Seeded workflow example.',
                    'changed_by' => null,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
            );
        }
    }
}
