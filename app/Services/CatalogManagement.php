<?php

namespace App\Services;

use App\Contracts\Repositories\CatalogRepositoryInterface;
use App\Contracts\Services\CatalogManagementInterface;
use App\Contracts\Services\MediaServiceInterface;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;

class CatalogManagement implements CatalogManagementInterface
{
    public function __construct(
        private readonly CatalogRepositoryInterface $catalog,
        private readonly MediaServiceInterface $media,
    ) {}

    public function query(string $resource): Builder
    {
        return $this->catalog->query($resource);
    }

    public function find(string $resource, int $id): Model
    {
        return $this->catalog->find($resource, $id);
    }

    public function create(string $resource, array $data, ?UploadedFile $logo = null): Model
    {
        $model = $this->catalog->create($resource, $data);
        $this->storeLogo($resource, $model, $logo);

        return $model;
    }

    public function update(string $resource, Model $model, array $data, ?UploadedFile $logo = null): Model
    {
        $model = $this->catalog->update($model, $data);
        $this->storeLogo($resource, $model, $logo);

        return $model;
    }

    public function delete(Model $model): void
    {
        $this->catalog->delete($model);
    }

    public function serviceTypes(): Collection
    {
        return $this->catalog->serviceTypes();
    }

    private function storeLogo(string $resource, Model $model, ?UploadedFile $logo): void
    {
        if ($logo && in_array($resource, ['service-types', 'service-categories'], true)) {
            $this->media->replace($model, $logo, 'logo');
        }
    }
}
