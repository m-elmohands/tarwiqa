<section class="tabs-card">
    <div class="tabs-header">
        <button class="tab-btn active" data-tab="orders-tab" type="button">Orders</button>
        <button class="tab-btn" data-tab="wallet-tab" type="button">Wallet</button>
        <button class="tab-btn" data-tab="logs-tab" type="button">Logs</button>
        <button class="tab-btn" data-tab="addresses-tab" type="button">Addresses</button>
        <button class="tab-btn" data-tab="messages-tab" type="button">Messages History</button>
    </div>

    <div class="tab-panel active" id="orders-tab">
        <div class="panel-topline">
            <div>
                <p class="eyebrow">Orders</p>
                <h3>Recent orders and fulfillment state</h3>
            </div>
            <button class="inline-btn" id="viewAllOrdersBtn" type="button">View All Orders</button>
        </div>

        <div class="table-shell">
            <table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Channel</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($user->orders as $item)
                        <tr>
                            <td>#ORD-{{ $item->id }}</td>
                            <td>{{ $item->created_at->format('M d, Y • h:i A') }}</td>
                            <td>
                                <span class="badge blue">{{ $item->status }}</span>
                            </td>
                            <td>{{ $user->platform }}</td>
                            <td>EGP {{ number_format($item->total, 2) }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>

    <div class="tab-panel" id="wallet-tab">
        <div class="panel-topline">
            <div>
                <p class="eyebrow">Wallet</p>
                <h3>Balance movements and recent transactions</h3>
            </div>
            {{-- <button class="inline-btn" type="button" onclick="location.href='./wallet-ledger.html'">Open Wallet Ledger</button> --}}
        </div>

        <div class="timeline">
            @if($user->wallet)
                @foreach ($user->wallet->transactions as $item)
                    <article class="timeline-item">
                        <div class="timeline-dot {{ $item->type == 'deposit' ? 'success' : 'neutral' }}"></div>
                        <div>
                            <h4>Wallet {{ $item->type }}</h4>
                            <p>{{ ($item->type == 'deposit' ? '+' : '-') . " EGP {$item->amount}" }}</p>
                        </div>
                        <time>{{ $item->created_at->format('M d, Y • h:i A') }}</time>
                    </article>
                @endforeach
            @endif

            {{-- <article class="timeline-item">
                    <div class="timeline-dot alert"></div>
                    <div>
                        <h4>Refund issued</h4>
                        <p>+ EGP 740 returned to wallet after order cancellation</p>
                    </div>
                    <time>20 Apr 2026</time>
                </article> --}}
        </div>
    </div>

    <div class="tab-panel" id="logs-tab">
        <div class="panel-topline">
            <div>
                <p class="eyebrow">Logs</p>
                <h3>Audit-friendly user activity stream</h3>
            </div>
            {{-- <button class="inline-btn" id="exportLogsBtn" type="button">Export Logs</button> --}}
        </div>

        <div class="log-list">
            <article class="log-item">
                <strong>Admin updated address</strong>
                <p>Changed from "Nasr City" to "12 Nile Corniche, Maadi".</p>
                <span>By admin.sara at 22 Apr 2026, 10:11 AM</span>
            </article>
            <article class="log-item">
                <strong>User logged in from new device</strong>
                <p>iPhone 15 Pro, Cairo, Egypt. OTP verification passed.</p>
                <span>22 Apr 2026, 08:58 AM</span>
            </article>
            <article class="log-item">
                <strong>Restriction status reviewed</strong>
                <p>No active restrictions. Compliance check completed successfully.</p>
                <span>21 Apr 2026, 06:20 PM</span>
            </article>
        </div>
    </div>

    <div class="tab-panel" id="addresses-tab">
        <div class="panel-topline">
            <div>
                <p class="eyebrow">Addresses</p>
                <h3>Customer addresses with governorate and location control</h3>
            </div>
            {{-- <div class="address-actions">
                    <button class="inline-btn" id="addNewAddressBtn" type="button">Add New Address</button>
                </div> --}}
        </div>

        <section class="address-summary-grid">
            <article class="address-summary-card">
                <span>Total Saved Addresses</span>
                <strong id="addressCountValue">{{ $user->addresses()->count() }}</strong>
                <small>Available for the customer at checkout</small>
            </article>
            <article class="address-summary-card">
                <span>Default Governorate</span>
                <strong
                    id="defaultGovernorateValue">{{ $user->addresses()->firstWhere('is_default', true)?->city->name }}</strong>
                <small>Most frequently selected by this customer</small>
            </article>
            <article class="address-summary-card">
                <span>Admin Controlled Locations</span>
                <strong>Enabled</strong>
                <small>Customer chooses from dashboard-defined location names</small>
            </article>
        </section>

        <div class="address-workspace">
            <div class="table-shell">
                <table>
                    <thead>
                        <tr>
                            <th>Address ID</th>
                            <th>Governorate</th>
                            <th>Location</th>
                            <th>Street</th>
                            <th>Building</th>
                            <th>Floor / Apartment</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($user->addresses as $item)
                            <tr>
                                <td>#ADDR-{{ $item->id }}</td>
                                <td>{{ $item->city->name }}</td>
                                <td>{{ $item->location?->name }}</td>
                                <td>{{ $item->street }}</td>
                                <td>{{ $item->building }}</td>
                                <td>{{ $item->floor }} / {{ $item->apartment }}</td>
                                <td>
                                    <div class="table-actions">
                                        <button class="table-action-btn view" type="button" data-address-action="view"
                                            data-address-id="#ADDR-2001">View</button>
                                        <button class="table-action-btn edit" type="button" data-address-action="edit"
                                            data-address-id="#ADDR-2001">Edit</button>
                                        <button class="table-action-btn delete" type="button"
                                            data-address-action="delete" data-address-id="#ADDR-2001">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>

            <div class="address-editor-card">
                <div class="section-head">
                    <div>
                        <p class="eyebrow">Address Editor</p>
                        <h3 id="addressFormTitle">Add New Address</h3>
                    </div>
                    <button class="ghost-btn" id="resetAddressFormBtn" type="button">Reset Form</button>
                </div>

                <form class="address-form" id="addressForm">
                    <input id="addressEditId" type="hidden" />

                    <div class="address-form-grid">
                        <label class="field readonly">
                            <span>Address ID</span>
                            <input id="addressIdPreview" type="text" value="Auto Generated" readonly />
                        </label>

                        <label class="field">
                            <span>Governorate</span>
                            <select id="governorateSelect" required>
                                <option value="Alexandria">Alexandria</option>
                                <option value="North Coast">North Coast</option>
                                <option value="Beheira">Beheira</option>
                                <option value="Cairo" selected>Cairo</option>
                                <option value="New Cairo">New Cairo</option>
                                <option value="Giza">Giza</option>
                            </select>
                        </label>

                        <label class="field">
                            <span>Location</span>
                            <select id="locationSelect" required></select>
                        </label>

                        <label class="field">
                            <span>Street Name</span>
                            <input id="streetInput" type="text" placeholder="Example: Nile Corniche" required />
                        </label>

                        <label class="field">
                            <span>House Number</span>
                            <input id="houseNumberInput" type="text" placeholder="Example: 12" required />
                        </label>

                        <label class="field">
                            <span>House Name</span>
                            <input id="houseNameInput" type="text" placeholder="Example: Al Yasmin Tower" />
                        </label>

                        <label class="field">
                            <span>Floor Number</span>
                            <input id="floorNumberInput" type="text" placeholder="Example: 6" />
                        </label>

                        <label class="field">
                            <span>Apartment Number</span>
                            <input id="apartmentNumberInput" type="text" placeholder="Example: 17B" />
                        </label>

                        <label class="field wide">
                            <span>Address Notes</span>
                            <input id="notesInput" type="text"
                                placeholder="Example: Ring the bell twice and call before arrival" />
                        </label>
                    </div>

                    <div class="address-form-actions">
                        <button class="save-btn" id="saveAddressBtn" type="submit">Save Address</button>
                        <button class="ghost-btn" id="cancelEditAddressBtn" type="button">Cancel Edit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div class="tab-panel" id="messages-tab">
        <div class="panel-topline">
            <div>
                <p class="eyebrow">Messages</p>
                <h3>Support and outbound communication history</h3>
            </div>
            <button class="inline-btn" type="button" onclick="location.href='./messages-inbox.html'">send
                message</button>
        </div>

        <div class="message-stack">
            <article class="message-item outgoing">
                <div class="message-head">
                    <strong>Support Team</strong>
                    <span>21 Apr 2026, 04:10 PM</span>
                </div>
                <p>Your refund has been processed and added to your wallet balance.</p>
            </article>

            <article class="message-item incoming">
                <div class="message-head">
                    <strong>mariam ashraf awad</strong>
                    <span>21 Apr 2026, 04:14 PM</span>
                </div>
                <p>Received, thank you. Please keep the wallet active for my next order.</p>
            </article>

            <article class="message-item outgoing">
                <div class="message-head">
                    <strong>CRM Automation</strong>
                    <span>19 Apr 2026, 11:30 AM</span>
                </div>
                <p>Exclusive loyalty offer sent via push notification and email.</p>
            </article>
        </div>
    </div>
</section>

<div class="modal-overlay hidden" id="profileModal">
    <div class="modal-card">
        <div class="modal-head">
            <div>
                <p class="eyebrow"></p>
                <h2 id="profileModalTitle"></h2>
                <p class="modal-subtitle" id="profileModalSubtitle"></p>
            </div>
            <button class="icon-btn" id="closeProfileModalBtn" type="button"
                aria-label="Close profile action modal">x</button>
        </div>

        <div class="modal-body">
            <div class="info-panel" id="profileModalContent"></div>
        </div>

        <div class="modal-actions">
            <button class="ghost-btn" id="closeProfileModalFooterBtn" type="button">Close</button>
        </div>
    </div>
</div>

@push('scripts')
    <script>
        const profileModal = document.getElementById("profileModal");
        const profileModalTitle = document.getElementById("profileModalTitle");
        const profileModalSubtitle = document.getElementById("profileModalSubtitle");
        const profileModalContent = document.getElementById("profileModalContent");
        const closeProfileModalBtn = document.getElementById("closeProfileModalBtn");
        const closeProfileModalFooterBtn = document.getElementById("closeProfileModalFooterBtn");
        const viewAllOrdersBtn = document.getElementById("viewAllOrdersBtn");
        const profileInfoRowTemplate = document.getElementById("profileInfoRowTemplate");

        const userData = @json($user);

        function buildInfoRows(rows) {
            return rows.map(([label, value]) => {
                return `<p><strong>${label}</strong> ${value}</p>`;
            });
        }

        function openModal(title, subtitle, rows) {
            if (
                !profileModal ||
                !profileModalTitle ||
                !profileModalSubtitle ||
                !profileModalContent
            ) {
                return;
            }

            profileModalTitle.textContent = title;
            profileModalSubtitle.textContent = subtitle;
            profileModalContent.innerHTML = rows;
            profileModal.classList.remove("hidden");
        }

        function closeModal() {
            profileModal.classList.add("hidden");
        }

        viewAllOrdersBtn.addEventListener("click", () => {
            openModal(
                "All Orders",
                "A quick extended order snapshot for this customer.",
                userData.orders.map((order) => {
                    const date = new Date(order.created_at);
                    const formattedDate = date.toLocaleDateString('en-EG', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                    });

                    return `<p><strong>#${order.id}</strong> • ${formattedDate} • ${order.status} • ${userData.platform} • EGP ${order.total}</p>`;
                }).join('')
            );
        });

        closeProfileModalBtn.addEventListener("click", closeModal);
        closeProfileModalFooterBtn.addEventListener("click", closeModal);

        profileModal.addEventListener("click", (event) => {
            if (event.target === profileModal) {
                closeModal();
            }
        });
    </script>
@endpush
