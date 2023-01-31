<?php

namespace App\Http\Controllers;

use App\Mail\DocumentNotification;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

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

        if ($request->has('test')) {
            Mail::to($request->email)->send(new DocumentNotification());
        }
    }
}
