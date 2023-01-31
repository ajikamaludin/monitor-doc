<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Category;
use App\Models\Company;
use App\Models\Department;
use App\Models\Group;
use App\Models\Permission;
use App\Models\Region;
use App\Models\Role;
use App\Models\RolePermission;
use App\Models\Setting;
use App\Models\Type;
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
            ['name' => 'import-document', 'label' => 'Import Dokumen'],
            ['name' => 'export-document', 'label' => 'Export Dokumen'],
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
            ['name' => 'view-group', 'label' => 'Lihat Group'],
            ['name' => 'update-group', 'label' => 'Edit Group'],
            ['name' => 'create-group', 'label' => 'Buat Group'],
            ['name' => 'delete-group', 'label' => 'Hapus Group'],
            ['name' => 'view-region', 'label' => 'Lihat Region'],
            ['name' => 'update-region', 'label' => 'Edit Region'],
            ['name' => 'create-region', 'label' => 'Buat Region'],
            ['name' => 'delete-region', 'label' => 'Hapus Region'],
            ['name' => 'view-company', 'label' => 'Lihat Perusahaan'],
            ['name' => 'update-company', 'label' => 'Edit Perusahaan'],
            ['name' => 'create-company', 'label' => 'Buat Perusahaan'],
            ['name' => 'delete-company', 'label' => 'Hapus Perusahaan'],
            ['name' => 'view-setting', 'label' => 'Setting'],
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


        Type::create(['name' => 'Type 1']);
        Category::create(['name' => 'Category 1', 'short' => 'C1', 'duration' => 3]);

        Setting::create([
            'key' => 'DESTINATION_MAIL',
            'value' => 'aji19kamaludin@gmail.com'
        ]);

        // role
        $role = Role::create(['name' => 'admin']);

        $permissions = Permission::all()->map(function ($item) use($role) {
            return [
                'role_id' => $role->id,
                'permission_id' => $item->id,
            ];
        })->toArray();
        RolePermission::insert($permissions);

        // 1
        $group = Group::create(['name' => 'G1']);
        $region = Region::create([
            'group_id' => $group->id,
            'name' => 'R1'
        ]);

        Company::create([
            'region_id' => $region->id,
            'name' => 'Company 1',
            'short' => 'C1',
        ]);

        Company::create([
            'region_id' => $region->id,
            'name' => 'Company 2',
            'short' => 'C2',
        ]);

        User::create([
            'name' => 'User Administrator',
            'email' => 'user@admin.com',
            'password' => bcrypt('password'),
            'is_admin' => 0, // admin user,
            'role_id' => $role->id,
            'region_id' => $region->id
        ]);

        // 2
        $group = Group::create(['name' => 'G2']);
        $region = Region::create([
            'group_id' => $group->id,
            'name' => 'R2'
        ]);

        Company::create([
            'region_id' => $region->id,
            'name' => 'Company 3',
            'short' => 'C3',
        ]);

        Company::create([
            'region_id' => $region->id,
            'name' => 'Company 4',
            'short' => 'C4',
        ]);

        User::create([
            'name' => 'User2 Administrator',
            'email' => 'user2@admin.com',
            'password' => bcrypt('password'),
            'is_admin' => 0, // admin user,
            'role_id' => $role->id,
            'region_id' => $region->id
        ]);
    }
}
