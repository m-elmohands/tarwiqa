<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable(['title', 'slug', 'reason', 'short_note', 'description', 'base_price', 'is_active', 'sort_order'])]
class Extra extends Model
{
    use SoftDeletes;

    protected function casts(): array
    {
        return [
            'base_price' => 'decimal:2',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    public function orders(): BelongsToMany
    {
        return $this->belongsToMany(Order::class, 'order_extras')
            ->withPivot(['name', 'quantity', 'unit_price', 'total', 'metadata'])
            ->withTimestamps();
    }
}
