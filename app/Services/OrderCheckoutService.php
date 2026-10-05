<?php

namespace App\Services;

use App\Contracts\Services\OrderCheckoutServiceInterface;
use App\Contracts\Services\WalletServiceInterface;
use App\Models\Address;
use App\Models\Order;
use App\Models\Product;
use App\Models\Service;
use App\Models\ServicePackage;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class OrderCheckoutService implements OrderCheckoutServiceInterface
{
    public function __construct(private readonly WalletServiceInterface $wallets) {}

    public function checkout(User $user, array $data): Order
    {
        return DB::transaction(function () use ($user, $data): Order {
            $address = Address::query()->where('user_id', $user->id)->find($data['address_id']);

            if (! $address) {
                throw ValidationException::withMessages(['address_id' => 'The selected address does not belong to you.']);
            }

            $lines = [];
            $subtotal = 0.0;

            foreach ($data['services'] ?? [] as $item) {
                $serviceId = $item['service_id'] ?? $item['widget_id'] ?? null;
                $model = Service::query()->where('is_active', true)->findOrFail($serviceId);
                $this->ensureGovernorate($model->governorate_id, $address->governorate_id);
                $lines[] = ['service_id' => $model->id, 'name' => $model->title, 'type' => 'service', 'quantity' => $item['quantity'], 'unit_price' => $model->base_price, 'total' => (float) $model->base_price * $item['quantity']];
                $subtotal += (float) $model->base_price * $item['quantity'];
            }

            foreach ($data['products'] ?? [] as $item) {
                $model = Product::query()->where('is_active', true)->findOrFail($item['product_id']);
                $this->ensureGovernorate($model->governorate_id, $address->governorate_id);
                $lines[] = ['product_id' => $model->id, 'name' => $model->title, 'type' => 'product', 'quantity' => $item['quantity'], 'unit_price' => $model->base_price, 'total' => (float) $model->base_price * $item['quantity']];
                $subtotal += (float) $model->base_price * $item['quantity'];
            }

            $package = isset($data['package_id']) ? ServicePackage::query()->where('is_active', true)->findOrFail($data['package_id']) : null;
            $discount = $package ? ($package->discount_type === 'percentage' ? $subtotal * min((float) $package->discount_value, 100) / 100 : min((float) $package->discount_value, $subtotal)) : 0;
            $order = Order::query()->create([...$data, 'customer_id' => $user->id, 'status' => 'under_review', 'payment_status' => 'unpaid', 'subtotal' => $subtotal, 'discount_total' => $discount, 'total' => max(0, $subtotal - $discount)]);
            $order->lines()->createMany($lines);

            if ($data['payment_method'] === 'wallet') {
                $this->wallets->adjust($user, 'purchase', (float) $order->total, "Wallet payment for order #{$order->id}", reference: '00000000-0000-4000-8000-'.str_pad((string) $order->id, 12, '0', STR_PAD_LEFT), orderId: $order->id);
                $order->update(['wallet_amount' => $order->total, 'payment_status' => 'paid']);
            }

            return $order->load(['address.governorate:id,name', 'package:id,title', 'lines']);
        });
    }

    public function cancel(User $user, int $orderId, string $reason): Order
    {
        return DB::transaction(function () use ($user, $orderId, $reason): Order {
            $order = Order::query()->where('customer_id', $user->id)->lockForUpdate()->findOrFail($orderId);
            if (! in_array($order->status, ['under_review', 'accepted'], true)) {
                throw ValidationException::withMessages(['order_id' => 'This order can no longer be cancelled.']);
            }
            $order->update(['status' => 'cancelled', 'cancelled_at' => now(), 'cancellation_reason' => $reason]);
            if ((float) $order->wallet_amount > 0 && $order->payment_status === 'paid') {
                $this->wallets->adjust($user, 'deposit', (float) $order->wallet_amount, "Wallet refund for cancelled order #{$order->id}", reference: '00000000-0000-4000-9000-'.str_pad((string) $order->id, 12, '0', STR_PAD_LEFT), orderId: $order->id);
                $order->update(['payment_status' => 'refunded']);
            }

            return $order->load(['address.governorate:id,name', 'package:id,title', 'lines']);
        });
    }

    private function ensureGovernorate(?int $itemGovernorateId, ?int $addressGovernorateId): void
    {
        if ($itemGovernorateId && $itemGovernorateId !== $addressGovernorateId) {
            throw ValidationException::withMessages(['items' => 'One or more items are unavailable in the selected governorate.']);
        }
    }
}
