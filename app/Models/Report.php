<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    //
    protected $fillable = [
        'user_id',
        'category_id',
        'title',
        'location',
        'description',
        'image',
        'status'
    ];

    public function category() {
        return $this->belongsTo(Category::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function replies() {
        return $this->hasMany(ReportResponse::class);
    }
}
