<?php

namespace App\Http\Controllers;

use App\Contracts\Services\CatalogManagementInterface;
use App\Http\Requests\Catalog\CatalogResourceRequest;
use App\Models\Governorate;
use App\Models\ServiceCategory;
use App\Models\ServicePackage;
use App\Models\Widget;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;
use Yajra\DataTables\Facades\DataTables;

class CatalogResourceController extends Controller
{
    public function __construct(private readonly CatalogManagementInterface $catalog) {}

    public function index(string $resource): View
    {
        return view('catalog.index', $this->viewData($resource));
    }

    public function customPackages(): View
    {
        return view('packages.index');
    }

    public function full(Request $request): View
    {
        $governorates = Governorate::query()->where('is_active', true)->withCount('areas')->orderBy('name')->get();
        $selectedGovernorateId = $request->integer('governorate') ?: $governorates->first()?->id;
        $scope = function ($query) use ($selectedGovernorateId): void {
            if ($selectedGovernorateId) {
                $query->where(fn ($nested) => $nested->where('governorate_id', $selectedGovernorateId)->orWhereNull('governorate_id'));
            }
        };

        return view('catalog.full', [
            'governorates' => $governorates,
            'selectedGovernorateId' => $selectedGovernorateId,
            'widgets' => Widget::query()->where($scope)->withCount(['categories' => $scope])->with(['categories' => fn ($query) => $query->where($scope)->withCount('services')->orderBy('title')])->orderBy('title')->get(),
            'categories' => ServiceCategory::query()->where($scope)->with('type:id,title')->withCount('services')->orderBy('title')->get(),
            'packages' => ServicePackage::query()->where($scope)->withCount('services')->orderBy('title')->get(),
        ]);
    }

    public function fullData(Request $request): JsonResponse
    {
        $governorateId = $request->integer('governorate');
        $scope = function ($query) use ($governorateId): void {
            if ($governorateId) {
                $query->where(fn ($nested) => $nested->where('governorate_id', $governorateId)->orWhereNull('governorate_id'));
            }
        };

        $widgets = Widget::query()
            ->where($scope)
            ->withCount(['categories' => $scope])
            ->orderBy('title')
            ->get(['id', 'title', 'is_active']);
        $categories = ServiceCategory::query()
            ->where($scope)
            ->with('type:id,title')
            ->withCount('services')
            ->orderBy('title')
            ->get(['id', 'type_id', 'title']);
        $packages = ServicePackage::query()
            ->where($scope)
            ->with(['services:id,category_id'])
            ->orderBy('title')
            ->get(['id', 'title', 'description', 'is_active']);

        return response()->json([
            'widgets' => $widgets->map(fn (Widget $widget): array => [
                'id' => $widget->id,
                'title' => $widget->title,
                'categories_count' => $widget->categories_count,
                'is_active' => $widget->is_active,
                'category_ids' => $widget->categories()->where($scope)->pluck('service_categories.id')->values(),
            ])->values(),
            'categories' => $categories->map(fn (ServiceCategory $category): array => [
                'id' => $category->id,
                'title' => $category->title,
                'type_title' => $category->type?->title ?? 'Unassigned',
                'services_count' => $category->services_count,
            ])->values(),
            'packages' => $packages->map(fn (ServicePackage $package): array => [
                'id' => $package->id,
                'title' => $package->title,
                'description' => $package->description,
                'is_active' => $package->is_active,
                'category_ids' => $package->services->pluck('category_id')->filter()->unique()->values(),
            ])->values(),
        ]);
    }

    public function data(Request $request, string $resource): JsonResponse
    {
        $config = $this->config($resource);

        return DataTables::eloquent($this->catalog->query($resource))
            ->addColumn('type_title', fn ($model): string => $model->type?->title ?? 'Unassigned')
            ->addColumn('status_label', fn ($model): string => $model->is_active ? 'Active' : 'Inactive')
            ->addColumn('edit_url', fn ($model): string => route('admin.catalog.edit', [$resource, $model->getKey()]))
            ->addColumn('delete_url', fn ($model): string => route('admin.catalog.destroy', [$resource, $model->getKey()]))
            ->addColumn('logo_url', fn ($model): string => method_exists($model, 'getFirstMediaUrl') ? $model->getFirstMediaUrl('logo', 'thumb') : '')
            ->with('resource_label', $config['singular'])
            ->toJson();
    }

    public function create(string $resource): View
    {
        return view('catalog.create', $this->viewData($resource));
    }

    public function store(CatalogResourceRequest $request, string $resource): RedirectResponse
    {
        $this->catalog->create($resource, $request->safe()->except('logo'), $request->file('logo'));

        return redirect()->route('admin.catalog.index', $resource)->with('status', $this->config($resource)['singular'].' created successfully.');
    }

    public function edit(string $resource, int $id): View
    {
        return view('catalog.edit', $this->viewData($resource) + ['record' => $this->catalog->find($resource, $id)]);
    }

    public function update(CatalogResourceRequest $request, string $resource, int $id): RedirectResponse
    {
        $record = $this->catalog->find($resource, $id);
        $this->catalog->update($resource, $record, $request->safe()->except('logo'), $request->file('logo'));

        return redirect()->route('admin.catalog.index', $resource)->with('status', $this->config($resource)['singular'].' updated successfully.');
    }

    public function destroy(string $resource, int $id): RedirectResponse
    {
        $this->catalog->delete($this->catalog->find($resource, $id));

        return redirect()->route('admin.catalog.index', $resource)->with('status', $this->config($resource)['singular'].' deleted successfully.');
    }

    private function viewData(string $resource): array
    {
        return ['resource' => $resource, 'config' => $this->config($resource), 'types' => $this->catalog->serviceTypes(), 'governorates' => Governorate::query()->where('is_active', true)->orderBy('name')->get()];
    }

    private function config(string $resource): array
    {
        return match ($resource) {
            'service-types' => ['title' => 'Widgets', 'singular' => 'Widget', 'kind' => 'service-types'],
            'service-categories' => ['title' => 'Categories', 'singular' => 'Category', 'kind' => 'service-categories'],
            'packages' => ['title' => 'Packages', 'singular' => 'Package', 'kind' => 'packages'],
            default => abort(404),
        };
    }
}
