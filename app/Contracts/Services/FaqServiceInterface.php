<?php

namespace App\Contracts\Services;

use App\Models\Faq;
use Illuminate\Database\Eloquent\Builder;

interface FaqServiceInterface
{
    public function dataTableQuery(): Builder;

    public function create(array $data): Faq;

    public function update(Faq $faq, array $data): Faq;

    public function delete(Faq $faq): void;
}
