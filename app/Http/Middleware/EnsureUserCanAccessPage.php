<?php

namespace App\Http\Middleware;

use App\Contracts\Services\AccessServiceInterface;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserCanAccessPage
{
    public function __construct(private readonly AccessServiceInterface $access) {}

    public function handle(Request $request, Closure $next, string $permission): Response
    {
        abort_if($this->access->denies($request->user(), $permission), 403);

        return $next($request);
    }
}
