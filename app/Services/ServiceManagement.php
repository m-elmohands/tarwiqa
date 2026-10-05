<?php

namespace App\Services;

use App\Contracts\Repositories\ServiceRepositoryInterface;
use App\Contracts\Services\MediaServiceInterface;
use App\Contracts\Services\ServiceManagementInterface;
use App\Models\Service;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;

class ServiceManagement implements ServiceManagementInterface
{
    public function __construct(
        private readonly ServiceRepositoryInterface $services,
        private readonly MediaServiceInterface $media,
    ) {}

    public function list(?string $search, ?int $categoryId, ?int $cityId): LengthAwarePaginator
    {
        return $this->services->paginate($search, $categoryId, $cityId);
    }

    public function dataTableQuery(?int $categoryId, ?int $cityId): Builder
    {
        return $this->services->dataTableQuery($categoryId, $cityId);
    }

    public function categories(): Collection
    {
        return $this->services->categories();
    }

    public function cities(): Collection
    {
        return $this->services->cities();
    }

    public function create(array $data, ?UploadedFile $logo = null): Service
    {
        $service = $this->services->create($data);

        if ($logo) {
            $this->media->replace($service, $logo, 'logo');
        }

        return $service;
    }

    public function update(Service $service, array $data, ?UploadedFile $logo = null): Service
    {
        $service = $this->services->update($service, $data);

        if ($logo) {
            $this->media->replace($service, $logo, 'logo');
        }

        return $service;
    }

    public function delete(Service $service): void
    {
        $this->services->delete($service);
    }
}
