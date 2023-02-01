<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Document;

class GeneralController extends Controller
{
    public function index()
    {
        $count = 0;
        $categories = Category::all();
        foreach($categories as $category) {
            foreach($category->documents as $docs) {
                if ($docs->is_close_due != 0) {
                    $count += 1;
                }
            }
        }

        return inertia('Dashboard', [
            'count_active' => $count,
            'count_update' => Document::whereDate('due_date', '<=', now()->toDateString())->count(),
        ]);
    }
}
