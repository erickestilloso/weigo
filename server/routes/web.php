<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\Dragonpay\CreditCardController;
use App\Http\Controllers\Dragonpay\PaymentController;
use App\Http\Controllers\Dragonpay\ServiceModelController;
use App\Http\Controllers\Dragonpay\FilteredPaymentsController;
use App\Http\Controllers\Dragonpay\PreSelectingPaymentsController;
use App\Http\Controllers\Dragonpay\WeigoSettingController;
use App\Http\Controllers\Accounts\AccountsProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Foundation\Http\Middleware\HandlePrecognitiveRequests;

use App\Http\Controllers\Auth\RegisteredUserController;
Route::redirect('/', '/payments');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('Dashboard'))
    ->name('dashboard');

    // Credit Card Route
    Route::get('/credit-card', [CreditCardController::class, 'index'],fn() => Inertia::render('CreditCard'))
    ->name('credit-card');    
    Route::post('credit-card', [CreditCardController::class, 'store', HandlePrecognitiveRequests::class]);
    // Route::post('/credit-card', [CreditCardController::class, 'store']);
    Route::delete('/credit-card/{id}', [CreditCardController::class, 'destroy'])->name('deleteCCId');

    // Payment Route
    Route::get('/payments', [PaymentController::class, 'index'],fn() => Inertia::render('Payment'))
    ->name('payments');
    // Route::post('payments', [PaymentController::class, 'store', HandlePrecognitiveRequests::class]);
    Route::post('/payments', [PaymentController::class, 'store']);
    Route::delete('/payments/{id}', [PaymentController::class, 'destroy'])->name('deletePaymentsId');
    
    
    // Service Model Route
    Route::get('/service-model', [ServiceModelController::class, 'index'],fn() => Inertia::render('ServiceModel'))
    ->name('service-model');
    // Route::post('service-model', [ServiceModelController::class, 'store', HandlePrecognitiveRequests::class]);
    Route::post('/service-model', [ServiceModelController::class, 'store']);
    Route::delete('/service-model/{id}', [ServiceModelController::class, 'destroy'])->name('deleteServiceId');
    
    // Filtering Payments Route
    Route::get('/filtering-payments', [FilteredPaymentsController::class, 'index'],fn() => Inertia::render('DPFilteredPayments'))
    ->name('filtering-payments');
    // Route::post('filtering-payments', [FilteredPaymentsController::class, 'store', HandlePrecognitiveRequests::class]);
    Route::post('/filtering-payments', [FilteredPaymentsController::class, 'store']);
    Route::delete('/filtering-payments/{id}', [FilteredPaymentsController::class, 'destroy'])->name('deleteFilteringId');

    // Pre Selecting Payments Route
    Route::get('/pre-selecting-payments', [PreSelectingPaymentsController::class, 'index'],fn() => Inertia::render('DPPreSelectingPayments'))
    ->name('pre-selecting-payments');
    // Route::post('pre-selecting-payments', [PreSelectingPaymentsController::class, 'store', HandlePrecognitiveRequests::class]);
    Route::post('/pre-selecting-payments', [PreSelectingPaymentsController::class, 'store']);
    Route::delete('/pre-selecting-payments/{id}', [PreSelectingPaymentsController::class, 'destroy'])->name('deleteId');
   
     // Account User Route  
     Route::delete('/account/admin/{id}', [AccountsProfileController::class, 'deleteAdminUser'])->name('deleteAdminId');
     Route::get('/accounts/admin', [AccountsProfileController::class, 'getAdminUser'])->name('accounts');
    //  Route::post('update-admin', [AccountsProfileController::class, 'editAdminUser', HandlePrecognitiveRequests::class]);
     Route::post('update-admin', [AccountsProfileController::class, 'editAdminUser'])->name('update-admin');;
     Route::post('register', [RegisteredUserController::class, 'store'])->name('register');
     Route::post('/register', [RegisteredUserController::class, 'store'])->name('register');
     
     // Account Guest Route
     Route::delete('/account/guest/{id}', [AccountsProfileController::class, 'deleteGuestUser'])->name('deleteGuestId');
     Route::get('/accounts', [AccountsProfileController::class, 'getGuestUser'],fn() => Inertia::render('Guest'))
     ->name('accounts');
    //  Route::post('update-guest', [AccountsProfileController::class, 'editGuestUser', HandlePrecognitiveRequests::class]);
     Route::post('/update-guest', [AccountsProfileController::class, 'updateGuestUser']);
     Route::post('updateguest', [AccountsProfileController::class, 'editAdminUser'])->name('updateguest');

    // Dragonpay Weigo Settings TXNID and Merchant ID
    Route::get('/weigo-dp-settings', [WeigoSettingController::class, 'index'],fn() => Inertia::render('DPWeigoSetting'))->name('dpsettings');
    // Route::post('update-weigo-dp-settings', [WeigoSettingController::class, 'update', HandlePrecognitiveRequests::class]);
    Route::post('/update-weigo-dp-settings', [WeigoSettingController::class, 'update']);
     

});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/email/verify', function () {
    return view('auth.verify-email');
})->middleware('auth')->name('verification.notice');
 
Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();
 
    return redirect('/login');
})->middleware(['auth', 'signed'])->name('verification.verify');
 
Route::post('/email/verification-notification', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();
 
    return back()->with('message', 'Verification link sent!');
})->middleware(['auth', 'throttle:6,1'])->name('verification.send');




require __DIR__.'/auth.php';
