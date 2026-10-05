<?php

namespace App\Services;

use App\Contracts\Repositories\CityRepositoryInterface;
use App\Contracts\Services\CityServiceInterface;
use App\Models\City;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;

class CityService implements CityServiceInterface
{
    public function __construct(private readonly CityRepositoryInterface $cities) {}

    public function list(?string $search = null): LengthAwarePaginator
    {
        return $this->cities->paginate($search);
    }

    public function dataTableQuery(): Builder
    {
        return $this->cities->dataTableQuery();
    }

    public function create(array $data): City
    {
        return $this->cities->create($data);
    }

    public function update(City $city, array $data): City
    {
        return $this->cities->update($city, $data);
    }

    public function delete(City $city): void
    {
        $this->cities->delete($city);
    }
}
