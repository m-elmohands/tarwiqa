<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['user_id', 'platform', 'campaign', 'referral_code', 'shared_at', 'conversion_count', 'metadata'])]
class AppShare extends Model
{
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    protected function casts(): array
    {
        return [
            'shared_at' => 'datetime',
            'conversion_count' => 'integer',
            'metadata' => 'array',
        ];
    }
}
