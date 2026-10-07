<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\AddCartItemRequest;
use App\Http\Requests\Api\UpdateCartItemRequest;
use App\Http\Resources\Api\CartResource;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use App\Models\Service;
use App\Models\ServicePackage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function show(Request $request): JsonResponse
    {
        return apiResponse(data: $this->resource($request->user()), message: 'Cart retrieved successfully.');
    }

    public function store(AddCartItemRequest $request): JsonResponse
    {
        $user = $request->user();
        $data = $request->validated();
        [$column, $model, $price] = $this->itemDetails($data['item_type'], $data['item_id']);
        $cart = Cart::firstOrCreate(['user_id' => $user->id]);
        $item = $cart->items()->where($column, $model->id)->first();

        if ($item) {
            $item->increment('quantity', $data['quantity'] ?? 1);
        } else {
            $cart->items()->create([
                $column => $model->id,
                'quantity' => $data['quantity'] ?? 1,
                'unit_price' => $price,
                'metadata' => ['title' => $model->title],
            ]);
        }

        return apiResponse(data: $this->resource($user), message: 'Item added to cart.', status: 201);
    }

    public function update(UpdateCartItemRequest $request, int $item): JsonResponse
    {
        $cartItem = CartItem::query()->whereHas('cart', fn ($query) => $query->where('user_id', $request->user()->id))->findOrFail($item);
        $cartItem->update(['quantity' => $request->validated('quantity')]);

        return apiResponse(data: $this->resource($request->user()), message: 'Cart item updated successfully.');
    }

    public function destroy(Request $request, int $item): JsonResponse
    {
        $cartItem = CartItem::query()->whereHas('cart', fn ($query) => $query->where('user_id', $request->user()->id))->findOrFail($item);
        $cartItem->delete();

        return apiResponse(data: $this->resource($request->user()), message: 'Cart item removed successfully.');
    }

    public function clear(Request $request): JsonResponse
    {
        $cart = Cart::query()->where('user_id', $request->user()->id)->first();
        $cart?->items()->delete();

        return apiResponse(data: $this->resource($request->user()), message: 'Cart cleared successfully.');
    }

    private function resource($user): array
    {
        $cart = Cart::query()->firstOrCreate(['user_id' => $user->id]);
        $cart->load(['items.service', 'items.product', 'items.package']);

        return (new CartResource($cart))->resolve();
    }

    private function itemDetails(string $type, int $id): array
    {
        return match ($type) {
            'service' => $this->details('service_id', Service::query()->where('is_active', true)->findOrFail($id), 'base_price'),
            'product' => $this->details('product_id', Product::query()->where('is_active', true)->findOrFail($id), 'base_price'),
            'package' => $this->details('package_id', ServicePackage::query()->where('is_active', true)->findOrFail($id), 'price'),
        };
    }

    private function details(string $column, object $model, string $priceColumn): array
    {
        return [$column, $model, (float) $model->{$priceColumn}];
    }
}
