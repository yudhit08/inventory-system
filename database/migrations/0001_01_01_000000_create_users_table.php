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
        Schema::create('ruangans', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('nama_ruangan');
            $table->timestamps();
        });

        Schema::create('bidangs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('nama_bidang');
            $table->timestamps();
        });

        Schema::create('jabatans', function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->string('jabatan');
            $table->timestamps();
        });

        Schema::create('users', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('nip');
            $table->string('nomor_wa')->nullable();
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->uuid('ruangan_id')->nullable();
            $table->uuid('bidang_id')->nullable();
            $table->uuid('jabatan_id')->nullable();
            $table->foreign('ruangan_id')->references('id')->on('ruangans');
            $table->foreign('bidang_id')->references('id')->on('bidangs');
            $table->foreign('jabatan_id')->references('id')->on('jabatans');
            $table->timestamps();
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->uuid('user_id')->nullable();
            $table->foreign('user_id')->references('id')->on('users')->onDelete("cascade");
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
        Schema::dropIfExists('ruangans');
        Schema::dropIfExists('bidangs');
        Schema::dropIfExists('jabatans');
    }
};
