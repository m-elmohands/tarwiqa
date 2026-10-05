<?php

namespace Database\Seeders;

use Database\Seeders\Concerns\SeedsBySlug;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ServiceCategorySeeder extends Seeder
{
    use SeedsBySlug;

    public function run(): void
    {
        $typeIds = DB::table('service_types')->pluck('id', 'slug');

        $categories = [
            // Service side
            ['type' => 'cleaning-services', 'slug' => 'home-cleaning',        'title' => 'Home Cleaning',           'subtitle' => 'Regular and one-off apartment cleaning'],
            ['type' => 'cleaning-services', 'slug' => 'deep-cleaning',        'title' => 'Deep Cleaning',           'subtitle' => 'Intensive cleaning, top to bottom'],
            ['type' => 'cleaning-services', 'slug' => 'office-cleaning',      'title' => 'Office Cleaning',         'subtitle' => 'Workspaces, clinics and retail units'],
            ['type' => 'cleaning-services', 'slug' => 'upholstery-cleaning',  'title' => 'Upholstery & Fabrics',    'subtitle' => 'Sofas, carpets, curtains and mattresses'],
            ['type' => 'beauty-services',   'slug' => 'hair-care',            'title' => 'Hair Care',               'subtitle' => 'Cutting, colouring and treatments'],
            ['type' => 'beauty-services',   'slug' => 'skin-care',            'title' => 'Skin Care',               'subtitle' => 'Facials and clinic-grade sessions'],
            ['type' => 'beauty-services',   'slug' => 'nail-care',            'title' => 'Nail Care',               'subtitle' => 'Manicure, pedicure and extensions'],
            ['type' => 'beauty-services',   'slug' => 'makeup-services',      'title' => 'Makeup',                  'subtitle' => 'Evening, occasion and bridal looks'],

            // Product side
            ['type' => 'cleaning-supplies', 'slug' => 'cleaning-tools',       'title' => 'Cleaning Tools',          'subtitle' => 'Mops, brushes, vacuums and accessories'],
            ['type' => 'cleaning-supplies', 'slug' => 'surface-cleaners',     'title' => 'Surface Cleaners',        'subtitle' => 'Floor, glass and multi-surface detergents'],
            ['type' => 'cleaning-supplies', 'slug' => 'disinfectants',        'title' => 'Disinfectants',           'subtitle' => 'Sanitizers and antibacterial solutions'],
            ['type' => 'cosmetics',         'slug' => 'skincare-products',    'title' => 'Skincare Products',       'subtitle' => 'Serums, moisturizers and sun care'],
            ['type' => 'cosmetics',         'slug' => 'haircare-products',    'title' => 'Haircare Products',       'subtitle' => 'Shampoos, oils and masks'],
            ['type' => 'cosmetics',         'slug' => 'makeup-products',      'title' => 'Makeup Products',         'subtitle' => 'Face, lip and eye essentials'],
        ];

        foreach ($categories as $category) {
            $this->upsertBySlug('service_categories', $category['slug'], [
                'type_id'   => $typeIds[$category['type']] ?? null,
                'title'     => $category['title'],
                'subtitle'  => $category['subtitle'],
                'is_active' => true,
            ]);
        }
    }
}