<?php

namespace App\Traits;

use App\Contracts\Services\AccessServiceInterface;

trait HasPageAccess
{
    public function canAccessPage(string $permission): bool
    {
        return app(AccessServiceInterface::class)->allows($this, $permission);
    }
}
