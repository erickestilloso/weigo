<?php

namespace App\Http\Controllers\Dragonpay;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDPWeigoSettingRequest;
use App\Http\Requests\UpdateDPWeigoSettingRequest;
use App\Models\DPWeigoSetting;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Request as RequestModel;
use Illuminate\Http\JsonResponse;
class WeigoSettingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $dpWeigoSettings = DB::table('d_p_weigo_settings')->get(); 
        return Inertia::render('Accounts/WeigoSettings', [
            "d_p_weigo_settings" => $dpWeigoSettings
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDPWeigoSettingRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(DPWeigoSetting $dPWeigoSetting)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DPWeigoSetting $dPWeigoSetting)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, DPWeigoSetting $dPWeigoSetting)
    {
        
        $messages = [
            'uid.required' => 'The uid field is required.',
        ];

        $data = $request->validate([     
            'uid' => ['required', 'exists:d_p_weigo_settings,uid'],     
        ], $messages);
   
        $update_dp_setting = DB::table('d_p_weigo_settings')->where('uid', $data['uid'])->update([
            'txnid' => $request->txnid,                
            'merchant_id' => $request->merchant_id,                
            'uid' => $request->uid
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DPWeigoSetting $dPWeigoSetting)
    {
        //
    }
}
