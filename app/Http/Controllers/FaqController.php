<?php

namespace App\Http\Controllers;

use App\Contracts\Services\FaqServiceInterface;
use App\Http\Requests\Faqs\StoreFaqRequest;
use App\Http\Requests\Faqs\UpdateFaqRequest;
use App\Models\Faq;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;
use Yajra\DataTables\Facades\DataTables;

class FaqController extends Controller
{
    public function __construct(private readonly FaqServiceInterface $faqs) {}

    public function index(): View
    {
        return view('faqs.index');
    }

    public function data(): JsonResponse
    {
        return DataTables::eloquent($this->faqs->dataTableQuery())
            ->addColumn('status_label', fn (Faq $faq): string => $faq->is_active ? 'Active' : 'Inactive')
            ->addColumn('audience_label', fn (Faq $faq): string => str($faq->audience)->title()->toString())
            ->addColumn('edit_url', fn (Faq $faq): string => route('admin.faqs.edit', $faq))
            ->addColumn('delete_url', fn (Faq $faq): string => route('admin.faqs.destroy', $faq))
            ->toJson();
    }

    public function create(): View
    {
        return view('faqs.create');
    }

    public function store(StoreFaqRequest $request): RedirectResponse
    {
        $this->faqs->create($request->validated());

        return to_route('admin.faqs.index')->with('status', 'FAQ created successfully.');
    }

    public function edit(Faq $faq): View
    {
        return view('faqs.edit', compact('faq'));
    }

    public function update(UpdateFaqRequest $request, Faq $faq): RedirectResponse
    {
        $this->faqs->update($faq, $request->validated());

        return to_route('admin.faqs.index')->with('status', 'FAQ updated successfully.');
    }

    public function destroy(Faq $faq): RedirectResponse
    {
        $this->faqs->delete($faq);

        return to_route('admin.faqs.index')->with('status', 'FAQ deleted successfully.');
    }
}
