<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="light">
    <title>Sign in · TARWIQA</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Space+Grotesk:wght@600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('assets/css/app.css') }}">
</head>

<body class="login-page" data-page="login">
    <main class="login-shell">
        <section class="brand-panel" aria-labelledby="brand-title">
            <div class="brand-card">
                <div class="brand-orbit orbit-one" aria-hidden="true"></div>
                <div class="brand-orbit orbit-two" aria-hidden="true"></div>

                <a class="login-brand" href="{{ route('login') }}" aria-label="TARWIQA sign in">
                    <span class="login-brand-mark" aria-hidden="true">
                        <svg viewBox="0 0 32 32"><path d="M7 8.5h18M10 15h12M13 21.5h6"/><circle cx="16" cy="16" r="13"/></svg>
                    </span>
                    <span>TARWIQA</span>
                </a>

                <div class="brand-copy">
                    <p class="eyebrow">One platform. Every operation.</p>
                    <h1 id="brand-title">Run service operations with clarity.</h1>
                    <p>Manage teams, customers, services, and daily activity from the workspace built for your role.</p>
                </div>

                <div class="login-highlights" aria-label="Platform highlights">
                    <div><strong>3</strong><span>Role-based workspaces</span></div>
                    <div><strong>24/7</strong><span>Operational visibility</span></div>
                    <div><strong>Secure</strong><span>Permission-led access</span></div>
                </div>
            </div>
        </section>

        <section class="login-panel" aria-labelledby="login-title">
            <div class="login-card">
                <header class="form-head">
                    <span class="login-mobile-mark" aria-hidden="true">T</span>
                    <p class="eyebrow">Welcome back</p>
                    <h2 id="login-title">Sign in to your workspace</h2>
                    <p>Enter your account details and we’ll take you to the right dashboard.</p>
                </header>

                <form method="POST" action="{{ route('login.store') }}" novalidate>
                    @csrf

                    <label class="field-group" for="email">
                        <span>Email address</span>
                        <span class="login-input-wrap">
                            <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M3 6.5h18v11H3z"/><path d="m4 8 8 5 8-5"/></svg>
                            <input id="email" name="email" type="email" value="{{ old('email') }}" autocomplete="email" placeholder="name@tarwiqa.test" required autofocus aria-describedby="email-error">
                        </span>
                    </label>
                    @error('email')
                        <p class="form-error" id="email-error" role="alert">{{ $message }}</p>
                    @enderror

                    <label class="field-group" for="password">
                        <span>Password</span>
                        <span class="login-input-wrap password-wrap">
                            <svg aria-hidden="true" viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>
                            <input id="password" name="password" type="password" autocomplete="current-password" placeholder="Enter your password" required aria-describedby="password-error">
                            <button class="show-password-btn" type="button" data-password-toggle aria-controls="password" aria-pressed="false">Show</button>
                        </span>
                    </label>
                    @error('password')
                        <p class="form-error" id="password-error" role="alert">{{ $message }}</p>
                    @enderror

                    <div class="form-row">
                        <label class="remember-check">
                            <input name="remember" type="checkbox" value="1" @checked(old('remember'))>
                            <span>Keep me signed in</span>
                        </label>
                        <span class="secure-session"><i aria-hidden="true"></i>Encrypted session</span>
                    </div>

                    <button class="login-btn" type="submit">
                        <span>Sign in securely</span>
                        <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h14M14 7l5 5-5 5"/></svg>
                    </button>
                </form>

                <div class="demo-accounts">
                    <div class="demo-heading"><span>Demo access</span><small>Password: <strong>password</strong></small></div>
                    <div class="demo-account-grid">
                        <button type="button" data-demo-email="admin@tarwiqa.test"><span class="demo-avatar admin">A</span><span><strong>Super admin</strong><small>admin@tarwiqa.test</small></span></button>
                        <button type="button" data-demo-email="supporter@tarwiqa.test"><span class="demo-avatar supporter">S</span><span><strong>Supporter</strong><small>supporter@tarwiqa.test</small></span></button>
                        <button type="button" data-demo-email="partner@tarwiqa.test"><span class="demo-avatar partner">P</span><span><strong>Partner</strong><small>partner@tarwiqa.test</small></span></button>
                    </div>
                </div>

                <p class="login-help">Need access? Contact your TARWIQA administrator.</p>
            </div>
        </section>
    </main>
    <script src="{{ asset('assets/js/app.js') }}"></script>
</body>

</html>
