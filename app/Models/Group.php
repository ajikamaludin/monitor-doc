<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Dyrynda\Database\Support\CascadeSoftDeletes;

class Group extends Model
{
    use HasFactory, CascadeSoftDeletes;

    protected $fillable = [
        "name"
    ];

    protected $cascadeDeletes = ['regions'];

    public function regions()
    {
        return $this->hasMany(Region::class);
    }
}
