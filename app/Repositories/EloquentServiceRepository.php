<?php

namespace App\Repositories;

use App\Contracts\Repositories\ServiceRepositoryInterface;
use App\Models\City;
use App\Models\Service;
use App\Models\ServiceCategory;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;

class EloquentServiceRepository implements ServiceRepositoryInterface
{
    public function paginate(?string $search, ?int $categoryId, ?int $cityId, int $perPage = 15): LengthAwarePaginator
    {
        return Service::query()
            ->with(['category:id,title', 'city:id,name'])
            ->when($search, fn ($query) => $query->where(function ($query) use ($search): void {
                $query->where('title', 'like', "%{$search}%")
                    ->orWhere('slug', 'like', "%{$search}%");
            }))
            ->when($categoryId, fn ($query) => $query->where('category_id', $categoryId))
            ->when($cityId, fn ($query) => $query->where('city_id', $cityId))
            ->latest()
            ->paginate($perPage)
            ->withQueryString();
    }

    public function dataTableQuery(?int $categoryId, ?int $cityId): Builder
    {
        return Service::query()
            ->with(['category:id,title', 'city:id,name', 'media'])
            ->when($categoryId, fn (Builder $query) => $query->where('category_id', $categoryId))
            ->when($cityId, fn (Builder $query) => $query->where('city_id', $cityId));
    }

    public function categories(): Collection
    {
        return ServiceCategory::query()->where('is_active', true)->orderBy('title')->get(['id', 'title']);
    }

    public function cities(): Collection
    {
        return City::query()->where('is_active', true)->orderBy('name')->get(['id', 'name']);
    }

    public function create(array $data): Service
    {
        return Service::query()->create($data);
    }

    public function update(Service $service, array $data): Service
    {
        $service->update($data);

        return $service->refresh();
    }

    public function delete(Service $service): void
    {
        $service->delete();
    }
}
