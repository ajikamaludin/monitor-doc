<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function redirect(Notification $notification)
    {
        // todo: here you will receive notification id -> redirect to page with related page with status read
        $notification->update(['status' => Notification::STATUS_READ]);

        if ($notification->model_related == Document::class) {
            return redirect()->route('docs.show', $notification->model_id);
        }
        return redirect()->route('dashboard');
    }
}
