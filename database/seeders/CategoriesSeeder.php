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
        DB::table("categories")->insert([
            [
                'name' => 'Gedung'
            ],
            [
                'name' => 'Peralatan'
            ],
            [
                'name' => 'Toilet'
            ],
            [
                'name' => ''
            ]
        ]);
    }
}
