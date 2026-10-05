<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable([
    'title',
    'slot_name',
    'destination',
    'description',
    'image_url',
    'starts_at',
    'end_date',
    'sort_order',
    'impressions',
    'clicks',
    'archived_at',
    'status',
])]

class Ad extends Model
{
    use HasFactory;

    protected function casts(): array
    {
        return [
            'starts_at' => 'datetime',
            'end_date' => 'datetime',
            'archived_at' => 'datetime',
            'impressions' => 'integer',
            'clicks' => 'integer',
            'sort_order' => 'integer',
        ];
    }

    public function events(): HasMany
    {
        return $this->hasMany(AdEvent::class);
    }
}
