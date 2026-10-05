<?php

namespace Database\Seeders;

use Database\Seeders\Concerns\SeedsBySlug;
use Illuminate\Database\Seeder;

class ServiceTypeSeeder extends Seeder
{
    use SeedsBySlug;

    public function run(): void
    {
        $types = [
            ['slug' => 'cleaning-services', 'title' => 'Cleaning Services', 'subtitle' => 'Home, office and deep cleaning by trained crews'],
            ['slug' => 'beauty-services',   'title' => 'Beauty Services',   'subtitle' => 'Hair, skin, nails and makeup at the salon or at home'],
            ['slug' => 'cleaning-supplies', 'title' => 'Cleaning Supplies', 'subtitle' => 'Tools, detergents and disinfectants'],
            ['slug' => 'cosmetics',         'title' => 'Cosmetics',         'subtitle' => 'Skincare, haircare and makeup products'],
        ];

        foreach ($types as $type) {
            $this->upsertBySlug('service_types', $type['slug'], [
                'title'     => $type['title'],
                'subtitle'  => $type['subtitle'],
                'is_active' => true,
            ]);
        }
    }
}