<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        foreach (['service_types', 'service_categories', 'packages'] as $tableName) {
            if (Schema::hasTable($tableName) && ! Schema::hasColumn($tableName, 'governorate_id')) {
                Schema::table($tableName, function (Blueprint $table): void {
                    $table->foreignId('governorate_id')->nullable()->after('id')->constrained('governorates')->nullOnDelete();
                });
            }
        }
    }

    public function down(): void
    {
        foreach (['service_types', 'service_categories', 'packages'] as $tableName) {
            if (Schema::hasTable($tableName) && Schema::hasColumn($tableName, 'governorate_id')) {
                Schema::table($tableName, function (Blueprint $table): void {
                    $table->dropForeign(['governorate_id']);
                    $table->dropColumn('governorate_id');
                });
            }
        }
    }
};
