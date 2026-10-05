<?php

namespace App\Contracts\Services;

use App\Models\Service;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;

interface ServiceManagementInterface
{
    public function list(?string $search, ?int $categoryId, ?int $cityId): LengthAwarePaginator;

    public function dataTableQuery(?int $categoryId, ?int $cityId): Builder;

    public function categories(): Collection;

    public function cities(): Collection;

    public function create(array $data, ?UploadedFile $logo = null): Service;

    public function update(Service $service, array $data, ?UploadedFile $logo = null): Service;

    public function delete(Service $service): void;
}
