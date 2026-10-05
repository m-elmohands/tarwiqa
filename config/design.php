<?php

return [
    'workspaces' => [
        'super-admin' => [
            'directory' => 'super-admin',
            'role' => 'super_admin',
            'permission' => 'design.super_admin.view',
            'home' => 'admin-dashboard.html',
        ],
        'supporter' => [
            'directory' => 'supporter',
            'role' => 'supporter',
            'permission' => 'design.supporter.view',
            'home' => 'supporter-dashboard.html',
        ],
        'partner' => [
            'directory' => 'partner',
            'role' => 'partner',
            'permission' => 'design.partner.view',
            'home' => 'partner-dashboard.html',
        ],
    ],
];
