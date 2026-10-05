<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Schema;
use Tests\TestCase;

class DatabaseSchemaTest extends TestCase
{
    use RefreshDatabase;

    public function test_dashboard_domain_tables_are_available(): void
    {
        $tables = [
            'users', 'permissions', 'role_permissions', 'user_permissions',
            'cities', 'addresses', 'service_types', 'service_categories', 'services', 'products', 'packages', 'package_services',
            'orders', 'order_services', 'order_status_history',
            'order_issues', 'order_reviews', 'wallets', 'wallet_transactions', 'payments', 'refunds',
            'conversations', 'conversation_participants', 'messages', 'message_attachments',
            'notifications', 'inquiry_logs', 'approval_requests', 'audit_logs',
            'governorates', 'areas', 'user_governorates', 'partner_areas',
            'extras', 'order_extras', 'maid_documents', 'maid_availability',
            'app_shares', 'ad_events',
        ];

        foreach ($tables as $table) {
            $this->assertTrue(Schema::hasTable($table), "Missing table: {$table}");
        }
    }

    public function test_orders_contain_dashboard_filter_and_financial_fields(): void
    {
        $this->assertTrue(Schema::hasColumns('orders', [
            'customer_id', 'status', 'service_date',
            'payment_status', 'subtotal', 'discount_total', 'wallet_amount',
            'deposit_amount', 'total', 'additional_phone',
        ]));
    }

    public function test_operational_domain_tables_and_columns_are_available(): void
    {
        foreach (['governorates', 'areas', 'user_governorates', 'partner_areas', 'ads', 'maids', 'maid_documents', 'maid_availability', 'order_maids', 'extras', 'order_extras', 'app_shares', 'ad_events'] as $table) {
            $this->assertTrue(Schema::hasTable($table), "Missing table: {$table}");
        }

        $this->assertTrue(Schema::hasColumn('addresses', 'city_id'));
        $this->assertTrue(Schema::hasColumn('addresses', 'area_id'));
        $this->assertFalse(Schema::hasColumn('addresses', 'latitude'));
        $this->assertFalse(Schema::hasColumn('addresses', 'longitude'));
    }

    public function test_users_use_the_current_profile_columns(): void
    {
        $this->assertTrue(Schema::hasColumn('users', 'city_id'));
        $this->assertFalse(Schema::hasColumn('users', 'reference'));
        $this->assertTrue(Schema::hasColumn('users', 'gender'));
        $this->assertTrue(Schema::hasColumn('users', 'dob'));
        $this->assertTrue(Schema::hasColumn('users', 'platform'));
    }

    public function test_catalog_columns_match_the_documented_structure(): void
    {
        foreach (['service_types', 'service_categories'] as $table) {
            $this->assertTrue(Schema::hasColumns($table, ['title', 'subtitle']));
        }

        $this->assertTrue(Schema::hasColumns('service_categories', ['type_id', 'title', 'subtitle', 'slug', 'is_active']));
        $this->assertTrue(Schema::hasColumns('services', ['category_id', 'city_id', 'title', 'slug', 'description', 'base_price', 'is_active']));
        $this->assertTrue(Schema::hasColumns('products', ['category_id', 'city_id', 'title', 'slug', 'description', 'youtube_url', 'base_price', 'is_active']));
        $this->assertTrue(Schema::hasColumn('order_services', 'product_id'));
        $this->assertFalse(Schema::hasColumn('services', 'subtitle'));
        $this->assertFalse(Schema::hasColumn('services', 'reference'));
        $this->assertFalse(Schema::hasColumn('services', 'duration_minutes'));
    }

    public function test_services_can_be_scoped_to_a_city(): void
    {
        $this->assertTrue(Schema::hasColumn('services', 'city_id'));
    }
}
