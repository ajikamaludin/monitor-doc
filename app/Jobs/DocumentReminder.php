<?php

namespace App\Jobs;

use App\Mail\DocumentNotification;
use App\Models\Setting;
use App\Models\Mail as ModelsMail;
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
        $email = Setting::where('key', 'DESTINATION_MAIL')->first();
        $users = ModelsMail::all()->pluck('value')->toArray();

        Mail::to($email->value)
            ->cc($users)
            ->send(new DocumentNotification());
    }
}
