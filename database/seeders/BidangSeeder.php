<?php

namespace Database\Seeders;

use App\Models\Bidang;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class BidangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Seed Bidangs
        Bidang::create([
            'id' => Str::uuid(),
            'nama_bidang' => 'Bidang A',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        Bidang::create([
            'id' => Str::uuid(),
            'nama_bidang' => 'Bidang B',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
