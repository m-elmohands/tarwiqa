<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable(['maid_id', 'type', 'path', 'original_name', 'mime_type', 'size', 'status', 'verified_by', 'verified_at', 'notes'])]
class MaidDocument extends Model
{
    use SoftDeletes;

    public function maid(): BelongsTo
    {
        return $this->belongsTo(Maid::class);
    }

    public function verifier(): BelongsTo
    {
        return $this->belongsTo(User::class, 'verified_by');
    }

    protected function casts(): array
    {
        return [
            'size' => 'integer',
            'verified_at' => 'datetime',
        ];
    }
}
