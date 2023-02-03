<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Company;
use App\Models\Category;
use App\Models\Document;

class GeneralController extends Controller
{
    public function index(Request $request)
    {
        $companies = [];
        if($request->user()->region_id != null) {
            $companies = Company::where('region_id', $request->user()->region_id)->pluck('id')->toArray();
        }

        $count = 0;
        $categories = Category::all();
        foreach($categories as $category) {
            if(count($companies) > 0) {
                $documents = $category->documents()->whereIn('company_id', $companies)->get();
            } else {
                $documents = $category->documents;
            }
            foreach($documents as $docs) {
                if ($docs->is_close_due != 0) {
                    $count += 1;
                }
            }
        }

        if(count($companies) > 0) {
            $update = Document::whereDate('due_date', '<=', now()->toDateString())->whereIn('company_id', $companies)->count();
        } else {
            $update = Document::whereDate('due_date', '<=', now()->toDateString())->count();
        }

        return inertia('Dashboard', [
            'count_active' => $count,
            'count_update' => $update
        ]);
    }
}
