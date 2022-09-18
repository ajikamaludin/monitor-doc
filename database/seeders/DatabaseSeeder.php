<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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
        // \App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
            'name' => 'Administrator',
            'email' => 'admin@admin.com',
            'password' => bcrypt('password'),
            'is_admin' => 1, // admin user
        ]);

        \App\Models\User::factory()->create([
            'name' => 'User',
            'email' => 'user@admin.com',
            'password' => bcrypt('password'),
            'is_admin' => 0, // normal user
        ]);
    }
}
