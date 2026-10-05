<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table): void {
            $table->foreignId('governorate_id')->nullable()->after('city_id')->constrained()->nullOnDelete();
        });
        Schema::table('addresses', function (Blueprint $table): void {
            $table->foreignId('governorate_id')->nullable()->after('city_id')->constrained()->nullOnDelete();
        });
        Schema::table('services', function (Blueprint $table): void {
            $table->foreignId('governorate_id')->nullable()->after('city_id')->constrained()->nullOnDelete();
        });
        Schema::table('products', function (Blueprint $table): void {
            $table->foreignId('governorate_id')->nullable()->after('city_id')->constrained()->nullOnDelete();
        });
    }

    public function down(): void
    {
        foreach (['products', 'services', 'addresses', 'users'] as $tableName) {
            Schema::table($tableName, function (Blueprint $table): void {
                $table->dropConstrainedForeignId('governorate_id');
            });
        }
    }
};
