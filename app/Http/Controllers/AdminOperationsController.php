<?php

namespace App\Http\Controllers;

use App\Models\Ad;
use App\Models\ApprovalRequest;
use App\Models\AppShare;
use App\Models\Area;
use App\Models\Extra;
use App\Models\Governorate;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\View\View;

class AdminOperationsController extends Controller
{
    public function orders(string $status): View
    {
        abort_unless(in_array($status, ['under_review', 'waiting', 'scheduled', 'accepted', 'completed', 'cancelled'], true), 404);

        $statusMap = [
            'under_review' => ['under_review'],
            'waiting' => ['waiting', 'waiting_list'],
            'scheduled' => ['scheduled'],
            'accepted' => ['accepted', 'accepted_orders'],
            'completed' => ['completed', 'done', 'done_orders'],
            'cancelled' => ['cancelled', 'canceled'],
        ];

        $orders = Order::query()
            ->whereIn('status', $statusMap[$status])
            ->with(['customer:id,name,email', 'partner:id,name', 'address.city:id,name', 'package:id,title', 'lines:id,order_id,name'])
            ->latest()
            ->paginate(20)
            ->withQueryString();

        return view('orders.lifecycle', [
            'orders' => $orders,
            'status' => $status,
            'partners' => User::query()->where('role', User::ROLE_PARTNER)->where('status', 'active')->orderBy('name')->get(['id', 'name']),
            'metrics' => $this->queueMetrics($statusMap[$status]),
        ]);
    }

    public function updateOrder(Request $request, Order $order): RedirectResponse
    {
        $data = $request->validate([
            'status' => ['required', 'in:under_review,waiting,scheduled,accepted,completed,cancelled'],
            'partner_id' => ['nullable', 'integer', 'exists:users,id'],
            'internal_notes' => ['nullable', 'string', 'max:5000'],
        ]);

        $fromStatus = $order->status;
        $order->update([
            'status' => $data['status'],
            'partner_id' => $data['partner_id'] ?? null,
            'internal_notes' => $data['internal_notes'] ?? $order->internal_notes,
            'accepted_at' => $data['status'] === 'accepted' ? ($order->accepted_at ?? now()) : $order->accepted_at,
            'completed_at' => $data['status'] === 'completed' ? ($order->completed_at ?? now()) : $order->completed_at,
            'cancelled_at' => $data['status'] === 'cancelled' ? ($order->cancelled_at ?? now()) : $order->cancelled_at,
        ]);

        if ($fromStatus !== $data['status']) {
            DB::table('order_status_history')->insert([
                'order_id' => $order->id,
                'from_status' => $fromStatus,
                'to_status' => $data['status'],
                'note' => 'Updated from the admin order workflow.',
                'changed_by' => $request->user()->id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        return back()->with('status', 'Order workflow updated successfully.');
    }

    public function extras(): View
    {
        return view('extras.index', ['extras' => Extra::query()->latest()->paginate(20)->withQueryString(), 'metrics' => [
            'total_extras' => Extra::count(),
            'created_today' => Extra::whereDate('created_at', today())->count(),
            'top_reason' => Extra::query()->whereNotNull('reason')->select('reason')->selectRaw('COUNT(*) AS aggregate')->groupBy('reason')->orderByDesc('aggregate')->value('reason') ?: '—',
            'used_in_confirmations' => $this->extrasUsageRate(),
        ]]);
    }

    public function storeExtra(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'alpha_dash', 'max:255', 'unique:extras,slug'],
            'reason' => ['nullable', 'string', 'max:255'],
            'short_note' => ['nullable', 'string', 'max:24'],
            'description' => ['nullable', 'string'],
            'base_price' => ['required', 'numeric', 'min:0'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);
        Extra::create($data + ['is_active' => true]);

        return back()->with('status', 'Extra created successfully.');
    }

    public function toggleExtra(Extra $extra): RedirectResponse
    {
        $extra->update(['is_active' => ! $extra->is_active]);

        return back()->with('status', 'Extra status updated.');
    }

    private function extrasUsageRate(): string
    {
        $accepted = Order::whereIn('status', ['accepted', 'accepted_orders', 'completed', 'done', 'done_orders'])->count();
        if ($accepted === 0) {
            return '0%';
        }
        $used = DB::table('order_extras')->join('orders', 'orders.id', '=', 'order_extras.order_id')->whereIn('orders.status', ['accepted', 'accepted_orders', 'completed', 'done', 'done_orders'])->distinct('order_extras.order_id')->count('order_extras.order_id');

        return round(($used / $accepted) * 100).'%';
    }

    public function approvals(): View
    {
        return view('approvals.index', ['requests' => ApprovalRequest::query()->with(['requester:id,name', 'decider:id,name'])->latest()->paginate(20)->withQueryString(), 'metrics' => [
            'pending' => ApprovalRequest::where('status', 'pending')->count(),
            'urgent' => ApprovalRequest::where('status', 'pending')->where('created_at', '<', now()->subDay())->count(),
            'approved_today' => ApprovalRequest::where('status', 'approved')->whereDate('decided_at', today())->count(),
            'rejected_today' => ApprovalRequest::where('status', 'rejected')->whereDate('decided_at', today())->count(),
        ]]);
    }

    public function decideApproval(Request $request, ApprovalRequest $approvalRequest): RedirectResponse
    {
        $data = $request->validate([
            'status' => ['required', 'in:approved,rejected'],
            'decision_note' => ['required', 'string', 'max:2000'],
        ]);

        $approvalRequest->update([
            'status' => $data['status'],
            'decision_note' => $data['decision_note'],
            'decided_by' => $request->user()->id,
            'decided_at' => now(),
        ]);

        return back()->with('status', 'Approval decision recorded.');
    }

    public function coverage(): View
    {
        return view('coverage.index', [
            'governorates' => Governorate::query()->withCount('areas')->with('areas')->orderBy('name')->get(),
            'metrics' => [
                'total_governorates' => Governorate::count(),
                'total_locations' => Area::count(),
                'most_covered' => Governorate::withCount('areas')->orderByDesc('areas_count')->value('name') ?: '—',
                'sync_status' => 'Live',
            ],
        ]);
    }

    public function storeGovernorate(Request $request): RedirectResponse
    {
        Governorate::create($request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:governorates,name'],
            'name_ar' => ['nullable', 'string', 'max:255'],
        ]) + ['is_active' => true]);

        return back()->with('status', 'Governorate created successfully.');
    }

    public function storeArea(Request $request, Governorate $governorate): RedirectResponse
    {
        $governorate->areas()->create($request->validate([
            'name' => ['required', 'string', 'max:255'],
            'name_ar' => ['nullable', 'string', 'max:255'],
        ]) + ['is_active' => true]);

        return back()->with('status', 'Area created successfully.');
    }

    public function toggleArea(Area $area): RedirectResponse
    {
        $area->update(['is_active' => ! $area->is_active]);

        return back()->with('status', 'Location status updated.');
    }

    public function ads(): View
    {
        return view('ads.index', ['ads' => Ad::query()->latest()->paginate(20)->withQueryString(), 'metrics' => [
            'active_ads' => Ad::where('status', 'active')->count(),
            'scheduled_ads' => Ad::where('starts_at', '>', now())->count(),
            'top_slot' => Ad::orderByDesc('clicks')->value('slot_name') ?: '—',
            'clicks' => (int) Ad::sum('clicks'),
        ]]);
    }

    public function storeAd(Request $request): RedirectResponse
    {
        Ad::create($request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slot_name' => ['required', 'string', 'max:255'],
            'destination' => ['required', 'string', 'max:2048'],
            'description' => ['nullable', 'string'],
            'image_url' => ['nullable', 'url', 'max:2048'],
            'starts_at' => ['nullable', 'date'],
            'end_date' => ['nullable', 'date', 'after_or_equal:starts_at'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]) + ['status' => 'active']);

        return back()->with('status', 'Ad created successfully.');
    }

    public function toggleAd(Ad $ad): RedirectResponse
    {
        $ad->update(['status' => $ad->status === 'active' ? 'pause' : 'active']);

        return back()->with('status', 'Ad status updated.');
    }

    public function shares(): View
    {
        $topSharer = AppShare::query()->select('user_id')->selectRaw('COUNT(*) AS aggregate')->groupBy('user_id')->orderByDesc('aggregate')->with('user:id,name')->first();

        return view('shares.index', ['shares' => AppShare::query()->with('user:id,name,email')->latest('shared_at')->paginate(20)->withQueryString(), 'metrics' => [
            'total_shares' => AppShare::count(),
            'customers_shared' => AppShare::distinct('user_id')->count('user_id'),
            'top_sharer' => $topSharer?->user?->name ?: '—',
            'latest_share' => AppShare::max('shared_at') ?: '—',
        ]]);
    }

    private function queueMetrics(array $statuses): array
    {
        $orders = Order::whereIn('status', $statuses);

        return [
            'orders_in_queue' => (clone $orders)->count(),
            'highest_price' => (float) ((clone $orders)->max('total') ?: 0),
            'today_requests' => (clone $orders)->whereDate('created_at', today())->count(),
            'earliest_arrival' => (string) ((clone $orders)->whereNotNull('arrival_time')->orderBy('arrival_time')->value('arrival_time') ?: '—'),
        ];
    }
}
