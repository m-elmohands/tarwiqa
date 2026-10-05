<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceCategoryResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return ['id' => $this->id, 'title' => $this->title, 'subtitle' => $this->subtitle, 'slug' => $this->slug, 'logo_url' => $this->getFirstMediaUrl('logo', 'thumb') ?: null];
    }
}
