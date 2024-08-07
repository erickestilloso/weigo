<?php

namespace App\Http\Controllers\Dragonpay;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePaymentRequest;
use App\Http\Requests\UpdatePaymentRequest;
use App\Models\Payment;
use Inertia\Inertia;
use App\Http\Resources\PaymentResource;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $payments = DB::table('d_p_payments')->get(); 
        return Inertia::render('Payment/Payment', [
            "d_p_payments" => $payments
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(StorePaymentRequest $request): JsonResponse
    {
        //
        $payments = Payment::create($request->validated());
        $status = 'success';
        $code = 200;
        if (!$payments) {
            $status = 'error';
            $code = 500;
        }
        return response()->json([
            'message' => 'Payment Information Transaction is Successful',
            'payments' => $request->all(),
            'status' => $status,
            'code' => $code,
        ], 200);
    
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePaymentRequest $request)
    {
        //
    $payments = Payment::create($request->validated());
    return back()->with('success', 'Item deleted successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Payment $payment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Payment $payment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePaymentRequest $request, Payment $payment)
    {
        //
    }

    /**
     * Remove the specified resource from storage on the guest side
     */
    public function destroy($id)
    {

        DB::table('d_p_payments')->where('uid', $id)->delete();
        if (DB::table('d_p_payments')->where('uid', $id)->exists()) {
            return back()->with('error', 'Item not deleted');
        }
        
        return back()->with('success', 'Item deleted successfully');
    }
    // Remove the specified resource from storage on the dashboard admin
    public function delete(Payment $request)
    {
        $request->delete();
    }
}
