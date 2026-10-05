<?php

namespace Database\Seeders\Concerns;

use Illuminate\Support\Facades\DB;

trait SeedsBySlug
{
    /**
     * Insert the row, or update it if the slug already exists.
     * Re-running the seeder never duplicates rows and restores soft-deleted ones.
     */
    protected function upsertBySlug(string $table, string $slug, array $attributes): int
    {
        $now = now();

        $existingId = DB::table($table)->where('slug', $slug)->value('id');

        if ($existingId !== null) {
            DB::table($table)
                ->where('id', $existingId)
                ->update($attributes + [
                    'deleted_at' => null,
                    'updated_at' => $now,
                ]);

            return (int) $existingId;
        }

        return (int) DB::table($table)->insertGetId($attributes + [
            'slug'       => $slug,
            'created_at' => $now,
            'updated_at' => $now,
        ]);
    }

    /**
     * A random city id, or null when the cities table has not been seeded yet.
     */
    protected function randomCityId(): ?int
    {
        static $cityIds = null;

        if ($cityIds === null) {
            $cityIds = DB::table('cities')->pluck('id')->all();
        }

        return $cityIds === [] ? null : (int) $cityIds[array_rand($cityIds)];
    }
}