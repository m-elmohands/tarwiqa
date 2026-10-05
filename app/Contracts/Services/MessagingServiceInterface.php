<?php

namespace App\Contracts\Services;

use App\Models\Conversation;
use App\Models\User;
use Illuminate\Support\Collection;

interface MessagingServiceInterface
{
    public function inbox(User $user): Collection;

    public function recipients(): Collection;

    public function send(User $sender, array $data): Conversation;
}
