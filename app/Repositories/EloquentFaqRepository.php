<?php

namespace App\Repositories;

use App\Contracts\Repositories\FaqRepositoryInterface;
use App\Models\Faq;
use Illuminate\Database\Eloquent\Builder;

class EloquentFaqRepository implements FaqRepositoryInterface
{
    public function dataTableQuery(): Builder
    {
        return Faq::query()->orderBy('sort_order')->orderBy('id');
    }

    public function create(array $data): Faq
    {
        return Faq::query()->create($data);
    }

    public function update(Faq $faq, array $data): Faq
    {
        $faq->update($data);

        return $faq->refresh();
    }

    public function delete(Faq $faq): void
    {
        $faq->delete();
    }
}
