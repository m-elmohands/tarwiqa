<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['reference', 'wallet_id', 'order_id', 'type', 'amount', 'balance_after', 'status', 'description', 'created_by', 'metadata'])]
class WalletTransaction extends Model
{
    public const TYPE_DEPOSIT = 'deposit';

    public const TYPE_WITHDRAWAL = 'withdrawal';

    public const TYPE_PURCHASE = 'purchase';

    public const TYPES = [
        self::TYPE_DEPOSIT,
        self::TYPE_WITHDRAWAL,
        self::TYPE_PURCHASE,
    ];

    public function wallet(): BelongsTo
    {
        return $this->belongsTo(Wallet::class);
    }

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    protected function casts(): array
    {
        return ['amount' => 'decimal:2', 'balance_after' => 'decimal:2', 'metadata' => 'array'];
    }
}
