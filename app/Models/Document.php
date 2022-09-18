<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;

    protected $fillable = [
        'no',
        'no_doc',
        'type_doc_id',
        'company_name',
        'first_person_name',
        'second_person_name',
        'start_date',
        'end_date',
        'department_id',
        'pic_name',
        'email',
        'note',
        'document',
        'user_id',
    ];

    public function department()
    {
        return $this->belongsTo(Department::class, 'department_id');
    }

    public function type()
    {
        return $this->belongsTo(TypeDoc::class, 'type_doc_id');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
