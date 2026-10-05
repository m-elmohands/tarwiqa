<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\WalletTransaction;
use App\Services\PaymentPaymobService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PaymentWebhookController extends Controller
{
    public function __invoke(Request $request, PaymentPaymobService $checkoutService)
    {
        $payload = $request->input('obj');
        $receivedHmac = $request->query('hmac');

        $orderId = data_get($payload, 'order.id');
        Log::info('Paymob Webhook Start with order_id', ['orderId' => $orderId]);

        $reference = data_get($payload, 'order.merchant_order_id') ?: data_get($payload, 'order.id');
        $transaction = WalletTransaction::firstWhere('reference', $reference);

        $error = null;

        if (! $transaction) {
            $error = 'Reference is Invalid.';
        } elseif (! $checkoutService->verifyHmac($payload, $receivedHmac)) {
            $error = 'Invalid HMAC signature detected.';
            $transaction->update(['status' => 'failed', 'description' => $error]);
        } elseif (data_get($payload, 'success') !== true) {
            $error = 'Failed.';
            $transaction->update(['status' => 'failed']);
        }

        if ($error) {
            Log::warning("Paymob Webhook Warning: $error");

            return response()->json(['status' => 'failed']);
        }

        $transaction->update(['status' => 'completed']);
        $transaction->wallet()->decrement('locked_balance', $transaction->amount);
        Log::info('Paymob Webhook Success');

        return response()->json(['status' => 'success']);
    }
}
