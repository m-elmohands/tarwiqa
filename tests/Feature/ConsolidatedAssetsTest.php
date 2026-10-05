<?php

namespace Tests\Feature;

use Tests\TestCase;

class ConsolidatedAssetsTest extends TestCase
{
    public function test_only_one_public_stylesheet_and_script_bundle_exist(): void
    {
        $this->assertSame(
            [public_path('assets/css/app.css')],
            glob(public_path('assets/css/*.css')),
        );
        $this->assertSame(
            [public_path('assets/js/app.js')],
            glob(public_path('assets/js/*.js')),
        );
    }

    public function test_views_only_reference_the_consolidated_bundles(): void
    {
        $views = collect(glob(resource_path('views/**/*.blade.php')))
            ->merge(glob(resource_path('views/*.blade.php')))
            ->map(fn (string $file): string => file_get_contents($file))
            ->implode("\n");

        $this->assertStringNotContainsString('assets/css/sidebar.css', $views);
        $this->assertStringNotContainsString('assets/css/styles.css', $views);
        $this->assertStringNotContainsString('assets/js/sidebar.js', $views);
    }

    public function test_datatables_include_the_shared_state_widget(): void
    {
        $javascript = file_get_contents(public_path('assets/js/app.js'));
        $stylesheet = file_get_contents(public_path('assets/css/app.css'));

        $this->assertStringContainsString('renderTableState', $javascript);
        $this->assertStringContainsString('datatable-state-icon', $javascript);
        $this->assertStringContainsString('.datatable-state {', $stylesheet);
    }
}
