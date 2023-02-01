<?php

namespace App\Http\Controllers;

use App\Mail\DocumentNotification;
use App\Models\Mail as ModelsMail;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class SettingController extends Controller
{
    public function index() 
    {
        return inertia('Setting/Index', [
            'settings' => Setting::all(),
            'ccs' => ModelsMail::all(),
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
            $users = ModelsMail::all()->pluck('value')->toArray();
            Mail::to($request->email)
                ->cc($users)
                ->send(new DocumentNotification());
        }
    }

    public function store(Request $request) 
    {
        $request->validate([
            'email' => 'required|email'
        ]);

        ModelsMail::create(['value' => $request->email]);
    }

    public function destroy(ModelsMail $mail)
    {
        $mail->delete();
    }
}
