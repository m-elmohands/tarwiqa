<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable(['conversation_id', 'sender_id', 'reply_to_id', 'body', 'type', 'metadata', 'edited_at'])]
class Message extends Model
{
    use SoftDeletes;

    public function conversation(): BelongsTo
    {
        return $this->belongsTo(Conversation::class);
    }

    public function sender(): BelongsTo
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    protected function casts(): array
    {
        return ['metadata' => 'array', 'edited_at' => 'datetime'];
    }
}
