<?php

namespace App\Services;

use App\Contracts\Services\MediaServiceInterface;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use InvalidArgumentException;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class MediaService implements MediaServiceInterface
{
    public function replace(Model $model, UploadedFile $file, string $collection): Media
    {
        if (! $model instanceof HasMedia) {
            throw new InvalidArgumentException('The target model does not support media.');
        }

        $model->clearMediaCollection($collection);

        return $model->addMedia($file)->toMediaCollection($collection);
    }
}
