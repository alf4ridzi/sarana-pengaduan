<?php

namespace Database\Seeders;

use DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table("categories")->insertOrIgnore([
            [
                'name' => 'Lainnya',
                'code' => 'lainnya'
            ],
            [
                'name' => 'Gedung',
                'code' => 'gedung'
            ],
            [
                'name' => 'Peralatan',
                'code' => 'peralatan'
            ],
            [
                'name' => 'Toilet',
                'code' => 'toilet'
            ],
            [
                'name' => 'Akademik',
                'code' => 'akademik'
            ]
        ]);
    }
}
