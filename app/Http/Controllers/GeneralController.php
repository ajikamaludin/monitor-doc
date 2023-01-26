<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\DocumentReminder;
use Illuminate\Http\Request;

class GeneralController extends Controller
{
    public function index()
    {
        return inertia('Dashboard', [
            'count_active' => 0,
            'count_update' => 0,
            'count_expired' => 0,
            'count_total' => 0,
            'events' => DocumentReminder::with('document.type')->get(),
        ]);
    }
}
