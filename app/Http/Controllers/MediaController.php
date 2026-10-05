<?php

namespace App\Http\Controllers;

use App\Contracts\Services\MediaServiceInterface;
use App\Http\Requests\Media\UploadAvatarRequest;
use Illuminate\Http\RedirectResponse;

class MediaController extends Controller
{
    public function __construct(private readonly MediaServiceInterface $media) {}

    public function avatar(UploadAvatarRequest $request): RedirectResponse
    {
        $this->media->replace($request->user(), $request->file('avatar'), 'avatar');

        return back()->with('status', 'Profile image updated successfully.');
    }
}
