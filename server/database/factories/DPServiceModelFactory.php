<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\ServiceModel;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DPServiceModel>
 */
class DPServiceModelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = ServiceModel::class;
    public function definition(): array
    {
        return [
            'uid' => (string) Str::uuid() ,
            'amount' => fake()->sentence(),
            'ccy' => fake()->sentence(),
            'description' => fake()->sentence(),
            'email' => fake()->sentence(),
            'created_at' => 1,
            'updated_at' => 1,
            
        ];
    }
}
