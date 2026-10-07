<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BannerResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'image_url' => $this->image_url,
            'destination' => $this->destination,
            'slot_name' => $this->slot_name,
            'sort_order' => $this->sort_order,
            'starts_at' => $this->starts_at?->toISOString(),
            'end_date' => $this->end_date?->toISOString(),
        ];
    }
}
