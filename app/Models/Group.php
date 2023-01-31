<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use ShiftOneLabs\LaravelCascadeDeletes\CascadesDeletes;

class Group extends Model
{
    use HasFactory, CascadesDeletes;

    protected $fillable = [
        "name"
    ];

    protected $cascadeDeletes = ['regions'];

    public function regions() 
    {
        return $this->hasMany(Region::class);
    }
}
