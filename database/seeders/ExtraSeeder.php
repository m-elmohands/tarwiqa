<?php

namespace Database\Seeders;

use App\Models\Extra;
use Illuminate\Database\Seeder;

class ExtraSeeder extends Seeder
{
    public function run(): void
    {
        foreach ([
            ['slug' => 'late-arrival', 'title' => 'Late Arrival', 'reason' => 'Arrival timing clarification before confirmation', 'short_note' => 'Late arrival', 'description' => 'Internal note for orders that require an arrival timing clarification.', 'base_price' => 0, 'sort_order' => 10],
            ['slug' => 'deep-cleaning-kit', 'title' => 'Deep Cleaning Kit', 'reason' => 'Additional cleaning supplies requested', 'short_note' => 'Extra supplies', 'description' => 'Additional supplies required for detailed cleaning work.', 'base_price' => 150, 'sort_order' => 20],
            ['slug' => 'window-cleaning', 'title' => 'Window Cleaning', 'reason' => 'Customer requested additional window coverage', 'short_note' => 'Windows added', 'description' => 'Additional window cleaning scope attached to the order.', 'base_price' => 120, 'sort_order' => 30],
            ['slug' => 'ironing', 'title' => 'Ironing', 'reason' => 'Laundry service expanded during confirmation', 'short_note' => 'Ironing added', 'description' => 'Ironing add-on for garments included in the service request.', 'base_price' => 100, 'sort_order' => 40],
            ['slug' => 'kitchen-sanitizing', 'title' => 'Kitchen Sanitizing', 'reason' => 'Kitchen sanitation requested by customer', 'short_note' => 'Kitchen added', 'description' => 'Focused kitchen sanitizing and surface treatment.', 'base_price' => 180, 'sort_order' => 50],
            ['slug' => 'carpet-refresh', 'title' => 'Carpet Refresh', 'reason' => 'Additional carpet treatment requested', 'short_note' => 'Carpet refresh', 'description' => 'Additional carpet refresh treatment for the booking.', 'base_price' => 220, 'sort_order' => 60],
            ['slug' => 'fridge-cleaning', 'title' => 'Fridge Cleaning', 'reason' => 'Appliance cleaning added to the order', 'short_note' => 'Fridge added', 'description' => 'Interior and exterior refrigerator cleaning.', 'base_price' => 140, 'sort_order' => 70],
        ] as $extra) {
            Extra::withTrashed()->updateOrCreate(
                ['slug' => $extra['slug']],
                [...$extra, 'is_active' => true, 'deleted_at' => null],
            );
        }
    }
}
