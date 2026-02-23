<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        Permission::create(['name' => 'create report', 'guard_name' => 'web']);
        Permission::create(['name' => 'delete report', 'guard_name' => 'web']);
        Permission::create(['name' => 'reply report', 'guard_name' => 'web']);
        Permission::create(['name' => 'edit report', 'guard_name' => 'web']);
    }
}
