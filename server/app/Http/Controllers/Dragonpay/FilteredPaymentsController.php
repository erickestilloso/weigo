<?php

namespace App\Http\Controllers\Dragonpay;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDPFilteredPaymentsRequest;
use App\Http\Requests\UpdateDPFilteredPaymentsRequest;
use App\Models\DPFilteredPayments;
use App\Http\Resources\DPFilteredPaymentsResource;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
class FilteredPaymentsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $filteredPayments = DB::table('d_p_filtered_payments')->get(); 
        return Inertia::render('Payment/FilteredPayment', [
            "d_p_filtered_payments" => $filteredPayments
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(StoreDPFilteredPaymentsRequest $request)
    {
        //
        $filteredPayments = DPFilteredPayments::create($request->validated());
        $status = 'success';
        $code = 200;
        if (!$filteredPayments) {
            $status = 'error';
            $code = 500;
        }
        return response()->json([
            'message' => 'Filtered Payments Transaction is Successful',
            'status' => $status,
            'code' => $code
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDPFilteredPaymentsRequest $request)
    {
        //
        $filteredPayments = DPFilteredPayments::create($request->validated());
        return back()->with('success', 'Item deleted successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(DPFilteredPayments $dPFilteredPayments)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DPFilteredPayments $dPFilteredPayments)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDPFilteredPaymentsRequest $request, DPFilteredPayments $dPFilteredPayments)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        DB::table('d_p_filtered_payments')->where('uid', $id)->delete();
        if (DB::table('d_p_filtered_payments')->where('uid', $id)->exists()) {
            return back()->with('error', 'Item not deleted');
        }
        
        return back()->with('success', 'Item deleted successfully');
    }
}
