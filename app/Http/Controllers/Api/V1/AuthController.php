<?php

namespace App\Http\Controllers\Api\V1;

use App\Contracts\Services\SocialLoginServiceInterface;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\LoginRequest;
use App\Http\Requests\Api\RegisterRequest;
use App\Http\Requests\Api\SocialLoginRequest;
use App\Http\Requests\Api\UpdateProfileRequest;
use App\Http\Resources\Api\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function __construct(private readonly SocialLoginServiceInterface $socialLogin) {}

    public function login(LoginRequest $request): JsonResponse
    {
        $user = User::query()->where('email', $request->validated('email'))->first();
        if (! $user || ! Hash::check($request->validated('password'), $user->password) || $user->status !== 'active') {
            return apiResponse(message: 'The provided credentials are invalid.', status: 422, errors: ['credentials' => ['Invalid email or password.']]);
        }

        return $this->tokenResponse($user);
    }

    public function register(RegisterRequest $request): JsonResponse
    {
        $data = $request->safe()->except(['password_confirmation', 'device_name']);
        $user = User::query()->create([...$data, 'password' => $request->validated('password'), 'role' => 'customer', 'status' => 'active']);

        return $this->tokenResponse($user, 201);
    }

    public function socialLogin(SocialLoginRequest $request): JsonResponse
    {
        $user = $this->socialLogin->authenticate(
            $request->validated('provider'),
            $request->validated('token'),
            $request->validated('name'),
        );

        return $this->tokenResponse($user);
    }

    public function profile(Request $request): JsonResponse
    {
        return apiResponse(data: (new UserResource($request->user()->load('governorate:id,name')))->resolve($request), message: 'Profile retrieved successfully.');
    }

    public function update(UpdateProfileRequest $request): JsonResponse
    {
        $data = $request->safe()->except('avatar');
        $request->user()->update($data);
        if ($request->hasFile('avatar')) {
            $request->user()->addMediaFromRequest('avatar')->toMediaCollection('avatar');
        }

        return apiResponse(data: (new UserResource($request->user()->refresh()->load('governorate:id,name')))->resolve($request), message: 'Profile updated successfully.');
    }

    public function destroy(Request $request): JsonResponse
    {
        $user = $request->user();
        auth('api')->logout(true);
        DB::transaction(fn () => $user->delete());

        return apiResponse(message: 'User deleted successfully.');
    }

    private function tokenResponse(User $user, int $status = 200): JsonResponse
    {
        $token = auth('api')->login($user);

        $data = [
            'user' => (new UserResource($user->load('governorate:id,name')))->resolve(),
            'token' => $token,
            'token_type' => 'Bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60,
        ];

        return apiResponse(
            data: $data,
            message: $status === 201 ? 'Registration successful.' : 'Login successful.',
            status: $status
        );
    }
}
