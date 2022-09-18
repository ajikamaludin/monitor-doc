<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocumentReminder extends Model
{
    use HasFactory;

    protected $fillable = [
        'document_id',
        'date',
    ];

    public function document()
    {
        $this->belongsTo(Document::class, 'document_id');
    }
}
