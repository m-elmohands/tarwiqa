<?php

namespace App\Http\Controllers\Api\V1;

use App\Contracts\Services\OrderCheckoutServiceInterface;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\CancelOrderRequest;
use App\Http\Requests\Api\CheckoutOrderRequest;
use App\Http\Requests\Api\ListOrdersRequest;
use App\Http\Resources\Api\OrderResource;
use App\Models\Order;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function __construct(private readonly OrderCheckoutServiceInterface $checkout) {}

    public function checkout(CheckoutOrderRequest $request): JsonResponse
    {
        $order = $this->checkout->checkout($request->user(), $request->validated());

        return apiResponse(data: (new OrderResource($order))->resolve($request), message: 'Order created successfully.', status: 201);
    }

    public function cancel(CancelOrderRequest $request): JsonResponse
    {
        $order = $this->checkout->cancel($request->user(), $request->integer('order_id'), $request->validated('reason'));

        return apiResponse(data: (new OrderResource($order))->resolve($request), message: 'Order cancelled successfully.');
    }

    public function index(ListOrdersRequest $request): JsonResponse
    {
        $orders = Order::query()->where('customer_id', $request->user()->id)->with(['address.city:id,name', 'package:id,title', 'lines'])->when($request->validated('status'), fn ($query, $status) => $query->where('status', $status))->latest()->paginate($request->integer('per_page', 15));

        return apiResponse(
            data: OrderResource::collection($orders->getCollection())->resolve($request),
            message: 'Orders retrieved successfully.',
            meta: [
                'current_page' => $orders->currentPage(),
                'last_page' => $orders->lastPage(),
                'per_page' => $orders->perPage(),
                'total' => $orders->total(),
            ],
        );
    }

    public function statistics(): JsonResponse
    {
        $query = Order::query()->where('customer_id', request()->user()->id);
        $byStatus = (clone $query)->select('status', DB::raw('count(*) aggregate'))->groupBy('status')->pluck('aggregate', 'status')->map(fn ($count) => (int) $count);

        return apiResponse(data: ['total' => (clone $query)->count(), 'total_spent' => (float) (clone $query)->where('payment_status', 'paid')->sum('total'), 'by_status' => $byStatus], message: 'Order statistics retrieved successfully.');
    }

    public function show(int $orderId): JsonResponse
    {
        $order = Order::query()->where('customer_id', request()->user()->id)->with(['address.city:id,name', 'package:id,title', 'lines'])->findOrFail($orderId);

        return apiResponse(data: (new OrderResource($order))->resolve(request()), message: 'Order retrieved successfully.');
    }
}
