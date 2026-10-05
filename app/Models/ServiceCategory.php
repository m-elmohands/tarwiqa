<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

#[Fillable(['governorate_id', 'type_id', 'title', 'subtitle', 'slug', 'is_active'])]
class ServiceCategory extends Model implements HasMedia
{
    use InteractsWithMedia, SoftDeletes;

    public function type(): BelongsTo
    {
        return $this->widget();
    }

    public function widget(): BelongsTo
    {
        return $this->belongsTo(Widget::class, 'type_id');
    }

    public function governorate(): BelongsTo
    {
        return $this->belongsTo(Governorate::class);
    }

    public function services(): HasMany
    {
        return $this->hasMany(Service::class, 'category_id');
    }

    /** @deprecated Use services(). */
    public function widgets(): HasMany
    {
        return $this->services();
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('logo')
            ->acceptsMimeTypes(['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'])
            ->singleFile();
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('thumb')->width(320)->height(320)->nonQueued();
    }

    protected function casts(): array
    {
        return ['is_active' => 'boolean'];
    }
}
