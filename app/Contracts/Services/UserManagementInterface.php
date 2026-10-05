<?php

namespace App\Contracts\Services;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;

interface UserManagementInterface
{
    public function query(): Builder;

    public function create(array $data): User;

    public function update(User $user, array $data): User;

    public function delete(User $user): void;
}
