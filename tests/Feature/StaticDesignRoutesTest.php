<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class StaticDesignRoutesTest extends TestCase
{
    use RefreshDatabase;

    public function test_each_role_can_visit_every_html_page_in_its_static_workspace(): void
    {
        $this->seed();

        $accounts = [
            'super-admin' => 'admin@tarwiqa.test',
            'supporter' => 'supporter@tarwiqa.test',
            'partner' => 'partner@tarwiqa.test',
        ];

        foreach ($accounts as $workspace => $email) {
            $user = User::query()->where('email', $email)->firstOrFail();
            $files = glob(base_path("{$workspace}/*.html"));

            foreach ($files as $file) {
                $this->actingAs($user)
                    ->get("/design/{$workspace}/".basename($file))
                    ->assertOk()
                    ->assertHeader('Content-Type', 'text/html; charset=UTF-8');
            }
        }
    }

    public function test_static_assets_are_fetched_through_the_protected_workspace_route(): void
    {
        $this->seed();
        $partner = User::query()->where('email', 'partner@tarwiqa.test')->firstOrFail();

        $this->actingAs($partner)
            ->get('/design/partner/partner-dashboard.css')
            ->assertOk()
            ->assertHeader('Content-Type', 'text/css; charset=UTF-8');
    }

    public function test_a_role_cannot_visit_another_roles_static_pages(): void
    {
        $this->seed();
        $partner = User::query()->where('email', 'partner@tarwiqa.test')->firstOrFail();

        $this->actingAs($partner)
            ->get('/design/super-admin/admin-dashboard.html')
            ->assertForbidden();
    }
}
