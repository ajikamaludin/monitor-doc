<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use ShiftOneLabs\LaravelCascadeDeletes\CascadesDeletes;

class Classification extends Model
{
    use HasFactory, CascadesDeletes;

    protected $fillable = ['name'];

    protected $cascadeDeletes = ['types'];

    public function types()
    {
        return $this->hasMany(Type::class);
    }
}
