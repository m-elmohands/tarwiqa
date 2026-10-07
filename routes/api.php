<?php

use App\Http\Controllers\Api\V1\AddressController;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\BannerController;
use App\Http\Controllers\Api\V1\CartController;
use App\Http\Controllers\Api\V1\CatalogController;
use App\Http\Controllers\Api\V1\NotificationController;
use App\Http\Controllers\Api\V1\OrderController;
use App\Http\Controllers\Api\V1\PaymentWebhookController;
use App\Http\Controllers\Api\V1\SupportTicketController;
use App\Http\Controllers\Api\V1\WalletController;
use App\Http\Controllers\ApiDocumentationController;
use Illuminate\Support\Facades\Route;

Route::get('/docs', [ApiDocumentationController::class, 'ui'])->name('api.docs');
Route::get('/openapi.json', [ApiDocumentationController::class, 'spec'])->name('api.openapi');

Route::prefix('v1')->group(function (): void {
    Route::prefix('auth')->group(function (): void {
        Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:10,1');
        Route::post('/social-login', [AuthController::class, 'socialLogin'])->middleware('throttle:10,1');
        Route::post('/register', [AuthController::class, 'register'])->middleware('throttle:10,1');
        Route::middleware('auth:api')->group(function (): void {
            Route::get('/profile', [AuthController::class, 'profile']);
            Route::put('/profile', [AuthController::class, 'update']);
            Route::delete('/profile', [AuthController::class, 'destroy']);
        });
    });

    Route::get('/cities', [CatalogController::class, 'cities']);

    Route::get('/service-types', [CatalogController::class, 'types']);
    Route::get('/service-categories/{type_id}', [CatalogController::class, 'categories'])->whereNumber('type_id');
    Route::get('/services', [CatalogController::class, 'services']);
    Route::get('/services/{service_id}', [CatalogController::class, 'service'])->whereNumber('service_id');
    Route::get('/products', [CatalogController::class, 'products']);
    Route::get('/products/{product_id}', [CatalogController::class, 'product'])->whereNumber('product_id');
    Route::get('/banners', [BannerController::class, 'index']);

    Route::middleware('auth:api')->group(function (): void {
        Route::get('/cart', [CartController::class, 'show']);
        Route::post('/cart/items', [CartController::class, 'store']);
        Route::put('/cart/items/{item}', [CartController::class, 'update'])->whereNumber('item');
        Route::delete('/cart/items/{item}', [CartController::class, 'destroy'])->whereNumber('item');
        Route::delete('/cart', [CartController::class, 'clear']);
        Route::get('/notifications', [NotificationController::class, 'index']);
        Route::patch('/notifications/{notification}/read', [NotificationController::class, 'markAsRead']);
        Route::patch('/notifications/read-all', [NotificationController::class, 'markAllAsRead']);
        Route::post('/support/tickets', [SupportTicketController::class, 'store']);
        Route::post('/order/checkout', [OrderController::class, 'checkout']);
        Route::put('/order/cancel', [OrderController::class, 'cancel']);
        Route::get('/orders', [OrderController::class, 'index']);
        Route::get('/orders/statistics', [OrderController::class, 'statistics']);
        Route::get('/orders/{order_id}', [OrderController::class, 'show'])->whereNumber('order_id');
        Route::get('/wallet', [WalletController::class, 'show']);
        Route::get('/wallet/transactions', [WalletController::class, 'transactions']);
        Route::post('wallet/charge', [WalletController::class, 'chargeWallet']);

        Route::apiResource('addresses', AddressController::class);
    });

    Route::post('paymob/webhook', PaymentWebhookController::class);

    Route::get('paymob/redirect', [WalletController::class, 'redirectPayment']);
});
