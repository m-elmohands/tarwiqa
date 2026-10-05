<?php

namespace Database\Seeders;

use App\Models\Area;
use App\Models\Governorate;
use Illuminate\Database\Seeder;

class LocationStructureSeeder extends Seeder
{
    /** @var array<string, array{ar: string, areas: array<string, string>}> */
    private array $locations = [
        'Cairo' => ['ar' => 'القاهرة', 'areas' => ['New Cairo' => 'القاهرة الجديدة', 'Nasr City' => 'مدينة نصر', 'Maadi' => 'المعادي', 'Heliopolis' => 'مصر الجديدة', 'Zamalek' => 'الزمالك', 'Downtown Cairo' => 'وسط القاهرة']],
        'Giza' => ['ar' => 'الجيزة', 'areas' => ['Dokki' => 'الدقي', 'Mohandessin' => 'المهندسين', '6th of October' => 'السادس من أكتوبر', 'Sheikh Zayed' => 'الشيخ زايد', 'Haram' => 'الهرم', 'Giza' => 'الجيزة']],
        'Alexandria' => ['ar' => 'الإسكندرية', 'areas' => ['Smouha' => 'سموحة', 'Miami' => 'ميامي', 'Montaza' => 'المنتزه', 'Stanley' => 'ستانلي', 'Borg El Arab' => 'برج العرب']],
        'Qalyubia' => ['ar' => 'القليوبية', 'areas' => ['Banha' => 'بنها', 'Shubra El Kheima' => 'شبرا الخيمة', 'Obour City' => 'مدينة العبور', 'Qalyub' => 'قليوب']],
        'Dakahlia' => ['ar' => 'الدقهلية', 'areas' => ['Mansoura' => 'المنصورة', 'Talkha' => 'طلخا', 'Meet Ghamr' => 'ميت غمر', 'Aga' => 'أجا']],
        'Sharqia' => ['ar' => 'الشرقية', 'areas' => ['Zagazig' => 'الزقازيق', '10th of Ramadan' => 'العاشر من رمضان', 'Belbeis' => 'بلبيس', 'Minya Al Qamh' => 'منيا القمح']],
        'Gharbia' => ['ar' => 'الغربية', 'areas' => ['Tanta' => 'طنطا', 'El Mahalla El Kubra' => 'المحلة الكبرى', 'Kafr El Zayat' => 'كفر الزيات', 'Zefta' => 'زفتى']],
        'Beheira' => ['ar' => 'البحيرة', 'areas' => ['Damanhur' => 'دمنهور', 'Kafr El Dawwar' => 'كفر الدوار', 'Rashid' => 'رشيد', 'Wadi El Natrun' => 'وادي النطرون']],
        'Kafr El Sheikh' => ['ar' => 'كفر الشيخ', 'areas' => ['Kafr El Sheikh' => 'كفر الشيخ', 'Desouk' => 'دسوق', 'Fouh' => 'فوه', 'Baltim' => 'بلطيم']],
        'Ismailia' => ['ar' => 'الإسماعيلية', 'areas' => ['Ismailia' => 'الإسماعيلية', 'Fayed' => 'فايد', 'Qantara' => 'القنطرة']],
        'Suez' => ['ar' => 'السويس', 'areas' => ['Suez' => 'السويس', 'Ain Sokhna' => 'العين السخنة', 'Ataka' => 'عتاقة']],
        'Port Said' => ['ar' => 'بورسعيد', 'areas' => ['Port Fouad' => 'بور فؤاد', 'Al Arab' => 'العرب', 'Al Manakh' => 'المناخ']],
        'Fayoum' => ['ar' => 'الفيوم', 'areas' => ['Fayoum' => 'الفيوم', 'Sinnuris' => 'سنورس', 'Tamiya' => 'طامية']],
        'Minya' => ['ar' => 'المنيا', 'areas' => ['Minya' => 'المنيا', 'Mallawi' => 'ملوي', 'Samalut' => 'سمالوط']],
        'Aswan' => ['ar' => 'أسوان', 'areas' => ['Aswan' => 'أسوان', 'Edfu' => 'إدفو', 'Kom Ombo' => 'كوم أمبو']],
    ];

    public function run(): void
    {
        foreach ($this->locations as $name => $location) {
            $governorate = Governorate::withTrashed()->updateOrCreate(
                ['name' => $name],
                ['name_ar' => $location['ar'], 'is_active' => true, 'deleted_at' => null],
            );

            foreach ($location['areas'] as $areaName => $areaArabicName) {
                Area::withTrashed()->updateOrCreate(
                    ['governorate_id' => $governorate->id, 'name' => $areaName],
                    ['name_ar' => $areaArabicName, 'is_active' => true, 'deleted_at' => null],
                );
            }
        }
    }
}
