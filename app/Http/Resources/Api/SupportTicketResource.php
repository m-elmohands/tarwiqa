<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SupportTicketResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'type' => $this->type,
            'channel' => $this->channel,
            'status' => $this->status,
            'subject' => $this->subject,
            'details' => $this->details,
            'order_id' => $this->order_id,
            'created_at' => $this->created_at?->toISOString(),
        ];
    }
}
