<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\StaticDesignController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function (): void {
    Route::get('/login', [AuthController::class, 'login'])->name('login');
    Route::post('/login', [AuthController::class, 'postLogin'])->name('login.store');
});

Route::middleware('auth')->group(function (): void {
    Route::get('/', [DashboardController::class, 'redirect'])->name('dashboard');
    Route::post('logout', [AuthController::class, 'logout'])->name('logout');

    include 'super_admin.php';

    Route::get('/supporter', [DashboardController::class, 'supporter'])->middleware(['role:supporter', 'access:dashboard.supporter'])->name('supporter.dashboard');
    Route::get('/partner', [DashboardController::class, 'partner'])->middleware(['role:partner', 'access:dashboard.partner'])->name('partner.dashboard');
    Route::post('/profile/avatar', [MediaController::class, 'avatar'])->middleware('access:profile.media.manage')->name('profile.avatar');

    foreach (config('design.workspaces') as $workspace => $settings) {
        Route::redirect("/design/{$workspace}", "/design/{$workspace}/{$settings['home']}")
            ->middleware(["role:{$settings['role']}", "access:{$settings['permission']}"])
            ->name("design.{$workspace}.home");

        Route::get("/design/{$workspace}/{file}", StaticDesignController::class)
            ->defaults('workspace', $workspace)
            ->where('file', '[A-Za-z0-9][A-Za-z0-9._-]*')
            ->middleware(["role:{$settings['role']}", "access:{$settings['permission']}"])
            ->name("design.{$workspace}.file");
    }
});
