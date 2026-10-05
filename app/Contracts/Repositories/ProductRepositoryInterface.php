<?php

namespace App\Contracts\Repositories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;

interface ProductRepositoryInterface
{
    public function dataTableQuery(?int $categoryId, ?int $cityId): Builder;

    public function categories(): Collection;

    public function cities(): Collection;

    public function create(array $data): Product;

    public function update(Product $product, array $data): Product;

    public function delete(Product $product): void;
}
