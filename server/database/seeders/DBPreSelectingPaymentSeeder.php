<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;
use Carbon\Carbon;
use Illuminate\Support\Str;

class DBPreSelectingPaymentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        foreach (range(1, 5) as $index) {
            DB::table('d_p_pre_selecting_payments')->insert([
                'uid' => Str::uuid(),
                'amount' => $faker->word(),
                'ccy' => $faker->word(),
                'description' => $faker->sentence(),
                'email' => $faker->unique()->safeEmail(),
                'created_at' => Carbon::instance($faker->dateTimeBetween('now')),
                'updated_at' => Carbon::instance($faker->dateTimeBetween('now','+1 months'))
                
            ]);
        }
    }
}
