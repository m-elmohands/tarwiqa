<?php

namespace App\Contracts\Services;

use App\Models\Product;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;

interface ProductManagementInterface
{
    public function dataTableQuery(?int $categoryId, ?int $cityId): Builder;

    public function categories(): Collection;

    public function cities(): Collection;

    public function create(array $data, ?UploadedFile $logo = null): Product;

    public function update(Product $product, array $data, ?UploadedFile $logo = null): Product;

    public function delete(Product $product): void;
}
