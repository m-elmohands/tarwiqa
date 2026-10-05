<?php

namespace App\Contracts\Services;

use App\Models\Order;
use App\Models\User;

interface OrderCheckoutServiceInterface
{
    public function checkout(User $user, array $data): Order;

    public function cancel(User $user, int $orderId, string $reason): Order;
}
