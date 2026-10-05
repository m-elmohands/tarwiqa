<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('services') && ! Schema::hasTable('widgets')) {
            Schema::rename('services', 'widgets');
        }
    }

    public function down(): void
    {
        if (Schema::hasTable('widgets') && ! Schema::hasTable('services')) {
            Schema::rename('widgets', 'services');
        }
    }
};
