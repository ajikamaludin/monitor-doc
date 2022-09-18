<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Department;
use App\Models\TypeDoc;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::factory()->create([
            'name' => 'Administrator',
            'email' => 'admin@admin.com',
            'password' => bcrypt('password'),
            'is_admin' => 1, // admin user
        ]);

        User::factory()->create([
            'name' => 'User',
            'email' => 'user@admin.com',
            'password' => bcrypt('password'),
            'is_admin' => 0, // normal user
        ]);

        if (Department::count() == 0) {
            $departments = ['HRD', 'Purchasing', 'Finance, Accounting & Tax', 'Sales','HSE','Produksi','QA / QC','Maintenance'];

            foreach ($departments as $dep) {
                Department::create(['name' => $dep]);
            }
        }

        if (TypeDoc::count() == 0) {
            $types = ['Perijinan', 'Perjanjian Kerjasama', 'Kontrak Kerja'];

            foreach ($types as $type) {
                TypeDoc::create(['name' => $type]);
            }
        }
    }
}
