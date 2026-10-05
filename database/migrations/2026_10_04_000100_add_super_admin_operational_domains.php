<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('governorates', function (Blueprint $table): void {
            $table->id();
            $table->string('name')->unique();
            $table->string('name_ar')->nullable();
            $table->boolean('is_active')->default(true)->index();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('areas', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('governorate_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('name_ar')->nullable();
            $table->boolean('is_active')->default(true)->index();
            $table->timestamps();
            $table->softDeletes();
            $table->unique(['governorate_id', 'name']);
        });

        Schema::create('user_governorates', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('governorate_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
            $table->unique(['user_id', 'governorate_id']);
        });

        Schema::create('partner_areas', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('area_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
            $table->unique(['user_id', 'area_id']);
        });

        Schema::table('addresses', function (Blueprint $table): void {
            $table->foreignId('area_id')->nullable()->after('location_id')->constrained()->nullOnDelete();
        });

        Schema::table('orders', function (Blueprint $table): void {
            $table->foreignId('partner_id')->nullable()->after('customer_id')->constrained('users')->nullOnDelete();
            $table->index(['partner_id', 'status']);
        });

        Schema::create('extras', function (Blueprint $table): void {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->decimal('base_price', 12, 2)->default(0);
            $table->boolean('is_active')->default(true)->index();
            $table->unsignedInteger('sort_order')->default(0)->index();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('order_extras', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('order_id')->constrained()->cascadeOnDelete();
            $table->foreignId('extra_id')->nullable()->constrained()->nullOnDelete();
            $table->string('name');
            $table->unsignedInteger('quantity')->default(1);
            $table->decimal('unit_price', 12, 2);
            $table->decimal('total', 12, 2);
            $table->json('metadata')->nullable();
            $table->timestamps();
        });

        Schema::create('maid_documents', function (Blueprint $table): void {
            $table->id();
            $table->string('maid_id', 7);
            $table->foreign('maid_id')->references('id')->on('maids')->cascadeOnDelete();
            $table->string('type', 50);
            $table->string('path');
            $table->string('original_name')->nullable();
            $table->string('mime_type')->nullable();
            $table->unsignedBigInteger('size')->nullable();
            $table->string('status', 30)->default('pending')->index();
            $table->foreignId('verified_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('verified_at')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('maid_availability', function (Blueprint $table): void {
            $table->id();
            $table->string('maid_id', 7);
            $table->foreign('maid_id')->references('id')->on('maids')->cascadeOnDelete();
            $table->unsignedTinyInteger('day_of_week');
            $table->time('starts_at')->nullable();
            $table->time('ends_at')->nullable();
            $table->boolean('is_available')->default(true);
            $table->timestamps();
            $table->unique(['maid_id', 'day_of_week']);
        });

        Schema::table('order_maids', function (Blueprint $table): void {
            $table->unique(['order_id', 'maid_id']);
        });

        Schema::table('order_reviews', function (Blueprint $table): void {
            $table->string('maid_id', 7)->nullable()->change();
            $table->foreign('maid_id')->references('id')->on('maids')->nullOnDelete();
        });

        Schema::table('ads', function (Blueprint $table): void {
            $table->string('image_url')->nullable()->after('description');
            $table->timestamp('starts_at')->nullable()->after('image_url');
            $table->unsignedInteger('sort_order')->default(0)->index()->after('end_date');
            $table->unsignedBigInteger('impressions')->default(0)->after('sort_order');
            $table->unsignedBigInteger('clicks')->default(0)->after('impressions');
            $table->timestamp('archived_at')->nullable()->after('clicks');
        });

        Schema::create('ad_events', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('ad_id')->constrained()->cascadeOnDelete();
            $table->string('event_type', 20)->index();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('ip_address', 45)->nullable();
            $table->timestamps();
        });

        Schema::create('app_shares', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('platform', 30)->nullable()->index();
            $table->string('campaign')->nullable()->index();
            $table->string('referral_code')->nullable()->index();
            $table->timestamp('shared_at')->index();
            $table->unsignedInteger('conversion_count')->default(0);
            $table->json('metadata')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('app_shares');
        Schema::dropIfExists('ad_events');

        Schema::table('ads', function (Blueprint $table): void {
            $table->dropColumn(['image_url', 'starts_at', 'sort_order', 'impressions', 'clicks', 'archived_at']);
        });

        Schema::table('order_reviews', function (Blueprint $table): void {
            $table->dropForeign(['maid_id']);
            $table->unsignedBigInteger('maid_id')->nullable()->change();
        });

        Schema::table('order_maids', function (Blueprint $table): void {
            $table->dropUnique(['order_id', 'maid_id']);
        });

        Schema::dropIfExists('maid_availability');
        Schema::dropIfExists('maid_documents');
        Schema::dropIfExists('order_extras');
        Schema::dropIfExists('extras');

        Schema::table('orders', function (Blueprint $table): void {
            $table->dropIndex(['partner_id', 'status']);
            $table->dropConstrainedForeignId('partner_id');
        });

        Schema::table('addresses', function (Blueprint $table): void {
            $table->dropConstrainedForeignId('area_id');
        });

        Schema::dropIfExists('partner_areas');
        Schema::dropIfExists('user_governorates');
        Schema::dropIfExists('areas');
        Schema::dropIfExists('governorates');
    }
};
