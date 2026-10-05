<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'uuid' => $this->uuid,
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'gender' => $this->gender,
            'dob' => $this->dob,
            'governorate' => $this->whenLoaded('governorate', fn () => ['id' => $this->governorate?->id, 'name' => $this->governorate?->name]),
            'locale' => $this->locale,
            'timezone' => $this->timezone,
            'avatar_url' => $this->getFirstMediaUrl('avatar', 'thumb') ?: null,
        ];
    }
}
