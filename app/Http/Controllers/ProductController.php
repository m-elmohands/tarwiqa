<?php

namespace App\Http\Controllers;

use App\Contracts\Services\ProductManagementInterface;
use App\Http\Requests\Products\SaveProductRequest;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;
use Yajra\DataTables\Facades\DataTables;

class ProductController extends Controller
{
    public function __construct(private readonly ProductManagementInterface $products) {}

    public function index(): View
    {
        return view('products.index', $this->options());
    }

    public function data(Request $request): JsonResponse
    {
        return DataTables::eloquent($this->products->dataTableQuery(
            $request->integer('category_id') ?: null,
            $request->integer('city_id') ?: null,
        ))
            ->addColumn('category_title', fn (Product $product): string => $product->category?->title ?? 'Uncategorized')
            ->addColumn('city_name', fn (Product $product): string => $product->city?->name ?? 'All cities')
            ->addColumn('logo_url', fn (Product $product): string => $product->getFirstMediaUrl('logo', 'thumb'))
            ->addColumn('status_label', fn (Product $product): string => $product->is_active ? 'Active' : 'Inactive')
            ->addColumn('edit_url', fn (Product $product): string => route('admin.products.edit', $product))
            ->addColumn('delete_url', fn (Product $product): string => route('admin.products.destroy', $product))
            ->toJson();
    }

    public function create(): View
    {
        return view('products.create', $this->options());
    }

    public function store(SaveProductRequest $request): RedirectResponse
    {
        $this->products->create($request->safe()->except('logo'), $request->file('logo'));

        return redirect()->route('admin.products.index')->with('status', 'Product created successfully.');
    }

    public function edit(Product $product): View
    {
        return view('products.edit', ['product' => $product] + $this->options());
    }

    public function update(SaveProductRequest $request, Product $product): RedirectResponse
    {
        $this->products->update($product, $request->safe()->except('logo'), $request->file('logo'));

        return redirect()->route('admin.products.index')->with('status', 'Product updated successfully.');
    }

    public function destroy(Product $product): RedirectResponse
    {
        $this->products->delete($product);

        return redirect()->route('admin.products.index')->with('status', 'Product deleted successfully.');
    }

    private function options(): array
    {
        return ['categories' => $this->products->categories(), 'cities' => $this->products->cities()];
    }
}
