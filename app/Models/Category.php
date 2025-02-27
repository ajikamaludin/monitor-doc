<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Dyrynda\Database\Support\CascadeSoftDeletes;

class Category extends Model
{
    use HasFactory, CascadeSoftDeletes;

    protected $fillable = [
        "name",
        "short",
        "duration",
    ];

    protected $cascadeDeletes = ['documents'];

    public function documents()
    {
        return $this->hasMany(Document::class);
    }
}
