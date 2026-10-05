<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('package_services') && Schema::hasColumn('package_services', 'service_id')) {
            Schema::table('package_services', function (Blueprint $table): void {
                $table->renameColumn('service_id', 'widget_id');
            });
        }

        if (Schema::hasTable('order_services') && Schema::hasColumn('order_services', 'service_id')) {
            Schema::table('order_services', function (Blueprint $table): void {
                $table->renameColumn('service_id', 'widget_id');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasTable('package_services') && Schema::hasColumn('package_services', 'widget_id')) {
            Schema::table('package_services', function (Blueprint $table): void {
                $table->renameColumn('widget_id', 'service_id');
            });
        }

        if (Schema::hasTable('order_services') && Schema::hasColumn('order_services', 'widget_id')) {
            Schema::table('order_services', function (Blueprint $table): void {
                $table->renameColumn('widget_id', 'service_id');
            });
        }
    }
};
