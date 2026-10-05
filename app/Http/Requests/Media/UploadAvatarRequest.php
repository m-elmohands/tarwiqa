<?php

namespace App\Http\Requests\Media;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\File;

class UploadAvatarRequest extends FormRequest
{
    public function authorize(): bool
    {
        return can_access_page('profile.media.manage');
    }

    public function rules(): array
    {
        return [
            'avatar' => ['required', File::image()->types(['jpg', 'jpeg', 'png', 'webp'])->max('5mb')],
        ];
    }
}
