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
            'count_active' => Document::where('status', Document::ACTIVE)->count(),
            'count_update' => Document::where('status', Document::UPDATE)->count(),
            'count_expired' => Document::where('status', Document::EXPIRED)->count(),
            'count_total' => Document::count(),
            'events' => DocumentReminder::with('document')->get(),
        ]);
    }
}
