<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;
use Carbon\Carbon;
use Illuminate\Support\Str;
class DBCreditCardSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        foreach (range(1, 5) as $index) {
            DB::table('d_p_credit_cards')->insert([
            'uid' => Str::uuid(),
            'amount' => $faker->word(),
            'ccy' => $faker->word(),
            'description' => $faker->sentence(),
            'email' => $faker->unique()->safeEmail(),
            'firstName' => $faker->word(),
            'lastName' => $faker->word(),
            'address1' => $faker->sentence(),
            'address2' => $faker->sentence(),
            'city' => $faker->word(),
            'state' => $faker->word(),
            'country' => $faker->word(),
            'zipCode' => $faker->numberBetween(100000, 999999),
            'telNo' => $faker->numberBetween(1000000000, 9999999999),
            'created_at' => Carbon::instance($faker->dateTimeBetween('now')),
            'updated_at' => Carbon::instance($faker->dateTimeBetween('now','+1 months'))
            
            ]);
        }
    }
}
