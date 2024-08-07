<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\CreditCard;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DPCreditCard>
 */
class DPCreditCardFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = CreditCard::class;
    public function definition(): array
    {
        return [
            'uid' => $this->faker->uuid,
            'amount' => fake()->sentence(),
            'ccy' => fake()->sentence(),
            'description' => fake()->sentence(),
            'email' => fake()->sentence(),
            'firstName' => fake()->sentence(),
            'lastName' => fake()->sentence(),
            'address1' => fake()->sentence(),
            'address2' => fake()->sentence(),
            'city' => fake()->sentence(),
            'state' => fake()->sentence(),
            'country' => fake()->sentence(),
            'zipCode' => fake()->sentence(),
            'telNo' => fake()->sentence(),  
            'created_at' => 1,
            'updated_at' => 1,
        ];
    }
}
