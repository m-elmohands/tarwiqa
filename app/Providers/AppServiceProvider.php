<?php

namespace App\Providers;

use App\Contracts\Repositories\CatalogRepositoryInterface;
use App\Contracts\Repositories\CityRepositoryInterface;
use App\Contracts\Repositories\FaqRepositoryInterface;
use App\Contracts\Repositories\PermissionRepositoryInterface;
use App\Contracts\Repositories\ProductRepositoryInterface;
use App\Contracts\Repositories\ServiceRepositoryInterface;
use App\Contracts\Repositories\UserRepositoryInterface;
use App\Contracts\Services\AccessServiceInterface;
use App\Contracts\Services\AuthServiceInterface;
use App\Contracts\Services\CatalogManagementInterface;
use App\Contracts\Services\CityServiceInterface;
use App\Contracts\Services\FaqServiceInterface;
use App\Contracts\Services\MediaServiceInterface;
use App\Contracts\Services\MessagingServiceInterface;
use App\Contracts\Services\OrderCheckoutServiceInterface;
use App\Contracts\Services\ProductManagementInterface;
use App\Contracts\Services\ServiceManagementInterface;
use App\Contracts\Services\SocialIdentityProviderInterface;
use App\Contracts\Services\SocialLoginServiceInterface;
use App\Contracts\Services\UserManagementInterface;
use App\Contracts\Services\WalletServiceInterface;
use App\Models\Product;
use App\Models\Service;
use App\Models\ServiceCategory;
use App\Models\ServiceType;
use App\Models\Widget;
use App\Repositories\EloquentCatalogRepository;
use App\Repositories\EloquentCityRepository;
use App\Repositories\EloquentFaqRepository;
use App\Repositories\EloquentPermissionRepository;
use App\Repositories\EloquentProductRepository;
use App\Repositories\EloquentServiceRepository;
use App\Repositories\EloquentUserRepository;
use App\Services\AccessService;
use App\Services\AuthService;
use App\Services\CatalogManagement;
use App\Services\CityService;
use App\Services\FaqService;
use App\Services\MediaService;
use App\Services\MessagingService;
use App\Services\OrderCheckoutService;
use App\Services\ProductManagement;
use App\Services\ServiceManagement;
use App\Services\SocialIdentityProvider;
use App\Services\SocialLoginService;
use App\Services\UserManagement;
use App\Services\WalletService;
use App\Support\CatalogCache;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(CityRepositoryInterface::class, EloquentCityRepository::class);
        $this->app->bind(FaqRepositoryInterface::class, EloquentFaqRepository::class);
        $this->app->bind(CatalogRepositoryInterface::class, EloquentCatalogRepository::class);
        $this->app->bind(PermissionRepositoryInterface::class, EloquentPermissionRepository::class);
        $this->app->bind(ProductRepositoryInterface::class, EloquentProductRepository::class);
        $this->app->bind(ServiceRepositoryInterface::class, EloquentServiceRepository::class);
        $this->app->bind(UserRepositoryInterface::class, EloquentUserRepository::class);
        $this->app->bind(AccessServiceInterface::class, AccessService::class);
        $this->app->bind(AuthServiceInterface::class, AuthService::class);
        $this->app->bind(CityServiceInterface::class, CityService::class);
        $this->app->bind(FaqServiceInterface::class, FaqService::class);
        $this->app->bind(CatalogManagementInterface::class, CatalogManagement::class);
        $this->app->bind(MediaServiceInterface::class, MediaService::class);
        $this->app->bind(MessagingServiceInterface::class, MessagingService::class);
        $this->app->bind(OrderCheckoutServiceInterface::class, OrderCheckoutService::class);
        $this->app->bind(ProductManagementInterface::class, ProductManagement::class);
        $this->app->bind(ServiceManagementInterface::class, ServiceManagement::class);
        $this->app->bind(SocialIdentityProviderInterface::class, SocialIdentityProvider::class);
        $this->app->bind(SocialLoginServiceInterface::class, SocialLoginService::class);
        $this->app->bind(UserManagementInterface::class, UserManagement::class);
        $this->app->bind(WalletServiceInterface::class, WalletService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Blade::if('pageAccess', fn (string $permission): bool => can_access_page($permission));
        foreach ([ServiceType::class, ServiceCategory::class, Widget::class, Service::class, Product::class] as $model) {
            $model::saved(fn () => CatalogCache::flush());
            $model::deleted(fn () => CatalogCache::flush());
        }
    }
}
