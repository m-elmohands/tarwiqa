<?php

namespace Database\Seeders;

use App\Models\OrderReview;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrderReviewSeeder extends Seeder
{
    /**
     * Seed one customer review for every supported review moderation status.
     */
    public function run(): void
    {
        $reviewStatuses = [
            'pending' => [
                'rating' => 4,
                'comment' => 'The customer review is waiting for moderation.',
            ],
            'published' => [
                'rating' => 5,
                'comment' => 'The service was punctual, thorough, and easy to book.',
            ],
            'rejected' => [
                'rating' => 2,
                'comment' => 'The review was flagged for moderation and was not published.',
            ],
        ];

        $orders = DB::table('orders')
            ->whereNotNull('customer_id')
            ->orderBy('id')
            ->limit(count($reviewStatuses))
            ->get(['id', 'customer_id']);

        if ($orders->count() < count($reviewStatuses)) {
            $this->command?->warn('OrderReviewSeeder skipped: at least three orders are required. Run OrderSeeder first.');

            return;
        }

        foreach (array_values($reviewStatuses) as $index => $feedback) {
            $order = $orders[$index];
            $status = array_keys($reviewStatuses)[$index];

            OrderReview::updateOrCreate(
                [
                    'order_id' => $order->id,
                    'customer_id' => $order->customer_id,
                ],
                [
                    'rating' => $feedback['rating'],
                    'comment' => $feedback['comment'],
                    'status' => $status,
                    'moderated_at' => $status === 'pending' ? null : now(),
                    'moderated_by' => null,
                ],
            );
        }
    }
}
