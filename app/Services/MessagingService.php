<?php

namespace App\Services;

use App\Contracts\Services\MessagingServiceInterface;
use App\Models\Conversation;
use App\Models\User;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class MessagingService implements MessagingServiceInterface
{
    public function inbox(User $user): Collection
    {
        return Conversation::query()->whereHas('participants', fn ($query) => $query->whereKey($user->id))
            ->with(['participants:id,name,email', 'latestMessage.sender:id,name'])
            ->latest('last_message_at')->limit(100)->get();
    }

    public function recipients(): Collection
    {
        return User::query()->where('role', '!=', User::ROLE_SUPER_ADMIN)->where('status', 'active')->orderBy('name')->get(['id', 'name', 'email', 'role']);
    }

    public function send(User $sender, array $data): Conversation
    {
        return DB::transaction(function () use ($sender, $data): Conversation {
            $conversation = Conversation::query()->create([
                'type' => 'direct', 'subject' => $data['subject'], 'created_by' => $sender->id, 'last_message_at' => now(),
            ]);
            $conversation->participants()->attach([$sender->id, $data['recipient_id']]);
            $conversation->messages()->create([
                'sender_id' => $sender->id, 'body' => $data['body'], 'type' => 'text',
                'metadata' => ['channel' => $data['channel']],
            ]);

            return $conversation;
        });
    }
}
