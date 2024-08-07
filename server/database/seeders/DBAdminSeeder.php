<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;
use Carbon\Carbon;
use App\Models\User;
use Illuminate\Support\Str;
class DBAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
      User::factory()->create([
            'uid' => Str::uuid(),
            'name' => 'Erick',
            'birthday' => '1990-01-01',
            'phone_number' => '1234567890',
            'email' => 'hover.erickestilloso@gmail.com',
            'password' => bcrypt('password'),
            'email_verified_at' => time(),
            'role' => 'superadministrator'
        ]); 
      User::factory()->create([
            'uid' => Str::uuid(),
            'name' => 'Erick',
            'birthday' => '1990-01-01',
            'phone_number' => '1234567890',
            'email' => 'administrator@gmail.com',
            'password' => bcrypt('password'),
            'email_verified_at' => time(),
            'role' => 'administrator'
        ]); 
      User::factory()->create([
            'uid' => Str::uuid(),
            'name' => 'Erick',
            'birthday' => '1990-01-01',
            'phone_number' => '1234567890',
            'email' => 'maintenance@gmail.com',
            'password' => bcrypt('password'),
            'email_verified_at' => time(),
            'role' => 'maintenance'
        ]); 
      User::factory()->create([
            'uid' => Str::uuid(),
            'name' => 'Erick',
            'birthday' => '1990-01-01',
            'phone_number' => '1234567890',
            'email' => 'sales@gmail.com',
            'password' => bcrypt('password'),
            'email_verified_at' => time(),
            'role' => 'sales'
        ]); 
      User::factory()->create([
            'uid' => Str::uuid(),
            'name' => 'Erick',
            'birthday' => '1990-01-01',
            'phone_number' => '1234567890',
            'email' => 'common@gmail.com',
            'password' => bcrypt('password'),
            'email_verified_at' => time(),
            'role' => 'maintenance'
        ]); 
    }
}
