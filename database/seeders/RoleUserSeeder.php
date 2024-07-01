<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\Roles;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Get all users and roles
        $users = User::all();
        $roles = Roles::all();

        // Define an array to store role_user relationships
        $roleUser = [];

        // Iterate through each user and assign random roles
        foreach ($users as $user) {
            // Generate a random number of roles (between 1 and 3)
            $numRoles = rand(1, 3);

            // Shuffle the roles and take the first $numRoles roles
            $selectedRoles = $roles->shuffle()->take($numRoles);

            // Build the role_user entries
            foreach ($selectedRoles as $role) {
                $roleUser[] = [
                    'user_id' => $user->id,
                    'role_id' => $role->id,
                ];
            }
        }

        // Insert data into the role_user pivot table
        DB::table('role_user')->insert($roleUser);
    }
}
