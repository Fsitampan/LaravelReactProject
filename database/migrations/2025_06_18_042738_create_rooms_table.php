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
    Schema::create('rooms', function (Blueprint $table) {
        $table->id();
        $table->string('name')->nullable();
        $table->string('location')->nullable();
         $table->enum('status', ['tersedia', 'tidak tersedia'])->default('tersedia');
        $table->string('featured_image_original_name')->nullable();
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rooms');
    }
};
