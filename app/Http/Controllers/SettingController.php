<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function index() 
    {
        return inertia('Setting/Index', [
            'settings' => Setting::all(),
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        Setting::where('key', 'DESTINATION_MAIL')->update([
            'value' => $request->email,
        ]);
    }
}
