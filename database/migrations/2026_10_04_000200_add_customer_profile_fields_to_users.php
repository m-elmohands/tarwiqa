<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table): void {
            $table->string('additional_phone', 30)->nullable()->after('phone');
            $table->string('national_id', 30)->nullable()->index()->after('additional_phone');
            $table->text('address')->nullable()->after('national_id');
            $table->text('notes')->nullable()->after('address');
            $table->string('verification_status', 30)->default('pending')->after('status');
            $table->boolean('screenshot_allowed')->default(true)->after('verification_status');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table): void {
            $table->dropColumn(['additional_phone', 'national_id', 'address', 'notes', 'verification_status', 'screenshot_allowed']);
        });
    }
};
