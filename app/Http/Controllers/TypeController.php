<?php

namespace App\Http\Controllers;

use App\Models\Classification;
use App\Models\Type;
use Illuminate\Http\Request;

class TypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return inertia('Type/Index', [
            'types' => Type::with(['classification'])->paginate(),
            'classifications' => Classification::all()
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
            'classification_id' => 'required|exists:classifications,id'
        ]);

        Type::create([
            'name' => $request->name,
            'classification_id' => $request->classification_id
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Type $type)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'classification_id' => 'required|exists:classifications,id'
        ]);

        $type->update([
            'name' => $request->name,
            'classification_id' => $request->classification_id
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Type $type)
    {
        $type->delete();
    }
}
