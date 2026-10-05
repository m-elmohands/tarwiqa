<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable([
    'partner_id',
    'name',
    'phone',
    'address',
    'gender',
    'status',
    'off_day',
    'doc_type',
    'start_date',
    'age',
    'notes',
    'personal_id',
    'salary',
])]

class Maid extends Model
{
    use HasFactory;

    public $incrementing = false;

    protected $keyType = 'string';

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->id)) {
                do {
                    $randomId = 'MD-'.str_pad(rand(1, 9999), 4, '0', STR_PAD_LEFT);
                } while (static::where('id', $randomId)->exists());

                $model->id = $randomId;
            }
        });
    }

    public function orders(): BelongsToMany
    {
        return $this->belongsToMany(Order::class, 'order_maids');
    }

    public function partner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'partner_id');
    }

    public function documents(): HasMany
    {
        return $this->hasMany(MaidDocument::class);
    }

    public function availability(): HasMany
    {
        return $this->hasMany(MaidAvailability::class);
    }
}
