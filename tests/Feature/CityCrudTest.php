<?php

namespace Tests\Feature;

use App\Models\City;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CityCrudTest extends TestCase
{
    use RefreshDatabase;

    public function test_super_admin_can_complete_city_crud_operations(): void
    {
        $this->seed();
        $admin = User::query()->where('email', 'admin@tarwiqa.test')->firstOrFail();

        $this->actingAs($admin)->get(route('admin.cities.index'))->assertOk();

        $this->post(route('admin.cities.store'), [
            'name' => 'Nasr City',
            'name_ar' => 'مدينة نصر',
            'is_active' => '1',
        ])->assertRedirect(route('admin.cities.index'));

        $city = City::query()->where('name', 'Nasr City')->firstOrFail();
        $this->assertDatabaseHas('cities', ['id' => $city->id, 'name' => 'Nasr City']);

        $this->put(route('admin.cities.update', $city), [
            'name' => 'New Cairo',
            'name_ar' => 'القاهرة الجديدة',
            'is_active' => '0',
        ])->assertRedirect(route('admin.cities.index'));

        $this->assertDatabaseHas('cities', ['id' => $city->id, 'name' => 'New Cairo', 'is_active' => false]);

        $this->delete(route('admin.cities.destroy', $city))->assertRedirect(route('admin.cities.index'));
        $this->assertSoftDeleted('cities', ['id' => $city->id]);
    }

    public function test_city_name_must_be_unique(): void
    {
        $this->seed();
        $admin = User::query()->where('email', 'admin@tarwiqa.test')->firstOrFail();
        City::query()->create(['name' => 'Dokki', 'is_active' => true]);

        $this->actingAs($admin)->post(route('admin.cities.store'), [
            'name' => 'Dokki',
            'is_active' => '1',
        ])->assertSessionHasErrors('name');
    }

    public function test_non_super_admin_cannot_manage_cities(): void
    {
        $supporter = User::factory()->create(['role' => User::ROLE_SUPPORTER]);

        $this->actingAs($supporter)->get(route('admin.cities.index'))->assertForbidden();
    }

    public function test_user_can_belong_to_a_city(): void
    {
        $city = City::query()->create(['name' => 'Smouha', 'is_active' => true]);
        $user = User::factory()->create(['city_id' => $city->id]);

        $this->assertTrue($user->city->is($city));
        $this->assertTrue($city->users()->whereKey($user)->exists());
    }

    public function test_city_data_endpoint_returns_yajra_payload(): void
    {
        $this->seed();
        $admin = User::query()->where('email', 'admin@tarwiqa.test')->firstOrFail();

        $this->actingAs($admin)
            ->getJson(route('admin.cities.data', [
                'draw' => 1,
                'start' => 0,
                'length' => 10,
            ]))
            ->assertOk()
            ->assertJsonStructure(['draw', 'recordsTotal', 'recordsFiltered', 'data'])
            ->assertJsonPath('draw', 1);
    }
}
