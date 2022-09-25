<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocumentShare extends Model
{
    use HasFactory;

    protected $fillable = [
        'document_id',
        'user_id', //jika email ada usernya
        'share_to', //email
    ];

    public function document()
    {
        $this->belongsTo(Document::class, 'document_id');
    }

    public function user()
    {
        $this->belongsTo(User::class, 'user_id');
    }
}
