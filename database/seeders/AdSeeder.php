<?php

namespace Database\Seeders;

use App\Models\Ad;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class AdSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        foreach ([
            [
                'title' => 'Premium Home Cleaning',
                'slot_name' => 'homepage_hero',
                'destination' => '/services?category=home-cleaning',
                'description' => 'Promote the premium home cleaning experience during the main booking journey.',
                'image_url' => 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=80',
                'starts_at' => $now->copy()->subDays(2),
                'end_date' => $now->copy()->addDays(28),
                'sort_order' => 1,
                'impressions' => 18420,
                'clicks' => 1268,
                'status' => 'active',
            ],
            [
                'title' => 'New Customer Welcome Offer',
                'slot_name' => 'homepage_secondary',
                'destination' => '/packages/welcome-cleaning',
                'description' => 'A welcome campaign for first-time customers exploring service packages.',
                'image_url' => 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=1600&q=80',
                'starts_at' => $now->copy()->addDays(3),
                'end_date' => $now->copy()->addDays(35),
                'sort_order' => 2,
                'impressions' => 0,
                'clicks' => 0,
                'status' => 'active',
            ],
            [
                'title' => 'Summer Maintenance Reminder',
                'slot_name' => 'booking_banner',
                'destination' => '/services?category=maintenance',
                'description' => 'Seasonal maintenance reminder shown during the booking flow.',
                'image_url' => 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=80',
                'starts_at' => $now->copy()->subDays(30),
                'end_date' => $now->copy()->subDays(3),
                'sort_order' => 3,
                'impressions' => 9430,
                'clicks' => 412,
                'status' => 'pause',
            ],
        ] as $ad) {
            Ad::query()->updateOrCreate(
                ['title' => $ad['title'], 'slot_name' => $ad['slot_name']],
                $ad,
            );
        }
    }
}
