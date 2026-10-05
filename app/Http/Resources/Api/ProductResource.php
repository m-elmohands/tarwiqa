<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return ['id' => $this->id, 'category_id' => $this->category_id, 'city_id' => $this->city_id, 'title' => $this->title, 'slug' => $this->slug, 'description' => $this->description, 'youtube_url' => $this->youtube_url, 'base_price' => (float) $this->base_price, 'logo_url' => $this->getFirstMediaUrl('logo') ?: null, 'category' => $this->whenLoaded('category', fn () => ['id' => $this->category?->id, 'title' => $this->category?->title]), 'city' => $this->whenLoaded('city', fn () => ['id' => $this->city?->id, 'name' => $this->city?->name])];
    }
}
