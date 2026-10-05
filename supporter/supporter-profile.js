const governorateData = {
    Cairo: { orders: 184, partners: 4 },
    Giza: { orders: 76, partners: 1 },
    Alexandria: { orders: 54, partners: 2 },
    Qalyubia: { orders: 31, partners: 1 },
    Dakahlia: { orders: 42, partners: 1 },
    Sharqia: { orders: 29, partners: 1 },
};
const defaultSupporters = [
    {
        id: "SUP-0901",
        name: "Hassan Mahmoud",
        username: "support.hassan",
        password: "Support@0901",
        phone: "+20 100 440 1182",
        email: "hassan@tarwiqa.app",
        status: "Active",
        role: "editor",
        governorates: ["Cairo", "Giza"],
        canViewOrders: true,
        canViewPartners: true,
        canExportReports: true,
        notes: "Cairo and Giza website support lead.",
        createdAt: "Jun 15, 2026",
    },
    {
        id: "SUP-0902",
        name: "Reem Ashraf",
        username: "support.reem",
        password: "Support@0902",
        phone: "+20 109 221 5044",
        email: "reem@tarwiqa.app",
        status: "Active",
        role: "viewer",
        governorates: ["Alexandria"],
        canViewOrders: true,
        canViewPartners: true,
        canExportReports: false,
        notes: "Alexandria website requests and partner follow-up.",
        createdAt: "Jun 18, 2026",
    },
    {
        id: "SUP-0903",
        name: "Omar Nabil",
        username: "support.omar",
        password: "Support@0903",
        phone: "+20 111 703 9912",
        email: "omar@tarwiqa.app",
        status: "Paused",
        role: "viewer",
        governorates: ["Qalyubia", "Dakahlia", "Sharqia"],
        canViewOrders: true,
        canViewPartners: true,
        canExportReports: false,
        notes: "Delta region support coverage.",
        createdAt: "Jun 21, 2026",
    },
];

const q = (id) => document.getElementById(id);
const supporterId =
    new URLSearchParams(location.search).get("supporterId") ||
    defaultSupporters[0].id;

function loadJson(key, fallback) {
    try {
        return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch (error) {
        return fallback;
    }
}

const allSupporters = [
    ...defaultSupporters,
    ...loadJson("createdSupporters", []),
];
const overrides = loadJson("supporterOverrides", {});
const baseSupporter =
    allSupporters.find((item) => item.id === supporterId) ||
    defaultSupporters[0];
const supporter = { ...baseSupporter, ...(overrides[supporterId] || {}) };
const activityDefaults = {
    "SUP-0901": {
        online: true,
        lastSeen: "Online now",
        sessionStarted: "08:05 AM",
        hoursToday: 6.75,
        daysThisMonth: 18,
        actions: [
            {
                at: "Jul 03, 2026, 02:18 PM",
                action: "Updated order status",
                module: "Accepted Orders",
                details: "Moved order ORD-4821 to Done",
                status: "Success",
            },
            {
                at: "Jul 03, 2026, 01:42 PM",
                action: "Viewed partner profile",
                module: "Partners",
                details: "Opened partner OP-1024 profile",
                status: "Success",
            },
            {
                at: "Jul 03, 2026, 12:26 PM",
                action: "Replied to customer",
                module: "Inbox",
                details: "Sent reply to USR-103004",
                status: "Success",
            },
            {
                at: "Jul 03, 2026, 11:10 AM",
                action: "Exported orders report",
                module: "Reports",
                details: "Cairo and Giza scoped report",
                status: "Success",
            },
            {
                at: "Jul 03, 2026, 09:34 AM",
                action: "Assigned partner",
                module: "Under Review Orders",
                details: "Assigned OP-1031 to ORD-4814",
                status: "Success",
            },
        ],
    },
    "SUP-0902": {
        online: false,
        lastSeen: "Jul 03, 2026, 01:42 PM",
        sessionStarted: "09:10 AM",
        hoursToday: 4.25,
        daysThisMonth: 16,
        actions: [
            {
                at: "Jul 03, 2026, 01:40 PM",
                action: "Closed dashboard session",
                module: "Account",
                details: "Session ended normally",
                status: "Success",
            },
            {
                at: "Jul 03, 2026, 12:55 PM",
                action: "Viewed scheduled orders",
                module: "Scheduled Orders",
                details: "Alexandria orders for Jul 04",
                status: "Success",
            },
            {
                at: "Jul 03, 2026, 11:18 AM",
                action: "Opened partner messages",
                module: "Partners Msgs",
                details: "Reviewed 3 unread messages",
                status: "Success",
            },
            {
                at: "Jul 03, 2026, 10:05 AM",
                action: "Updated order note",
                module: "Waiting List",
                details: "Added follow-up note to ORD-4762",
                status: "Success",
            },
        ],
    },
    "SUP-0903": {
        online: false,
        lastSeen: "Jul 02, 2026, 06:20 PM",
        sessionStarted: "10:00 AM",
        hoursToday: 0,
        daysThisMonth: 11,
        actions: [
            {
                at: "Jul 02, 2026, 06:20 PM",
                action: "Closed dashboard session",
                module: "Account",
                details: "Session ended normally",
                status: "Success",
            },
            {
                at: "Jul 02, 2026, 05:48 PM",
                action: "Viewed inquiry log",
                module: "Logs & Inquiries",
                details: "Reviewed Dakahlia inquiry session",
                status: "Success",
            },
            {
                at: "Jul 02, 2026, 03:14 PM",
                action: "Export attempt",
                module: "Reports",
                details: "Export blocked by account permission",
                status: "Failed",
            },
        ],
    },
};
const defaultActivity = {
    online: false,
    lastSeen: supporter.createdAt || "No session recorded",
    sessionStarted: "No active session",
    hoursToday: 0,
    daysThisMonth: 0,
    actions: [
        {
            at: supporter.createdAt || "-",
            action: "Account created",
            module: "Supporters",
            details: "Supporter account created by admin",
            status: "Success",
        },
    ],
};
const savedActivity = loadJson(`supporterActivity:${supporter.id}`, {});
const activity = {
    ...(activityDefaults[supporter.id] || defaultActivity),
    ...savedActivity,
};
const actionHistory = loadJson(
    `supporterActionHistory:${supporter.id}`,
    activity.actions || [],
);

function initials(name) {
    return name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0].toUpperCase())
        .join("");
}

function totals() {
    return supporter.governorates.reduce(
        (result, governorate) => {
            const data = governorateData[governorate] || {
                orders: 0,
                partners: 0,
            };
            result.orders += supporter.canViewOrders ? data.orders : 0;
            result.partners += supporter.canViewPartners ? data.partners : 0;
            return result;
        },
        { orders: 0, partners: 0 },
    );
}

function fallbackPermissions() {
    const edit = supporter.role === "editor";
    return [
        {
            section: "Orders",
            items: [
                {
                    name: "View orders in assigned governorates",
                    canView: supporter.canViewOrders,
                    canEdit: edit && supporter.canViewOrders,
                },
            ],
        },
        {
            section: "Partners",
            items: [
                {
                    name: "View partners in assigned governorates",
                    canView: supporter.canViewPartners,
                    canEdit: edit && supporter.canViewPartners,
                },
            ],
        },
        {
            section: "Reports",
            items: [
                {
                    name: "Export scoped reports",
                    canView: supporter.canExportReports,
                    canEdit: false,
                },
            ],
        },
    ];
}

function renderPermissions() {
    const permissions = supporter.permissions?.length
        ? supporter.permissions
        : fallbackPermissions();
    const items = permissions.flatMap((group) => group.items || []);
    q("viewPermissionMetric").textContent = items.filter(
        (item) => item.canView,
    ).length;
    q("editPermissionMetric").textContent = items.filter(
        (item) => item.canEdit,
    ).length;
    q("profilePermissions").innerHTML = permissions
        .map(
            (group) => `
    <section class="profile-permission-group">
      <h3>${group.section}</h3>
      <div class="profile-permission-list">
        ${group.items
            .map(
                (item) => `
          <div class="profile-permission-row">
            <strong>${item.name}</strong>
            <div class="permission-badges">
              <span class="permission-badge ${item.canView ? "allowed" : ""}">View: ${item.canView ? "Allowed" : "Blocked"}</span>
              <span class="permission-badge ${item.canEdit ? "edit" : ""}">Edit: ${item.canEdit ? "Allowed" : "Blocked"}</span>
            </div>
          </div>
        `,
            )
            .join("")}
      </div>
    </section>
  `,
        )
        .join("");
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

function renderActivity() {
    q("liveState").classList.toggle("offline", !activity.online);
    q("liveStateText").textContent = activity.online
        ? "Online Now"
        : "Dashboard Closed";
    q("dashboardStatusMetric").textContent = activity.online
        ? `Open since ${activity.sessionStarted}`
        : "Dashboard Closed";
    q("lastSeenMetric").textContent = activity.lastSeen;
    q("hoursTodayMetric").textContent = `${activity.hoursToday} hours`;
    q("daysMonthMetric").textContent = `${activity.daysThisMonth} days`;
}

function filteredHistory() {
    const query = q("historySearch").value.trim().toLowerCase();
    return actionHistory.filter((item) =>
        `${item.at} ${item.action} ${item.module} ${item.details} ${item.status}`
            .toLowerCase()
            .includes(query),
    );
}

function renderHistory() {
    const rows = filteredHistory();
    q("actionHistoryTable").innerHTML = rows.length
        ? rows
              .map(
                  (item) => `
    <tr>
      <td>${escapeHtml(item.at)}</td>
      <td><strong>${escapeHtml(item.action)}</strong></td>
      <td>${escapeHtml(item.module)}</td>
      <td>${escapeHtml(item.details)}</td>
      <td><span class="action-status ${item.status === "Failed" ? "failed" : ""}">${escapeHtml(item.status)}</span></td>
    </tr>
  `,
              )
              .join("")
        : '<tr><td colspan="5">No actions match the current search.</td></tr>';
}

function renderProfile() {
    const scoped = totals();
    document.title = `${supporter.name} - Supporter Profile`;
    q("profileTitle").textContent = supporter.name;
    q("profileSubtitle").textContent =
        `${supporter.id} account, governorate scope, and detailed permissions.`;
    q("profileAvatar").textContent = initials(supporter.name);
    q("profileName").textContent = supporter.name;
    q("profileStatus").textContent = supporter.status;
    q("profileStatus").className =
        `status-pill ${supporter.status.toLowerCase()}`;
    q("profileMeta").textContent = `${supporter.id} / ${supporter.username}`;
    q("roleMetric").textContent =
        supporter.role === "editor" ? "Editor" : "Viewer";
    q("governoratesMetric").textContent = supporter.governorates.length;
    q("ordersMetric").textContent = scoped.orders;
    q("partnersMetric").textContent = scoped.partners;
    q("profilePassword").value = supporter.password || "";
    q("profilePassword").readOnly = true;
    q("profilePassword").setAttribute("aria-readonly", "true");

    q("supporterAccountDetails").innerHTML = `
    <div><span>Supporter ID</span><strong>${supporter.id}</strong></div>
    <div><span>Username</span><strong>${supporter.username}</strong></div>
    <div><span>Phone</span><strong>${supporter.phone}</strong></div>
    <div><span>Email</span><strong>${supporter.email}</strong></div>
    <div><span>Status</span><strong>${supporter.status}</strong></div>
    <div><span>Created At</span><strong>${supporter.createdAt}</strong></div>
    <div><span>Assigned Governorates</span><strong>${supporter.governorates.join(", ")}</strong></div>
    <div><span>Admin Notes</span><strong>${supporter.notes || "No notes"}</strong></div>
  `;
    q("accessSummary").innerHTML = `
    <div><span>Orders</span><strong>${supporter.canViewOrders ? "Allowed" : "Blocked"}</strong></div>
    <div><span>Partners</span><strong>${supporter.canViewPartners ? "Allowed" : "Blocked"}</strong></div>
    <div><span>Export</span><strong>${supporter.canExportReports ? "Allowed" : "Blocked"}</strong></div>
  `;
    q("governorateScopeTable").innerHTML = supporter.governorates
        .map((governorate) => {
            const data = governorateData[governorate] || {
                orders: 0,
                partners: 0,
            };
            return `<tr><td><strong>${governorate}</strong></td><td>${supporter.canViewOrders ? data.orders : 0}</td><td>${supporter.canViewPartners ? data.partners : 0}</td><td>${supporter.canViewOrders ? "Allowed" : "Blocked"}</td><td>${supporter.canViewPartners ? "Allowed" : "Blocked"}</td></tr>`;
        })
        .join("");
    renderPermissions();
    renderActivity();
    renderHistory();
}

function lockProfilePasswordEditing() {
    const input = q("profilePassword");
    ["beforeinput", "paste", "drop"].forEach((eventName) => {
        input.addEventListener(eventName, (event) => event.preventDefault());
    });
    input.addEventListener("keydown", (event) => {
        const allowedKeys = [
            "Tab",
            "Shift",
            "Control",
            "Alt",
            "Meta",
            "ArrowLeft",
            "ArrowRight",
            "ArrowUp",
            "ArrowDown",
            "Home",
            "End",
            "Escape",
        ];
        if (!allowedKeys.includes(event.key)) event.preventDefault();
    });
}
q("toggleProfilePassword").addEventListener("click", () => {
    const input = q("profilePassword");
    const show = input.type === "password";
    input.type = show ? "text" : "password";
    q("toggleProfilePassword").textContent = show ? "Hide" : "Show";
    q("toggleProfilePassword").setAttribute("aria-pressed", String(show));
});

q("historySearch").addEventListener("input", renderHistory);
renderProfile();
lockProfilePasswordEditing();

q("supporterRoleLabel").textContent =
    `${supporter.role === "editor" ? "Editor" : "Viewer"} / ${supporter.id}`;
q("logoutSupporterBtn")?.addEventListener("click", () => {
    localStorage.removeItem("tarwiqaSupporterSession");
    window.location.href = "./supporter-login.html";
});
