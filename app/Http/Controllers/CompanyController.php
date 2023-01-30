<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Region;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return inertia('Company/Index', [
            'companies' => Company::with(['region'])->paginate(),
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
            'name' => 'required|string|max:255',
            'short' => 'required|string|max:255',
            'region_id' => 'required|exists:regions,id'
        ]);

        Company::create([
            'region_id' => $request->region_id,
            'name' => $request->name,
            'short' => $request->short
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Company  $company
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Company $company)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'short' => 'required|string|max:255',
            'region_id' => 'required|exists:regions,id'
        ]);

        $company->update([
            'region_id' => $request->region_id,
            'name' => $request->name,
            'short' => $request->short
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Company  $company
     * @return \Illuminate\Http\Response
     */
    public function destroy(Company $company)
    {
        $company->users()->delete();
        $company->delete();
    }
}
