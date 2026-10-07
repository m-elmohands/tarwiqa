<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\CreateSupportTicketRequest;
use App\Http\Resources\Api\SupportTicketResource;
use App\Models\InquiryLog;
use Illuminate\Http\JsonResponse;

class SupportTicketController extends Controller
{
    public function store(CreateSupportTicketRequest $request): JsonResponse
    {
        $data = $request->validated();
        $order = $request->user()->orders()->find($data['order_id'] ?? null);

        if (! empty($data['order_id']) && ! $order) {
            return apiResponse(message: 'The selected order does not belong to this customer.', status: 422, errors: ['order_id' => ['Invalid order.']]);
        }

        $ticket = InquiryLog::query()->create([
            'user_id' => $request->user()->id,
            'order_id' => $order?->id,
            'type' => 'support',
            'channel' => $data['channel'] ?? 'api',
            'status' => 'open',
            'subject' => $data['subject'],
            'details' => $data['details'],
        ]);

        return apiResponse(data: (new SupportTicketResource($ticket))->resolve($request), message: 'Support ticket created successfully.', status: 201);
    }
}
