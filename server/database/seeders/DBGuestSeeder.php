<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;
use Carbon\Carbon;
use App\Models\Guest;
use Illuminate\Support\Str;
class DBGuestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Guest::factory()->create([
            'uid' => Str::uuid(),
            'first_name' => 'Erick',
            'last_name' => 'Estilloso',
            'birthday' => '1990-01-01',
            'phone_number' => '1234567890',
            'email' => 'hover.erickestilloso@gmail.com',
            'password' => bcrypt('password'),
            'email_verified_at' => time(),
            'verification_token' => sha1(Faker::create()->unique()->randomNumber()),
        ]); 
        Guest::factory()->create([
            'uid' => Str::uuid(),
            'first_name' => 'Erick',
            'last_name' => 'Estilloso',
            'birthday' => '1990-01-01',
            'phone_number' => '1234567890',
            'email' => 'guest@gmail.com',
            'password' => bcrypt('password'),
            'email_verified_at' => time(),
            'verification_token' => sha1(Faker::create()->unique()->randomNumber()),
        ]); 
        Guest::factory()->create([
            'uid' => Str::uuid(),
            'first_name' => 'Erick',
            'last_name' => 'Estilloso',
            'birthday' => '1990-01-01',
            'phone_number' => '123456789',
            'email' => 'guest2@gmail.com',
            'password' => bcrypt('password'),
            'email_verified_at' => time(),
            'verification_token' => sha1(Faker::create()->unique()->randomNumber()),
        ]); 
    }
}
