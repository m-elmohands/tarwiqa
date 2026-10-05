<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Addresses\StoreAddressRequest;
use App\Http\Requests\Addresses\UpdateAddressRequest;
use App\Models\Address;
use Illuminate\Http\Request;

class AddressController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $addresses = Address::query()->where('user_id', $user->id)->get();

        return apiResponse($addresses);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAddressRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = $request->user()->id;

        $address = Address::create($data);

        return apiResponse($address, 'Address stored successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $address = Address::findOrFail($id);

        return apiResponse($address, 'Address stored successfully');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAddressRequest $request, $id)
    {
        $address = Address::findOrFail($id);

        $address->update($request->validated());

        return apiResponse(message: 'Address updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $address = Address::findOrFail($id);
        $address->forceDelete();

        return apiResponse(message: 'Address deleted successfully');
    }
}
