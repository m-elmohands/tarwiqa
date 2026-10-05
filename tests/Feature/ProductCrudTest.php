<?php

namespace Tests\Feature;

use App\Models\City;
use App\Models\Product;
use App\Models\ServiceCategory;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductCrudTest extends TestCase
{
    use RefreshDatabase;

    public function test_super_admin_can_complete_product_crud(): void
    {
        $this->seed();
        $admin = User::query()->where('email', 'admin@tarwiqa.test')->firstOrFail();
        $category = ServiceCategory::query()->firstOrFail();
        $city = City::query()->where('name', 'Giza')->firstOrFail();
        $this->actingAs($admin);

        $this->get(route('admin.products.index'))->assertOk()->assertSee('Product Catalog');
        $this->post(route('admin.products.store'), [
            'category_id' => $category->id,
            'city_id' => $city->id,
            'title' => 'Home Care Bundle',
            'youtube_url' => 'https://www.youtube.com/watch?v=product-demo',
            'base_price' => 725,
            'is_active' => 1,
        ])->assertRedirect(route('admin.products.index'));

        $product = Product::query()->where('slug', 'home-care-bundle')->firstOrFail();
        $this->put(route('admin.products.update', $product), [
            'category_id' => $category->id,
            'city_id' => $city->id,
            'title' => 'Premium Home Care Bundle',
            'base_price' => 850,
            'is_active' => 0,
        ])->assertRedirect(route('admin.products.index'));

        $this->assertDatabaseHas('products', [
            'id' => $product->id, 'slug' => 'premium-home-care-bundle', 'base_price' => 850, 'is_active' => false,
        ]);
        $this->delete(route('admin.products.destroy', $product))->assertRedirect(route('admin.products.index'));
        $this->assertSoftDeleted('products', ['id' => $product->id]);
    }

    public function test_product_data_endpoint_filters_by_city(): void
    {
        $this->seed();
        $admin = User::query()->where('email', 'admin@tarwiqa.test')->firstOrFail();
        $cairo = City::query()->where('name', 'Cairo')->firstOrFail();

        $this->actingAs($admin)->getJson(route('admin.products.data', [
            'draw' => 1, 'start' => 0, 'length' => 10, 'city_id' => $cairo->id,
        ]))->assertOk()->assertJsonCount(1, 'data')->assertJsonPath('data.0.title', 'Premium Cleaning Kit');
    }

    public function test_non_super_admin_cannot_manage_products(): void
    {
        $partner = User::factory()->create(['role' => User::ROLE_PARTNER]);

        $this->actingAs($partner)->get(route('admin.products.index'))->assertForbidden();
    }
}
