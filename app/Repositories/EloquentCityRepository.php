<?php

namespace App\Repositories;

use App\Contracts\Repositories\CityRepositoryInterface;
use App\Models\City;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;

class EloquentCityRepository implements CityRepositoryInterface
{
    public function paginate(?string $search = null, int $perPage = 15): LengthAwarePaginator
    {
        return City::query()
            ->withCount('users')
            ->when($search, fn ($query) => $query->where(function ($query) use ($search): void {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('name_ar', 'like', "%{$search}%");
            }))
            ->orderBy('name')
            ->paginate($perPage)
            ->withQueryString();
    }

    public function dataTableQuery(): Builder
    {
        return City::query()->withCount('users');
    }

    public function create(array $data): City
    {
        return City::query()->create($data);
    }

    public function update(City $city, array $data): City
    {
        $city->update($data);

        return $city->refresh();
    }

    public function delete(City $city): void
    {
        $city->delete();
    }
}
