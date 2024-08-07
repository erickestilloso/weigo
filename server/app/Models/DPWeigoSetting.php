<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DPWeigoSetting extends Model
{
    use HasFactory;

    protected $table = 'd_p_weigo_settings';

    protected $fillable = [
        'uid',
        'txnid',
        'merchant_id',
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
