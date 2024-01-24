<?php

namespace App\Http\Controllers;

use App\Mail\DocumentNotification;
use App\Mail\DocumentRegionNotification;
use App\Models\Category;
use App\Models\Document;
use App\Models\Mail as ModelsMail;
use App\Models\Region;
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
            'email' => 'nullable|email',
        ]);

        Setting::where('key', 'DESTINATION_MAIL')->update([
            'value' => $request->email ?? '',
        ]);

        if ($request->has('test') && $request->email != null) {
            $users = ModelsMail::all()->pluck('value')->toArray();
            Mail::to($request->email)
                ->cc($users)
                ->send(new DocumentNotification());
            $docs = [];
            $categories = Category::all();
            foreach($categories as $category) {
                foreach($category->documents()->with(['variety'])->get() as $doc) {
                    if ($doc->is_close_due != 0) {
                        $docs[$doc->company->region->id][] = $doc;
                    }
                }
            }
    
            $regions = Region::all();
            foreach($regions as $region) {
                $rdocs = Document::with(['variety'])
                ->whereHas('company', function ($query) use ($region) {
                    $query->where('region_id', $region->id);
                })
                ->whereDate('due_date', '<=', now()->toDateString());
    
                if ($rdocs->count() > 0) {
                    foreach($rdocs->get() as $doc) {
                        $docs[$region->id][] = $doc;
                    }
                }
            }
    
            foreach($docs as $regionId => $doc) {
                $region = Region::find($regionId);
                if ($region != null && $region->email != '') {
                    Mail::to($region->email)->send(new DocumentRegionNotification($doc));
                }
            }
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
