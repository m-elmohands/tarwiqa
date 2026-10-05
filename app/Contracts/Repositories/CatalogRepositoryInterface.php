<?php

namespace App\Contracts\Repositories;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

interface CatalogRepositoryInterface
{
    public function query(string $resource): Builder;

    public function find(string $resource, int $id): Model;

    public function create(string $resource, array $data): Model;

    public function update(Model $model, array $data): Model;

    public function delete(Model $model): void;

    public function serviceTypes(): Collection;
}
