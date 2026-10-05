# TARWIQA Laravel dashboard

Laravel 13 conversion of the TARWIQA static dashboard prototype. The application uses a shared Blade shell with segmented header, footer, and role-specific sidebars.

## Included roles

- `super_admin` → `/admin`
- `supporter` → `/supporter`
- `partner` → `/partner`

The `role` middleware protects each workspace, while `/` redirects authenticated users to the correct dashboard.

## Run locally

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
composer run dev
```

Demo accounts all use the password `password`:

- `admin@tarwiqa.test`
- `supporter@tarwiqa.test`
- `partner@tarwiqa.test`

## Layout structure

- `resources/views/layouts/app.blade.php` — shared application shell
- `resources/views/partials/header.blade.php` — shared header
- `resources/views/partials/footer.blade.php` — shared footer
- `resources/views/partials/sidebars/` — one navigation partial per role
- `resources/views/dashboards/` — role-specific dashboard content
- `public/assets/css/app.css` — the single consolidated application stylesheet
- `public/assets/js/app.js` — the single consolidated, page-scoped script bundle
- `app/Http/Middleware/EnsureUserHasRole.php` — server-side role authorization
- `app/Http/Middleware/EnsureUserCanAccessPage.php` — permission-based page authorization
- `app/Contracts/` — repository and service boundaries
- `app/Repositories/` — database access implementations
- `app/Services/` — authentication, access, and media business logic
- `app/Http/Requests/` — validated and authorized request objects
- `app/Traits/HasPageAccess.php` — reusable model permission helper

## Server-side data tables

The Users, Cities, Service Types, Service Categories, Services, Products, and Packages directories use `yajra/laravel-datatables-oracle` 13 with Eloquent-backed, server-side JSON endpoints. Search, filtering, pagination, record counts, and relationship loading are processed by Laravel rather than loading the complete dataset in the browser.

- `GET /admin/users/data`
- `GET /admin/cities/data`
- `GET /admin/services/data`
- `GET /admin/products/data`
- `GET /admin/catalog/service-types/data`
- `GET /admin/catalog/service-categories/data`
- `GET /admin/catalog/packages/data`
- `GET /admin/orders/accepted/data`
- `GET /admin/orders/done/data`
- `GET /admin/orders/reviews/data`

All endpoints inherit the same super-admin role and page-permission middleware as their management pages.

## Super-admin management

The sidebar is arranged by domain: Workspace, People, Catalog, and Configuration. Native CRUD is available for Users, Service Types, Service Categories, Services, Products, Packages, and Cities. Orders remain lifecycle-oriented operational pages instead of generic CRUD because their related financial and status-history records require controlled workflows.

## Implemented database tables

The complete editable schema specification is maintained in [`docs/database-schema.md`](docs/database-schema.md). Use that file as the source for future migration change requests.

### Framework and users

- `users` — authenticated accounts, roles, status, profile data, and optional city
- `password_reset_tokens` — password reset tokens
- `sessions` — database-backed sessions
- `cache`, `cache_locks` — application cache
- `jobs`, `job_batches`, `failed_jobs` — queued work

### Access control and locations

- `permissions` — named page permissions
- `role_permissions` — role-level abilities
- `user_permissions` — per-user permission overrides
- `cities` — standalone supported cities
- `addresses` — user addresses linked directly to cities

### Catalog

- `service_types` — top-level service types with title, subtitle, status, and Media Library logo
- `service_categories` — typed categories with title, subtitle, status, and Media Library logo
- `services` — category- and city-scoped services with title, pricing, status, and Media Library logo
- `products` — category- and city-scoped products with pricing, video URL, and Media Library logo
- `packages` — priced service bundles with discount and availability windows
- `package_services` — services included in packages

### Orders and finance

- `orders` — customer orders, scheduling, lifecycle, and totals
- `order_services` — immutable service lines captured per order
- `order_status_history` — order state changes
- `order_issues` — operational problems and resolutions
- `order_reviews` — customer ratings and moderation
- `wallets` — user balances
- `wallet_transactions` — wallet ledger entries
- `payments` — order payments
- `refunds` — payment refunds

### Communication and governance

- `conversations` — direct or order-related conversations
- `conversation_participants` — conversation membership and read state
- `messages` — conversation messages and replies
- `message_attachments` — message files
- `notifications` — Laravel database notifications
- `inquiry_logs` — support and inquiry records
- `faqs` — audience-scoped frequently asked questions with ordering and publication status
- `approval_requests` — auditable approval workflows
- `audit_logs` — recorded application changes
- `media` — Spatie Media Library attachments and conversions

Native super-admin communication and operations pages include cancelled orders, custom packages, the messages inbox, and direct message composition. Their former HTML prototypes remain under `resources/` as design references.

## Page access

Protect a route with the same permission key used by the navigation:

```php
Route::get('/orders', ...)->middleware('access:orders.view');
```

Conditionally render links or page elements in Blade:

```blade
@pageAccess('orders.view')
    <a href="/orders">Orders</a>
@endpageAccess
```

The equivalent PHP checks are `can_access_page('orders.view')` and `$user->canAccessPage('orders.view')`. Explicit user permission records override role permissions. Super admins bypass permission records.

## Media

Spatie Laravel Media Library is installed. User avatars use the single-file `avatar` collection. Service types, service categories, and services use single-file `logo` collections with 320×320 thumbnail conversions. Type and category logos accept JPEG, PNG, WebP, or SVG; service logos accept JPEG, PNG, or WebP.

The original `super-admin/`, `supporter/`, and `partner/` static files are retained as migration references.

## API v1

The JSON API is mounted at `/api/v1`. Authentication uses signed JWT bearer tokens through `php-open-source-saver/jwt-auth`; generate a deployment-specific secret with `php artisan jwt:secret`. Never commit or share the generated `JWT_SECRET`.

Social authentication is available at `POST /api/v1/auth/social-login` for Google, Apple, and Facebook. Send `provider` and the provider-issued identity/access `token`; `name` is optional and is useful on the first Apple authorization. The backend verifies every token with its provider before linking or creating an account. Configure `GOOGLE_CLIENT_ID`, `APPLE_CLIENT_ID`, `FACEBOOK_CLIENT_ID`, and `FACEBOOK_CLIENT_SECRET` in each environment.

Public endpoints provide service types, service categories, services, and products. Protected endpoints provide profile management, checkout, cancellation, order history, statistics, order details, wallet balance, and paginated wallet transactions. Send the login or registration token as `Authorization: Bearer <token>`.

Wallet balances are maintained through an immutable ledger using three transaction types: `deposit`, `withdrawal`, and `purchase`. Admins can deposit or withdraw funds at `/admin/wallets`; wallet checkout purchases and cancellation refund deposits are processed atomically with row locks and idempotent transaction references. API clients cannot directly deposit funds into their own wallets.

Catalog API resource arrays are cached for five minutes. `CatalogCache` versions the namespace and automatically invalidates all catalog responses when a service type, category, service, or product is saved or deleted.

All API controllers and API exception handlers use the global `apiResponse()` helper. Responses consistently contain `success`, `message`, `data`, and `status_code`; validation and authentication failures additionally contain `errors`, while paginated responses contain `meta`.

Import `docs/postman/TARWIQA-API-v1.postman_collection.json` into Postman to test all API endpoints. Update `base_url` and the sample resource IDs, then run Login; its test script stores the returned JWT for every protected request automatically.
