<?php

namespace Database\Seeders;

use App\Models\Bidang;
use App\Models\Jabatan;
use App\Models\Roles;
use App\Models\Ruangan;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Seed Users
        $ruangan1 = Ruangan::first();
        $ruangan2 = Ruangan::skip(1)->first();
        $bidangA = Bidang::first();
        $bidangB = Bidang::skip(1)->first();
        $manager = Jabatan::first();
        $staff = Jabatan::skip(1)->first();

        //  dd($ruangan1);
        //  dd($ruangan1->id);

        User::create([
            'id' => Str::uuid(),
            'name' => 'John Doe',
            'nip' => '12345',
            'email' => 'john.doe@example.com',
            'password' => Hash::make('password'),
            'ruangan_id' => $ruangan1->id,
            'bidang_id' => $bidangA->id,
            'jabatan_id' => $manager->id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        User::create([
            'id' => Str::uuid(),
            'name' => 'Jane Smith',
            'nip' => '54321',
            'email' => 'jane.smith@example.com',
            'password' => Hash::make('password'),
            'ruangan_id' => $ruangan2->id,
            'bidang_id' => $bidangB->id,
            'jabatan_id' => $staff->id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
