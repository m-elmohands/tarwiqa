<?php

namespace Tests\Feature;

use App\Models\Faq;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FaqCrudTest extends TestCase
{
    use RefreshDatabase;

    public function test_super_admin_can_manage_faqs_and_fetch_datatable(): void
    {
        $this->seed();
        $admin = User::query()->where('email', 'admin@tarwiqa.test')->firstOrFail();
        $this->actingAs($admin);

        $this->get(route('admin.faqs.index'))->assertOk()->assertSee('FAQ Directory');
        $this->getJson(route('admin.faqs.data', [
            'draw' => 1,
            'start' => 0,
            'length' => 10,
            'search' => ['value' => 'payment'],
        ]))->assertOk()->assertJsonStructure(['draw', 'recordsTotal', 'recordsFiltered', 'data']);

        $this->post(route('admin.faqs.store'), [
            'question' => 'Can I reschedule an order?',
            'answer' => 'Contact support before the service begins.',
            'audience' => 'customer',
            'sort_order' => 40,
            'is_active' => 1,
        ])->assertRedirect(route('admin.faqs.index'));

        $faq = Faq::query()->where('question', 'Can I reschedule an order?')->firstOrFail();
        $this->put(route('admin.faqs.update', $faq), [
            'question' => 'Can I change an order date?',
            'answer' => 'Contact support before the service begins.',
            'audience' => 'all',
            'sort_order' => 5,
            'is_active' => 0,
        ])->assertRedirect(route('admin.faqs.index'));
        $this->assertDatabaseHas('faqs', ['id' => $faq->id, 'audience' => 'all', 'is_active' => false]);

        $this->delete(route('admin.faqs.destroy', $faq))->assertRedirect(route('admin.faqs.index'));
        $this->assertSoftDeleted('faqs', ['id' => $faq->id]);
    }

    public function test_other_roles_cannot_manage_faqs(): void
    {
        $partner = User::factory()->create(['role' => User::ROLE_PARTNER]);
        $this->actingAs($partner)->get(route('admin.faqs.index'))->assertForbidden();
    }
}
