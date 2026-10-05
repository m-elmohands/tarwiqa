<?php

namespace Database\Seeders;

use Database\Seeders\Concerns\SeedsBySlug;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    use SeedsBySlug;

    public function run(): void
    {
        $categoryIds = DB::table('service_categories')->pluck('id', 'slug');

        $products = [
            ['category' => 'cleaning-tools',    'slug' => 'spin-mop-bucket-set',      'title' => 'Spin Mop & Bucket Set',       'price' => 850,  'youtube' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'description' => 'Microfibre spin mop with a foot-pedal bucket and two replacement heads.'],
            ['category' => 'cleaning-tools',    'slug' => 'microfiber-cloth-pack',    'title' => 'Microfiber Cloth Pack (12)',  'price' => 120,  'youtube' => null,                                          'description' => 'Colour-coded lint-free cloths for glass, surfaces and bathrooms.'],
            ['category' => 'cleaning-tools',    'slug' => 'cordless-stick-vacuum',    'title' => 'Cordless Stick Vacuum',       'price' => 3200, 'youtube' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'description' => 'Forty minutes of runtime, HEPA filter and a wall-mounted charging dock.'],
            ['category' => 'cleaning-tools',    'slug' => 'window-squeegee-set',      'title' => 'Window Squeegee Set',         'price' => 180,  'youtube' => null,                                          'description' => 'Stainless squeegee, scrubber sleeve and an extendable pole.'],
            ['category' => 'cleaning-tools',    'slug' => 'grout-cleaning-brush-set', 'title' => 'Grout Cleaning Brush Set',    'price' => 95,   'youtube' => null,                                          'description' => 'Three stiff-bristle brushes shaped for corners, joints and tile lines.'],

            ['category' => 'surface-cleaners',  'slug' => 'multi-surface-cleaner-5l', 'title' => 'Multi-Surface Cleaner 5L',    'price' => 260,  'youtube' => null,                                          'description' => 'Concentrated formula safe on tiles, wood-effect floors and countertops.'],
            ['category' => 'surface-cleaners',  'slug' => 'glass-cleaner-spray',      'title' => 'Glass Cleaner Spray 750ml',   'price' => 75,   'youtube' => null,                                          'description' => 'Fast-evaporating spray that leaves no streaks on glass or mirrors.'],
            ['category' => 'surface-cleaners',  'slug' => 'floor-cleaner-concentrate','title' => 'Floor Cleaner Concentrate 2L','price' => 190,  'youtube' => null,                                          'description' => 'One cap per bucket, with a light citrus scent and no residue.'],
            ['category' => 'surface-cleaners',  'slug' => 'oven-degreaser',           'title' => 'Oven & Hood Degreaser',       'price' => 135,  'youtube' => null,                                          'description' => 'Heavy-duty foaming degreaser for baked-on grease and carbon.'],

            ['category' => 'disinfectants',     'slug' => 'alcohol-sanitizer-1l',     'title' => 'Alcohol Sanitizer 1L',        'price' => 140,  'youtube' => null,                                          'description' => 'Seventy percent ethanol solution for hands and small surfaces.'],
            ['category' => 'disinfectants',     'slug' => 'chlorine-disinfectant-4l', 'title' => 'Chlorine Disinfectant 4L',    'price' => 210,  'youtube' => null,                                          'description' => 'Dilutable disinfectant for floors, bathrooms and waste areas.'],
            ['category' => 'disinfectants',     'slug' => 'antibacterial-wipes',      'title' => 'Antibacterial Wipes (80)',    'price' => 90,   'youtube' => null,                                          'description' => 'Pre-moistened wipes for desks, handles and shared equipment.'],

            ['category' => 'skincare-products', 'slug' => 'vitamin-c-serum',          'title' => 'Vitamin C Serum 30ml',        'price' => 450,  'youtube' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'description' => 'Fifteen percent ascorbic acid with vitamin E, for brightness and even tone.'],
            ['category' => 'skincare-products', 'slug' => 'spf-50-sunscreen',         'title' => 'SPF 50 Sunscreen',            'price' => 320,  'youtube' => null,                                          'description' => 'Lightweight broad-spectrum fluid that layers under makeup without a white cast.'],
            ['category' => 'skincare-products', 'slug' => 'hyaluronic-moisturizer',   'title' => 'Hyaluronic Moisturizer',      'price' => 380,  'youtube' => null,                                          'description' => 'Gel-cream with three molecular weights of hyaluronic acid for daily hydration.'],

            ['category' => 'haircare-products', 'slug' => 'argan-hair-oil',           'title' => 'Argan Hair Oil 100ml',        'price' => 220,  'youtube' => null,                                          'description' => 'Cold-pressed oil for frizz control and shine on dry ends.'],
            ['category' => 'haircare-products', 'slug' => 'keratin-shampoo',          'title' => 'Keratin Shampoo 400ml',       'price' => 260,  'youtube' => null,                                          'description' => 'Sulfate-free cleanser made to extend the life of smoothing treatments.'],
            ['category' => 'haircare-products', 'slug' => 'repair-hair-mask',         'title' => 'Repair Hair Mask 250ml',      'price' => 290,  'youtube' => null,                                          'description' => 'Weekly protein mask for coloured or heat-damaged hair.'],

            ['category' => 'makeup-products',   'slug' => 'matte-liquid-lipstick',    'title' => 'Matte Liquid Lipstick',       'price' => 180,  'youtube' => null,                                          'description' => 'Transfer-resistant colour with a comfortable, non-drying finish.'],
            ['category' => 'makeup-products',   'slug' => 'full-coverage-foundation', 'title' => 'Full Coverage Foundation',    'price' => 420,  'youtube' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'description' => 'Long-wear foundation in twenty shades, buildable from medium to full.'],
            ['category' => 'makeup-products',   'slug' => 'waterproof-mascara',       'title' => 'Waterproof Mascara',          'price' => 240,  'youtube' => null,                                          'description' => 'Curved brush for lift and separation, holds through humidity.'],
        ];

        foreach ($products as $product) {
            $this->upsertBySlug('products', $product['slug'], [
                'category_id' => $categoryIds[$product['category']] ?? null,
                'city_id'     => $this->randomCityId(),
                'title'       => $product['title'],
                'description' => $product['description'],
                'youtube_url' => $product['youtube'],
                'base_price'  => $product['price'],
                'is_active'   => true,
            ]);
        }
    }
}