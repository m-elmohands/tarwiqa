<?php

namespace App\Http\Controllers;

use App\Contracts\Services\ServiceManagementInterface;
use App\Http\Requests\Services\StoreServiceRequest;
use App\Http\Requests\Services\UpdateServiceRequest;
use App\Models\Service;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;
use Yajra\DataTables\Facades\DataTables;

class ServiceController extends Controller
{
    public function __construct(private readonly ServiceManagementInterface $services) {}

    public function index(): View
    {
        return view('services.index', [
            'categories' => $this->services->categories(),
            'cities' => $this->services->cities(),
        ]);
    }

    public function data(Request $request): JsonResponse
    {
        return DataTables::eloquent($this->services->dataTableQuery(
            $request->integer('category_id') ?: null,
            $request->integer('city_id') ?: null,
        ))
            ->addColumn('category_title', fn (Service $service): string => $service->category?->title ?? 'Uncategorized')
            ->addColumn('city_name', fn (Service $service): string => $service->city?->name ?? 'All cities')
            ->addColumn('logo_url', fn (Service $service): string => $service->getFirstMediaUrl('logo', 'thumb'))
            ->addColumn('status_label', fn (Service $service): string => $service->is_active ? 'Active' : 'Inactive')
            ->addColumn('edit_url', fn (Service $service): string => route('admin.services.edit', $service))
            ->addColumn('delete_url', fn (Service $service): string => route('admin.services.destroy', $service))
            ->toJson();
    }

    public function create(): View
    {
        return view('services.create', [
            'categories' => $this->services->categories(),
            'cities' => $this->services->cities(),
        ]);
    }

    public function store(StoreServiceRequest $request): RedirectResponse
    {
        $data = $request->safe()->except('logo');
        $this->services->create($data, $request->file('logo'));

        return redirect()->route('admin.services.index')->with('status', 'Service created successfully.');
    }

    public function edit(Service $service): View
    {
        return view('services.edit', compact('service') + [
            'categories' => $this->services->categories(),
            'cities' => $this->services->cities(),
        ]);
    }

    public function update(UpdateServiceRequest $request, Service $service): RedirectResponse
    {
        $data = $request->safe()->except('logo');
        $this->services->update($service, $data, $request->file('logo'));

        return redirect()->route('admin.services.index')->with('status', 'Service updated successfully.');
    }

    public function destroy(Service $service): RedirectResponse
    {
        $this->services->delete($service);

        return redirect()->route('admin.services.index')->with('status', 'Service deleted successfully.');
    }
}
