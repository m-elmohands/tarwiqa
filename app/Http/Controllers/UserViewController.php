<?php

namespace App\Http\Controllers;

use App\Contracts\Services\UserManagementInterface;
use App\Http\Requests\Users\SaveUserRequest;
use App\Models\Area;
use App\Models\City;
use App\Models\Governorate;
use App\Models\Maid;
use App\Models\Order;
use App\Models\ServiceCategory;
use App\Models\User;
use App\Models\Wallet;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\View\View;
use Yajra\DataTables\Facades\DataTables;

class UserViewController extends Controller
{
    public function __construct(private readonly UserManagementInterface $users) {}

    public function index(string $role): View
    {
        $users = User::where('role', $role);

        $metrics = [
            'total_users' => $users->count(),
            'active_today' => (clone $users)->whereDate('last_active_at', today())->count(),
            'active_users' => $users->where('status', 'active')->count(),
            'restricted_users' => $users->where('status', 'inactive')->count(),
            'banned_users' => $users->where('status', 'banned')->count(),
        ];

        if ($role == 'customer') {
            $metrics['total_wallet'] = Wallet::sum('balance');
        }
        if ($role === 'partner') {
            $metrics['managed_maids'] = Maid::whereIn('partner_id', (clone $users)->select('id'))->count();
            $metrics['completed_orders'] = Order::whereIn('partner_id', (clone $users)->select('id'))->whereIn('status', ['completed', 'done', 'done_orders'])->count();
        }
        if ($role === 'supporter') {
            $metrics['covered_governorates'] = DB::table('user_governorates')->whereIn('user_id', (clone $users)->select('id'))->distinct('governorate_id')->count('governorate_id');
            $metrics['scoped_orders'] = Order::count();
        }

        return view('users.index', ['role' => $role, ...$metrics]);
    }

    public function data(string $role): JsonResponse
    {
        $datatables = DataTables::eloquent($this->users->query()->where('role', $role)->with(['governorate:id,name', 'governorates:id,name', 'partnerAreas:id,name']))
            ->addColumn('city_name', fn (User $user): string => $user->governorate?->name ?? $user->city?->name ?? 'Unassigned')
            ->addColumn('governorate_name', fn (User $user): string => $user->governorate?->name ?? 'Unassigned')
            ->addColumn('edit_url', fn (User $user): string => route('admin.users.edit', $user))
            ->addColumn('view_url', fn (User $user): string => route('admin.users.edit', $user))
            ->addColumn('delete_url', fn (User $user): string => route('admin.users.destroy', $user));

        if ($role == 'partner') {
            $datatables->addColumn('location_name', fn (User $user): string => $user->partnerAreas->pluck('name')->join(', ') ?: 'Unassigned')
                ->addColumn('maids_count', fn (User $user): int => $user->maids()->count())
                ->addColumn('completed_orders', fn (User $user): int => $user->assignedOrders()->whereIn('status', ['completed', 'done', 'done_orders'])->count());

        }
        if ($role == 'supporter') {
            $datatables->addColumn('access_role', fn (User $user): string => str($user->settings['access_role'] ?? 'viewer')->title()->toString())
                ->addColumn('assign_governorates', fn (User $user): string => $user->governorates->pluck('name')->join(', ') ?: 'None')
                ->addColumn('orders_access', fn (User $user): string => 'Allowed')
                ->addColumn('partners_access', fn (User $user): string => 'Allowed')
                ->addColumn('scoped_orders', fn (User $user): int => Order::whereIn('partner_id', User::whereIn('governorate_id', $user->governorates->pluck('id'))->where('role', 'partner')->pluck('id'))->count())
                ->addColumn('scoped_partners', fn (User $user): int => User::whereIn('governorate_id', $user->governorates->pluck('id'))->where('role', 'partner')->count());
        }

        return $datatables->toJson();
    }

    public function create(): View
    {
        return view('users.create', $this->formOptions());
    }

    public function store(SaveUserRequest $request): RedirectResponse
    {
        $this->users->create($request->validated());

        return redirect()->route('admin.users.index', ['role' => $request->validated('role')])->with('status', 'User created successfully.');
    }

    public function edit(User $user): View
    {
        $user = $user->load('orders');

        return view('users.edit', ['user' => $user] + $this->formOptions());
    }

    public function update(SaveUserRequest $request, User $user): RedirectResponse
    {
        $this->users->update($user, $request->validated());

        return redirect()->route('admin.users.index', ['role' => $request->validated('role')])->with('status', 'User updated successfully.');
    }

    public function destroy(User $user): RedirectResponse
    {
        abort_if($user->is(auth()->user()), 422, 'You cannot delete your own account.');
        $this->users->delete($user);

        return back()->with('status', 'User deleted successfully.');
    }

    private function cities()
    {
        return City::query()->where('is_active', true)->orderBy('name')->get(['id', 'name']);
    }

    private function formOptions(): array
    {
        return [
            'cities' => $this->cities(),
            'governorates' => Governorate::where('is_active', true)->orderBy('name')->get(['id', 'name']),
            'areas' => Area::where('is_active', true)->orderBy('name')->get(['id', 'governorate_id', 'name']),
            'serviceCategories' => ServiceCategory::where('is_active', true)->orderBy('title')->get(['id', 'title']),
            'maids' => Maid::where('status', 'active')->orderBy('name')->get(['id', 'name', 'phone']),
        ];
    }
}
