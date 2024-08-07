<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\Guest;
// use Illuminate\Auth\Events\Registered;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Mail;
use App\Mail\WeigoEmail;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Guest/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request):JsonResponse
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.Guest::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],            
        ]);
        
        $guest = Guest::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'phone_number' => $request->phone_number ?? '1234567890',
            'birthday' => $request->birthday ?? now(),  
            'password' => Hash::make($request->password),
            'verification_token' => Str::random(32),  
            'uid' => Str::uuid(),         
        ]);

        Mail::to($guest->email)->send(new WeigoEmail($guest));

        // event(new Registered($guest));
    
        if ($guest) {
            return response()->json(['message' => 'Registration is Successfully'], 200);
            
        } else {
            return response()->json([
                'message' => 'Unsuccessful Registration',
                'code' => 500,             
            ], 500);
        }
        

    }
}
