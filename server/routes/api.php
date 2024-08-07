<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Guest\AuthenticatedSessionController;
use App\Http\Controllers\Guest\ConfirmablePasswordController;
use App\Http\Controllers\Guest\EmailVerificationNotificationController;
use App\Http\Controllers\Guest\EmailVerificationPromptController;
use App\Http\Controllers\Guest\NewPasswordController;
use App\Http\Controllers\Guest\PasswordController;
use App\Http\Controllers\Guest\PasswordResetLinkController;
use App\Http\Controllers\Guest\RegisteredUserController;
use App\Http\Controllers\Guest\VerifyEmailController;

use App\Http\Controllers\Dragonpay\CreditCardController;
use App\Http\Controllers\Dragonpay\PaymentController;
use App\Http\Controllers\Dragonpay\ServiceModelController;
use App\Http\Controllers\Dragonpay\FilteredPaymentsController;
use App\Http\Controllers\Dragonpay\PreSelectingPaymentsController;
use App\Http\Controllers\Guest\Profile\ProfileController;

use App\Http\Controllers\Accounts\AccountsProfileController;

use App\Http\Controllers\EmailController;

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Http\Middleware\HandlePrecognitiveRequests;

use Illuminate\Foundation\Application;
 use Illuminate\Http\Request;
 use Illuminate\Foundation\Auth\EmailVerificationRequest;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware(['auth:sanctum']);
Route::middleware(['guest'])->group(function () {
    Route::get('/weigo/register', [RegisteredUserController::class, 'create', HandlePrecognitiveRequests::class ])
                ->name('register');

    Route::post('/weigo/register', [RegisteredUserController::class, 'store', HandlePrecognitiveRequests::class]);

    Route::get('/weigo/login', [AuthenticatedSessionController::class, 'create', HandlePrecognitiveRequests::class])
                ->name('login');

    Route::post('/weigo/login', [AuthenticatedSessionController::class, 'store', HandlePrecognitiveRequests::class]);

    Route::get('/weigo/forgot-password', [PasswordResetLinkController::class, 'create', HandlePrecognitiveRequests::class])
                ->name('password.request');

    Route::post('/weigo/forgot-password', [PasswordResetLinkController::class, 'store', HandlePrecognitiveRequests::class])
                ->name('password.email');

    Route::post('/weigo/send-reset-link', [PasswordResetLinkController::class, 'sendResetLink', HandlePrecognitiveRequests::class])
                ->name('password.reset-email');

    Route::get('/weigo/reset-password/{token}', [NewPasswordController::class, 'create', HandlePrecognitiveRequests::class])
                ->name('password.reset');

    Route::post('/weigo/reset-password', [NewPasswordController::class, 'store', HandlePrecognitiveRequests::class])
                ->name('password.store');
    
});


Route::middleware(['auth:sanctum'])->group(function () {    
    Route::post('/weigo/logout', [AuthenticatedSessionController::class, 'destroy', HandlePrecognitiveRequests::class])
    ->name('logout');

    Route::get('/weigo/confirm-password', [ConfirmablePasswordController::class, 'show', HandlePrecognitiveRequests::class])
    ->name('password.confirm');

    Route::post('/weigo/confirm-password', [ConfirmablePasswordController::class, 'store', HandlePrecognitiveRequests::class]);

    Route::put('/weigo/password', [PasswordController::class, 'update', HandlePrecognitiveRequests::class])->name('password.update');

    Route::post('/weigo/dp-credit-card', [CreditCardController::class, 'create'])
                ->name('credit-card');
    Route::post('/weigo/dp-payment', [PaymentController::class, 'create', HandlePrecognitiveRequests::class])
                ->name('payment');

    Route::post('/weigo/dp-service-model', [ServiceModelController::class, 'create', HandlePrecognitiveRequests::class])
                ->name('service-model');
    Route::post('/weigo/dp-filtered-payments', [FilteredPaymentsController::class, 'create', HandlePrecognitiveRequests::class])
                ->name('filtered-payments');
    Route::post('/weigo/dp-preselecting-payments', [PreSelectingPaymentsController::class, 'create', HandlePrecognitiveRequests::class])
                ->name('preselecting-payments');

    Route::delete('/weigo/delete-profile/{id}', [AccountsProfileController::class, 'deleteGuestUser'])->name('deleteId');
    Route::post('/weigo/edit-profile', [AccountsProfileController::class, 'editGuestUser'])->name('updateProfile');


    Route::get('/weigo/profile', [ProfileController::class, 'create', HandlePrecognitiveRequests::class])->name('profile.edit');                 
    Route::post('/weigo/profile', [ProfileController::class, 'store', HandlePrecognitiveRequests::class])->name('profile.edit');                 
    Route::post('/weigo/profile', [ProfileController::class, 'store', HandlePrecognitiveRequests::class])->name('profile.edit');                 
});




Route::get('/weigo/email/verify/{id}/{hash}', [EmailController::class, 'verify'])->name('verification.verify');
// Route::get('/weigo/email/verify', function () {
//     return view('auth.verify-email');
// })->middleware('auth')->name('verification.notice');
// Route::post('/weigo/email/verification-notification', function (Request $request) {
//     $request->user()->sendEmailVerificationNotification();
 
//     return back()->with('message', 'Verification link sent!');
// })->middleware(['auth', 'throttle:6,1'])->name('verification.send');

// Route::get('/weigo/verify-email', EmailVerificationPromptController::class)
// ->name('verification.notice');

// Route::get('/weigo/verify-email/{id}/{hash}', VerifyEmailController::class)
// ->middleware(['signed', 'throttle:6,1', HandlePrecognitiveRequests::class])
// ->name('verification.verify');

// Route::post('/weigo/email/verification-notification', [EmailVerificationNotificationController::class, 'store', HandlePrecognitiveRequests::class])
// ->middleware('throttle:6,1')
// ->name('verification.send');
