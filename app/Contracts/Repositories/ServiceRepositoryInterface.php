<?php

namespace App\Contracts\Repositories;

use App\Models\Service;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;

interface ServiceRepositoryInterface
{
    public function paginate(?string $search, ?int $categoryId, ?int $cityId, int $perPage = 15): LengthAwarePaginator;

    public function dataTableQuery(?int $categoryId, ?int $cityId): Builder;

    public function categories(): Collection;

    public function cities(): Collection;

    public function create(array $data): Service;

    public function update(Service $service, array $data): Service;

    public function delete(Service $service): void;
}
