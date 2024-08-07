<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\DPWeigoSetting;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DPWeigoSetting>
 */
class DPWeigoSettingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = DPWeigoSetting::class;
    public function definition(): array
    {
        return [
            'uid' => (string) Str::uuid() ,
            'txnid' => fake()->word(),
            'merchant_id' => fake()->word(),            
            'created_at' => 1,
            'updated_at' => 1,
        ];
    }
}
