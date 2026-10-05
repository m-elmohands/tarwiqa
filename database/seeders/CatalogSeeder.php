<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class CatalogSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            ServiceTypeSeeder::class,
            ServiceCategorySeeder::class,
            ServiceSeeder::class,
            ProductSeeder::class,
            PackageSeeder::class,
        ]);
    }
}