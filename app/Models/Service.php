<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

#[Fillable(['category_id', 'city_id', 'governorate_id', 'title', 'slug', 'description', 'base_price', 'is_active'])]
class Service extends Model implements HasMedia
{
    use InteractsWithMedia, SoftDeletes;

    protected $table = 'services';

    public function category(): BelongsTo
    {
        return $this->belongsTo(ServiceCategory::class, 'category_id');
    }

    public function city(): BelongsTo
    {
        return $this->belongsTo(City::class);
    }

    public function governorate(): BelongsTo
    {
        return $this->belongsTo(Governorate::class);
    }

    public function packages(): BelongsToMany
    {
        return $this->belongsToMany(ServicePackage::class, 'package_services', 'service_id', 'package_id');
    }

    public function orders(): BelongsToMany
    {
        return $this->belongsToMany(Order::class, 'order_services', 'service_id', 'order_id');
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('logo')->acceptsMimeTypes(['image/jpeg', 'image/png', 'image/webp'])->singleFile();
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('thumb')->width(320)->height(320)->nonQueued();
    }

    protected function casts(): array
    {
        return ['base_price' => 'decimal:2', 'is_active' => 'boolean'];
    }
}
