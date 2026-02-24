<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $permissions = [
            'create report',
            'delete report',
            'reply report',
            'edit report'
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate([
                'name' => $permission,
                'guard_name' => 'web'
            ]);
        }

        $superadmin = Role::where("name", "superadmin")->first();
        if ($superadmin) {
            $superadmin->givePermissionTo(['create report', 'delete report', 'reply report', 'edit report']);
        }

        $admin = Role::where("name", "admin")->first();
        if ($admin) {
            $admin->givePermissionTo(['reply report']);
        }

        $student = Role::where("name", "student")->first();
        if ($student) {
            $student->givePermissionTo(['create report']);
        }
    }
}
