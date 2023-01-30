<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\Region;
use Illuminate\Http\Request;

class RegionController extends Controller
{
     /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return inertia('Region/Index', [
            'regions' => Region::with(['group'])->paginate(),
            'groups' => Group::all(),
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
            'name' => 'required|string|max:255',
            'group_id' => 'required|exists:groups,id'
        ]);

        Region::create([
            'group_id' => $request->group_id,
            'name' => $request->name
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Region $region)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'group_id' => 'required|exists:groups,id'
        ]);

        $region->update([
            'group_id' => $request->group_id,
            'name' => $request->name
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Region $region)
    {
        $region->companies()->each(function($company) {
            $company->users()->delete();
        });
        $region->companies()->delete();

        $region->delete();
    }
}
