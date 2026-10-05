<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $permissions = [
            ['key' => 'dashboard.admin', 'group' => 'Dashboards', 'label' => 'Visit administration dashboard'],
            ['key' => 'dashboard.supporter', 'group' => 'Dashboards', 'label' => 'Visit supporter dashboard'],
            ['key' => 'dashboard.partner', 'group' => 'Dashboards', 'label' => 'Visit partner dashboard'],
            ['key' => 'profile.media.manage', 'group' => 'Profile', 'label' => 'Manage profile media'],
            ['key' => 'orders.view', 'group' => 'Orders', 'label' => 'View orders'],
            ['key' => 'approvals.manage', 'group' => 'Governance', 'label' => 'Review and decide approval requests'],
            ['key' => 'extras.manage', 'group' => 'Catalog', 'label' => 'Manage order extras'],
            ['key' => 'locations.manage', 'group' => 'Locations', 'label' => 'Manage coverage areas'],
            ['key' => 'ads.manage', 'group' => 'Marketing', 'label' => 'Manage slider ads'],
            ['key' => 'shares.view', 'group' => 'Marketing', 'label' => 'View app shares'],
            ['key' => 'partners.view', 'group' => 'Partners', 'label' => 'View partners'],
            ['key' => 'users.view', 'group' => 'Users', 'label' => 'View users'],
            ['key' => 'users.manage', 'group' => 'Users', 'label' => 'Create and manage users'],
            ['key' => 'messages.view', 'group' => 'Messages', 'label' => 'View messages'],
            ['key' => 'messages.manage', 'group' => 'Messages', 'label' => 'Read and send messages'],
            ['key' => 'maids.view', 'group' => 'Maids', 'label' => 'View maids'],
            ['key' => 'services.manage', 'group' => 'Services', 'label' => 'Manage services'],
            ['key' => 'products.manage', 'group' => 'Products', 'label' => 'Manage products'],
            ['key' => 'catalog.manage', 'group' => 'Services', 'label' => 'Manage service types, categories, and packages'],
            ['key' => 'cities.manage', 'group' => 'Locations', 'label' => 'Manage cities'],
            ['key' => 'faqs.manage', 'group' => 'Support', 'label' => 'Manage frequently asked questions'],
            ['key' => 'wallets.manage', 'group' => 'Finance', 'label' => 'View and adjust customer wallets'],
            ['key' => 'design.super_admin.view', 'group' => 'Design', 'label' => 'Visit all super admin design pages'],
            ['key' => 'design.supporter.view', 'group' => 'Design', 'label' => 'Visit all supporter design pages'],
            ['key' => 'design.partner.view', 'group' => 'Design', 'label' => 'Visit all partner design pages'],
        ];

        foreach ($permissions as $permission) {
            DB::table('permissions')->updateOrInsert(['key' => $permission['key']], [...$permission, 'created_at' => now(), 'updated_at' => now()]);
        }

        DB::table('service_types')->updateOrInsert(
            ['slug' => 'home-services'],
            ['title' => 'Home Services', 'subtitle' => 'Services delivered at home', 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
        );
        $homeServicesTypeId = DB::table('service_types')->where('slug', 'home-services')->value('id');

        foreach ([
            ['title' => 'Home Cleaning', 'subtitle' => 'Routine home care services', 'slug' => 'home-cleaning'],
            ['title' => 'Deep Cleaning', 'subtitle' => 'Detailed intensive cleaning', 'slug' => 'deep-cleaning'],
            ['title' => 'Laundry', 'subtitle' => 'Washing and ironing services', 'slug' => 'laundry'],
        ] as $category) {
            DB::table('service_categories')->updateOrInsert(
                ['slug' => $category['slug']],
                [...$category, 'type_id' => $homeServicesTypeId, 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
            );
        }

        foreach ([
            ['name' => 'Cairo', 'name_ar' => 'القاهرة'],
            ['name' => 'Giza', 'name_ar' => 'الجيزة'],
            ['name' => 'Alexandria', 'name_ar' => 'الإسكندرية'],
        ] as $city) {
            DB::table('cities')->updateOrInsert(
                ['name' => $city['name']],
                [...$city, 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
            );
        }

        $this->call(LocationStructureSeeder::class);

        $cleaningCategoryId = DB::table('service_categories')->where('slug', 'home-cleaning')->value('id');
        $cairoCityId = DB::table('cities')->where('name', 'Cairo')->value('id');
        DB::table('products')->updateOrInsert(
            ['slug' => 'premium-cleaning-kit'],
            [
                'category_id' => $cleaningCategoryId,
                'city_id' => $cairoCityId,
                'title' => 'Premium Cleaning Kit',
                'description' => 'A complete home cleaning essentials kit.',
                'youtube_url' => 'https://www.youtube.com/watch?v=tarwiqa-demo',
                'base_price' => 499.00,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        );

        foreach ([
            ['question' => 'How can I book a service?', 'answer' => 'Choose a service, select your city and preferred appointment, then confirm the order.', 'audience' => 'customer', 'sort_order' => 10],
            ['question' => 'How do I manage an assigned order?', 'answer' => 'Open the partner workspace and use the order workflow to review and update its status.', 'audience' => 'partner', 'sort_order' => 20],
            ['question' => 'Which payment methods are supported?', 'answer' => 'Available payment methods are displayed during checkout and may vary by order and location.', 'audience' => 'all', 'sort_order' => 30],
        ] as $faq) {
            DB::table('faqs')->updateOrInsert(
                ['question' => $faq['question']],
                [...$faq, 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
            );
        }

        foreach ([
            User::ROLE_SUPPORTER => ['dashboard.supporter', 'profile.media.manage', 'orders.view', 'partners.view', 'users.view', 'messages.view', 'maids.view', 'design.supporter.view'],
            User::ROLE_PARTNER => ['dashboard.partner', 'profile.media.manage', 'orders.view', 'messages.view', 'maids.view', 'design.partner.view'],
        ] as $role => $keys) {
            foreach ($keys as $key) {
                DB::table('role_permissions')->updateOrInsert(
                    ['role' => $role, 'permission_id' => DB::table('permissions')->where('key', $key)->value('id')],
                    ['can_view' => true, 'created_at' => now(), 'updated_at' => now()],
                );
            }
        }

        foreach ([
            ['name' => 'Tarwiqa Admin', 'email' => 'admin@tarwiqa.test', 'role' => User::ROLE_SUPER_ADMIN],
            ['name' => 'Support Team', 'email' => 'supporter@tarwiqa.test', 'role' => User::ROLE_SUPPORTER],
            ['name' => 'Cairo Partner', 'email' => 'partner@tarwiqa.test', 'role' => User::ROLE_PARTNER],
        ] as $account) {
            User::updateOrCreate(
                ['email' => $account['email']],
                [...$account, 'uuid' => (string) Str::uuid(), 'password' => Hash::make('password')],
            );
        }

        $this->call(MaidSeeder::class);
        $this->call(ExtraSeeder::class);
        $this->call(AdSeeder::class);

        $this->call(CatalogSeeder::class);
    }
}
