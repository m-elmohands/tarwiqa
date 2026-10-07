<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CartResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $items = $this->items->map(function ($item): array {
            $model = $item->service ?? $item->product ?? $item->package;
            $type = $item->service_id ? 'service' : ($item->product_id ? 'product' : 'package');
            $price = (float) $item->unit_price;

            return [
                'id' => $item->id,
                'item_type' => $type,
                'item_id' => $model?->id,
                'title' => $model?->title,
                'quantity' => $item->quantity,
                'unit_price' => $price,
                'total' => $price * $item->quantity,
                'metadata' => $item->metadata,
            ];
        });

        return [
            'id' => $this->id,
            'items' => $items,
            'items_count' => $items->sum('quantity'),
            'subtotal' => $items->sum('total'),
            'updated_at' => $this->updated_at?->toISOString(),
        ];
    }
}
