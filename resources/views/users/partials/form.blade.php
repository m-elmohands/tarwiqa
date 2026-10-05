@if ($errors->any())
    <div class="catalog-notice danger">
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif

<div class="service-form-grid">
    @if ($user ?? false)
        <label class="field">
            <span>ID</span>
            <input value="{{ $user->id }}" disabled readonly>
        </label>
        @if ($user->role == 'customer')
            <label class="field">
                <span>Platform</span>
                <input value="{{ $user->platform }}" disabled readonly>
            </label>
            <label class="field">
                <span>Wallet Balance</span>
                <input value="{{ $user->wallet ? 'EGP ' . format_amount($user->wallet->balance) : '' }}" disabled
                    readonly>
            </label>
        @endif
    @endif
    @php
        $role = old('role', request('role', $user?->role ?? 'customer'));
    @endphp
    <input name="role" value="{{ $role }}" hidden>
    <div class="form-section-heading wide">
        <p class="eyebrow">Profile details</p>
        <h3>Identity and access</h3>
    </div>
    <label class="field">
        <span>Name</span>
        <input name="name" value="{{ old('name', $user?->name) }}" required>
    </label>
    <label class="field">
        <span>Email</span>
        <input name="email" type="email" value="{{ old('email', $user?->email) }}" required>
    </label>
    <label class="field">
        <span>Username</span>
        <input name="username" value="{{ old('username', $user?->username) }}" placeholder="Optional login name">
    </label>
    <label class="field">
        <span>Phone</span>
        <input name="phone" value="{{ old('phone', $user?->phone) }}">
    </label>
    @if ($role === 'customer')
        <label class="field"><span>Additional Number</span><input name="additional_phone"
                value="{{ old('additional_phone', $user?->additional_phone) }}"
                placeholder="Secondary contact number"></label>
        <label class="field"><span>National ID</span><input name="national_id"
                value="{{ old('national_id', $user?->national_id) }}" maxlength="30"
                placeholder="National identification number"></label>
    @endif
    <label class="field"><span>Governorate</span><select name="governorate_id">
            <option value="">Unassigned</option>
            @foreach ($governorates as $governorate)
                <option value="{{ $governorate->id }}" @selected((string) old('governorate_id', $user?->governorate_id) === (string) $governorate->id)>{{ $governorate->name }}</option>
            @endforeach
        </select>
    </label>
    <label class="field">
        <span>Status</span>
        <select name="status">
            @foreach (['active', 'inactive', 'suspended'] as $status)
                <option value="{{ $status }}" @selected(old('status', $user?->status ?? 'active') === $status)>{{ str($status)->title() }}</option>
            @endforeach
        </select>
    </label>
    @if ($role === 'customer')
        <label class="field"><span>Gender</span><select name="gender">
                <option value="">Not specified</option>
                <option value="male" @selected(old('gender', $user?->gender) === 'male')>Male</option>
                <option value="female" @selected(old('gender', $user?->gender) === 'female')>Female</option>
            </select></label>
        <label class="field"><span>Date of birth</span><input name="dob" type="date"
                value="{{ old('dob', $user?->dob?->format('Y-m-d')) }}"></label>
        <label class="field"><span>Platform</span><select name="platform">
                <option value="">Not specified</option>
                <option value="android" @selected(old('platform', $user?->platform) === 'android')>Android</option>
                <option value="ios" @selected(old('platform', $user?->platform) === 'ios')>iOS</option>
            </select></label>
        <label class="field"><span>Verification</span><select name="verification_status">
                <option value="pending" @selected(old('verification_status', $user?->verification_status ?? 'pending') === 'pending')>Pending verification</option>
                <option value="verified" @selected(old('verification_status', $user?->verification_status) === 'verified')>Verified</option>
                <option value="manual_review" @selected(old('verification_status', $user?->verification_status) === 'manual_review')>Manual review</option>
            </select></label>
        <label class="field"><span>Screenshot permission</span><select name="screenshot_allowed">
                <option value="1" @selected(old('screenshot_allowed', $user?->screenshot_allowed ?? true))>Allowed</option>
                <option value="0" @selected(old('screenshot_allowed', $user?->screenshot_allowed ?? true) === false || old('screenshot_allowed') === '0')>Blocked</option>
            </select></label>
        <label class="field wide"><span>Address</span>
            <textarea name="address" rows="2" placeholder="Street, district, building, and apartment">{{ old('address', $user?->address) }}</textarea>
        </label>
        <label class="field wide"><span>Internal notes</span>
            <textarea name="notes" rows="3" placeholder="Onboarding notes for support and operations">{{ old('notes', $user?->notes) }}</textarea>
        </label>
    @endif
    @if (in_array($role, ['partner', 'supporter'], true))
        <div class="form-section-heading wide">
            <p class="eyebrow">Operations</p>
            <h3>{{ $role === 'partner' ? 'Coverage, capacity and services' : 'Supporter access scope' }}</h3>
        </div>
        @if ($role === 'supporter')
            <label class="field"><span>Workspace role</span><select name="access_role">
                    <option value="viewer" @selected(old('access_role', $user?->settings['access_role'] ?? 'viewer') === 'viewer')>Viewer</option>
                    <option value="editor" @selected(old('access_role', $user?->settings['access_role'] ?? 'viewer') === 'editor')>Editor</option>
                </select></label>
            @php
                $supporterPermissions = [
                    'dashboard' => ['Supporter Dashboard', ['View dashboard summary', 'View scoped KPIs', 'View current session']],
                    'orders' => ['Scoped Orders', ['View scoped orders', 'Search and filter orders', 'Open order details', 'View customer and address', 'View payment and amount', 'Change order status', 'Add support note']],
                    'partners' => ['Scoped Partners', ['View scoped partners', 'Search and filter partners', 'Open partner details', 'View partner workload', 'Add or edit maid data', 'Open partner chat', 'Send partner message']],
                    'users' => ['Scoped Users', ['View scoped users', 'Open user profile', 'Edit user profile', 'Ban or restore user', 'Send user notifications']],
                    'messages' => ['Messages', ['View customer inbox', 'Open conversations', 'Mark messages read', 'Reply to messages']],
                    'reports' => ['Reports', ['View scoped reports', 'Export scoped reports']],
                    'profile' => ['Activity and Profile', ['View supporter profile', 'View assigned governorates', 'View action history']],
                ];
                $savedPermissions = old('permissions', $user?->settings['permissions'] ?? []);
            @endphp
            <div class="field wide supporter-access-scope">
                <span>Access Scope</span>
                <div class="scope-choice-grid">
                    <label><input type="hidden" name="can_view_orders" value="0"><input type="checkbox" name="can_view_orders" value="1" @checked(old('can_view_orders', $user?->settings['can_view_orders'] ?? true))> View Orders</label>
                    <label><input type="hidden" name="can_view_partners" value="0"><input type="checkbox" name="can_view_partners" value="1" @checked(old('can_view_partners', $user?->settings['can_view_partners'] ?? true))> View Partners</label>
                    <label><input type="hidden" name="can_export_reports" value="0"><input type="checkbox" name="can_export_reports" value="1" @checked(old('can_export_reports', $user?->settings['can_export_reports'] ?? false))> Export Reports</label>
                </div>
            </div>
            <div class="field wide supporter-permission-matrix">
                <div class="form-section-heading"><p class="eyebrow">Detailed permissions</p><h3>View and Edit access</h3></div>
                @foreach ($supporterPermissions as $groupKey => [$groupTitle, $items])
                    <fieldset class="supporter-permission-group"><legend>{{ $groupTitle }}</legend>
                        @foreach ($items as $itemKey => $itemTitle)
                            @php
                                $permissionPrefix = $groupKey.'.'.$itemKey;
                            @endphp
                            <div class="supporter-permission-row"><span>{{ $itemTitle }}</span><label><input type="checkbox" name="permissions[]" value="{{ $permissionPrefix }}.view" @checked(in_array($permissionPrefix.'.view', $savedPermissions, true))> View</label><label><input class="permission-edit" type="checkbox" name="permissions[]" value="{{ $permissionPrefix }}.edit" @checked(in_array($permissionPrefix.'.edit', $savedPermissions, true))> Edit</label></div>
                        @endforeach
                    </fieldset>
                @endforeach
            </div>
        @endif
        <fieldset class="field wide choice-field">
            <legend>{{ $role === 'partner' ? 'Covered areas' : 'Assigned governorates' }}</legend>
            <div class="scope-choice-grid">
                @if ($role === 'partner')
                    @foreach ($areas as $area)
                        <label><input type="checkbox" name="area_ids[]" value="{{ $area->id }}"
                                @checked(in_array($area->id, old('area_ids', $user?->partnerAreas?->pluck('id')->all() ?? [])))>{{ $area->name }}</label>
                    @endforeach
                @else
                    @foreach ($governorates as $governorate)
                        <label><input type="checkbox" name="governorate_ids[]" value="{{ $governorate->id }}"
                                @checked(in_array($governorate->id, old('governorate_ids', $user?->governorates?->pluck('id')->all() ?? [])))>{{ $governorate->name }}</label>
                    @endforeach
                @endif
            </div>
        </fieldset>
        @if ($role === 'partner')
            <label class="field"><span>Account type</span><select name="account_type">
                    <option value="individual" @selected(old('account_type', $user?->settings['account_type'] ?? 'individual') === 'individual')>Individual</option>
                    <option value="company" @selected(old('account_type', $user?->settings['account_type'] ?? 'individual') === 'company')>Company</option>
                </select></label>
            <label class="field"><span>Maximum daily orders</span><input name="max_daily_orders" type="number"
                    min="1" max="100"
                    value="{{ old('max_daily_orders', $user?->settings['max_daily_orders'] ?? 12) }}"></label>
            <fieldset class="field wide choice-field">
                <legend>Working days</legend>
                <div class="scope-choice-grid">
                    @foreach (['sat' => 'Saturday', 'sun' => 'Sunday', 'mon' => 'Monday', 'tue' => 'Tuesday', 'wed' => 'Wednesday', 'thu' => 'Thursday', 'fri' => 'Friday'] as $day => $label)
                        <label><input type="checkbox" name="working_days[]" value="{{ $day }}"
                                @checked(in_array($day, old('working_days', $user?->settings['working_days'] ?? ['sat', 'sun', 'mon', 'tue', 'wed', 'thu'])))>{{ $label }}</label>
                    @endforeach
                </div>
            </fieldset>
            <label class="field"><span>Working from</span><input name="work_start" type="time"
                    value="{{ old('work_start', $user?->settings['work_start'] ?? '08:00') }}"></label>
            <label class="field"><span>Working until</span><input name="work_end" type="time"
                    value="{{ old('work_end', $user?->settings['work_end'] ?? '20:00') }}"></label>
            <label class="field wide"><span>Assigned maids</span><select name="maid_ids[]" multiple size="5">
                    @foreach ($maids as $maid)
                        <option value="{{ $maid->id }}" @selected(in_array($maid->id, old('maid_ids', $user?->settings['maid_ids'] ?? [])))>{{ $maid->name }} ·
                            {{ $maid->phone ?: 'No phone' }}</option>
                    @endforeach
                </select>
                <small class="field-hint">Hold Ctrl/Cmd to assign more than one maid.</small></label>
            <fieldset class="field wide choice-field">
                <legend>Supported services and offers</legend>
                <div class="scope-choice-grid">
                    @foreach ($serviceCategories as $serviceCategory)
                        <label><input type="checkbox" name="service_ids[]" value="{{ $serviceCategory->id }}"
                                @checked(in_array($serviceCategory->id, old('service_ids', $user?->settings['service_ids'] ?? [])))>{{ $serviceCategory->title }}</label>
                    @endforeach
                </div>
            </fieldset>

            <div class="form-section-heading wide">
                <p class="eyebrow">Finance</p>
                <h3>Commission and settlement</h3>
            </div>
            <label class="field"><span>Commission (%)</span><input name="commission_percent" type="number"
                    min="0" max="100" step="0.1"
                    value="{{ old('commission_percent', $user?->settings['commission_percent'] ?? 18) }}"></label>
            <label class="field"><span>Settlement method</span><select name="settlement_method">
                    <option value="bank" @selected(old('settlement_method', $user?->settings['settlement_method'] ?? 'bank') === 'bank')>Bank transfer</option>
                    <option value="wallet" @selected(old('settlement_method', $user?->settings['settlement_method'] ?? 'bank') === 'wallet')>E-wallet</option>
                    <option value="cash" @selected(old('settlement_method', $user?->settings['settlement_method'] ?? 'bank') === 'cash')>Cash settlement</option>
                </select></label>
            <label class="field"><span>Bank name</span><input name="bank_name"
                    value="{{ old('bank_name', $user?->settings['bank_name'] ?? '') }}"></label>
            <label class="field"><span>Account holder</span><input name="account_holder"
                    value="{{ old('account_holder', $user?->settings['account_holder'] ?? '') }}"></label>
            <label class="field"><span>IBAN / account number</span><input name="bank_account"
                    value="{{ old('bank_account', $user?->settings['bank_account'] ?? '') }}"></label>
            <label class="field"><span>Wallet phone</span><input name="wallet_phone"
                    value="{{ old('wallet_phone', $user?->settings['wallet_phone'] ?? '') }}"></label>
            <label class="field"><span>Emergency contact</span><input name="emergency_name"
                    value="{{ old('emergency_name', $user?->settings['emergency_name'] ?? '') }}"></label>
            <label class="field"><span>Emergency phone</span><input name="emergency_phone"
                    value="{{ old('emergency_phone', $user?->settings['emergency_phone'] ?? '') }}"></label>
            <div class="form-section-heading wide">
                <p class="eyebrow">Compliance</p>
                <h3>Legal data and documents</h3>
            </div>
            <label class="field"><span>Document expiry</span><input name="document_expiry" type="date"
                    value="{{ old('document_expiry', $user?->settings['document_expiry'] ?? '') }}"></label>
            <label class="field"><span>Commercial registration</span><input name="commercial_registration"
                    value="{{ old('commercial_registration', $user?->settings['commercial_registration'] ?? '') }}"></label>
            <label class="field"><span>Tax number</span><input name="tax_number"
                    value="{{ old('tax_number', $user?->settings['tax_number'] ?? '') }}"></label>
            <div class="form-section-heading wide">
                <p class="eyebrow">Workspace role</p>
                <h3>Partner access level</h3>
            </div>
            <label class="field"><span>Workspace access</span><select name="workspace_role">
                    <option value="viewer" @selected(old('workspace_role', $user?->settings['workspace_role'] ?? 'viewer') === 'viewer')>Viewer</option>
                    <option value="editor" @selected(old('workspace_role', $user?->settings['workspace_role'] ?? 'viewer') === 'editor')>Operational editor</option>
                </select></label>
        @endif
        <label class="field wide"><span>Registered address</span>
            <textarea name="address" rows="2">{{ old('address', $user?->address) }}</textarea>
        </label>
        <label class="field wide"><span>Internal notes</span>
            <textarea name="notes" rows="3">{{ old('notes', $user?->notes) }}</textarea>
        </label>
    @endif
    <div class="form-section-heading wide">
        <p class="eyebrow">Security</p>
        <h3>Credentials and account protection</h3>
    </div>
    <label class="field">
        <span>Password {{ $user ? '(leave blank to retain)' : '' }}</span>
        <input name="password" type="password" {{ $user ? '' : 'required' }}>
    </label>
    <label class="field">
        <span>Confirm password</span>
        <input name="password_confirmation" type="password" {{ $user ? '' : 'required' }}>
    </label>
</div>
<div class="form-actions catalog-form-actions">
    <a class="ui-button ghost" href="{{ url()->previous() }}">Cancel</a>
    <button class="ui-button primary" type="submit">Save User</button>
</div>

@push('scripts')
    <script>
        const tabButtons = document.querySelectorAll(".tab-btn");
        const tabPanels = document.querySelectorAll(".tab-panel");

        function setActiveTab(targetId) {
            tabButtons.forEach((button) => {
                button.classList.toggle(
                    "active",
                    button.dataset.tab === targetId,
                );
            });

            tabPanels.forEach((panel) => {
                panel.classList.toggle("active", panel.id === targetId);
            });
        }

        tabButtons.forEach((button) => {
            button.addEventListener("click", () =>
                setActiveTab(button.dataset.tab),
            );
        });

        const supporterRole = document.querySelector('select[name="access_role"]');
        const permissionEdits = document.querySelectorAll('.permission-edit');
        const syncPermissionRole = () => {
            const viewer = supporterRole?.value === 'viewer';
            permissionEdits.forEach((input) => {
                input.disabled = viewer;
                if (viewer) input.checked = false;
            });
        };
        supporterRole?.addEventListener('change', syncPermissionRole);
        document.querySelectorAll('.supporter-permission-row').forEach((row) => {
            const view = row.querySelector('input[value$=".view"]');
            const edit = row.querySelector('.permission-edit');
            view?.addEventListener('change', () => { if (!view.checked && edit) edit.checked = false; });
            edit?.addEventListener('change', () => { if (edit.checked && view) view.checked = true; });
        });
        syncPermissionRole();
    </script>
@endpush
