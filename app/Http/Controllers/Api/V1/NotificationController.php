<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\NotificationResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Notifications\DatabaseNotification;

class NotificationController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $perPage = min(max($request->integer('per_page', 20), 1), 50);
        $notifications = $request->user()->notifications()->latest()->paginate($perPage);

        return apiResponse(
            data: NotificationResource::collection($notifications->items())->resolve($request),
            message: 'Notifications retrieved successfully.',
            meta: [
                'current_page' => $notifications->currentPage(),
                'last_page' => $notifications->lastPage(),
                'per_page' => $notifications->perPage(),
                'total' => $notifications->total(),
            ],
        );
    }

    public function markAsRead(Request $request, string $notification): JsonResponse
    {
        $record = $this->notification($request, $notification);
        $record->markAsRead();

        return apiResponse(data: (new NotificationResource($record->fresh()))->resolve($request), message: 'Notification marked as read.');
    }

    public function markAllAsRead(Request $request): JsonResponse
    {
        $request->user()->unreadNotifications->markAsRead();

        return apiResponse(message: 'Notifications marked as read.');
    }

    private function notification(Request $request, string $id): DatabaseNotification
    {
        return $request->user()->notifications()->whereKey($id)->firstOrFail();
    }
}
