<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('maids', function (Blueprint $table) {
            $table->char('id', 7)->primary();
            $table->foreignId('partner_id')->constrained('users')->cascadeOnDelete();
            $table->string('name');
            $table->string('phone');
            $table->text('address')->nullable();
            $table->enum('gender', ['male', 'female']);
            $table->enum('status', ['active', 'paused', 'expired'])->default('active');
            $table->unsignedTinyInteger('off_day');
            $table->enum('doc_type', ['personal_id', 'contract', 'medical_report', 'police_clearance', 'training_certificate', 'profile_photo', 'other'])->nullable();
            $table->date('start_date');
            $table->unsignedTinyInteger('age');
            $table->text('notes')->nullable();
            $table->string('personal_id')->nullable();
            $table->decimal('salary');
            $table->timestamps();
        });

        Schema::create('order_maids', function (Blueprint $table) {
            $table->id();
            $table->string('maid_id')->nullable();
            $table->foreign('maid_id')
                ->references('id')
                ->on('maids')
                ->cascadeOnDelete();
            $table->foreignId('order_id')->constrained('orders')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_maids');
        Schema::dropIfExists('maids');
    }
};
