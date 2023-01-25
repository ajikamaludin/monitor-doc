<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Department;
use App\Models\Permission;
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
        // if (Department::count() == 0) {
        //     $departments = ['HRD', 'Purchasing', 'Finance, Accounting & Tax', 'Sales','HSE','Produksi','QA / QC','Maintenance'];

        //     foreach ($departments as $dep) {
        //         Department::create(['name' => $dep]);
        //     }
        // }

        // if (TypeDoc::count() == 0) {
        //     $types = ['Perijinan', 'Perjanjian Kerjasama', 'Kontrak Kerja'];

        //     foreach ($types as $type) {
        //         TypeDoc::create(['name' => $type]);
        //     }
        // }

        $permissions = [
            ['name' => 'view-document', 'label' => 'Lihat Dokumen'],
            ['name' => 'update-document', 'label' => 'Edit Dokumen'],
            ['name' => 'create-document', 'label' => 'Buat Dokumen'],
            ['name' => 'delete-document', 'label' => 'Hapus Dokumen'],
            ['name' => 'view-category', 'label' => 'Lihat Kategori'],
            ['name' => 'update-category', 'label' => 'Edit Kategori'],
            ['name' => 'create-category', 'label' => 'Buat Kategori'],
            ['name' => 'delete-category', 'label' => 'Hapus Kategori'],
            ['name' => 'view-type', 'label' => 'Lihat Jenis'],
            ['name' => 'update-type', 'label' => 'Edit Jenis'],
            ['name' => 'create-type', 'label' => 'Buat Jenis'],
            ['name' => 'delete-type', 'label' => 'Hapus Jenis'],
            ['name' => 'view-role', 'label' => 'Lihat Role'],
            ['name' => 'update-role', 'label' => 'Edit Role'],
            ['name' => 'create-role', 'label' => 'Buat Role'],
            ['name' => 'delete-role', 'label' => 'Hapus Role'],
            ['name' => 'view-user', 'label' => 'Lihat User'],
            ['name' => 'update-user', 'label' => 'Edit User'],
            ['name' => 'create-user', 'label' => 'Buat User'],
            ['name' => 'delete-user', 'label' => 'Hapus User'],
        ];

        foreach ($permissions as $permission) {
            Permission::create([
                'name' => $permission['name'],
                'label' => $permission['label']
            ]);
        }

        User::factory()->create([
            'name' => 'Administrator',
            'email' => 'admin@admin.com',
            'password' => bcrypt('password'),
            'is_admin' => 1, // admin user
        ]);
    }
}
