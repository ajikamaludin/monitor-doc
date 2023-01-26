<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;

    protected $fillable = [
        "no",
        "no_doc",
        "name",
        "company_name",
        "type_id",
        "category_id",
        "publisher",
        "description",
        "publish_date",
        "due_date",
        "status",
        "type",
        "group",
        "region",
        "document",
        "user_id",
    ];

    protected $casts = [
        'publish_date' => 'datetime:Y-m-d',
        'due_date' => 'datetime:Y-m-d'
    ];

    public function creator()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
