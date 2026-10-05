<?php

namespace App\Contracts\Services;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

interface MediaServiceInterface
{
    public function replace(Model $model, UploadedFile $file, string $collection): Media;
}
