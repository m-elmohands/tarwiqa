<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('widgets') && ! Schema::hasTable('services')) {
            Schema::rename('widgets', 'services');
        }

        foreach (['package_services', 'order_services'] as $tableName) {
            if (Schema::hasTable($tableName) && Schema::hasColumn($tableName, 'widget_id')) {
                Schema::table($tableName, function (Blueprint $table): void {
                    $table->renameColumn('widget_id', 'service_id');
                });
            }
        }
    }

    public function down(): void
    {
        foreach (['package_services', 'order_services'] as $tableName) {
            if (Schema::hasTable($tableName) && Schema::hasColumn($tableName, 'service_id')) {
                Schema::table($tableName, function (Blueprint $table): void {
                    $table->renameColumn('service_id', 'widget_id');
                });
            }
        }

        if (Schema::hasTable('services') && ! Schema::hasTable('widgets')) {
            Schema::rename('services', 'widgets');
        }
    }
};
