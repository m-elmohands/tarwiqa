<?php

namespace App\Support;

use Illuminate\Support\Facades\Cache;

class CatalogCache
{
    public static function key(string $suffix): string
    {
        return 'api:v1:catalog:v'.self::version().':'.$suffix;
    }

    public static function version(): int
    {
        return (int) Cache::rememberForever('api:v1:catalog:version', fn () => 1);
    }

    public static function flush(): void
    {
        $key = 'api:v1:catalog:version';
        Cache::forever($key, self::version() + 1);
    }
}
