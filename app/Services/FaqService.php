<?php

namespace App\Services;

use App\Contracts\Repositories\FaqRepositoryInterface;
use App\Contracts\Services\FaqServiceInterface;
use App\Models\Faq;
use Illuminate\Database\Eloquent\Builder;

class FaqService implements FaqServiceInterface
{
    public function __construct(private readonly FaqRepositoryInterface $faqs) {}

    public function dataTableQuery(): Builder
    {
        return $this->faqs->dataTableQuery();
    }

    public function create(array $data): Faq
    {
        return $this->faqs->create($data);
    }

    public function update(Faq $faq, array $data): Faq
    {
        return $this->faqs->update($faq, $data);
    }

    public function delete(Faq $faq): void
    {
        $this->faqs->delete($faq);
    }
}
