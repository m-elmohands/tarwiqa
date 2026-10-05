<?php

namespace App\Repositories;

use App\Contracts\Repositories\CatalogRepositoryInterface;
use App\Models\ServiceCategory;
use App\Models\ServicePackage;
use App\Models\ServiceType;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use InvalidArgumentException;

class EloquentCatalogRepository implements CatalogRepositoryInterface
{
    public function query(string $resource): Builder
    {
        $query = $this->modelClass($resource)::query();

        return $resource === 'service-categories' ? $query->with('type:id,title') : $query;
    }

    public function find(string $resource, int $id): Model
    {
        return $this->modelClass($resource)::query()->findOrFail($id);
    }

    public function create(string $resource, array $data): Model
    {
        return $this->modelClass($resource)::query()->create($data);
    }

    public function update(Model $model, array $data): Model
    {
        $model->update($data);

        return $model->refresh();
    }

    public function delete(Model $model): void
    {
        $model->delete();
    }

    public function serviceTypes(): Collection
    {
        return ServiceType::query()->where('is_active', true)->orderBy('title')->get(['id', 'title']);
    }

    private function modelClass(string $resource): string
    {
        return match ($resource) {
            'service-types' => ServiceType::class,
            'service-categories' => ServiceCategory::class,
            'packages' => ServicePackage::class,
            default => throw new InvalidArgumentException('Unsupported catalog resource.'),
        };
    }
}
