<?php

use App\Http\Controllers\CatalogResourceController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FaqController;
use App\Http\Controllers\MaidViewController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\OrderViewController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\UserViewController;
use App\Http\Controllers\WalletController;
use App\Http\Controllers\AdminOperationsController;
use Illuminate\Support\Facades\Route;

Route::name('admin.')
    ->middleware(['role:super_admin', 'access:dashboard.admin'])
    ->group(function (): void {
        Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
        Route::get('/profile', [DashboardController::class, 'profile'])->name('profile');

        
        Route::get('{role}', [UserViewController::class, 'index'])
        ->whereIn('role', ['customer', 'partner', 'supporter'])
        ->middleware('access:users.manage')
        ->name('users.index');
        
        Route::get('/users/data/{role}', [UserViewController::class, 'data'])->middleware('access:users.manage')->name('users.data');
        Route::resource('users', UserViewController::class)->except([
            'index', 'show'
        ])->middleware('access:users.manage');

        
        Route::get('maids/data', [MaidViewController::class, 'data'])->middleware('access:maids.manage')->name('maids.data');
        Route::resource('maids', MaidViewController::class)->except(['show'])->middleware('access:maids.manage');

        Route::get('/services/data', [ServiceController::class, 'data'])
            ->middleware('access:services.manage')
            ->name('services.data');
        Route::resource('services', ServiceController::class)
            ->except('show')
            ->middleware('access:services.manage');

        Route::get('/products/data', [ProductController::class, 'data'])
            ->middleware('access:products.manage')
            ->name('products.data');
        Route::resource('products', ProductController::class)
            ->except('show')
            ->middleware('access:products.manage');

        Route::prefix('catalog/{resource}')
            ->name('catalog.')
            ->middleware('access:catalog.manage')
            ->whereIn('resource', ['service-types', 'service-categories', 'packages'])
            ->group(function (): void {
                Route::get('/', [CatalogResourceController::class, 'index'])->name('index');
                Route::get('/data', [CatalogResourceController::class, 'data'])->name('data');
                Route::get('/create', [CatalogResourceController::class, 'create'])->name('create');
                Route::post('/', [CatalogResourceController::class, 'store'])->name('store');
                Route::get('/{id}/edit', [CatalogResourceController::class, 'edit'])->name('edit')->whereNumber('id');
                Route::put('/{id}', [CatalogResourceController::class, 'update'])->name('update')->whereNumber('id');
                Route::delete('/{id}', [CatalogResourceController::class, 'destroy'])->name('destroy')->whereNumber('id');
            });

        Route::get('/cities/data', [CityController::class, 'data'])
            ->middleware('access:cities.manage')
            ->name('cities.data');
        Route::resource('cities', CityController::class)
            ->except('show')
            ->middleware('access:cities.manage');
            
        Route::get('/faqs/data', [FaqController::class, 'data'])
            ->middleware('access:faqs.manage')
            ->name('faqs.data');
        Route::resource('faqs', FaqController::class)
            ->except('show')
            ->middleware('access:faqs.manage');

        Route::get('/wallets', [WalletController::class, 'index'])->middleware('access:wallets.manage')->name('wallets.index');
        Route::get('/wallets/data', [WalletController::class, 'data'])->middleware('access:wallets.manage')->name('wallets.data');
        Route::post('/wallets/adjust', [WalletController::class, 'adjust'])->middleware('access:wallets.manage')->name('wallets.adjust');

        Route::get('/custom-packages', [CatalogResourceController::class, 'customPackages'])
            ->middleware('access:catalog.manage')->name('custom-packages.index');
        Route::get('/catalog/full', [CatalogResourceController::class, 'full'])
            ->middleware('access:catalog.manage')->name('catalog.full');
        Route::get('/catalog/full/data', [CatalogResourceController::class, 'fullData'])
            ->middleware('access:catalog.manage')->name('catalog.full.data');
            
        Route::get('/messages', [MessageController::class, 'index'])->middleware('access:messages.manage')->name('messages.index');
        Route::get('/messages/create', [MessageController::class, 'create'])->middleware('access:messages.manage')->name('messages.create');
        Route::post('/messages', [MessageController::class, 'store'])->middleware('access:messages.manage')->name('messages.store');

        Route::prefix('orders')->name('orders.')->middleware('access:orders.view')->group(function (): void {
            Route::get('/accepted', [OrderViewController::class, 'accepted'])->name('accepted');
            Route::get('/accepted/data', [OrderViewController::class, 'acceptedData'])->name('accepted.data');
            Route::get('/done', [OrderViewController::class, 'done'])->name('done');
            Route::get('/done/data', [OrderViewController::class, 'doneData'])->name('done.data');
            Route::get('/cancelled', [OrderViewController::class, 'cancelled'])->name('cancelled');
            Route::get('/cancelled/data', [OrderViewController::class, 'cancelledData'])->name('cancelled.data');
            Route::get('/reviews', [OrderViewController::class, 'reviews'])->name('reviews');
            Route::get('/reviews/data', [OrderViewController::class, 'reviewsData'])->name('reviews.data');
            Route::get('/{status}', [AdminOperationsController::class, 'orders'])->whereIn('status', ['under_review', 'waiting', 'scheduled', 'completed', 'cancelled'])->name('lifecycle');
            Route::patch('/{order}/workflow', [AdminOperationsController::class, 'updateOrder'])->name('workflow.update')->whereNumber('order');
        });

        Route::get('/approvals', [AdminOperationsController::class, 'approvals'])->middleware('access:approvals.manage')->name('approvals.index');
        Route::patch('/approvals/{approvalRequest}', [AdminOperationsController::class, 'decideApproval'])->middleware('access:approvals.manage')->name('approvals.decide');
        Route::get('/extras', [AdminOperationsController::class, 'extras'])->middleware('access:extras.manage')->name('extras.index');
        Route::post('/extras', [AdminOperationsController::class, 'storeExtra'])->middleware('access:extras.manage')->name('extras.store');
        Route::patch('/extras/{extra}/toggle', [AdminOperationsController::class, 'toggleExtra'])->middleware('access:extras.manage')->name('extras.toggle');
        Route::get('/coverage', [AdminOperationsController::class, 'coverage'])->middleware('access:locations.manage')->name('coverage.index');
        Route::post('/governorates', [AdminOperationsController::class, 'storeGovernorate'])->middleware('access:locations.manage')->name('governorates.store');
        Route::post('/governorates/{governorate}/areas', [AdminOperationsController::class, 'storeArea'])->middleware('access:locations.manage')->name('areas.store');
        Route::patch('/areas/{area}/toggle', [AdminOperationsController::class, 'toggleArea'])->middleware('access:locations.manage')->name('areas.toggle');
        Route::get('/ads', [AdminOperationsController::class, 'ads'])->middleware('access:ads.manage')->name('ads.index');
        Route::post('/ads', [AdminOperationsController::class, 'storeAd'])->middleware('access:ads.manage')->name('ads.store');
        Route::patch('/ads/{ad}/toggle', [AdminOperationsController::class, 'toggleAd'])->middleware('access:ads.manage')->name('ads.toggle');
        Route::get('/shares', [AdminOperationsController::class, 'shares'])->middleware('access:shares.view')->name('shares.index');
    });
