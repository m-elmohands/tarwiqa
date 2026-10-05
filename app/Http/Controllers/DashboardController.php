<?php

namespace App\Http\Controllers;

use App\Models\Faq;
use App\Models\Maid;
use App\Models\Order;
use App\Models\OrderExtra;
use App\Models\Product;
use App\Models\User;
use App\Models\Wallet;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\View\View;

class DashboardController extends Controller
{
    private const OVERVIEW_CACHE_KEY = 'admin.dashboard.overview.v1';

    private const OVERVIEW_CACHE_SECONDS = 30;

    public function redirect(Request $request): RedirectResponse
    {
        return redirect()->route($request->user()->dashboardRoute());
    }

    public function index(): View
    {
        $customers = User::where('role', 'customer');
        $supporters = User::where('role', 'supporter');
        $partners = User::where('role', 'partner');

        $overview = [
            'metrics' => [
                'employees' => [
                    'active' => $partners->where('status', 'active')->count(),
                ],
                'users' => [
                    'total' => $customers->count(),
                    'active' => $customers->where('status', 'active')->count(),
                    'restricted' => $customers->where('status', 'inactive')->count(),
                    'banned' => $customers->where('status', 'suspended')->count(),
                    'male' => $customers->where('gender', 'male')->count(),
                    'female' => $customers->where('gender', 'female')->count(),
                    'android' => $customers->where('platform', 'android')->count(),
                    'ios' => $customers->where('platform', 'ios')->count(),
                    'ordered' => $customers->whereHas('orders')->count(),
                ],
                'orders' => [
                    'all' => Order::query()->count(),
                    'today' => Order::query()->whereDate('created_at', today())->count(),
                    'cancelled_today' => Order::query()->whereIn('status', ['cancelled', 'canceled'])->whereDate('cancelled_at', today())->count(),
                    'under_review' => Order::query()->where('status', 'under_review')->count(),
                    'accepted' => Order::query()->whereIn('status', ['accepted', 'accepted_orders'])->count(),
                    'done' => Order::query()->whereIn('status', ['completed', 'done', 'done_orders'])->count(),
                    'cancelled' => Order::query()->whereIn('status', ['cancelled', 'canceled'])->count(),
                    'last_month' => Order::whereBetween('created_at', [
                        Carbon::now()->subMonth()->startOfMonth(),
                        Carbon::now()->subMonth()->endOfMonth(),
                    ])->count(),
                    'this_month' => Order::whereBetween('created_at', [
                        Carbon::now()->startOfMonth(),
                        Carbon::now()->endOfMonth(),
                    ])->count(),
                ],
                'engagement' => [
                    'shares' => (int) DB::table('app_shares')->count(),
                    'inquiries' => (int) DB::table('inquiry_logs')->count(),
                    'ordered_today' => (int) User::where('role', 'customer')->whereHas('orders', fn ($query) => $query->whereDate('created_at', today()))->count(),
                    'ordered_last_month' => (int) User::where('role', 'customer')->whereHas('orders', fn ($query) => $query->whereBetween('created_at', [Carbon::now()->subMonth()->startOfMonth(), Carbon::now()->subMonth()->endOfMonth()]))->count(),
                    'ordered_this_month' => (int) User::where('role', 'customer')->whereHas('orders', fn ($query) => $query->whereBetween('created_at', [Carbon::now()->startOfMonth(), Carbon::now()->endOfMonth()]))->count(),
                ],
                'pending_approvals' => DB::table('approval_requests')->where('status', 'pending')->count(),
                'active_partners' => User::where('role', User::ROLE_PARTNER)->where('status', 'active')->count(),
                'revenue' => Order::where('status', 'completed')->sum('total'),
                'maids' => [
                    'total' => Maid::query()->count(),
                    'active' => Maid::query()->where('status', 'active')->count(),
                ],
                'total_order_amount' => Order::where('status', 'completed')->sum('total'),
                'total_order_price' => Order::where('status', 'completed')->sum('subtotal'),
                'total_maids_revenue' => Maid::query()->sum('salary'),
                'total_discounts' => Order::where('status', 'completed')->sum('discount_total'),
                'total_wallet' => Wallet::query()->sum('balance'),
                // 'active_products' => Product::query()->where('is_active', true)->count(),
                // 'published_faqs' => Faq::query()->where('is_active', true)->count(),
            ],
            'orderCounts' => Order::query()
                ->select('status', DB::raw('count(*) as aggregate'))
                ->groupBy('status')
                ->pluck('aggregate', 'status')
                ->map(fn ($count): int => (int) $count)
                ->all(),
            'recentOrders' => Order::query()->with('customer:id,name')->latest()->limit(6)
                ->get(['id', 'customer_id', 'status', 'payment_status', 'total', 'service_date', 'created_at'])
                ->map(fn (Order $order): array => [
                    'id' => $order->id,
                    'customer_name' => $order->customer?->name ?? 'Deleted customer',
                    'status' => $order->status,
                    'total' => (float) $order->total,
                    'service_date' => $order->service_date->format('d M Y'),
                ])
                ->all(),

            'topMaids' => Maid::withCount('orders')
                ->orderByDesc('orders_count')
                ->limit(10)
                ->get(['name', 'orders_count'])->where('orders_count', '!=', 0),
            'topExtras' => OrderExtra::query()
                ->select('extra_id', 'name')
                ->selectRaw('SUM(quantity) as usage_count')
                ->groupBy('extra_id', 'name')
                ->orderByDesc('usage_count')
                ->limit(10)
                ->get(),
        ];

        return view('dashboard', $overview);
    }

    public function profile(): View
    {
        return view('auth.profile');
    }

    public function supporter(): View
    {
        return view('dashboards.supporter');
    }

    public function partner(): View
    {
        return view('dashboards.partner');
    }
}
