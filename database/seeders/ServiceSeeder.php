<?php

namespace Database\Seeders;

use Database\Seeders\Concerns\SeedsBySlug;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ServiceSeeder extends Seeder
{
    use SeedsBySlug;

    public function run(): void
    {
        $categoryIds = DB::table('service_categories')->pluck('id', 'slug');

        $services = [
            ['category' => 'home-cleaning',       'slug' => 'standard-home-cleaning',     'title' => 'Standard Home Cleaning',      'price' => 450,  'description' => 'Three hours of general cleaning for an apartment up to 150 square metres, materials included.'],
            ['category' => 'home-cleaning',       'slug' => 'weekly-home-cleaning-plan',  'title' => 'Weekly Home Cleaning Plan',   'price' => 1600, 'description' => 'Four visits a month from the same crew, scheduled on a fixed weekday.'],
            ['category' => 'home-cleaning',       'slug' => 'kitchen-cleaning',           'title' => 'Kitchen Deep Cleaning',       'price' => 380,  'description' => 'Degreasing of cabinets, hood, oven and tiles using food-safe products.'],
            ['category' => 'home-cleaning',       'slug' => 'bathroom-cleaning',          'title' => 'Bathroom Sanitizing',         'price' => 300,  'description' => 'Descaling, grout scrubbing and disinfection for up to two bathrooms.'],

            ['category' => 'deep-cleaning',       'slug' => 'full-apartment-deep-clean',  'title' => 'Full Apartment Deep Clean',   'price' => 1800, 'description' => 'A full day with a crew of three covering every room, inside cupboards and behind appliances.'],
            ['category' => 'deep-cleaning',       'slug' => 'post-construction-cleaning', 'title' => 'Post-Construction Cleaning',  'price' => 2500, 'description' => 'Removal of dust, paint spots and adhesive residue after finishing works.'],
            ['category' => 'deep-cleaning',       'slug' => 'villa-deep-clean',           'title' => 'Villa Deep Clean',            'price' => 3500, 'description' => 'Two-day deep clean for multi-floor homes, including stairs, terraces and garage.'],

            ['category' => 'office-cleaning',     'slug' => 'office-daily-cleaning',      'title' => 'Office Daily Cleaning',       'price' => 700,  'description' => 'A daily visit covering desks, floors, pantry and restrooms after working hours.'],
            ['category' => 'office-cleaning',     'slug' => 'office-disinfection',        'title' => 'Office Disinfection',         'price' => 1100, 'description' => 'Fogging and touch-point disinfection with a certificate of service.'],
            ['category' => 'office-cleaning',     'slug' => 'facade-glass-cleaning',      'title' => 'Facade & Glass Cleaning',     'price' => 1900, 'description' => 'Exterior glass cleaning for up to four floors using rope-access technicians.'],

            ['category' => 'upholstery-cleaning', 'slug' => 'sofa-steam-cleaning',        'title' => 'Sofa Steam Cleaning',         'price' => 700,  'description' => 'Hot-water extraction for up to eight seats, with stain treatment and deodorizing.'],
            ['category' => 'upholstery-cleaning', 'slug' => 'carpet-deep-cleaning',       'title' => 'Carpet Deep Cleaning',        'price' => 650,  'description' => 'On-site shampoo and extraction for up to 30 square metres of carpet.'],
            ['category' => 'upholstery-cleaning', 'slug' => 'curtain-cleaning',           'title' => 'Curtain Cleaning',            'price' => 600,  'description' => 'Take-down, off-site washing and re-hanging for up to six panels.'],
            ['category' => 'upholstery-cleaning', 'slug' => 'mattress-sanitizing',        'title' => 'Mattress Sanitizing',         'price' => 500,  'description' => 'UV and steam treatment for two mattresses, targeting dust mites and odours.'],

            ['category' => 'hair-care',           'slug' => 'haircut-and-styling',        'title' => 'Haircut & Styling',           'price' => 250,  'description' => 'Consultation, cut, wash and blow-dry with a senior stylist.'],
            ['category' => 'hair-care',           'slug' => 'hair-coloring',              'title' => 'Hair Colouring',              'price' => 900,  'description' => 'Full colour or root touch-up with ammonia-free dye and a bonding treatment.'],
            ['category' => 'hair-care',           'slug' => 'keratin-treatment',          'title' => 'Keratin Treatment',           'price' => 1500, 'description' => 'Smoothing treatment for medium length hair, results lasting around three months.'],

            ['category' => 'skin-care',           'slug' => 'deep-cleansing-facial',      'title' => 'Deep Cleansing Facial',       'price' => 600,  'description' => 'Steam, extraction and a clay mask for congested or oily skin.'],
            ['category' => 'skin-care',           'slug' => 'hydrafacial-session',        'title' => 'HydraFacial Session',         'price' => 1200, 'description' => 'Multi-step exfoliation and serum infusion with no downtime.'],

            ['category' => 'nail-care',           'slug' => 'manicure-and-pedicure',      'title' => 'Manicure & Pedicure',         'price' => 300,  'description' => 'Classic shaping, cuticle care and regular polish for hands and feet.'],
            ['category' => 'nail-care',           'slug' => 'gel-nail-extensions',        'title' => 'Gel Nail Extensions',         'price' => 700,  'description' => 'Full set of gel extensions with shaping and a colour or French finish.'],

            ['category' => 'makeup-services',     'slug' => 'evening-makeup',             'title' => 'Evening Makeup',              'price' => 800,  'description' => 'A full face for an occasion, including lashes and long-wear setting.'],
            ['category' => 'makeup-services',     'slug' => 'bridal-makeup',              'title' => 'Bridal Makeup',               'price' => 2500, 'description' => 'Trial session plus wedding-day makeup and hair styling at your location.'],
        ];

        foreach ($services as $service) {
            $this->upsertBySlug('services', $service['slug'], [
                'category_id' => $categoryIds[$service['category']] ?? null,
                'city_id'     => $this->randomCityId(),
                'title'       => $service['title'],
                'description' => $service['description'],
                'base_price'  => $service['price'],
                'is_active'   => true,
            ]);
        }
    }
}