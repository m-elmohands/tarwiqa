const messageSeed = [
    {
        id: "msg-1001",
        customerName: "Mariam Kamal",
        userId: "#USR-102938",
        city: "Cairo",
        unreadCount: 3,
        preview:
            "I need an update about my delayed order and whether the team will arrive today.",
        box: "inbox",
        status: "unread",
        updatedAt: "23 Apr 2026, 10:14 AM",
    },
    {
        id: "msg-1002",
        customerName: "Youssef Adel",
        userId: "#USR-102954",
        city: "Alexandria",
        unreadCount: 1,
        preview: "Please confirm when the refund will reflect in my wallet.",
        box: "starred",
        status: "unread",
        updatedAt: "23 Apr 2026, 09:42 AM",
    },
    {
        id: "msg-1003",
        customerName: "Nour Hassan",
        userId: "#USR-103004",
        city: "Giza",
        unreadCount: 4,
        preview:
            "This is the second time I am reporting the same issue. I need a clear resolution.",
        box: "inbox",
        status: "unread",
        updatedAt: "23 Apr 2026, 08:18 AM",
    },
    {
        id: "msg-1004",
        customerName: "Karim Emad",
        userId: "#USR-103121",
        city: "Dakahlia",
        unreadCount: 0,
        preview: "The issue is solved now. Thank you for the follow-up.",
        box: "sent",
        status: "read",
        updatedAt: "22 Apr 2026, 06:10 PM",
    },
    {
        id: "msg-1005",
        customerName: "Salma Hany",
        userId: "#USR-103177",
        city: "Gharbia",
        unreadCount: 2,
        preview:
            "I received promotional messages that do not match my request.",
        box: "junk",
        status: "unread",
        updatedAt: "22 Apr 2026, 03:25 PM",
    },
    {
        id: "msg-1006",
        customerName: "Hossam Fathy",
        userId: "#USR-103220",
        city: "Cairo",
        unreadCount: 0,
        preview:
            "Please send me the invoice copy and confirm the payment details.",
        box: "sent",
        status: "read",
        updatedAt: "22 Apr 2026, 01:55 PM",
    },
];
const q = (id) => document.getElementById(id),
    session = readJson("tarwiqaSupporterSession", {}),
    role = session.supporterRole || session.role || "editor",
    scope = Array.isArray(session.governorates)
        ? session.governorates
        : ["Cairo", "Giza"],
    storeKey = `supporterCustomerMessages:${session.supporterId || "SUP-0901"}`;
let messages = readJson(storeKey, messageSeed),
    activeFilter = "inbox",
    selectedMessages = [],
    activeMessageId = null,
    toastTimer;
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
function escapeHtml(value) {
    return String(value ?? "").replace(
        /[&<>"']/g,
        (c) =>
            ({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
            })[c],
    );
}
function permissionItem(name) {
    return (
        (Array.isArray(session.permissions) ? session.permissions : [])
            .flatMap((group) => group.items || [])
            .find((item) => item.name === name) || null
    );
}
function canView(name, fallback = true) {
    const item = permissionItem(name);
    return item ? Boolean(item.canView || item.canEdit) : fallback;
}
function canEdit(name, fallback = role === "editor") {
    const item = permissionItem(name);
    return role === "editor" && (item ? Boolean(item.canEdit) : fallback);
}
function saveMessages() {
    writeJson(storeKey, messages);
}
function addHistory(action, details) {
    const key = `supporterActionHistory:${session.supporterId || "SUP-0901"}`,
        rows = readJson(key, []);
    writeJson(
        key,
        [
            {
                at: new Date().toLocaleString("en", {
                    dateStyle: "medium",
                    timeStyle: "short",
                }),
                action,
                details,
            },
            ...rows,
        ].slice(0, 50),
    );
}
function showToast(message) {
    q("inboxToastMessage").textContent = message;
    q("inboxToast").classList.remove("hidden");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(
        () => q("inboxToast").classList.add("hidden"),
        2600,
    );
}
function scopedMessages() {
    return messages.filter((message) => scope.includes(message.city));
}
function filteredMessages() {
    const search = q("messageSearch").value.trim().toLowerCase(),
        city = q("messageCityFilter").value;
    return scopedMessages().filter(
        (message) =>
            (city === "all" || message.city === city) &&
            message.box === activeFilter &&
            `${message.customerName} ${message.userId} ${message.preview}`
                .toLowerCase()
                .includes(search),
    );
}
function initials(name) {
    return name
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() || "")
        .join("");
}
function updateMetrics() {
    const rows = scopedMessages();
    q("unreadMetric").textContent = rows.reduce(
        (sum, message) => sum + (Number(message.unreadCount) || 0),
        0,
    );
    q("pendingMetric").textContent = rows.filter(
        (message) => message.status === "unread",
    ).length;
    q("starredMetric").textContent = rows.filter(
        (message) => message.box === "starred",
    ).length;
    q("junkMetric").textContent = rows.filter(
        (message) => message.box === "junk",
    ).length;
    q("messageScopeText").textContent =
        `Scope: ${scope.join(", ")}. Customer inbox actions depend on your permissions.`;
}
function renderMessages() {
    const rows = filteredMessages();
    q("messagesTableBody").innerHTML = rows.length
        ? rows
              .map(
                  (message) =>
                      `<tr class="row-clickable ${selectedMessages.includes(message.id) ? "selected" : ""}" data-message-row="${message.id}"><td><input class="row-checkbox" type="checkbox" data-message-id="${message.id}" ${selectedMessages.includes(message.id) ? "checked" : ""}/></td><td><div class="customer-cell"><button class="customer-link" type="button" data-open-profile="${escapeHtml(message.userId)}">${escapeHtml(message.customerName)}</button><span class="meta-sub">Customer conversation</span></div></td><td>${escapeHtml(message.userId)}</td><td>${escapeHtml(message.city)}</td><td><span class="count-pill">${message.unreadCount} unread</span></td><td><div class="preview-text">${escapeHtml(message.preview)}</div></td><td><span class="box-pill ${message.box}">${message.box}</span></td><td><span class="status-pill ${message.status}">${message.status}</span></td><td>${escapeHtml(message.updatedAt)}</td></tr>`,
              )
              .join("")
        : '<tr><td colspan="9">No customer conversations match this filter.</td></tr>';
    bindRows();
    updateSelection();
    updateMetrics();
}
function updateSelection() {
    const rows = filteredMessages(),
        count = selectedMessages.length;
    q("selectionSummary").textContent = count
        ? `${count} selected`
        : "0 selected";
    q("clearSelectionBtn").disabled = !count;
    q("markReadBtn").disabled =
        !count || !canEdit("Mark customer messages as read");
    q("moveJunkBtn").disabled =
        !count || !canEdit("Move customer messages to junk or inbox");
    q("selectAllCheckbox").checked =
        rows.length > 0 &&
        rows.every((message) => selectedMessages.includes(message.id));
    q("selectAllCheckbox").indeterminate =
        count > 0 && !q("selectAllCheckbox").checked;
    q("moveJunkBtn").textContent =
        activeFilter === "junk" ? "Move to Inbox All" : "Move to Junk";
}
function openModal(id) {
    q(id).classList.remove("hidden");
}
function closeModal(id) {
    q(id).classList.add("hidden");
}
function populateModal(message) {
    activeMessageId = message.id;
    q("messageModalTitle").textContent =
        `Message Details - ${message.customerName}`;
    q("messageAvatar").textContent = initials(message.customerName);
    q("messageCustomerName").textContent = message.customerName;
    q("messageCustomerName").dataset.userId = message.userId;
    q("messageMetaLine").textContent =
        `${message.userId} / ${message.city} / ${message.updatedAt}`;
    q("messageBoxValue").textContent = message.box;
    q("messageStatusValue").textContent = message.status;
    q("messageUnreadValue").textContent = `${message.unreadCount} unread`;
    q("messageUpdatedValue").textContent = message.updatedAt;
    q("messagePreviewCopy").textContent = message.preview;
    q("quickReplyInput").value = "";
    q("quickReplyInput").disabled = !canEdit("Reply to customer messages");
    q("sendReplyBtn").hidden = !canEdit("Reply to customer messages");
    q("markSingleReadBtn").hidden = !canEdit("Mark customer messages as read");
}
function openConversation(id) {
    if (!canView("Open customer conversation")) {
        showToast("No permission to open customer conversations.");
        return;
    }
    const message = messages.find((item) => item.id === id);
    if (!message || !scope.includes(message.city)) return;
    populateModal(message);
    openModal("messageDetailsModal");
    addHistory(
        `Opened customer message ${message.id}`,
        `Viewed ${message.customerName} conversation.`,
    );
}
function bindRows() {
    document
        .querySelectorAll(".row-checkbox")
        .forEach((box) =>
            box.addEventListener("click", (event) => event.stopPropagation()),
        );
    document.querySelectorAll(".row-checkbox").forEach((box) =>
        box.addEventListener("change", () => {
            selectedMessages = box.checked
                ? [...new Set([...selectedMessages, box.dataset.messageId])]
                : selectedMessages.filter((id) => id !== box.dataset.messageId);
            renderMessages();
        }),
    );
    document.querySelectorAll("[data-message-row]").forEach((row) =>
        row.addEventListener("click", (event) => {
            if (!event.target.closest("button,input"))
                openConversation(row.dataset.messageRow);
        }),
    );
    document.querySelectorAll("[data-open-profile]").forEach((button) =>
        button.addEventListener("click", (event) => {
            event.stopPropagation();
            location.href = `./supporter-user-profile.html?userId=${encodeURIComponent(button.dataset.openProfile)}`;
        }),
    );
}
function markSelectedRead() {
    messages = messages.map((message) =>
        selectedMessages.includes(message.id)
            ? {
                  ...message,
                  status: "read",
                  unreadCount: 0,
                  updatedAt: new Date().toLocaleString("en", {
                      dateStyle: "medium",
                      timeStyle: "short",
                  }),
              }
            : message,
    );
    saveMessages();
    addHistory(
        "Marked customer messages read",
        `${selectedMessages.length} conversation(s) marked as read.`,
    );
    selectedMessages = [];
    renderMessages();
    showToast("Selected messages marked as read.");
}
function moveSelected() {
    const destination = activeFilter === "junk" ? "inbox" : "junk";
    messages = messages.map((message) =>
        selectedMessages.includes(message.id)
            ? { ...message, box: destination }
            : message,
    );
    saveMessages();
    addHistory(
        `Moved customer messages to ${destination}`,
        `${selectedMessages.length} conversation(s) moved.`,
    );
    selectedMessages = [];
    renderMessages();
    showToast(
        `Selected messages moved to ${destination === "inbox" ? "Inbox All" : "Junk"}.`,
    );
}
q("messageCityFilter").innerHTML =
    '<option value="all">All Assigned Governorates</option>' +
    scope.map((city) => `<option>${escapeHtml(city)}</option>`).join("");
document.querySelectorAll(".filter-tab").forEach((tab) =>
    tab.addEventListener("click", () => {
        activeFilter = tab.dataset.filter;
        selectedMessages = [];
        document
            .querySelectorAll(".filter-tab")
            .forEach((item) => item.classList.toggle("active", item === tab));
        renderMessages();
    }),
);
q("messageSearch").addEventListener("input", renderMessages);
q("messageCityFilter").addEventListener("change", () => {
    selectedMessages = [];
    renderMessages();
});
q("selectAllCheckbox").addEventListener("change", (event) => {
    selectedMessages = event.target.checked
        ? filteredMessages().map((message) => message.id)
        : [];
    renderMessages();
});
q("clearSelectionBtn").addEventListener("click", () => {
    selectedMessages = [];
    renderMessages();
});
q("markReadBtn").addEventListener("click", markSelectedRead);
q("moveJunkBtn").addEventListener("click", moveSelected);
q("composeReplyBtn").hidden = !canEdit("Reply to customer messages");
q("composeReplyBtn").addEventListener("click", () => {
    const message = filteredMessages()[0] || scopedMessages()[0];
    if (message) openConversation(message.id);
});
q("openRulesBtn").addEventListener("click", () =>
    openModal("messageRulesModal"),
);
q("closeMessageModalBtn").addEventListener("click", () =>
    closeModal("messageDetailsModal"),
);
q("closeMessageFooterBtn").addEventListener("click", () =>
    closeModal("messageDetailsModal"),
);
q("closeRulesModalBtn").addEventListener("click", () =>
    closeModal("messageRulesModal"),
);
q("closeRulesFooterBtn").addEventListener("click", () =>
    closeModal("messageRulesModal"),
);
q("markSingleReadBtn").addEventListener("click", () => {
    const message = messages.find((item) => item.id === activeMessageId);
    if (!message) return;
    message.status = "read";
    message.unreadCount = 0;
    message.updatedAt = new Date().toLocaleString("en", {
        dateStyle: "medium",
        timeStyle: "short",
    });
    saveMessages();
    populateModal(message);
    renderMessages();
    addHistory(
        `Marked message ${message.id} read`,
        `${message.customerName} conversation marked as read.`,
    );
    showToast("Conversation marked as read.");
});
q("sendReplyBtn").addEventListener("click", () => {
    const message = messages.find((item) => item.id === activeMessageId),
        reply = q("quickReplyInput").value.trim();
    if (!message || !reply) {
        showToast("Write a reply before sending.");
        return;
    }
    message.box = "sent";
    message.status = "read";
    message.unreadCount = 0;
    message.preview = reply;
    message.updatedAt = new Date().toLocaleString("en", {
        dateStyle: "medium",
        timeStyle: "short",
    });
    message.lastReplyBy = session.supporterId || "SUP-0901";
    saveMessages();
    addHistory(
        `Replied to customer ${message.userId}`,
        `Sent a reply to ${message.customerName} at ${message.updatedAt}.`,
    );
    closeModal("messageDetailsModal");
    renderMessages();
    showToast(`Reply sent to ${message.customerName}.`);
});
q("messageCustomerName").addEventListener("click", () => {
    if (q("messageCustomerName").dataset.userId)
        location.href = `./supporter-user-profile.html?userId=${encodeURIComponent(q("messageCustomerName").dataset.userId)}`;
});
if (!canView("View customer inbox")) {
    document.querySelector(".inbox-layout").innerHTML =
        '<section class="inbox-card"><p class="permission-denied">Your account does not have permission to view customer messages.</p></section>';
} else {
    renderMessages();
    const requestedUser = new URLSearchParams(location.search).get("userId"),
        message = messages.find(
            (item) =>
                item.userId === requestedUser && scope.includes(item.city),
        );
    if (message) {
        activeFilter = message.box;
        document
            .querySelectorAll(".filter-tab")
            .forEach((tab) =>
                tab.classList.toggle(
                    "active",
                    tab.dataset.filter === activeFilter,
                ),
            );
        renderMessages();
        openConversation(message.id);
    }
}
