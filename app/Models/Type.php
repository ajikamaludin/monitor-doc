<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use ShiftOneLabs\LaravelCascadeDeletes\CascadesDeletes;

class Type extends Model
{
    use HasFactory, CascadesDeletes;

    protected $fillable = [
        "name",
    ];

    protected $cascadeDeletes = ['documents'];

    public function documents()
    {
        return $this->hasMany(Document::class);
    }

}
