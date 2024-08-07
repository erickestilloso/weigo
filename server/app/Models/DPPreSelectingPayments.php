<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DPPreSelectingPayments extends Model
{
    use HasFactory;

    protected $table = 'd_p_pre_selecting_payments';

    protected $fillable = [
            'uid',
            'amount',
            'ccy',
            'description',
            'email',
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            if (empty($model->uid)) {
                $model->uid = (string) \Str::uuid(); // or any other UID generation logic
            }
        });
    }
}
