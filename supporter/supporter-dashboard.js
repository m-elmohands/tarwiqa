const defaultSupporters = [
    {
        id: "SUP-0901",
        name: "Hassan Mahmoud",
        username: "support.hassan",
        password: "Support@0901",
        email: "hassan@tarwiqa.app",
        status: "Active",
        role: "editor",
        governorates: ["Cairo", "Giza"],
        canViewOrders: true,
        canViewPartners: true,
        canExportReports: true,
    },
    {
        id: "SUP-0902",
        name: "Reem Ashraf",
        username: "support.reem",
        password: "Support@0902",
        email: "reem@tarwiqa.app",
        status: "Active",
        role: "viewer",
        governorates: ["Alexandria"],
        canViewOrders: true,
        canViewPartners: true,
        canExportReports: false,
    },
    {
        id: "SUP-0903",
        name: "Omar Nabil",
        username: "support.omar",
        password: "Support@0903",
        email: "omar@tarwiqa.app",
        status: "Paused",
        role: "viewer",
        governorates: ["Qalyubia", "Dakahlia", "Sharqia"],
        canViewOrders: true,
        canViewPartners: true,
        canExportReports: false,
    },
];

const workspaceOrdersSeed = [
    {
        id: "ORD-9102",
        userName: "Mariam Kamal",
        city: "Cairo",
        address: "12 Nile Corniche, Maadi",
        arrival: "2026-08-19 08:00 AM",
        status: "Under Review",
        partner: "Mona Adel",
        amount: "EGP 2,400",
        totalPrice: 2400,
        wallet: 250,
        deposit: 300,
        discount: 100,
        createdDate: "2026-08-18 09:10 AM",
        orderDate: "2026-08-19",
        arrivalTime: "08:00",
        maids: ["Amina Mostafa"],
        extras: ["Deep Cleaning Kit", "Ironing"],
        payment: "Cash",
        paymentMethod: "Cash",
        packageName: "Premium Deep Clean",
    },
    {
        id: "ORD-9105",
        userName: "Youssef Adel",
        city: "Giza",
        address: "45 Tahrir St, Dokki",
        arrival: "2026-08-20 01:00 PM",
        status: "Under Review",
        partner: "Ahmed Fathy",
        amount: "EGP 1,750",
        totalPrice: 1750,
        wallet: 0,
        deposit: 400,
        discount: 50,
        createdDate: "2026-08-18 09:35 AM",
        orderDate: "2026-08-20",
        arrivalTime: "13:00",
        maids: ["Hoda Ali"],
        extras: ["Window Cleaning"],
        payment: "Bank Transfer",
        paymentMethod: "Bank Transfer",
        packageName: "Business Standard",
    },
    {
        id: "ORD-9108",
        userName: "Nour Hassan",
        city: "Alexandria",
        address: "21 El-Horreya Rd, Roushdy",
        arrival: "2026-08-21 11:00 AM",
        status: "Under Review",
        partner: "Reem Alexandria",
        amount: "EGP 980",
        totalPrice: 980,
        wallet: 80,
        deposit: 100,
        discount: 0,
        createdDate: "2026-08-18 10:05 AM",
        orderDate: "2026-08-21",
        arrivalTime: "11:00",
        maids: ["Amal Fathy"],
        extras: ["Fridge Cleaning"],
        payment: "E-Wallet",
        paymentMethod: "E-Wallet",
        packageName: "Summer Check",
    },
    {
        id: "ORD-9111",
        userName: "Salma Emad",
        city: "Cairo",
        address: "88 Abbas El Akkad, Nasr City",
        arrival: "2026-08-22 09:30 AM",
        status: "Waiting List",
        partner: "Karim Samir",
        amount: "EGP 2,100",
        totalPrice: 2100,
        wallet: 100,
        deposit: 250,
        discount: 75,
        createdDate: "2026-08-18 10:48 AM",
        orderDate: "2026-08-22",
        arrivalTime: "09:30",
        maids: ["Eman Yasser"],
        extras: ["Kitchen Sanitizing", "Carpet Refresh"],
        payment: "Cash",
        paymentMethod: "Cash",
        packageName: "Gold Package",
    },
    {
        id: "ORD-9117",
        userName: "Aya Tarek",
        city: "Cairo",
        address: "9 El Nozha St, Heliopolis",
        arrival: "2026-08-23 06:00 PM",
        status: "Accepted",
        partner: "Salma Youssef",
        amount: "EGP 860",
        totalPrice: 860,
        wallet: 60,
        deposit: 120,
        discount: 30,
        createdDate: "2026-08-18 12:02 PM",
        orderDate: "2026-08-23",
        arrivalTime: "18:00",
        maids: ["Aya Tarek"],
        extras: ["Ironing"],
        payment: "E-Wallet",
        paymentMethod: "E-Wallet",
        packageName: "Express Plus",
    },
];

const offerCatalog = {
    "Premium Deep Clean": {
        city: "Cairo",
        widget: "Cleaning",
        category: "Home Cleaning",
        packageName: "Premium Deep Clean",
        catalogPrice: 2400,
        duration: "3-4 hours",
        description:
            "Full home deep cleaning package covering rooms, bathrooms, kitchen surfaces, floors, and detailed finishing.",
    },
    "Business Standard": {
        city: "Giza",
        widget: "Cleaning",
        category: "Office Service",
        packageName: "Business Standard",
        catalogPrice: 1750,
        duration: "2-3 hours",
        description:
            "Standard office cleaning visit with workstation, reception, pantry, and floor care.",
    },
    "Summer Check": {
        city: "Alexandria",
        widget: "Maintenance",
        category: "AC Service",
        packageName: "Summer Check",
        catalogPrice: 980,
        duration: "1-2 hours",
        description:
            "Seasonal service check for cooling readiness and light maintenance follow-up.",
    },
    "Gold Package": {
        city: "Cairo",
        widget: "Cleaning",
        category: "Move In Service",
        packageName: "Gold Package",
        catalogPrice: 2100,
        duration: "3 hours",
        description:
            "Move-in cleaning package for preparing a property before handover or first use.",
    },
    "Express Plus": {
        city: "Cairo",
        widget: "Cleaning",
        category: "Kitchen Cleaning",
        packageName: "Express Plus",
        catalogPrice: 860,
        duration: "1.5-2 hours",
        description:
            "Fast cleaning visit for priority areas with focused finishing and light sanitizing.",
    },
};
const workspacePartners = [
    {
        id: "OP-1024",
        name: "Mona Adel",
        username: "ops.mona",
        status: "Active",
        governorate: "Cairo",
        zone: "New Cairo",
        managedMaids: 18,
        completedOrders: 246,
    },
    {
        id: "OP-1031",
        name: "Karim Samir",
        username: "ops.karim",
        status: "Active",
        governorate: "Cairo",
        zone: "Nasr City",
        managedMaids: 14,
        completedOrders: 198,
    },
    {
        id: "OP-1042",
        name: "Nour Hassan",
        username: "ops.nour",
        status: "Paused",
        governorate: "Cairo",
        zone: "Maadi",
        managedMaids: 9,
        completedOrders: 132,
    },
    {
        id: "OP-1057",
        name: "Ahmed Fathy",
        username: "ops.ahmed",
        status: "Offline",
        governorate: "Giza",
        zone: "October",
        managedMaids: 11,
        completedOrders: 176,
    },
    {
        id: "OP-1201",
        name: "Reem Alexandria",
        username: "ops.reem",
        status: "Active",
        governorate: "Alexandria",
        zone: "Smouha",
        managedMaids: 7,
        completedOrders: 84,
    },
];
const activeMaids = [
    "Amina Mostafa",
    "Hoda Ali",
    "Amal Fathy",
    "Eman Yasser",
    "Reham Ashraf",
    "Aya Tarek",
];
const activeExtras = [
    "Deep Cleaning Kit",
    "Ironing",
    "Window Cleaning",
    "Fridge Cleaning",
    "Kitchen Sanitizing",
    "Carpet Refresh",
];
const customerAddressBook = {
    "Mariam Kamal": [
        "12 Nile Corniche, Maadi",
        "Villa 9, Road 213, Degla Maadi",
    ],
    "Youssef Adel": ["45 Tahrir St, Dokki", "22 Sudan St, Mohandessin"],
    "Nour Hassan": ["21 El-Horreya Rd, Roushdy", "7 Fouad St, Alexandria"],
    "Salma Emad": ["88 Abbas El Akkad, Nasr City", "5 Makram Ebeid, Nasr City"],
    "Aya Tarek": ["9 El Nozha St, Heliopolis", "18 Beirut St, Heliopolis"],
};
let activeOrderDetailsId = null;
const defaultHistory = [
    {
        at: "Today 02:18 PM",
        action: "Viewed order ORD-9102",
        details: "Opened scoped order details from workspace.",
    },
    {
        at: "Today 01:42 PM",
        action: "Checked partner OP-1024",
        details: "Reviewed partner workload and managed maids.",
    },
    {
        at: "Today 11:10 AM",
        action: "Session started",
        details: "Supporter dashboard opened successfully.",
    },
];

const defaultMessages = [
    {
        id: "MSG-SUP-1",
        audience: "super-admin",
        from: "Super Admin",
        subject: "Review Cairo waiting orders",
        body: "Please review pending Cairo orders before the evening shift.",
        unread: true,
        at: "Today 12:20 PM",
    },
    {
        id: "MSG-SUP-2",
        audience: "partner",
        from: "Mona Adel",
        subject: "Need address confirmation",
        body: "Customer address for ORD-9102 needs support confirmation.",
        unread: true,
        at: "Today 01:05 PM",
    },
    {
        id: "MSG-SUP-3",
        audience: "partner",
        from: "Ahmed Fathy",
        subject: "Payment proof uploaded",
        body: "Bank transfer proof is ready for ORD-9105.",
        unread: false,
        at: "Yesterday 05:40 PM",
    },
];

const q = (id) => document.getElementById(id);
let toastTimer;
let selectedMessageId = null;

function readJson(key, fallback) {
    try {
        return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch (error) {
        return fallback;
    }
}

function writeJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function resolveSupporter() {
    const session = readJson("tarwiqaSupporterSession", null);
    if (session?.supporterId) {
        const supporter =
            defaultSupporters.find((item) => item.id === session.supporterId) ||
            defaultSupporters[0];
        const resolved = { ...supporter, ...session };
        resolved.role = session.supporterRole || supporter.role;
        return resolved;
    }
    return defaultSupporters[0];
}

const activeSupporter = resolveSupporter();
const orderOverrideKey = `supporterOrderStatus:${activeSupporter.id}`;
const messageKey = `supporterMessages:${activeSupporter.id}`;
const historyKey = `supporterActionHistory:${activeSupporter.id}`;

function currentOrders() {
    const overrides = readJson(orderOverrideKey, {});
    return workspaceOrdersSeed.map((order) => ({
        ...order,
        ...(overrides[order.id] || {}),
    }));
}

function permissionItem(name) {
    const groups = Array.isArray(activeSupporter.permissions)
        ? activeSupporter.permissions
        : [];
    return (
        groups
            .flatMap((group) => group.items || [])
            .find((item) => item.name === name) || null
    );
}

function canViewPermission(name, fallback = true) {
    const item = permissionItem(name);
    return item ? Boolean(item.canView || item.canEdit) : fallback;
}

function canEditPermission(name, fallback = false) {
    const item = permissionItem(name);
    return item ? Boolean(item.canEdit) : fallback;
}

function hasPermissionGroup(section, fallback = true) {
    const groups = Array.isArray(activeSupporter.permissions)
        ? activeSupporter.permissions
        : [];
    const group = groups.find((item) => item.section === section);
    if (!group) return fallback;
    return (group.items || []).some((item) => item.canView || item.canEdit);
}

function applyPermissionVisibility() {
    const ordersAllowed =
        activeSupporter.canViewOrders &&
        hasPermissionGroup("Scoped Orders", activeSupporter.canViewOrders);
    const partnersAllowed =
        activeSupporter.canViewPartners &&
        hasPermissionGroup("Scoped Partners", activeSupporter.canViewPartners);
    const messagesAllowed = hasPermissionGroup("Supporter Messages", true);
    const historyAllowed = canViewPermission("View my action history", true);
    q("ordersSection").hidden = !ordersAllowed;
    q("partnersSection").hidden = !partnersAllowed;
    q("messagesSection").hidden = !messagesAllowed;
    q("historySection").hidden = !historyAllowed;
    document
        .querySelectorAll('[data-supporter-nav="orders"]')
        .forEach((link) => (link.hidden = !ordersAllowed));
    document
        .querySelectorAll('[data-supporter-nav="partners"]')
        .forEach((link) => (link.hidden = !partnersAllowed));
    document
        .querySelectorAll('[data-supporter-nav="messages"]')
        .forEach((link) => (link.hidden = !messagesAllowed));
    document
        .querySelectorAll('[data-supporter-nav="history"]')
        .forEach((link) => (link.hidden = !historyAllowed));
}
function scopedOrders() {
    const allowed =
        activeSupporter.canViewOrders &&
        hasPermissionGroup("Scoped Orders", activeSupporter.canViewOrders);
    return allowed
        ? currentOrders().filter((order) =>
              activeSupporter.governorates.includes(order.city),
          )
        : [];
}

function scopedPartners() {
    const allowed =
        activeSupporter.canViewPartners &&
        hasPermissionGroup("Scoped Partners", activeSupporter.canViewPartners);
    return allowed
        ? workspacePartners.filter((partner) =>
              activeSupporter.governorates.includes(partner.governorate),
          )
        : [];
}

function currentMessages() {
    return readJson(messageKey, defaultMessages);
}
function saveMessages(messages) {
    writeJson(messageKey, messages);
}
function escapeHtml(value) {
    return String(value).replace(
        /[&<>"']/g,
        (character) =>
            ({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
            })[character],
    );
}
function showToast(message) {
    q("workspaceToast").textContent = message;
    q("workspaceToast").classList.remove("hidden");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(
        () => q("workspaceToast").classList.add("hidden"),
        2600,
    );
}
function statusClass(status) {
    return status.toLowerCase().replace(/\s+/g, "-");
}

function addHistory(action, details) {
    const current = readJson(historyKey, defaultHistory);
    const next = [
        {
            at: new Date().toLocaleString("en", {
                dateStyle: "medium",
                timeStyle: "short",
            }),
            action,
            details,
        },
        ...current,
    ];
    writeJson(historyKey, next.slice(0, 50));
    renderHistory();
}

function renderHeader() {
    q("supporterName").textContent = activeSupporter.name;
    q("supporterRoleLabel").textContent =
        `${activeSupporter.role === "editor" ? "Editor" : "Viewer"} / ${activeSupporter.id}`;
    q("supporterScope").textContent =
        `Scope: ${activeSupporter.governorates.join(", ")}. Orders: ${activeSupporter.canViewOrders ? "Allowed" : "Blocked"}. Partners: ${activeSupporter.canViewPartners ? "Allowed" : "Blocked"}.`;
    q("sessionStarted").textContent =
        `Login at ${activeSupporter.loginAt ? new Date(activeSupporter.loginAt).toLocaleString("en", { dateStyle: "medium", timeStyle: "short" }) : "demo session"}`;
    q("profileLink")?.setAttribute(
        "href",
        `./supporter-profile.html?supporterId=${encodeURIComponent(activeSupporter.id)}`,
    );
}

function renderMetrics() {
    const orders = scopedOrders();
    q("scopedOrdersMetric").textContent = orders.length;
    q("scopedPartnersMetric").textContent = scopedPartners().length;
    q("followUpsMetric").textContent = orders.filter(
        (order) => !["Accepted", "Done", "Cancelled"].includes(order.status),
    ).length;
    q("unreadMessagesMetric").textContent = currentMessages().filter(
        (message) => message.unread,
    ).length;
    q("permissionMetric").textContent =
        activeSupporter.role === "editor" ? "Editor" : "Viewer";
}

function filteredOrders() {
    const query = q("orderSearch").value.trim().toLowerCase();
    const status = q("orderStatusFilter").value;
    return scopedOrders().filter(
        (order) =>
            `${order.id} ${order.userName} ${order.city} ${order.address} ${order.partner}`
                .toLowerCase()
                .includes(query) &&
            (status === "all" || order.status === status),
    );
}

function renderOrders() {
    const canEdit =
        activeSupporter.role === "editor" &&
        canEditPermission(
            "Change order status",
            activeSupporter.role === "editor",
        );
    const rows = filteredOrders();
    q("ordersTableBody").innerHTML = rows.length
        ? rows
              .map(
                  (order) => `
    <tr>
      <td><strong>${escapeHtml(order.id)}</strong><br /><small>${escapeHtml(order.amount)}</small></td>
      <td>${escapeHtml(order.userName)}</td>
      <td>${escapeHtml(order.city)}</td>
      <td>${escapeHtml(order.address)}</td>
      <td>${escapeHtml(order.arrival)}</td>
      <td><span class="status-pill ${statusClass(order.status)}">${escapeHtml(order.status)}</span></td>
      <td>${escapeHtml(order.partner)}</td>
      <td><div class="row-actions"><button class="row-btn" type="button" data-view-order="${order.id}">View</button>${canEdit ? `<button class="row-btn warning" type="button" data-status-order="${order.id}">Change Status</button>` : ""}<button class="row-btn secondary" type="button" data-open-order="${order.id}">Workspace View</button></div></td>
    </tr>`,
              )
              .join("")
        : '<tr><td colspan="8">No scoped orders match the current filters.</td></tr>';
}

function filteredPartners() {
    const query = q("partnerSearch").value.trim().toLowerCase();
    return scopedPartners().filter((partner) =>
        `${partner.id} ${partner.name} ${partner.username} ${partner.governorate} ${partner.zone}`
            .toLowerCase()
            .includes(query),
    );
}

function renderPartners() {
    const rows = filteredPartners();
    q("partnersTableBody").innerHTML = rows.length
        ? rows
              .map(
                  (partner) => `
    <tr>
      <td><div class="name-cell"><strong>${escapeHtml(partner.name)}</strong><small>${escapeHtml(partner.username)} / ${escapeHtml(partner.id)}</small></div></td>
      <td><span class="status-pill ${statusClass(partner.status)}">${escapeHtml(partner.status)}</span></td>
      <td>${escapeHtml(partner.governorate)}</td><td>${escapeHtml(partner.zone)}</td><td><strong>${partner.managedMaids}</strong></td><td><strong>${partner.completedOrders}</strong></td>
      <td><div class="row-actions"><button class="row-btn" type="button" data-view-partner="${partner.id}">View</button><button class="row-btn secondary" type="button" data-chat-partner="${partner.id}">Chat</button></div></td>
    </tr>`,
              )
              .join("")
        : '<tr><td colspan="7">No partners are available in this supporter scope.</td></tr>';
}

function formatCurrency(value) {
    return new Intl.NumberFormat("en-EG", {
        style: "currency",
        currency: "EGP",
        maximumFractionDigits: 0,
    }).format(Number(value) || 0);
}

function orderPayment(order) {
    return order.paymentMethod || order.payment || "Cash";
}

function orderMaids(order) {
    return Array.isArray(order.maids)
        ? order.maids
        : String(order.maids || "")
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean);
}

function orderExtras(order) {
    return Array.isArray(order.extras) ? order.extras : [];
}

function orderFinalPrice(order) {
    return Math.max(
        0,
        (Number(order.totalPrice) || 0) -
            (Number(order.wallet) || 0) -
            (Number(order.deposit) || 0) -
            (Number(order.discount) || 0),
    );
}

function canEditOrderDetails() {
    return (
        activeSupporter.role === "editor" &&
        (canEditPermission(
            "Change order status",
            activeSupporter.role === "editor",
        ) ||
            canEditPermission(
                "Add support note while changing order status",
                activeSupporter.role === "editor",
            ))
    );
}

function fillSelect(select, options, selectedValues = []) {
    const selected = Array.isArray(selectedValues)
        ? selectedValues
        : [selectedValues];
    select.innerHTML = options
        .map(
            (option) =>
                `<option value="${escapeHtml(option)}">${escapeHtml(option)}</option>`,
        )
        .join("");
    Array.from(select.options).forEach((option) => {
        option.selected = selected.includes(option.value);
    });
}

function updateOrderDetailsComputedValues() {
    const total = Number(q("supporterOrderTotal").value) || 0;
    const wallet = Number(q("supporterOrderWallet").value) || 0;
    const deposit = Number(q("supporterOrderDeposit").value) || 0;
    const discount = Number(q("supporterOrderDiscount").value) || 0;
    const finalPrice = Math.max(0, total - wallet - deposit - discount);
    q("supporterOrderFinal").value = formatCurrency(finalPrice);
    q("supporterOrderBreakdown").textContent =
        `${formatCurrency(total)} - ${formatCurrency(wallet + deposit + discount)}`;
    q("supporterOrderAddressValue").textContent =
        q("supporterOrderAddress").value || "No Address";
    const maids = Array.from(q("supporterOrderMaids").selectedOptions).map(
        (option) => option.value,
    );
    q("supporterOrderMaidValue").textContent = maids.length
        ? maids.join(", ")
        : "Not Assigned";
    q("supporterOrderPartnerValue").textContent =
        q("supporterOrderPartner").value || "Not Assigned";
    const extras = Array.from(q("supporterOrderExtras").selectedOptions).map(
        (option) => option.value,
    );
    q("supporterOrderExtrasValue").textContent = extras.length
        ? extras.join(", ")
        : "No Extras";
}

function setOrderDetailsMode() {
    const editable = canEditOrderDetails();
    q("orderDetailsForm").classList.toggle("view-only", !editable);
    q("orderDetailsForm")
        .querySelectorAll("input, select")
        .forEach((field) => {
            if (field.readOnly) return;
            field.disabled = !editable;
        });
    q("saveOrderDetailsBtn").style.display = editable ? "" : "none";
    q("orderDetailsNote").textContent = editable
        ? "Same order data shown in Super Admin. You can edit allowed operational fields."
        : "Read-only order details. No content can be changed with the current supporter permissions.";
}

function openOrderDetailsModal(orderId) {
    const order = scopedOrders().find((item) => item.id === orderId);
    if (!order) return;
    activeOrderDetailsId = order.id;
    q("orderDetailsTitle").textContent = `${order.id} - ${order.userName}`;
    q("supporterOrderId").value = order.id;
    q("supporterOrderUser").value = order.userName;
    q("supporterOrderCity").value = order.city;
    const savedAddresses = customerAddressBook[order.userName] || [];
    fillSelect(
        q("supporterOrderAddress"),
        [...new Set([order.address, ...savedAddresses].filter(Boolean))],
        order.address,
    );
    q("supporterOrderCreated").value = order.createdDate || "-";
    q("supporterOrderOffer").textContent =
        order.offerName || order.packageName || "Custom Offer";
    q("supporterOrderOffer").dataset.offerOrder = order.id;
    q("supporterOrderTotal").value = Number(order.totalPrice) || 0;
    q("supporterOrderWallet").value = Number(order.wallet) || 0;
    q("supporterOrderDeposit").value = Number(order.deposit) || 0;
    q("supporterOrderDiscount").value = Number(order.discount) || 0;
    q("supporterOrderStatus").value = order.status;
    q("supporterOrderPayment").value = orderPayment(order);
    q("supporterOrderDate").value = order.orderDate || "";
    q("supporterOrderArrival").value = order.arrivalTime || "";
    fillSelect(q("supporterOrderMaids"), activeMaids, orderMaids(order));
    fillSelect(
        q("supporterOrderPartner"),
        scopedPartners().map((partner) => partner.name),
        order.partner || "",
    );
    fillSelect(q("supporterOrderExtras"), activeExtras, orderExtras(order));
    updateOrderDetailsComputedValues();
    setOrderDetailsMode();
    q("orderDetailsModal").classList.remove("hidden");
    q("orderDetailsModal").setAttribute("aria-hidden", "false");
}

function closeOrderDetailsModal() {
    q("orderDetailsModal").classList.add("hidden");
    q("orderDetailsModal").setAttribute("aria-hidden", "true");
    activeOrderDetailsId = null;
}

function saveOrderDetails(event) {
    event.preventDefault();
    if (!activeOrderDetailsId || !canEditOrderDetails()) return;
    const overrides = readJson(orderOverrideKey, {});
    const maids = Array.from(q("supporterOrderMaids").selectedOptions).map(
        (option) => option.value,
    );
    const extras = Array.from(q("supporterOrderExtras").selectedOptions).map(
        (option) => option.value,
    );
    const next = {
        address: q("supporterOrderAddress").value,
        totalPrice: Number(q("supporterOrderTotal").value) || 0,
        wallet: Number(q("supporterOrderWallet").value) || 0,
        deposit: Number(q("supporterOrderDeposit").value) || 0,
        discount: Number(q("supporterOrderDiscount").value) || 0,
        amount: formatCurrency(Number(q("supporterOrderTotal").value) || 0),
        offerName: q("supporterOrderOffer").textContent.trim(),
        status: q("supporterOrderStatus").value,
        payment: q("supporterOrderPayment").value,
        paymentMethod: q("supporterOrderPayment").value,
        orderDate: q("supporterOrderDate").value,
        arrivalTime: q("supporterOrderArrival").value,
        maids,
        extras,
        partner: q("supporterOrderPartner").value,
        updatedBy: activeSupporter.id,
        updatedAt: new Date().toISOString(),
    };
    overrides[activeOrderDetailsId] = {
        ...(overrides[activeOrderDetailsId] || {}),
        ...next,
    };
    writeJson(orderOverrideKey, overrides);
    addHistory(
        `Edited order ${activeOrderDetailsId}`,
        "Updated scoped order data from supporter workspace view.",
    );
    closeOrderDetailsModal();
    renderOrders();
    renderMetrics();
    showToast(`Order ${activeOrderDetailsId} updated.`);
}
function currentOrderDetails() {
    return activeOrderDetailsId
        ? scopedOrders().find((item) => item.id === activeOrderDetailsId)
        : null;
}

function openOfferDetails(orderId = activeOrderDetailsId) {
    const order = scopedOrders().find((item) => item.id === orderId);
    if (!order) return;
    const offerName = order.offerName || order.packageName || "Custom Offer";
    const details = offerCatalog[offerName] || {
        city: order.city,
        widget: "Service",
        category: "Custom Offer",
        packageName: offerName,
        catalogPrice: order.totalPrice,
        duration: "According to order",
        description: "Custom offer details from the scoped order data.",
    };
    openDetails(details.packageName || offerName, "Offer Details", [
        { label: "Order Number", value: order.id },
        { label: "Offer Name", value: offerName },
        { label: "Widget", value: details.widget },
        { label: "Category", value: details.category },
        { label: "Catalog City", value: details.city },
        { label: "Catalog Price", value: formatCurrency(details.catalogPrice) },
        { label: "Order Amount", value: formatCurrency(order.totalPrice) },
        { label: "Expected Duration", value: details.duration },
        {
            label: "Selected Extras",
            value: orderExtras(order).length
                ? orderExtras(order).join(", ")
                : "No Extras",
        },
        { label: "Description", value: details.description },
    ]);
    addHistory(
        `Viewed offer ${offerName}`,
        `Opened offer details for ${order.id}.`,
    );
}
function openDetails(title, eyebrow, fields) {
    q("detailsTitle").textContent = title;
    q("detailsEyebrow").textContent = eyebrow;
    q("detailsContent").innerHTML = fields
        .map(
            (field) =>
                `<article class="detail-field"><span>${escapeHtml(field.label)}</span><strong>${escapeHtml(field.value)}</strong></article>`,
        )
        .join("");
    q("detailsModal").classList.remove("hidden");
    q("detailsModal").setAttribute("aria-hidden", "false");
}
function closeDetails() {
    q("detailsModal").classList.add("hidden");
    q("detailsModal").setAttribute("aria-hidden", "true");
}

function openStatusModal(orderId) {
    if (activeSupporter.role !== "editor") {
        showToast("Viewer permission cannot change order status.");
        return;
    }
    const order = scopedOrders().find((item) => item.id === orderId);
    if (!order) return;
    q("statusOrderId").value = order.id;
    q("statusSelect").value = order.status;
    q("statusNote").value = "";
    q("statusSummary").innerHTML =
        `<strong>${escapeHtml(order.id)} - ${escapeHtml(order.userName)}</strong><span>${escapeHtml(order.city)} / ${escapeHtml(order.arrival)} / ${escapeHtml(order.partner)}</span>`;
    q("statusModal").classList.remove("hidden");
    q("statusModal").setAttribute("aria-hidden", "false");
}
function closeStatusModal() {
    q("statusModal").classList.add("hidden");
    q("statusModal").setAttribute("aria-hidden", "true");
}

function saveStatusChange(event) {
    event.preventDefault();
    const orderId = q("statusOrderId").value;
    const order = scopedOrders().find((item) => item.id === orderId);
    if (!order) return;
    if (!q("statusNote").value.trim()) {
        showToast("Write a support note before saving.");
        return;
    }
    const overrides = readJson(orderOverrideKey, {});
    overrides[orderId] = {
        status: q("statusSelect").value,
        supportNote: q("statusNote").value.trim(),
        updatedBy: activeSupporter.id,
        updatedAt: new Date().toISOString(),
    };
    writeJson(orderOverrideKey, overrides);
    addHistory(
        `Changed order ${orderId} status`,
        `${order.status} -> ${q("statusSelect").value}. ${q("statusNote").value.trim()}`,
    );
    closeStatusModal();
    renderOrders();
    renderMetrics();
    showToast(`Order ${orderId} status updated.`);
}

function renderMessages() {
    const audience = q("messageAudienceFilter").value;
    const rows = currentMessages().filter(
        (message) => audience === "all" || message.audience === audience,
    );
    q("messageThread").innerHTML = rows.length
        ? rows
              .map(
                  (message) => `
    <article class="message-item ${message.unread ? "unread" : ""}" data-message-id="${message.id}">
      <div><strong>${escapeHtml(message.subject)}</strong><p>${escapeHtml(message.body)}</p><small>${escapeHtml(message.from)} / ${escapeHtml(message.at)}</small></div>
      <button class="row-btn secondary" type="button" data-read-message="${message.id}">${message.unread ? "Mark Read" : "Reply"}</button>
    </article>`,
              )
              .join("")
        : "<p>No messages match this filter.</p>";
    renderMetrics();
}

function renderHistory() {
    const query = q("historySearch").value.trim().toLowerCase();
    const rows = readJson(historyKey, defaultHistory).filter((item) =>
        `${item.at} ${item.action} ${item.details}`
            .toLowerCase()
            .includes(query),
    );
    q("historyList").innerHTML = rows.length
        ? rows
              .map(
                  (item) =>
                      `<article class="history-item"><div><strong>${escapeHtml(item.action)}</strong><p>${escapeHtml(item.details)}</p></div><time>${escapeHtml(item.at)}</time></article>`,
              )
              .join("")
        : "<p>No history actions match the current search.</p>";
}

function bindActions() {
    q("orderSearch").addEventListener("input", renderOrders);
    q("orderStatusFilter").addEventListener("change", renderOrders);
    q("partnerSearch").addEventListener("input", renderPartners);
    q("historySearch").addEventListener("input", renderHistory);
    q("messageAudienceFilter").addEventListener("change", renderMessages);
    q("clearHistorySearchBtn").addEventListener("click", () => {
        q("historySearch").value = "";
        renderHistory();
    });
    q("markMessagesReadBtn").addEventListener("click", () => {
        if (!canEditPermission("Mark supporter messages as read", true)) {
            showToast("No permission to mark messages as read.");
            return;
        }
        saveMessages(
            currentMessages().map((message) => ({ ...message, unread: false })),
        );
        addHistory(
            "Marked messages read",
            "Supporter marked all workspace messages as read.",
        );
        renderMessages();
    });
    q("ordersTableBody").addEventListener("click", (event) => {
        const view = event.target.closest("[data-view-order]");
        const status = event.target.closest("[data-status-order]");
        const open = event.target.closest("[data-open-order]");
        if (view && canViewPermission("Open full order details", true)) {
            const order = scopedOrders().find(
                (item) => item.id === view.dataset.viewOrder,
            );
            if (!order) return;
            openOrderDetailsModal(order.id);
            addHistory(
                `Viewed order ${order.id}`,
                `Opened ${order.userName} order in ${order.city}.`,
            );
        }
        if (status) openStatusModal(status.dataset.statusOrder);
        if (open) {
            openOrderDetailsModal(open.dataset.openOrder);
            addHistory(
                `Opened workspace order view ${open.dataset.openOrder}`,
                "Opened order details inside supporter workspace.",
            );
        }
    });
    q("partnersTableBody").addEventListener("click", (event) => {
        const view = event.target.closest("[data-view-partner]");
        const chat = event.target.closest("[data-chat-partner]");
        if (view && canViewPermission("Open partner details", true)) {
            const partner = scopedPartners().find(
                (item) => item.id === view.dataset.viewPartner,
            );
            if (!partner) return;
            addHistory(
                `Viewed partner ${partner.id}`,
                `Opened ${partner.name} partner details.`,
            );
            window.location.href = `./supporter-partner-profile.html?partnerId=${encodeURIComponent(partner.id)}`;
        }
        if (chat) {
            if (
                !canEditPermission(
                    "Send direct message to a partner",
                    activeSupporter.role === "editor",
                )
            ) {
                showToast("No permission to message partners.");
                return;
            }
            const partner = scopedPartners().find(
                (item) => item.id === chat.dataset.chatPartner,
            );
            showToast(`Chat opened with ${partner?.name || "partner"}.`);
            addHistory(
                `Opened chat ${chat.dataset.chatPartner}`,
                "Started partner chat from supporter workspace.",
            );
        }
    });
    q("messageThread").addEventListener("click", (event) => {
        const read = event.target.closest("[data-read-message]");
        const item = event.target.closest("[data-message-id]");
        if (item) selectedMessageId = item.dataset.messageId;
        if (!read) return;
        const messages = currentMessages().map((message) =>
            message.id === read.dataset.readMessage
                ? { ...message, unread: false }
                : message,
        );
        saveMessages(messages);
        selectedMessageId = read.dataset.readMessage;
        addHistory(
            `Opened message ${selectedMessageId}`,
            "Read supporter workspace message.",
        );
        renderMessages();
    });
    q("supporterReplyForm").addEventListener("submit", (event) => {
        event.preventDefault();
        const text = q("supporterReplyInput").value.trim();
        if (!text) return;
        if (!canEditPermission("Reply to supporter workspace messages", true)) {
            showToast("No permission to reply to messages.");
            return;
        }
        addHistory(
            "Sent supporter reply",
            selectedMessageId
                ? `Reply on ${selectedMessageId}: ${text}`
                : `General reply: ${text}`,
        );
        q("supporterReplyInput").value = "";
        showToast("Reply sent.");
    });
    q("statusForm").addEventListener("submit", saveStatusChange);
    q("closeStatusModal").addEventListener("click", closeStatusModal);
    q("cancelStatusBtn").addEventListener("click", closeStatusModal);
    q("statusModal").addEventListener("click", (event) => {
        if (event.target === q("statusModal")) closeStatusModal();
    });
    q("closeDetailsModal").addEventListener("click", closeDetails);
    q("detailsModal").addEventListener("click", (event) => {
        if (event.target === q("detailsModal")) closeDetails();
    });
    [
        q("supporterOrderTotal"),
        q("supporterOrderWallet"),
        q("supporterOrderDeposit"),
        q("supporterOrderDiscount"),
        q("supporterOrderAddress"),
        q("supporterOrderMaids"),
        q("supporterOrderPartner"),
        q("supporterOrderExtras"),
    ].forEach((field) => {
        field?.addEventListener("input", updateOrderDetailsComputedValues);
        field?.addEventListener("change", updateOrderDetailsComputedValues);
    });
    q("supporterOrderOffer").addEventListener("click", () =>
        openOfferDetails(q("supporterOrderOffer").dataset.offerOrder),
    );
    q("orderDetailsForm").addEventListener("submit", saveOrderDetails);
    q("closeOrderDetailsModal").addEventListener(
        "click",
        closeOrderDetailsModal,
    );
    q("cancelOrderDetailsBtn").addEventListener(
        "click",
        closeOrderDetailsModal,
    );
    q("orderDetailsModal").addEventListener("click", (event) => {
        if (event.target === q("orderDetailsModal")) closeOrderDetailsModal();
    });
    q("logoutSupporterBtn").addEventListener("click", () => {
        localStorage.removeItem("tarwiqaSupporterSession");
        window.location.href = "./supporter-login.html";
    });
}

renderHeader();
applyPermissionVisibility();
renderMetrics();
renderOrders();
renderPartners();
renderMessages();
renderHistory();
bindActions();
