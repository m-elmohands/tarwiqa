<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderReview;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\View\View;
use Yajra\DataTables\Facades\DataTables;

class OrderViewController extends Controller
{
    public function accepted(): View
    {
        return view('orders.accepted', ['metrics' => $this->queueMetrics(['accepted', 'accepted_orders'])]);
    }

    public function acceptedData(): JsonResponse
    {
        return $this->ordersData(Order::query()->whereIn('status', ['accepted', 'accepted_orders']));
    }

    public function done(): View
    {
        $orders = Order::query()->whereIn('status', ['completed', 'done', 'done_orders']);
        $durations = (clone $orders)->whereNotNull('started_at')->whereNotNull('completed_at')->get(['started_at', 'completed_at']);
        $averageMinutes = $durations->isEmpty() ? null : (int) round($durations->avg(fn (Order $order): float => $order->started_at->diffInMinutes($order->completed_at)));
        $topGovernorate = (clone $orders)->join('addresses', 'orders.address_id', '=', 'addresses.id')->join('governorates', 'addresses.governorate_id', '=', 'governorates.id')->selectRaw('governorates.name, COUNT(*) as aggregate')->groupBy('governorates.name')->orderByDesc('aggregate')->value('name');

        return view('orders.done', ['metrics' => [
            'completed_this_week' => (clone $orders)->whereBetween('completed_at', [now()->startOfWeek(), now()->endOfWeek()])->count(),
            'total_revenue' => (float) (clone $orders)->sum('total'),
            'top_city' => $topGovernorate ?: '—',
            'average_completion' => $averageMinutes ? intdiv($averageMinutes, 60).'h '.($averageMinutes % 60).'m' : '—',
        ]]);
    }

    public function doneData(): JsonResponse
    {
        return $this->ordersData(Order::query()->whereIn('status', ['completed', 'done', 'done_orders']));
    }

    public function cancelled(): View
    {
        $cancelled = Order::query()->whereIn('status', ['cancelled', 'canceled']);

        return view('orders.cancelled', ['metrics' => [
            'cancelled_orders' => (clone $cancelled)->count(),
            'customer_cancellations' => (clone $cancelled)->whereNotNull('cancellation_reason')->where('cancellation_reason', 'like', '%customer%')->count(),
            'ops_rejections' => (clone $cancelled)->where(function ($query): void {
                $query->whereNull('cancellation_reason')->orWhere('cancellation_reason', 'not like', '%customer%');
            })->count(),
            'refunded_value' => (float) (clone $cancelled)->where('payment_status', 'refunded')->sum('wallet_amount'),
        ]]);
    }

    public function cancelledData(): JsonResponse
    {
        return $this->ordersData(Order::query()->whereIn('status', ['cancelled', 'canceled']));
    }

    public function reviews(): View
    {
        $reviews = OrderReview::query()->where('created_at', '>=', now()->subDays(30));

        return view('orders.reviews', ['metrics' => [
            'total_reviews' => (clone $reviews)->count(),
            'provider_rating' => number_format((float) ((clone $reviews)->avg('rating') ?: 0), 1).' / 5',
            'customer_service_rating' => '—',
            'low_rating_alerts' => (int) OrderReview::whereDate('created_at', today())->where('rating', '<', 3)->count(),
        ]]);
    }

    public function reviewsData(): JsonResponse
    {
        return DataTables::eloquent(OrderReview::query()->with(['customer:id,name,email', 'order:id,service_date,total,status']))
            ->addColumn('order_reference', fn (OrderReview $review): string => '#ORD-'.str_pad((string) $review->order_id, 6, '0', STR_PAD_LEFT))
            ->addColumn('customer_name', fn (OrderReview $review): string => $review->customer?->name ?? 'Deleted customer')
            ->addColumn('service_date', fn (OrderReview $review): string => $review->order?->service_date?->format('d M Y') ?? '—')
            ->addColumn('rating_label', fn (OrderReview $review): string => $review->rating.'/5')
            ->filter(function (Builder $query): void {
                $search = trim((string) request('search.value'));
                $query->when($search, fn (Builder $query) => $query->where(fn (Builder $searchQuery) => $searchQuery
                    ->where('comment', 'like', "%{$search}%")
                    ->orWhere('status', 'like', "%{$search}%")
                    ->orWhereHas('customer', fn (Builder $customer) => $customer->where('name', 'like', "%{$search}%"))));
            }, true)
            ->toJson();
    }

    private function ordersData(Builder $query): JsonResponse
    {
        return DataTables::eloquent($query->with([
            'customer:id,name,email',
            'partner:id,name',
            'address.city:id,name',
            'package:id,title',
            'lines:id,order_id,name',
        ]))
            ->addColumn('order_reference', fn (Order $order): string => '#ORD-'.str_pad((string) $order->id, 6, '0', STR_PAD_LEFT))
            ->addColumn('customer_name', fn (Order $order): string => $order->customer?->name ?? 'Deleted customer')
            ->addColumn('partner_name', fn (Order $order): string => $order->partner?->name ?? 'Unassigned')
            ->addColumn('city_name', fn (Order $order): string => $order->address?->governorate?->name ?? $order->address?->city?->name ?? 'Unassigned')
            ->addColumn('package_title', fn (Order $order): string => $order->package?->title ?? 'Custom order')
            ->addColumn('service_names', fn (Order $order): string => $order->lines->pluck('name')->join(', ') ?: '—')
            ->addColumn('service_date_label', fn (Order $order): string => $order->service_date?->format('d M Y') ?? '—')
            ->addColumn('completed_at_label', fn (Order $order): string => $order->completed_at?->format('d M Y, H:i') ?? '—')
            ->addColumn('cancelled_at_label', fn (Order $order): string => $order->cancelled_at?->format('d M Y, H:i') ?? '—')
            ->addColumn('cancellation_reason_label', fn (Order $order): string => $order->cancellation_reason ?: 'Not provided')
            ->addColumn('status_label', fn (Order $order): string => str($order->status)->replace('_', ' ')->title()->value())
            ->filter(function (Builder $query): void {
                $search = trim((string) request('search.value'));
                $query->when($search, function (Builder $query) use ($search): void {
                    $query->where(fn (Builder $searchQuery) => $searchQuery
                        ->where('status', 'like', "%{$search}%")
                        ->orWhere('cancellation_reason', 'like', "%{$search}%")
                        ->orWhere('id', ctype_digit($search) ? (int) $search : 0)
                        ->orWhereHas('customer', fn (Builder $customer) => $customer->where('name', 'like', "%{$search}%"))
                        ->orWhereHas('address.city', fn (Builder $city) => $city->where('name', 'like', "%{$search}%"))
                        ->orWhereHas('lines', fn (Builder $line) => $line->where('name', 'like', "%{$search}%")));
                });
            }, true)
            ->toJson();
    }

    /** @return array<string, int|float|string> */
    private function queueMetrics(array $statuses): array
    {
        $orders = Order::query()->whereIn('status', $statuses);

        return [
            'orders_in_queue' => (clone $orders)->count(),
            'highest_price' => (float) ((clone $orders)->max('total') ?: 0),
            'today_requests' => (clone $orders)->whereDate('created_at', today())->count(),
            'earliest_arrival' => (string) ((clone $orders)->whereNotNull('arrival_time')->orderBy('arrival_time')->value('arrival_time') ?: '—'),
        ];
    }
}
