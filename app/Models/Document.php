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
        "type_id",
        "category_id",
        "publisher",
        "description",
        "publish_date",
        "due_date",
        "status",
        "type",
        "document",
        "user_id",
        "company_id",
        // "company_name",
        // "group",
        // "region",
    ];

    protected $casts = [
        'publish_date' => 'datetime:Y-m-d',
        'due_date' => 'datetime:Y-m-d'
    ];

    protected $appends = ['due_status', 'due_status_color'];

    public function creator()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
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
            get: function () {
                $maxMonthDiff = 3;
                $maxDayDiff = 30; //$this->category->duration;

                if ($this->due_date == null) {
                    return '';
                }

                if (now()->toDateString() == $this->due_date->toDateString()) {
                    return "hari ini jatuh tempo";
                }

                $diffMonth = now()->diffInMonths($this->due_date, true);

                if ($maxMonthDiff >= $diffMonth && $diffMonth > 0) {
                    return $diffMonth . " bulan mendekati jatuh tempo";
                }

                $diffDays = now()->diffInDays($this->due_date, false);

                if ($maxDayDiff >= $diffDays && $diffDays > 0) {
                    return $diffDays . " hari mendekati jatuh tempo";
                }
                if ($diffDays <= 0) {
                    return "jatuh tempo";
                }
            }
        );
    }

    protected function dueStatusColor(): Attribute
    {
        return Attribute::make(
            get: function () {
                $maxMonthDiff = 3;

                $diffMonth = now()->diffInMonths($this->due_date, true);

                if ($maxMonthDiff >= $diffMonth && $diffMonth > 0) {
                    return [
                        1 => '#dc2626',
                        2 => '#facc15',
                        3 => '#4ade80',
                    ][$diffMonth];
                }

                return '#dc2626';
            }
        );
    }

    protected function isCloseDue(): Attribute
    {
        return Attribute::make(
            get: function () {
                $maxMonthDiff = 3;
                $diff = 30; //$this->category->duration;

                if ($this->due_date == null) {
                    return 0;
                }

                if (now()->toDateString() == $this->due_date->toDateString()) {
                    return 0;
                }

                $diffMonth = now()->diffInMonths($this->due_date, true);

                if ($maxMonthDiff >= $diffMonth && $diffMonth > 0) {
                    return $diffMonth;
                }

                $diffDays = now()->diffInDays($this->due_date, false) + 1;

                if ($diff >= $diffDays && $diffDays > 0) {
                    return $diffDays;
                }

                if ($diffDays <= 0) {
                    return 0;
                }

                return 0;
            },
        );
    }

    public function scopeCloseToExpired($query)
    {
        $ids = collect();
        $categories = Category::all();
        foreach ($categories as $category) {
            foreach ($category->documents as $docs) {
                if ($docs->is_close_due != 0) {
                    $ids->add($docs->id);
                }
            }
        }

        $query->whereIn("id", $ids->toArray());
    }
}
