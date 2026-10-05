<?php

namespace App\Contracts\Services;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;

interface CatalogManagementInterface
{
    public function query(string $resource): Builder;

    public function find(string $resource, int $id): Model;

    public function create(string $resource, array $data, ?UploadedFile $logo = null): Model;

    public function update(string $resource, Model $model, array $data, ?UploadedFile $logo = null): Model;

    public function delete(Model $model): void;

    public function serviceTypes(): Collection;
}
