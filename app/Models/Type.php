<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Dyrynda\Database\Support\CascadeSoftDeletes;

class Type extends Model
{
    use HasFactory, CascadeSoftDeletes;

    protected $fillable = [
        "name",
        'classification_id'
    ];

    protected $cascadeDeletes = ['documents'];

    public function documents()
    {
        return $this->hasMany(Document::class);
    }

    public function classification()
    {
        return $this->belongsTo(Classification::class);
    }
}
