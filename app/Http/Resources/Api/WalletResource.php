<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WalletResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'balance' => (float) $this->balance,
            'locked_balance' => (float) $this->locked_balance,
            'available_balance' => (float) $this->balance - (float) $this->locked_balance,
            'currency' => $this->currency,
            'updated_at' => $this->updated_at?->toISOString()
        ];
    }
}
