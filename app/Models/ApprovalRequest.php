<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['type', 'subject', 'approvable_type', 'approvable_id', 'requested_by', 'priority', 'status', 'before_data', 'after_data', 'reason', 'evidence_path', 'decided_by', 'decided_at', 'decision_note'])]
class ApprovalRequest extends Model
{
    public function requester(): BelongsTo
    {
        return $this->belongsTo(User::class, 'requested_by');
    }

    public function decider(): BelongsTo
    {
        return $this->belongsTo(User::class, 'decided_by');
    }

    protected function casts(): array
    {
        return [
            'before_data' => 'array',
            'after_data' => 'array',
            'decided_at' => 'datetime',
        ];
    }
}
