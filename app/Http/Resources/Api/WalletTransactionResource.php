<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WalletTransactionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return ['id' => $this->id, 'reference' => $this->reference, 'order_id' => $this->order_id, 'type' => $this->type, 'amount' => (float) $this->amount, 'balance_after' => (float) $this->balance_after, 'status' => $this->status, 'description' => $this->description, 'created_at' => $this->created_at?->toISOString()];
    }
}
