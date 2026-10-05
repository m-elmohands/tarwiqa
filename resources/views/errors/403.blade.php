<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Access denied · TARWIQA</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&family=Space+Grotesk:wght@700&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('assets/css/app.css') }}">
</head>

<body class="error-page">
    <main class="error-card">
        <span class="error-code">403</span>
        <p class="eyebrow">Access denied</p>
        <h1>This workspace is outside your access scope.</h1>
        <p>Your account is signed in, but it does not have permission to visit this page. Contact an administrator if
            you believe your access should be updated.</p>
        <a class="primary-button error-action" href="{{ auth()->check() ? route('dashboard') : route('login') }}">Return
            to my workspace</a>
    </main>
</body>

</html>
