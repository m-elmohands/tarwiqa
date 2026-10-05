<?php

namespace App\Http\Controllers;

use App\Http\Requests\Maids\SaveRequest;
use App\Models\City;
use App\Models\Maid;
use App\Models\MaidDocument;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;
use Yajra\DataTables\Facades\DataTables;

class MaidViewController extends Controller
{
    public function __construct(private readonly Maid $maids) {}

    public function index(): View
    {
        $metrics = [
            'total_maids' => Maid::count(),
            'active_maids' => Maid::where('status', 'active')->count(),
            'avaliable_today' => Maid::where('status', 'active')->where(fn ($query) => $query->whereNull('off_day')->orWhereNot('off_day', now()->dayOfWeekIso))->count(),
            'done_orders' => Order::whereIn('status', ['completed', 'done', 'done_orders'])->whereHas('maids')->count(),
            'doc_pending' => MaidDocument::where('status', 'pending')->count(),
        ];

        return view('maids.index', $metrics);
    }

    public function data(): JsonResponse
    {
        return DataTables::eloquent($this->maids->query()->with(['partner:id,name,governorate_id', 'partner.governorate:id,name', 'documents']))
            ->addColumn('city_name', fn (Maid $maid): string => $maid->partner?->governorate?->name ?? 'Unassigned')
            ->addColumn('governorate_name', fn (Maid $maid): string => $maid->partner?->governorate?->name ?? 'Unassigned')
            ->addColumn('partner_name', fn (Maid $maid): string => $maid->partner?->name ?? 'Unassigned')
            ->addColumn('off_day_label', fn (Maid $maid): string => collect(days_human())->firstWhere('value', (int) $maid->off_day)['name'] ?? '—')
            ->addColumn('done_orders', fn (Maid $maid): int => $maid->orders()->whereIn('status', ['completed', 'done', 'done_orders'])->count())
            ->addColumn('document_status', fn (Maid $maid): string => $maid->documents->contains(fn (MaidDocument $document): bool => $document->status === 'verified') ? 'Verified' : ($maid->documents->isNotEmpty() ? 'Pending' : 'Missing'))
            ->addColumn('edit_url', fn (Maid $maid): string => route('admin.maids.edit', $maid))
            ->addColumn('delete_url', fn (Maid $maid): string => route('admin.maids.destroy', $maid))
            ->toJson();
    }

    public function create(): View
    {
        return view('maids.create', $this->formData());
    }

    public function store(SaveRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $attachment = $request->file('attachment');
        unset($data['attachment']);
        $maid = $this->maids->create($data);
        $this->storeDocument($maid, $attachment, $data['doc_type'] ?? null);

        return redirect()->route('admin.maids.index')->with('status', 'Maid created successfully.');
    }

    public function edit(Maid $maid): View
    {
        return view('maids.edit', ['maid' => $maid, ...$this->formData()]);
    }

    public function update(SaveRequest $request, Maid $maid): RedirectResponse
    {
        $data = $request->validated();
        $attachment = $request->file('attachment');
        unset($data['attachment']);
        $maid->update($data);
        $this->storeDocument($maid, $attachment, $data['doc_type'] ?? null);

        return redirect()->route('admin.maids.index')->with('status', 'Maid updated successfully.');
    }

    public function destroy(Maid $maid): RedirectResponse
    {
        $maid->delete();

        return back()->with('status', 'Maid deleted successfully.');
    }

    private function cities()
    {
        return City::query()->where('is_active', true)->orderBy('name')->get(['id', 'name']);
    }

    private function partners()
    {
        return User::where('role', 'partner')->orderBy('name')->with('governorate:id,name')->get(['id', 'name', 'governorate_id']);
    }

    private function formData()
    {
        return ['cities' => $this->cities(), 'partners' => $this->partners()];
    }

    private function storeDocument(Maid $maid, mixed $attachment, ?string $type): void
    {
        if (! $attachment) {
            return;
        }

        $path = $attachment->store('maid-documents');
        MaidDocument::create([
            'maid_id' => $maid->id,
            'type' => $type ?: 'other',
            'path' => $path,
            'original_name' => $attachment->getClientOriginalName(),
            'mime_type' => $attachment->getClientMimeType(),
            'size' => $attachment->getSize(),
            'status' => 'pending',
        ]);
    }
}
