<?php

namespace Database\Seeders;

use App\Models\User;
use DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
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

        $user->assignRole('siswa');
    }
}
