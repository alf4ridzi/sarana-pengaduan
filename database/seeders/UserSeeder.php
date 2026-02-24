<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\PermissionRegistrar;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        $user = User::firstOrCreate([
            "name" => "siswa 1",
            "email" => "siswa1@gmail.com",
            "password" => bcrypt("siswa1")
        ]);

        $user->assignRole('student');

        $admin = User::firstOrCreate([
            "name" => "admin 1",
            "email" => "admin@gmail.com",
            "password" => bcrypt("admin12345")
        ]);

        $admin->assignRole("admin");

        $superadmin = User::firstOrCreate([
            "name" => "super admin",
            "email" => "superadmin@gmail.com",
            "password" => bcrypt("superadmin12345")
        ]);

        $superadmin->assignRole("superadmin");
    }
}
