<?php

namespace App\Jobs;

use App\Models\Document;
use App\Mail\DocumentNotification;
use App\Models\DocumentReminder as ModelsDocumentReminder;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
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
        $now = now();
        $documentIds = ModelsDocumentReminder::whereDate('date', $now)->pluck('document_id');
        $documents = Document::whereIn('id', $documentIds)->get();

        foreach ($documents as $doc) {
            Mail::to($doc->email)->queue(new DocumentNotification($doc));
            if ($doc->shares()->count() > 0) {
                foreach ($doc->shares as $share) {
                    Mail::to($share->share_to)->queue(new DocumentNotification($doc));
                }
            }
        }
    }
}
