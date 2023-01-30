<?php

namespace App\Http\Controllers;

use App\Models\Permission;
use App\Models\Role;
use App\Models\RolePermission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return inertia('Role/Index', [
            'roles' => Role::with('permissions')->paginate(),
            'permissions' => Permission::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'permissions' => 'required|array',
            'permissions.*.id' => 'required|exists:permissions,id'
        ]);

        $role = Role::create([
            'name' => $request->name
        ]);

        $permissions = collect($request->permissions)->map(function($item) use($role) {
            return [
                'role_id' => $role->id,
                'permission_id' => $item['id'],
            ];
        })->toArray();

        RolePermission::insert($permissions);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Role $role)
    {
        $request->validate([
            'name' => 'required',
            'permissions' => 'required|array',
            'permissions.*.id' => 'required|exists:permissions,id'
        ]);

        $role->update([
            'name' => $request->name
        ]);
        $role->rolePermissions()->delete();
        
        $permissions = collect($request->permissions)->map(function($item) use($role) {
            return [
                'role_id' => $role->id,
                'permission_id' => $item['id'],
            ];
        })->toArray();

        RolePermission::insert($permissions);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Role $role)
    {
        $role->rolePermissions()->delete();

        $role->users()->delete();

        $role->delete();
    }
}
