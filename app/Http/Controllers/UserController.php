<?php

namespace App\Http\Controllers;

use App\Models\Region;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = User::with(['role', 'region.group'])->orderBy('id');

        if ($request->q != null) {
            $query->where('name', 'like', '%'.$request->q.'%');
        }

        return inertia('User/Index', [
            'users' => $query->paginate(10),
            'roles' => Role::all(),
            'regions' => Region::all(),
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
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'role_id' => 'required|exists:roles,id',
            'region_id' => 'required|exists:regions,id',
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role_id' => $request->role_id,
            'region_id' => $request->region_id
        ]);

        return redirect()->route('users.index');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email,'.$user->id,
            'password' => 'nullable|string|min:6',
        ]);

        if ($user->is_admin == 0) {
            $request->validate([
                'role_id' => 'required|exists:roles,id',
                'region_id' => 'required|exists:regions,id',
            ]);
        }

        $user->update($request->only(['name', 'email', 'role_id', 'region_id']));
        if ($request->password != null) {
            $user->update(['password' => bcrypt($request->password)]);
        }

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->delete();
    }
}
