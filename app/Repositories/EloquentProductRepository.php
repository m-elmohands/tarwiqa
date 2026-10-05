<?php

namespace App\Repositories;

use App\Contracts\Repositories\ProductRepositoryInterface;
use App\Models\City;
use App\Models\Product;
use App\Models\ServiceCategory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;

class EloquentProductRepository implements ProductRepositoryInterface
{
    public function dataTableQuery(?int $categoryId, ?int $cityId): Builder
    {
        return Product::query()
            ->with(['category:id,title', 'city:id,name', 'media'])
            ->when($categoryId, fn (Builder $query) => $query->where('category_id', $categoryId))
            ->when($cityId, fn (Builder $query) => $query->where('city_id', $cityId));
    }

    public function categories(): Collection
    {
        return ServiceCategory::query()->where('is_active', true)->orderBy('title')->get(['id', 'title']);
    }

    public function cities(): Collection
    {
        return City::query()->where('is_active', true)->orderBy('name')->get(['id', 'name']);
    }

    public function create(array $data): Product
    {
        return Product::query()->create($data);
    }

    public function update(Product $product, array $data): Product
    {
        $product->update($data);

        return $product->refresh();
    }

    public function delete(Product $product): void
    {
        $product->delete();
    }
}
