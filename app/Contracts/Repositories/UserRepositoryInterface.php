<?php

namespace App\Contracts\Repositories;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;

interface UserRepositoryInterface
{
    public function findByEmail(string $email): ?User;

    public function recordLogin(User $user): void;

    public function query(): Builder;

    public function create(array $data): User;

    public function update(User $user, array $data): User;

    public function delete(User $user): void;
}
