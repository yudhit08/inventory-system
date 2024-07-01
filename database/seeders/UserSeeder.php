<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Roles;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Create users
        // $users = User::factory()->count(10)->create();

        //Retrieve all user
        $users = User::all();

        // Retrieve all roles
        $roles = Roles::all();

        // Example: Assign a random role to each user
        foreach ($users as $user) {
            $user->roles()->attach(
                $roles->random(rand(1, 3))->pluck('id')->toArray()
            );
        }
    }
}
