<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Dyrynda\Database\Support\CascadeSoftDeletes;

class Region extends Model
{
    use HasFactory, CascadeSoftDeletes;

    protected $fillable = [
        "name",
        "group_id",
        "email"
    ];

    protected $cascadeDeletes = ['companies', 'users'];

    public function group()
    {
        return $this->belongsTo(Group::class);
    }

    public function companies()
    {
        return $this->hasMany(Company::class);
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
