<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\CatalogFilterRequest;
use App\Http\Resources\Api\ProductResource;
use App\Http\Resources\Api\ServiceCategoryResource;
use App\Http\Resources\Api\ServiceResource;
use App\Http\Resources\Api\ServiceTypeResource;
use App\Models\City;
use App\Models\Product;
use App\Models\Service;
use App\Models\ServiceCategory;
use App\Models\ServiceType;
use App\Support\CatalogCache;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class CatalogController extends Controller
{
    private const TTL = 300;

    public function cities(): JsonResponse
    {
        return $this->cached('cities', fn () => City::query()->where('is_active', true)->orderBy('name')->get());
    }

    public function types(Request $request): JsonResponse
    {
        return $this->cached('types', fn () => ServiceTypeResource::collection(
            ServiceType::query()->where('is_active', true)->orderBy('title')->get()
        )->resolve($request));
    }

    public function categories(Request $request, int $typeId): JsonResponse
    {
        return $this->cached("categories:type:{$typeId}", fn () => ServiceCategoryResource::collection(ServiceCategory::query()->where('type_id', $typeId)->where('is_active', true)->orderBy('title')->get())->resolve($request));
    }

    public function services(CatalogFilterRequest $request): JsonResponse
    {
        $categoryId = $request->validated('category_id');
        $cityId = $request->validated('city_id');

        return $this->cached(
            'services:category:'.($categoryId ?? 'all').':city:'.($cityId ?? 'all'),
            fn () => ServiceResource::collection(
                Service::query()->with(['category:id,title', 'city:id,name'])
                    ->where('is_active', true)
                    ->when($categoryId, fn ($q) => $q->where('category_id', $categoryId))
                    ->when($cityId, fn ($q) => $q->where('city_id', $cityId))
                    ->orderBy('title')->get()
            )->resolve($request)
        );
    }

    public function service(Request $request, int $serviceId): JsonResponse
    {
        return $this->cached("service:{$serviceId}", fn () => (new ServiceResource(Service::query()->with(['category:id,title', 'city:id,name'])->where('is_active', true)->findOrFail($serviceId)))->resolve($request));
    }

    public function products(CatalogFilterRequest $request): JsonResponse
    {
        $categoryId = $request->validated('category_id');
        $cityId = $request->validated('city_id');

        return $this->cached('products:category:'.($categoryId ?? 'all').':city:'.($cityId ?? 'all'), fn () => ProductResource::collection(Product::query()->with(['category:id,title', 'city:id,name'])->where('is_active', true)->when($categoryId, fn ($q) => $q->where('category_id', $categoryId))->when($cityId, fn ($q) => $q->where('city_id', $cityId))->orderBy('title')->get())->resolve($request));
    }

    public function product(Request $request, int $productId): JsonResponse
    {
        return $this->cached("product:{$productId}", fn () => (new ProductResource(Product::query()->with(['category:id,title', 'city:id,name'])->where('is_active', true)->findOrFail($productId)))->resolve($request));
    }

    private function cached(string $key, callable $resolver): JsonResponse
    {
        return apiResponse(data: Cache::remember(CatalogCache::key($key), self::TTL, $resolver), message: 'Catalog data retrieved successfully.');
    }
}
