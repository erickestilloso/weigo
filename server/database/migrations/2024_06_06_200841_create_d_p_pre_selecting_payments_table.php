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
        Schema::create('d_p_pre_selecting_payments', function (Blueprint $table) {
            $table->id();
            $table->uuid('uid');
            $table->string('amount');
            $table->string('ccy');
            $table->string('description')->nullable();
            $table->string('email');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('d_p_pre_selecting_payments');
    }
};
