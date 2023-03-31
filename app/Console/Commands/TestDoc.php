<?php

namespace App\Console\Commands;

use App\Mail\DocumentRegionNotification;
use App\Models\Category;
use App\Models\Document;
use App\Models\Region;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class TestDoc extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'test:doc';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
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
            ->whereHas('creator', function ($query) use ($region) {
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

        return Command::SUCCESS;
    }
}
