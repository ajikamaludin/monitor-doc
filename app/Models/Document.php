<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;

    const STATUS_YES = 1;
    const STATUS_NO = 0;

    const TYPE_TETAP = 1;
    const TYPE_TIDAK_TETAP = 0;

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

    public function variety()
    {
        return $this->belongsTo(Type::class, 'type_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }
}
