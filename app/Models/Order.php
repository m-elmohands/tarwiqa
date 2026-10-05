<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable(['customer_id', 'partner_id', 'address_id', 'package_id', 'status', 'service_date', 'arrival_time', 'duration_minutes', 'payment_method', 'payment_status', 'subtotal', 'extras_total', 'discount_total', 'wallet_amount', 'deposit_amount', 'tax_total', 'total', 'customer_notes', 'internal_notes', 'additional_phone', 'cancelled_at', 'cancellation_reason'])]
class Order extends Model
{
    use SoftDeletes;

    public function customer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'customer_id');
    }

    public function partner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'partner_id');
    }

    public function address(): BelongsTo
    {
        return $this->belongsTo(Address::class);
    }

    public function package(): BelongsTo
    {
        return $this->belongsTo(ServicePackage::class, 'package_id');
    }

    public function lines(): HasMany
    {
        return $this->hasMany(OrderService::class);
    }

    public function extras(): HasMany
    {
        return $this->hasMany(OrderExtra::class);
    }

    public function maids(): BelongsToMany
    {
        return $this->belongsToMany(Maid::class, 'order_maids');
    }

    protected function casts(): array
    {
        return [
            'service_date' => 'date',
            'completed_at' => 'datetime',
            'cancelled_at' => 'datetime',
            'total' => 'decimal:2',
        ];
    }
}
