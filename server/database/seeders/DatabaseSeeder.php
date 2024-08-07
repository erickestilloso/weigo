<?php

namespace Database\Seeders;
use App\Models\DBPayment;
use App\Models\DBPaymentGateway;
use App\Models\DBServiceModel;
use App\Models\DBCreditCard;
use App\Models\DPFilteredPayments;
use App\Models\DPPreSelectingPayments;
use App\Models\DPWeigoSetting;
use App\Models\User;
use App\Models\Guest;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            DBServiceModelSeeder::class,
            DBCreditCardSeeder::class,
            DBPaymentSeeder::class,
            DBFilteredPaymentSeeder::class,
            DBPreSelectingPaymentSeeder::class,
            DBGuestSeeder::class,
            DBAdminSeeder::class,
            DBWeigoSettingSeeder::class,
        ]);
       
    }
}
