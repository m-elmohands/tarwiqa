<?php

namespace Database\Seeders;

use Database\Seeders\Concerns\SeedsBySlug;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PackageSeeder extends Seeder
{
    use SeedsBySlug;

    public function run(): void
    {
        $serviceIds = DB::table('services')->pluck('id', 'slug');
        $now = now();

        $packages = [
            [
                'slug' => 'move-in-move-out-package',
                'title' => 'Move In / Move Out Package',
                'description' => 'A full deep clean of an empty apartment plus carpets and curtains, ready for handover.',
                'price' => 2900,
                'discount_value' => 300,
                'discount_type' => 'fixed',
                'starts_at' => $now->copy()->startOfMonth(),
                'ends_at' => $now->copy()->addMonths(6)->endOfMonth(),
                'services' => [
                    ['slug' => 'full-apartment-deep-clean', 'quantity' => 1, 'unit_price' => 1700],
                    ['slug' => 'carpet-deep-cleaning',      'quantity' => 1, 'unit_price' => null],
                    ['slug' => 'curtain-cleaning',          'quantity' => 1, 'unit_price' => null],
                ],
            ],
            [
                'slug' => 'monthly-home-care-package',
                'title' => 'Monthly Home Care Package',
                'description' => 'Four weekly visits with a kitchen and bathroom deep clean once a month.',
                'price' => 2200,
                'discount_value' => 10,
                'discount_type' => 'percent',
                'starts_at' => $now->copy()->startOfMonth(),
                'ends_at' => null,
                'services' => [
                    ['slug' => 'weekly-home-cleaning-plan', 'quantity' => 1, 'unit_price' => null],
                    ['slug' => 'kitchen-cleaning',          'quantity' => 1, 'unit_price' => 300],
                    ['slug' => 'bathroom-cleaning',         'quantity' => 1, 'unit_price' => 250],
                ],
            ],
            [
                'slug' => 'office-starter-package',
                'title' => 'Office Starter Package',
                'description' => 'A week of daily office cleaning with one disinfection round and glass work.',
                'price' => 5200,
                'discount_value' => 400,
                'discount_type' => 'fixed',
                'starts_at' => null,
                'ends_at' => null,
                'services' => [
                    ['slug' => 'office-daily-cleaning',  'quantity' => 5, 'unit_price' => 620],
                    ['slug' => 'office-disinfection',    'quantity' => 1, 'unit_price' => null],
                    ['slug' => 'facade-glass-cleaning',  'quantity' => 1, 'unit_price' => 1700],
                ],
            ],
            [
                'slug' => 'upholstery-refresh-package',
                'title' => 'Upholstery Refresh Package',
                'description' => 'Sofas, carpets and mattresses treated in a single visit.',
                'price' => 1650,
                'discount_value' => 150,
                'discount_type' => 'fixed',
                'starts_at' => $now->copy()->subWeek(),
                'ends_at' => $now->copy()->addMonths(3),
                'services' => [
                    ['slug' => 'sofa-steam-cleaning',  'quantity' => 1, 'unit_price' => null],
                    ['slug' => 'carpet-deep-cleaning', 'quantity' => 1, 'unit_price' => null],
                    ['slug' => 'mattress-sanitizing',  'quantity' => 1, 'unit_price' => 450],
                ],
            ],
            [
                'slug' => 'bridal-beauty-package',
                'title' => 'Bridal Beauty Package',
                'description' => 'Everything for the wedding day: smoothing treatment, facial, nails and bridal makeup.',
                'price' => 5400,
                'discount_value' => 15,
                'discount_type' => 'percent',
                'starts_at' => $now->copy()->startOfMonth(),
                'ends_at' => $now->copy()->addYear(),
                'services' => [
                    ['slug' => 'bridal-makeup',        'quantity' => 1, 'unit_price' => null],
                    ['slug' => 'keratin-treatment',    'quantity' => 1, 'unit_price' => 1300],
                    ['slug' => 'hydrafacial-session',  'quantity' => 1, 'unit_price' => null],
                    ['slug' => 'gel-nail-extensions',  'quantity' => 1, 'unit_price' => null],
                ],
            ],
            [
                'slug' => 'glow-up-package',
                'title' => 'Glow Up Package',
                'description' => 'A facial, a fresh cut and a manicure and pedicure in one salon visit.',
                'price' => 1050,
                'discount_value' => 100,
                'discount_type' => 'fixed',
                'starts_at' => null,
                'ends_at' => null,
                'services' => [
                    ['slug' => 'deep-cleansing-facial',  'quantity' => 1, 'unit_price' => null],
                    ['slug' => 'haircut-and-styling',    'quantity' => 1, 'unit_price' => null],
                    ['slug' => 'manicure-and-pedicure',  'quantity' => 1, 'unit_price' => 260],
                ],
            ],
        ];

        foreach ($packages as $package) {
            $packageId = $this->upsertBySlug('packages', $package['slug'], [
                'title' => $package['title'],
                'description' => $package['description'],
                'price' => $package['price'],
                'discount_value' => $package['discount_value'],
                'discount_type' => $package['discount_type'],
                'is_active' => true,
                'starts_at' => $package['starts_at'],
                'ends_at' => $package['ends_at'],
            ]);

            foreach ($package['services'] as $line) {
                $serviceId = $serviceIds[$line['slug']] ?? null;

                if ($serviceId === null) {
                    continue;
                }

                DB::table('package_services')->updateOrInsert(
                    ['package_id' => $packageId, 'service_id' => $serviceId],
                    [
                        'quantity' => $line['quantity'],
                        'unit_price' => $line['unit_price'],
                        'created_at' => $now,
                        'updated_at' => $now,
                    ]
                );
            }
        }
    }
}
