<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Dyrynda\Database\Support\CascadeSoftDeletes;

class Classification extends Model
{
    use HasFactory, CascadeSoftDeletes;

    protected $fillable = ['name'];

    protected $cascadeDeletes = ['types'];

    public function types()
    {
        return $this->hasMany(Type::class);
    }
}
