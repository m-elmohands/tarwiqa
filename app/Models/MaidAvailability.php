<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['maid_id', 'day_of_week', 'starts_at', 'ends_at', 'is_available'])]
class MaidAvailability extends Model
{
    protected $table = 'maid_availability';

    public function maid(): BelongsTo
    {
        return $this->belongsTo(Maid::class);
    }

    protected function casts(): array
    {
        return [
            'day_of_week' => 'integer',
            'is_available' => 'boolean',
        ];
    }
}
