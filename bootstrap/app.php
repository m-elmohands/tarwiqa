<?php

use App\Http\Middleware\EnsureUserCanAccessPage;
use App\Http\Middleware\EnsureUserHasRole;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->alias([
            'access' => EnsureUserCanAccessPage::class,
            'role' => EnsureUserHasRole::class,
        ]);

        $middleware->validateCsrfTokens([
            'api/v1/paymob/webhook'
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->shouldRenderJsonWhen(
            fn (Request $request) => $request->is('api/*') || $request->expectsJson(),
        );
        $exceptions->render(function (ValidationException $exception, Request $request) {
            return $request->is('api/*')
                ? apiResponse(message: 'Validation failed.', status: 422, errors: $exception->errors())
                : null;
        });
        $exceptions->render(function (AuthenticationException $exception, Request $request) {
            return $request->is('api/*')
                ? apiResponse(message: 'Unauthenticated.', status: 401, errors: ['authentication' => ['A valid bearer token is required.']])
                : null;
        });
        $exceptions->render(function (ModelNotFoundException $exception, Request $request) {
            return $request->is('api/*')
                ? apiResponse(message: 'Resource not found.', status: 404, errors: ['resource' => ['The requested resource does not exist.']])
                : null;
        });
        $exceptions->render(function (HttpExceptionInterface $exception, Request $request) {
            if (! $request->is('api/*')) {
                return null;
            }

            $status = $exception->getStatusCode();

            return apiResponse(
                message: match ($status) {
                    403 => 'Forbidden.',
                    404 => 'Resource not found.',
                    405 => 'Method not allowed.',
                    429 => 'Too many requests.',
                    default => $exception->getMessage() ?: 'Request failed.',
                },
                status: $status,
            );
        });
    })->create();
