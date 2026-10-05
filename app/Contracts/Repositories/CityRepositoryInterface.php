<?php

namespace App\Contracts\Repositories;

use App\Models\City;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;

interface CityRepositoryInterface
{
    public function paginate(?string $search = null, int $perPage = 15): LengthAwarePaginator;

    public function dataTableQuery(): Builder;

    public function create(array $data): City;

    public function update(City $city, array $data): City;

    public function delete(City $city): void;
}
