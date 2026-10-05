<?php

namespace App\Http\Controllers;

use App\Contracts\Services\CityServiceInterface;
use App\Http\Requests\Cities\StoreCityRequest;
use App\Http\Requests\Cities\UpdateCityRequest;
use App\Models\City;
use App\Models\Governorate;
use App\Models\Location;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;
use Yajra\DataTables\Facades\DataTables;

class CityController extends Controller
{
    public function __construct(private readonly CityServiceInterface $cities) {}

    public function index(): View
    {
        return view('cities.index', ['metrics' => [
            'total_cities' => City::count(),
            'active_cities' => City::where('is_active', true)->count(),
            'total_governorates' => Governorate::count(),
            'total_locations' => Location::count(),
        ]]);
    }

    public function data(): JsonResponse
    {
        return DataTables::eloquent($this->cities->dataTableQuery())
            ->addColumn('status_label', fn (City $city): string => $city->is_active ? 'Active' : 'Inactive')
            ->addColumn('edit_url', fn (City $city): string => route('admin.cities.edit', $city))
            ->addColumn('delete_url', fn (City $city): string => route('admin.cities.destroy', $city))
            ->toJson();
    }

    public function create(): View
    {
        return view('cities.create');
    }

    public function store(StoreCityRequest $request): RedirectResponse
    {
        $this->cities->create($request->validated());

        return redirect()->route('admin.cities.index')->with('status', 'City created successfully.');
    }

    public function edit(City $city): View
    {
        return view('cities.edit', compact('city'));
    }

    public function update(UpdateCityRequest $request, City $city): RedirectResponse
    {
        $this->cities->update($city, $request->validated());

        return redirect()->route('admin.cities.index')->with('status', 'City updated successfully.');
    }

    public function destroy(City $city): RedirectResponse
    {
        $this->cities->delete($city);

        return redirect()->route('admin.cities.index')->with('status', 'City deleted successfully.');
    }
}
