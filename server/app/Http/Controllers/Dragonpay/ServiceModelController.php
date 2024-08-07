<?php

namespace App\Http\Controllers\Dragonpay;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreServiceModelRequest;
use App\Http\Requests\UpdateServiceModelRequest;
use App\Models\ServiceModel;
use Inertia\Inertia;
use App\Http\Resources\ServiceModelResource;
use Illuminate\Support\Facades\DB;
class ServiceModelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $serviceModel = DB::table('d_p_service_models')->get(); 
        return Inertia::render('Payment/ServiceModel', [
            "d_p_service_models" => $serviceModel
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(StoreServiceModelRequest $request)
    {
        //
        $serviceModel = ServiceModel::create($request->validated());
        $status = 'success';
        $code = 200;
        if (!$serviceModel) {
            $status = 'error';
            $code = 500;
        }
        return response()->json([
            'message' => 'Service Model Information Transaction is Successful',
            'status' => $status,
            'code' => $code
        ], 200);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreServiceModelRequest $request)
    {
        //
    $serviceModel = ServiceModel::create($request->validated());
    return back()->with('success', 'Item deleted successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(ServiceModel $serviceModel)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ServiceModel $serviceModel)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateServiceModelRequest $request, ServiceModel $serviceModel)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        DB::table('d_p_service_models')->where('uid', $id)->delete();
        if (DB::table('d_p_service_models')->where('uid', $id)->exists()) {
            return back()->with('error', 'Item not deleted');
        }
        
        return back()->with('success', 'Item deleted successfully');
    }
}
