<?php

use App\Contracts\Services\AccessServiceInterface;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Collection;

if (! function_exists('can_access_page')) {
    function can_access_page(string $permission, ?User $user = null): bool
    {
        return app(AccessServiceInterface::class)->allows($user ?? auth()->user(), $permission);
    }
}

if (! function_exists('user_role')) {
    function user_role(): string
    {
        $user = auth()->user();
        if (! $user) {
            throw new RuntimeException('No authenticated user found.');
        }

        return match ($user->role) {
            User::ROLE_SUPER_ADMIN => 'super-admin',
            User::ROLE_SUPPORTER => 'supporter',
            default => 'partner',
        };
    }
}

if (! function_exists('apiResponse')) {
    function apiResponse(
        mixed $data = null,
        ?string $message = null,
        int $status = 200,
        mixed $errors = null,
        array $meta = [],
    ): JsonResponse {
        $payload = [
            'success' => $status >= 200 && $status < 400,
            'message' => $message,
            'data' => $data,
            'status_code' => $status,
        ];

        if ($errors !== null) {
            $payload['errors'] = $errors;
        }

        if ($meta !== []) {
            $payload['meta'] = $meta;
        }

        return response()->json($payload, $status);
    }
}

if (! function_exists('format_amount')) {
    function format_amount(float|int $number, int $digits = 0) {
        if ($number >= 1000) {
            return format_amount(round($number / 1000, 1), ++$digits);
        }

        return $number . match ($digits) {
            1 => 'K',
            2 => 'M',
            default => '',
        };
    }
}

if (! function_exists('days_human')) {
    function days_human(): Collection {
        return collect([
            [
                'name' => 'Sunday',
                'value' => 1
            ],
            [
                'name' => 'Monday',
                'value' => 2
            ],
            [
                'name' => 'Tuesday',
                'value' => 3
            ],
            [
                'name' => 'Wednesday',
                'value' => 4
            ],
            [
                'name' => 'Thursday',
                'value' => 5
            ],
            [
                'name' => 'Friday',
                'value' => 6
            ],
            [
                'name' => 'Saturday',
                'value' => 7
            ],
        ]);
    }
}
