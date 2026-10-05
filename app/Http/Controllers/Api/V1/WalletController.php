<?php

namespace App\Http\Controllers\Api\V1;

use App\Contracts\Services\WalletServiceInterface;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\ListWalletTransactionsRequest;
use App\Http\Resources\Api\WalletResource;
use App\Http\Resources\Api\WalletTransactionResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WalletController extends Controller
{
    public function __construct(private readonly WalletServiceInterface $wallets) {}

    public function show(Request $request): JsonResponse
    {
        $data = $this->wallets->walletFor($request->user());

        return apiResponse(
            data: (new WalletResource($data))->resolve($request),
            message: 'Wallet retrieved successfully.'
        );
    }

    public function transactions(ListWalletTransactionsRequest $request): JsonResponse
    {
        $wallet = $this->wallets->walletFor($request->user());
        $rows = $wallet->transactions()->when($request->validated('type'), fn ($query, $type) => $query->where('type', $type))->latest()->paginate($request->integer('per_page', 15));

        return apiResponse(data: WalletTransactionResource::collection($rows->getCollection())->resolve($request), message: 'Wallet transactions retrieved successfully.', meta: ['current_page' => $rows->currentPage(), 'last_page' => $rows->lastPage(), 'per_page' => $rows->perPage(), 'total' => $rows->total()]);
    }

    public function chargeWallet(Request $request)
    {
        $validated = $request->validate([
            'amount' => 'required|numeric',
        ]);

        $amount = (float) $validated['amount'];

        $response = $this->wallets->charge($amount);

        return apiResponse(
            data: $response,
            message: 'Checkout Request has been sent successfully'
        );
    }

    public function redirectPayment(Request $request)
    {
        return apiResponse([
            'success' => $request->query('success'),
        ], $request->query('txn_response_code'));
    }
}
