<?php

namespace App\Services;

use App\Contracts\Repositories\ProductRepositoryInterface;
use App\Contracts\Services\MediaServiceInterface;
use App\Contracts\Services\ProductManagementInterface;
use App\Models\Product;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;

class ProductManagement implements ProductManagementInterface
{
    public function __construct(
        private readonly ProductRepositoryInterface $products,
        private readonly MediaServiceInterface $media,
    ) {}

    public function dataTableQuery(?int $categoryId, ?int $cityId): Builder
    {
        return $this->products->dataTableQuery($categoryId, $cityId);
    }

    public function categories(): Collection
    {
        return $this->products->categories();
    }

    public function cities(): Collection
    {
        return $this->products->cities();
    }

    public function create(array $data, ?UploadedFile $logo = null): Product
    {
        $product = $this->products->create($data);
        if ($logo) {
            $this->media->replace($product, $logo, 'logo');
        }

        return $product;
    }

    public function update(Product $product, array $data, ?UploadedFile $logo = null): Product
    {
        $product = $this->products->update($product, $data);
        if ($logo) {
            $this->media->replace($product, $logo, 'logo');
        }

        return $product;
    }

    public function delete(Product $product): void
    {
        $this->products->delete($product);
    }
}
