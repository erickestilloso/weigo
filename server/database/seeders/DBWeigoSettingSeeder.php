<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Carbon\Carbon;
use Illuminate\Support\Str;
use App\Models\DPWeigoSetting;
use Faker\Factory as Faker;

class DBWeigoSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        DPWeigoSetting::factory()->create([
            'uid' => Str::uuid(),
            'txnid' => $faker->word(),
            'merchant_id' => $faker->word(),
            'created_at' => Carbon::instance($faker->dateTimeBetween('now')),
            'updated_at' => Carbon::instance($faker->dateTimeBetween('now','+1 months'))
        ]); 
    }
}
