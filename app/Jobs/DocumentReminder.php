<?php

namespace App\Jobs;

use App\Mail\DocumentNotification;
use App\Mail\DocumentRegionNotification;
use App\Models\Category;
use App\Models\Document;
use App\Models\Setting;
use App\Models\Mail as ModelsMail;
use App\Models\Region;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class DocumentReminder implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        Log::info('staring', ['send email']);
        $email = Setting::where('key', 'DESTINATION_MAIL')->first();
        $users = ModelsMail::all()->pluck('value')->toArray();

        if ($email?->value != '') {
            Mail::to($email->value)
                ->cc($users)
                ->send(new DocumentNotification());
        }

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
