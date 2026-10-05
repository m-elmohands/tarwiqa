<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['order_id', 'service_id', 'product_id', 'name', 'type', 'quantity', 'unit_price', 'total', 'metadata'])]
class OrderService extends Model
{
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class, 'service_id');
    }

    protected function casts(): array
    {
        return ['unit_price' => 'decimal:2', 'total' => 'decimal:2', 'metadata' => 'array'];
    }
}
