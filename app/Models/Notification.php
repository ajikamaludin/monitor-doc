<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    const STATUS_UNREAD = 0;
    const STATUS_READ = 1;

    protected $fillable = [
        'content',
        'date',
        'model_related',
        'model_id',
        'status'
    ];
}
