<?php

namespace App\Http\Controllers\Dragonpay;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDPPreSelectingPaymentsRequest;
use App\Http\Requests\UpdateDPPreSelectingPaymentsRequest;
use App\Models\DPPreSelectingPayments;
use App\Http\Resources\DPPreSelectingPaymentsResource;
use Inertia\Inertia;
use Illuminate\Http\JsonResponse; 
use Illuminate\Support\Facades\DB;
class PreSelectingPaymentsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $preSelectingPayments = DB::table('d_p_pre_selecting_payments')->get(); 
        return Inertia::render('Payment/PreSelectingPayment', [
            "d_p_pre_selecting_payments" => $preSelectingPayments
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(StoreDPPreSelectingPaymentsRequest $request)
    {
        //
        $preSelectingPayments = DPPreSelectingPayments::create($request->validated());
        $status = 'success';
        $code = 200;
        if (!$preSelectingPayments) {
            $status = 'error';
            $code = 500;
        }
        return response()->json([
            'message' => 'Pre-Selecting Information Transaction is Successful',
            'status' => $status,
            'code' => $code
        ], 200);
        
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDPPreSelectingPaymentsRequest $request)
    {
        $preSelectingPayments = DPPreSelectingPayments::create($request->validated());
        return back()->with('success', 'Item deleted successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(DPPreSelectingPayments $dPPreSelectingPayments)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DPPreSelectingPayments $dPPreSelectingPayments)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDPPreSelectingPaymentsRequest $request, DPPreSelectingPayments $dPPreSelectingPayments)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        DB::table('d_p_pre_selecting_payments')->where('uid', $id)->delete();
        if (DB::table('d_p_pre_selecting_payments')->where('uid', $id)->exists()) {
            return back()->with('error', 'Item not deleted');
        }
        
        return back()->with('success', 'Item deleted successfully');
    }
}
