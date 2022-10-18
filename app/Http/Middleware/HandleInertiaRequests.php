<?php

namespace App\Http\Middleware;

use App\Models\Document;
use App\Models\DocumentReminder as ModelsDocumentReminder;
use App\Models\Notification;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function version(Request $request)
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function share(Request $request)
    {
        $now = now();
        // Do Something here to check document expired -> than create notification
        $documentIds = ModelsDocumentReminder::whereDate('date', $now)->pluck('document_id');

        $documents = Document::whereIn('id', $documentIds)->whereIn('status', [Document::ACTIVE, Document::UPDATE])->get();
        foreach ($documents as $doc) {
            // only set expired when enddate is set
            if ($doc->end_date->format('d-m-Y') >= $now->format('d-m-Y')) {
                $doc->update(['status' => Document::EXPIRED]);
            }
            // create notification
            Notification::create([
                'content' => $doc->type->name.' - '.$doc->name. ' akan berakhir pada '. $doc->end_date->format('d-m-Y'),
                'date' => $now,
                'model_related' => Document::class,
                'model_id' => $doc->id,
                'status' => Notification::STATUS_UNREAD
            ]);
        }

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user(),
            ],
            'ziggy' => function () use ($request) {
                return array_merge((new Ziggy)->toArray(), [
                    'location' => $request->url(),
                ]);
            },
            'flash' => [
                'message' => fn () => $request->session()->get('message')
            ],
            'notify' => [
                'notifications' => Notification::orderBy('created_at', 'desc')->get(),
                'notification_has_unread' => Notification::where('status', Notification::STATUS_UNREAD)->count()
            ]
        ]);
    }
}
