<?php

namespace Database\Seeders;

use App\Models\Maid;
use App\Models\MaidAvailability;
use App\Models\MaidDocument;
use App\Models\User;
use Illuminate\Database\Seeder;

class MaidSeeder extends Seeder
{
    public function run(): void
    {
        $partners = User::query()->where('role', User::ROLE_PARTNER)->orderBy('id')->pluck('id')->values();

        if ($partners->isEmpty()) {
            $this->command?->warn('MaidSeeder skipped: no partner accounts found.');

            return;
        }

        $maids = [
            ['id' => 'MD-1001', 'name' => 'Mona Adel', 'phone' => '+201000000101', 'gender' => 'female', 'age' => 29, 'salary' => 5200, 'off_day' => 5, 'doc_type' => 'personal_id', 'personal_id' => '29001011234567', 'status' => 'active'],
            ['id' => 'MD-1002', 'name' => 'Sara Hassan', 'phone' => '+201000000102', 'gender' => 'female', 'age' => 34, 'salary' => 5800, 'off_day' => 6, 'doc_type' => 'contract', 'personal_id' => '29002021234567', 'status' => 'active'],
            ['id' => 'MD-1003', 'name' => 'Omar Nabil', 'phone' => '+201000000103', 'gender' => 'male', 'age' => 31, 'salary' => 6000, 'off_day' => 7, 'doc_type' => 'medical_report', 'personal_id' => '29003031234567', 'status' => 'active'],
            ['id' => 'MD-1004', 'name' => 'Huda Samir', 'phone' => '+201000000104', 'gender' => 'female', 'age' => 27, 'salary' => 4900, 'off_day' => 4, 'doc_type' => 'training_certificate', 'personal_id' => '29004041234567', 'status' => 'paused'],
            ['id' => 'MD-1005', 'name' => 'Nour Kamal', 'phone' => '+201000000105', 'gender' => 'female', 'age' => 38, 'salary' => 6500, 'off_day' => 5, 'doc_type' => 'police_clearance', 'personal_id' => '29005051234567', 'status' => 'active'],
        ];

        foreach ($maids as $index => $attributes) {
            $maid = Maid::query()->updateOrCreate(
                ['id' => $attributes['id']],
                $attributes + [
                    'partner_id' => $partners[$index % $partners->count()],
                    'address' => 'Cairo, Egypt',
                    'start_date' => now()->subMonths(3 + $index)->toDateString(),
                    'notes' => 'Seeded workforce profile for dashboard and assignment testing.',
                ],
            );

            for ($day = 1; $day <= 7; $day++) {
                MaidAvailability::query()->updateOrCreate(
                    ['maid_id' => $maid->id, 'day_of_week' => $day],
                    ['starts_at' => '08:00:00', 'ends_at' => '20:00:00', 'is_available' => $day !== (int) $maid->off_day],
                );
            }

            MaidDocument::query()->updateOrCreate(
                ['maid_id' => $maid->id, 'type' => $maid->doc_type ?: 'other'],
                ['path' => 'seed/maid-documents/'.$maid->id.'.pdf', 'original_name' => $maid->id.'.pdf', 'mime_type' => 'application/pdf', 'size' => 0, 'status' => 'verified'],
            );
        }
    }
}
