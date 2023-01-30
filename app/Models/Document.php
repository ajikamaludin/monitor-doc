<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

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

    protected $appends = ['due_status'];

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

    protected function dueStatus(): Attribute
    {
        return Attribute::make(
            get: function() {
                $diff = $this->category->duration;

                if ($this->due_date == null) {
                    return '';
                }
                if (now()->toDateString() == $this->due_date->toDateString()) {
                    return "hari ini jatuh tempo";
                }

                $date = now()->diffInDays($this->due_date, false) + 1;

                if ($diff >= $date && $date > 0) {
                    return $date . " hari mendekati jatuh tempo";
                }
                if ($date <= 0) {
                    return "jatuh tempo";
                }
            },
        );
    }

    protected function isCloseDue(): Attribute
    {
        return Attribute::make(
            get: function() {
                $diff = $this->category->duration;

                if ($this->due_date == null) {
                    return 0;
                }

                if (now()->toDateString() == $this->due_date->toDateString()) {
                    return 0;
                }

                $date = now()->diffInDays($this->due_date, false) + 1;

                if ($diff >= $date && $date > 0) {
                    return $date;
                }
                if ($date <= 0) {
                    return 0;
                }

                return 0;
            },
        );
    }
}
