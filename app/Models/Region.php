<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Region extends Model
{
    use HasFactory;

    protected $fillable = [
        "name",
        "group_id",
    ];

    public function group() 
    {
        return $this->belongsTo(Group::class);
    }

    public function companies()
    {
        return $this->hasMany(Company::class);
    }
}
