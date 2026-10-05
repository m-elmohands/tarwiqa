<?php

namespace Tests\Feature;

use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\MediaLibrary\HasMedia;
use Tests\TestCase;

class ProductSchemaTest extends TestCase
{
    use RefreshDatabase;

    public function test_product_seeder_creates_a_city_and_category_linked_product(): void
    {
        $this->seed();

        $product = Product::query()->where('slug', 'premium-cleaning-kit')->firstOrFail();
        $this->assertSame('Home Cleaning', $product->category->title);
        $this->assertSame('Cairo', $product->city->name);
        $this->assertSame('499.00', $product->base_price);
    }

    public function test_product_uses_a_single_logo_media_collection(): void
    {
        $product = new Product;

        $this->assertInstanceOf(HasMedia::class, $product);
        $this->assertTrue($product->getMediaCollection('logo')->singleFile);
        $this->assertContains('image/jpeg', $product->getMediaCollection('logo')->acceptsMimeTypes);
        $this->assertNotContains('image/svg+xml', $product->getMediaCollection('logo')->acceptsMimeTypes);
    }
}
