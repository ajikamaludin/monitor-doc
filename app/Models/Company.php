<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Dyrynda\Database\Support\CascadeSoftDeletes;

class Company extends Model
{
    use HasFactory, CascadeSoftDeletes;

    protected $fillable = [
        "region_id",
        "name",
        "short"
    ];

    protected $cascadeDeletes = ['documents'];

    public function region()
    {
        return $this->belongsTo(Region::class);
    }

    public function documents()
    {
        return $this->hasMany(Document::class);
    }
}
