@php
    $headerUser = auth()->user();
    $headerRole = str($headerUser->role)->replace('_', ' ')->title();
    $headerInitials = str($headerUser->name)->trim()->explode(' ')->take(2)->map(fn ($part) => str($part)->substr(0, 1))->join('');
@endphp

<header class="app-header">
    <div class="app-header-main">
        <button class="menu-toggle" type="button" aria-label="Open navigation" aria-controls="appSidebar"
            aria-expanded="false"><span></span><span></span><span></span></button>
        <div class="app-header-copy">
            <p class="app-header-eyebrow"><span aria-hidden="true"></span>@yield('eyebrow', 'Workspace')</p>
            <h1>@yield('heading', 'Dashboard')</h1>
            @hasSection('subtitle')
                <p>@yield('subtitle')</p>
            @endif
        </div>
    </div>
    <div class="app-header-actions">
        <div class="workspace-status" title="Your workspace is available">
            <span class="workspace-status-dot" aria-hidden="true"></span>
            <span><small>Workspace</small><strong>{{ $headerRole }}</strong></span>
        </div>
        <details class="account-menu">
            <summary aria-label="Open account menu">
                <span class="header-avatar">
                    @if ($headerUser->hasMedia('avatar'))
                        <img src="{{ $headerUser->getFirstMediaUrl('avatar', 'thumb') }}" alt="">
                    @else
                        {{ $headerInitials }}
                    @endif
                </span>
                <span class="account-summary-copy"><strong>{{ $headerUser->name }}</strong><small>{{ $headerUser->email }}</small></span>
                <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m8 10 4 4 4-4" /></svg>
            </summary>
            <div class="account-menu-panel">
                <div class="account-menu-heading">
                    <span class="header-avatar large">
                        @if ($headerUser->hasMedia('avatar'))
                            <img src="{{ $headerUser->getFirstMediaUrl('avatar', 'thumb') }}" alt="">
                        @else
                            {{ $headerInitials }}
                        @endif
                    </span>
                    <span><strong>{{ $headerUser->name }}</strong><small>{{ $headerRole }}</small></span>
                </div>
                @pageAccess('profile.media.manage')
                    <form class="avatar-form" method="POST" action="{{ route('profile.avatar') }}"
                        enctype="multipart/form-data">
                        @csrf
                        <label>
                            <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 7h4l2-3h4l2 3h4v13H4V7Z" /><circle cx="12" cy="13" r="4" /></svg>
                            Change profile photo
                            <input name="avatar" type="file" accept="image/jpeg,image/png,image/webp"
                                onchange="this.form.submit()">
                        </label>
                    </form>
                @endpageAccess
                <form class="header-logout" method="POST" action="{{ route('logout') }}">
                    @csrf
                    <button type="submit">
                        <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M10 4H4v16h6M14 8l4 4-4 4M8 12h10" /></svg>
                        Log out
                    </button>
                </form>
            </div>
        </details>
    </div>
</header>
