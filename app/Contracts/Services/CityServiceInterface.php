<?php

namespace App\Contracts\Services;

use App\Models\City;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;

interface CityServiceInterface
{
    public function list(?string $search = null): LengthAwarePaginator;

    public function dataTableQuery(): Builder;

    public function create(array $data): City;

    public function update(City $city, array $data): City;

    public function delete(City $city): void;
}
