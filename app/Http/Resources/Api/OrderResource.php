<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return ['id' => $this->id, 'reference' => 'ORD-'.str_pad((string) $this->id, 6, '0', STR_PAD_LEFT), 'status' => $this->status, 'payment_status' => $this->payment_status, 'payment_method' => $this->payment_method, 'service_date' => $this->service_date?->toDateString(), 'arrival_time' => $this->arrival_time, 'subtotal' => (float) $this->subtotal, 'discount_total' => (float) $this->discount_total, 'wallet_amount' => (float) $this->wallet_amount, 'tax_total' => (float) $this->tax_total, 'total' => (float) $this->total, 'cancellation_reason' => $this->cancellation_reason, 'cancelled_at' => $this->cancelled_at?->toISOString(), 'address' => $this->whenLoaded('address', fn () => ['id' => $this->address?->id, 'city' => $this->address?->city?->name]), 'package' => $this->whenLoaded('package', fn () => ['id' => $this->package?->id, 'title' => $this->package?->title]), 'items' => $this->whenLoaded('lines', fn () => $this->lines->map(fn ($line) => ['id' => $line->id, 'type' => $line->type, 'name' => $line->name, 'quantity' => $line->quantity, 'unit_price' => (float) $line->unit_price, 'total' => (float) $line->total])), 'created_at' => $this->created_at?->toISOString()];
    }
}
