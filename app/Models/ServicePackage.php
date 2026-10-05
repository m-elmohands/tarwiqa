<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable(['governorate_id', 'title', 'slug', 'description', 'price', 'discount_value', 'discount_type', 'is_active', 'starts_at', 'ends_at'])]
class ServicePackage extends Model
{
    use SoftDeletes;

    protected $table = 'packages';

    public function governorate(): BelongsTo
    {
        return $this->belongsTo(Governorate::class);
    }

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'discount_value' => 'decimal:2',
            'is_active' => 'boolean',
            'starts_at' => 'datetime',
            'ends_at' => 'datetime',
        ];
    }

    public function services(): BelongsToMany
    {
        return $this->belongsToMany(Service::class, 'package_services', 'package_id', 'service_id')
            ->withPivot(['quantity', 'unit_price'])
            ->withTimestamps();
    }

    /** @deprecated Use services(). */
    public function widgets(): BelongsToMany
    {
        return $this->services();
    }
}
