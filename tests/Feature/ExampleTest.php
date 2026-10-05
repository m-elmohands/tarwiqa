<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    public function test_login_page_renders_the_redesigned_authentication_form(): void
    {
        $this->get(route('login'))
            ->assertOk()
            ->assertSee('login-shell')
            ->assertSee('Sign in to your workspace')
            ->assertSee('data-password-toggle', false)
            ->assertSee('data-demo-email', false);
    }

    use RefreshDatabase;

    public function test_guests_are_sent_to_login(): void
    {
        $this->get('/')->assertRedirect(route('login'));
    }

    public function test_each_role_is_sent_to_its_dashboard(): void
    {
        foreach ([
            User::ROLE_SUPER_ADMIN => 'admin.dashboard',
            User::ROLE_SUPPORTER => 'supporter.dashboard',
            User::ROLE_PARTNER => 'partner.dashboard',
        ] as $role => $route) {
            $user = User::factory()->create(['role' => $role]);
            $this->actingAs($user)->get('/')->assertRedirect(route($route));
        }
    }

    public function test_users_cannot_open_another_roles_workspace(): void
    {
        $this->seed();
        $partner = User::query()->where('email', 'partner@tarwiqa.test')->firstOrFail();

        $this->actingAs($partner)->get(route('admin.dashboard'))->assertForbidden()->assertSee('outside your access scope');
        $this->get(route('partner.dashboard'))->assertOk();
    }

    public function test_an_explicit_user_denial_overrides_role_access(): void
    {
        $this->seed();
        $partner = User::query()->where('email', 'partner@tarwiqa.test')->firstOrFail();
        $permissionId = DB::table('permissions')->where('key', 'dashboard.partner')->value('id');

        DB::table('user_permissions')->insert([
            'user_id' => $partner->id,
            'permission_id' => $permissionId,
            'allowed' => false,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $this->actingAs($partner);

        $this->assertFalse(can_access_page('dashboard.partner'));
        $this->get(route('partner.dashboard'))->assertForbidden();
    }

    public function test_super_admin_can_visit_each_native_order_view(): void
    {
        $this->seed();
        $admin = User::query()->where('email', 'admin@tarwiqa.test')->firstOrFail();

        foreach (['admin.orders.accepted', 'admin.orders.done', 'admin.orders.reviews'] as $route) {
            $this->actingAs($admin)
                ->get(route($route))
                ->assertOk()
                ->assertSee('order-view-nav')
                ->assertSee('TARWIQA');
        }
    }

    public function test_other_roles_cannot_visit_admin_order_views(): void
    {
        $partner = User::factory()->create(['role' => User::ROLE_PARTNER]);

        $this->actingAs($partner)
            ->get(route('admin.orders.accepted'))
            ->assertForbidden();
    }

    public function test_super_admin_can_visit_the_native_users_view(): void
    {
        $this->seed();
        $admin = User::query()->where('email', 'admin@tarwiqa.test')->firstOrFail();

        $this->actingAs($admin)
            ->get(route('admin.users.index'))
            ->assertOk()
            ->assertSee('users-page')
            ->assertSee('All Users');
    }

    public function test_other_roles_cannot_visit_the_admin_users_view(): void
    {
        $supporter = User::factory()->create(['role' => User::ROLE_SUPPORTER]);

        $this->actingAs($supporter)
            ->get(route('admin.users.index'))
            ->assertForbidden();
    }

    public function test_super_admin_can_visit_the_services_view(): void
    {
        $this->seed();
        $admin = User::query()->where('email', 'admin@tarwiqa.test')->firstOrFail();

        $this->actingAs($admin)
            ->get(route('admin.services.index'))
            ->assertOk()
            ->assertSee('services-page')
            ->assertSee('Service Catalog');
    }

    public function test_other_roles_cannot_visit_the_admin_services_view(): void
    {
        $partner = User::factory()->create(['role' => User::ROLE_PARTNER]);

        $this->actingAs($partner)
            ->get(route('admin.services.index'))
            ->assertForbidden();
    }
}
