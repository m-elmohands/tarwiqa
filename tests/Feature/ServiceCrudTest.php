<?php

namespace Tests\Feature;

use App\Models\City;
use App\Models\Service;
use App\Models\ServiceCategory;
use App\Models\ServiceType;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\MediaLibrary\HasMedia;
use Tests\TestCase;

class ServiceCrudTest extends TestCase
{
    use RefreshDatabase;

    public function test_super_admin_can_complete_service_crud(): void
    {
        $this->seed();
        $admin = User::query()->where('email', 'admin@tarwiqa.test')->firstOrFail();
        $category = ServiceCategory::query()->firstOrFail();
        $city = City::query()->where('name', 'Cairo')->firstOrFail();
        $this->actingAs($admin);

        $this->get(route('admin.services.index'))->assertOk();
        $this->post(route('admin.services.store'), [
            'category_id' => $category->id,
            'city_id' => $city->id,
            'title' => 'Standard Cleaning',
            'base_price' => 450,
            'is_active' => 1,
        ])->assertRedirect(route('admin.services.index'));

        $service = Service::query()->where('slug', 'standard-cleaning')->firstOrFail();
        $this->put(route('admin.services.update', $service), [
            'category_id' => $category->id,
            'city_id' => $city->id,
            'title' => 'Premium Cleaning',
            'base_price' => 650,
            'is_active' => 0,
        ])->assertRedirect(route('admin.services.index'));

        $this->assertDatabaseHas('services', ['id' => $service->id, 'city_id' => $city->id, 'slug' => 'premium-cleaning', 'is_active' => false]);
        $this->delete(route('admin.services.destroy', $service))->assertRedirect(route('admin.services.index'));
        $this->assertSoftDeleted('services', ['id' => $service->id]);
    }

    public function test_non_super_admin_cannot_manage_services(): void
    {
        $partner = User::factory()->create(['role' => User::ROLE_PARTNER]);

        $this->actingAs($partner)->get(route('admin.services.index'))->assertForbidden();
    }

    public function test_services_and_categories_register_single_logo_media_collections(): void
    {
        $service = new Service;
        $category = new ServiceCategory;
        $type = new ServiceType;

        $this->assertInstanceOf(HasMedia::class, $service);
        $this->assertInstanceOf(HasMedia::class, $category);
        $this->assertInstanceOf(HasMedia::class, $type);
        $this->assertTrue($service->getMediaCollection('logo')->singleFile);
        $this->assertTrue($category->getMediaCollection('logo')->singleFile);
        $this->assertTrue($type->getMediaCollection('logo')->singleFile);
    }

    public function test_service_data_endpoint_filters_by_city(): void
    {
        $this->seed();
        $admin = User::query()->where('email', 'admin@tarwiqa.test')->firstOrFail();
        $category = ServiceCategory::query()->firstOrFail();
        $cairo = City::query()->where('name', 'Cairo')->firstOrFail();
        $giza = City::query()->where('name', 'Giza')->firstOrFail();
        Service::query()->create([
            'category_id' => $category->id,
            'city_id' => $cairo->id,
            'title' => 'Cairo Cleaning',
            'slug' => 'cairo-cleaning',
            'base_price' => 500,
            'is_active' => true,
        ]);
        Service::query()->create([
            'category_id' => $category->id,
            'city_id' => $giza->id,
            'title' => 'Giza Cleaning',
            'slug' => 'giza-cleaning',
            'base_price' => 550,
            'is_active' => true,
        ]);

        $this->actingAs($admin)
            ->getJson(route('admin.services.data', [
                'draw' => 1,
                'start' => 0,
                'length' => 10,
                'city_id' => $cairo->id,
            ]))
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.city_name', 'Cairo')
            ->assertJsonPath('data.0.title', 'Cairo Cleaning');
    }
}
