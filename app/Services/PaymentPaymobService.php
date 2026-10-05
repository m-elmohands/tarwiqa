<?php

namespace App\Services;

use App\Models\Wallet;
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use RuntimeException;

class PaymentPaymobService
{
    private string $BASE_URL;
    private string $HMAC_SECRET;
    private string $SECRET_KEY;
    private string $PUBLIC_KEY;
    private int $EXPIRATION;
    private array $INTEGRATION_ID;
    private string $CALLBACK_URL;
    private string $REDIRECT_URL;

    private const HMAC_FIELDS = [
        'amount_cents', 'created_at', 'currency', 'error_occured', 'has_parent_transaction',
        'id', 'integration_id', 'is_3d_secure', 'is_auth', 'is_capture', 'is_refunded',
        'is_standalone_payment', 'is_voided', 'order.id', 'owner', 'pending',
        'source_data.pan', 'source_data.sub_type', 'source_data.type', 'success',
    ];

    public function __construct()
    {
        $this->BASE_URL = env('PAYMOB_BASE_URL');
        $this->PUBLIC_KEY = env('PAYMOB_PUBLIC_KEY');
        $this->SECRET_KEY = env('PAYMOB_SECRET_KEY');
        $this->HMAC_SECRET = env('PAYMOB_HMAC_SECRET');
        $this->EXPIRATION = (int) env('PAYMOB_EXPIRATION_SECONDS');
        $this->INTEGRATION_ID = array((int)env('PAYMOB_INTEGRATION_ID'));
        $this->CALLBACK_URL = env('PAYMOB_CALLBACK_URL');
        $this->REDIRECT_URL = env('PAYMOB_REDIRECT_URL');
    }

    private function request(): PendingRequest
    {
        if (blank($this->SECRET_KEY) || blank($this->PUBLIC_KEY) || $this->INTEGRATION_ID == []) {
            throw new RuntimeException('Paymob credentials are not configured.');
        }

        return Http::baseUrl($this->BASE_URL)
            ->withToken($this->SECRET_KEY)
            ->acceptJson()
            ->asJson()
            ->timeout($this->EXPIRATION)
            ->retry(2, 250);
    }

    private function billingData()
    {
        return [
            "first_name" => "ala",
            "last_name" => "zain",
            "phone_number" => "+92345xxxxxxxx",
            "email" => "ali@gmail.com",
            "street" => "N/A",
            "city" => "N/A",
            "country" => "N/A",
            "state" => "N/A",
            "building" => "N/A",
            "floor" => "N/A",
            "apartment" => "N/A",
        ];
    }

    public function makeOrder($reference, $amount, $description)
    {
        // dd($this->INTEGRATION_ID);
        $response = $this->request()->post('/v1/intention', [
            "amount" => $amount,
            "currency" => "EGP",
            "payment_methods" => $this->INTEGRATION_ID,
            "items" => [
                [
                    "name" => $description,
                    "amount" => $amount,
                    "description" => $description,
                    "quantity" => 1
                ]
            ],
            "billing_data" => $this->billingData(),
            "special_reference" => $reference,
            "notification_url" => $this->CALLBACK_URL,
            "redirection_url" => $this->REDIRECT_URL,
        ])->throw()->json();

        if (! is_array($response) || empty($response['id']) || empty($response['client_secret'])) {
            throw new RuntimeException('Paymob returned an invalid payment intention response.');
        }

        return [
            'reference' => $response['special_reference'],
            'checkout_url' => $this->checkoutUrl($response['client_secret'])
        ];
    }

    public function checkoutUrl(string $clientSecret): string
    {
        return rtrim($this->BASE_URL, '/').'/unifiedcheckout/?'.http_build_query([
            'publicKey' => $this->PUBLIC_KEY,
            'clientSecret' => $clientSecret,
        ]);
    }

    public function verifyHmac($payload, $receivedHmac)
    {
        $data = collect(self::HMAC_FIELDS)->map(fn (string $field): string => $this->stringify(Arr::get($payload, $field)))->implode('');

        $calculatedHmac = hash_hmac('sha512', $data, $this->HMAC_SECRET);

        return hash_equals($calculatedHmac, strtolower($receivedHmac));
    }

    private function stringify(mixed $value): string
    {
        if (is_bool($value)) {
            return $value ? 'true' : 'false';
        }

        return (string) $value;
    }
}