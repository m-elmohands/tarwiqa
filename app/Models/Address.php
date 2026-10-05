<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Address extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'city_id',
        'governorate_id',
        'location_id',
        'label',
        'contact_name',
        'contact_phone',
        'street',
        'building',
        'floor',
        'apartment',
        'landmark',
        'is_default',
    ];

    public function city(): BelongsTo
    {
        return $this->belongsTo(City::class);
    }

    public function governorate(): BelongsTo
    {
        return $this->belongsTo(Governorate::class);
    }

    public function location(): BelongsTo
    {
        return $this->belongsTo(Location::class);
    }

    public function area(): BelongsTo
    {
        return $this->belongsTo(Area::class);
    }
}
