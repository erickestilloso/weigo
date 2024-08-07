<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class CreditCard extends Model
{
    use HasFactory;
    protected $table = 'd_p_credit_cards';

    protected $fillable = [
            'uid',
            'amount',
            'ccy',
            'description',
            'email',
            'firstName',
            'lastName',
            'address1',
            'address2',
            'city',
            'state',
            'country',
            'zipCode',
            'telNo',
           
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
