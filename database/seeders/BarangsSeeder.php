<?php

namespace Database\Seeders;

use App\Models\Barang;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class BarangsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Seed Barangs
        $user1 = User::first();
        $user2 = User::skip(1)->first();

        Barang::insert([
            'id' => Str::uuid(),
            'no_bmn' => 'BMN001',
            'merk' => 'Acer',
            'tahun_pengadaan' => now(),
            'nilai_pengadaan' => 5000000,
            'status' => 'Baik',
            'user_id' => $user1->id,
            'jenis_barang_id' => DB::table('jenis_barangs')->first()->id, // adjust to match existing jenis_barang_id
            'ruangan_id' => DB::table('ruangans')->first()->id, // adjust to match existing ruangan_id
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        Barang::insert([
            'id' => Str::uuid(),
            'no_bmn' => 'BMN002',
            'merk' => 'HP',
            'tahun_pengadaan' => now(),
            'nilai_pengadaan' => 3000000,
            'status' => 'Baik',
            'user_id' => $user2->id,
            'jenis_barang_id' => DB::table('jenis_barangs')->skip(1)->first()->id, // adjust to match another jenis_barang_id
            'ruangan_id' => DB::table('ruangans')->skip(1)->first()->id, // adjust to match another ruangan_id
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
};
