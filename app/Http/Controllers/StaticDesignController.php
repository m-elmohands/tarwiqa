<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

class StaticDesignController extends Controller
{
    private const MIME_TYPES = [
        'css' => 'text/css; charset=UTF-8',
        'html' => 'text/html; charset=UTF-8',
        'js' => 'application/javascript; charset=UTF-8',
        'png' => 'image/png',
        'jpg' => 'image/jpeg',
        'jpeg' => 'image/jpeg',
        'svg' => 'image/svg+xml',
        'webp' => 'image/webp',
    ];

    public function __invoke(Request $request, string $file): Response
    {
        $workspace = $request->route('workspace');

        abort_unless(array_key_exists($workspace, config('design.workspaces')), 404);
        abort_unless($file === basename($file), 404);

        $extension = strtolower(pathinfo($file, PATHINFO_EXTENSION));
        abort_unless(array_key_exists($extension, self::MIME_TYPES), 404);

        $root = realpath(base_path(config("design.workspaces.{$workspace}.directory")));
        $path = realpath($root.DIRECTORY_SEPARATOR.$file);

        abort_unless($root && $path && str_starts_with($path, $root.DIRECTORY_SEPARATOR) && is_file($path), 404);

        return response(file_get_contents($path), 200, [
            'Content-Type' => self::MIME_TYPES[$extension],
            'Cache-Control' => $extension === 'html' ? 'no-store' : 'public, max-age=3600',
            'X-Content-Type-Options' => 'nosniff',
        ]);
    }
}
