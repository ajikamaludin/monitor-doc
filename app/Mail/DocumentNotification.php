<?php

namespace App\Mail;

use App\Models\Category;
use App\Models\Document;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class DocumentNotification extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct() {}

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $docs = collect();
        $categories = Category::all();
        foreach($categories as $category) {
            foreach($category->documents()->get() as $doc) {
                if ($doc->is_close_due != 0) {
                    $docs->add($doc); 
                }
            }
        }

        return $this->markdown('emails.document.notification', [
            'documents' => $docs,
            'dueDocuments' => Document::whereDate('due_date', '<', now()->toDateString())->get()
        ]);
    }
}
