const userSeed = [
    {
        id: "#USR-102938",
        name: "Mariam Kamal",
        phone: "+20 109 555 0198",
        additionalNumber: "+20 122 800 4410",
        email: "mariam.ashraf@example.com",
        city: "Cairo",
        address: "12 Nile Corniche, Maadi, Cairo",
        platform: "Mobile App",
        wallet: 24380,
        type: "User",
        active: "Active",
        ban: "Not Banned",
        restricted: "Open Access",
        createdDate: "2024-01-18 10:42 AM",
    },
    {
        id: "#USR-102954",
        name: "Youssef Adel",
        phone: "+20 101 444 2290",
        additionalNumber: "+20 114 901 3321",
        email: "y.adel@example.com",
        city: "Alexandria",
        address: "28 Fouad Street, Alexandria",
        platform: "Website",
        wallet: 8940,
        type: "User",
        active: "Inactive",
        ban: "Not Banned",
        restricted: "Orders Only",
        createdDate: "2024-03-02 01:20 PM",
    },
    {
        id: "#USR-103004",
        name: "Nour Hassan",
        phone: "+20 112 760 1903",
        additionalNumber: "+20 127 665 1700",
        email: "n.hassan@example.com",
        city: "Giza",
        address: "7 El Tahrir Street, Dokki, Giza",
        platform: "Mobile App",
        wallet: 17120,
        type: "User",
        active: "Active",
        ban: "Temporary Ban",
        restricted: "Wallet Blocked",
        createdDate: "2024-05-14 09:05 AM",
    },
    {
        id: "#USR-103121",
        name: "Karim Emad",
        phone: "+20 115 903 7744",
        additionalNumber: "+20 120 333 4112",
        email: "karim.emad@example.com",
        city: "Dakahlia",
        address: "34 El Gomhoria Road, Mansoura",
        platform: "Call Center",
        wallet: 2150,
        type: "User",
        active: "Active",
        ban: "Not Banned",
        restricted: "Open Access",
        createdDate: "2024-06-09 04:47 PM",
    },
    {
        id: "#USR-103177",
        name: "Salma Hany",
        phone: "+20 100 873 2190",
        additionalNumber: "+20 123 885 0091",
        email: "salma.hany@example.com",
        city: "Gharbia",
        address: "16 El Bahr Street, Tanta",
        platform: "Website",
        wallet: 13500,
        type: "User",
        active: "Inactive",
        ban: "Permanent Ban",
        restricted: "Messaging Blocked",
        createdDate: "2024-07-21 11:15 AM",
    },
    {
        id: "#USR-103220",
        name: "Hossam Fathy",
        phone: "+20 111 234 6677",
        additionalNumber: "+20 122 991 7722",
        email: "hossam.fathy@example.com",
        city: "Cairo",
        address: "18 Beirut Street, Heliopolis",
        platform: "Mobile App",
        wallet: 6600,
        type: "User",
        active: "Active",
        ban: "Not Banned",
        restricted: "Open Access",
        createdDate: "2025-02-11 08:30 AM",
    },
];
const q = (id) => document.getElementById(id),
    session = readJson("tarwiqaSupporterSession", {}),
    role = session.supporterRole || session.role || "editor",
    scope = Array.isArray(session.governorates)
        ? session.governorates
        : ["Cairo", "Giza"];
let selectedUsers = [],
    pendingAction = null,
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
function money(value) {
    return new Intl.NumberFormat("en-EG", {
        style: "currency",
        currency: "EGP",
        maximumFractionDigits: 0,
    }).format(Number(value) || 0);
}
function allUsers() {
    const overrides = readJson("supporterUserOverrides", {}),
        created = readJson("createdUsers", []);
    return [...userSeed, ...created]
        .map((user) => ({ ...user, ...(overrides[user.id] || {}) }))
        .filter(
            (user, index, all) =>
                all.findIndex((item) => item.id === user.id) === index,
        );
}
function scopedUsers() {
    return allUsers().filter((user) => scope.includes(user.city));
}
function visibleUsers() {
    const search = q("userSearch").value.trim().toLowerCase(),
        city = q("userCityFilter").value;
    return scopedUsers().filter(
        (user) =>
            (city === "all" || user.city === city) &&
            `${user.id} ${user.name} ${user.phone} ${user.email}`
                .toLowerCase()
                .includes(search),
    );
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
    q("userListToastMessage").textContent = message;
    q("userListToast").classList.remove("hidden");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(
        () => q("userListToast").classList.add("hidden"),
        2600,
    );
}
function openModal(title, subtitle, content, footer = "Close") {
    q("userListModalTitle").textContent = title;
    q("userListModalSubtitle").textContent = subtitle;
    q("userListModalContent").innerHTML = content;
    q("closeUserListModalFooterBtn").textContent = footer;
    q("closeUserListModalFooterBtn").classList.toggle(
        "primary-action",
        footer !== "Close",
    );
    q("userListModal").classList.remove("hidden");
}
function closeModal() {
    q("userListModal").classList.add("hidden");
    pendingAction = null;
    q("closeUserListModalFooterBtn").textContent = "Close";
}
function updateMetrics() {
    const users = scopedUsers();
    q("visibleUsersMetric").textContent = `${users.length} scoped users`;
    q("activeUsersMetric").textContent = users.filter(
        (user) => user.active === "Active",
    ).length;
    q("restrictedUsersMetric").textContent = users.filter(
        (user) => user.restricted !== "Open Access",
    ).length;
    q("bannedUsersMetric").textContent = users.filter(
        (user) => user.ban !== "Not Banned",
    ).length;
    q("walletUsersMetric").textContent = money(
        users.reduce((sum, user) => sum + Number(user.wallet || 0), 0),
    );
    q("usersScopeText").textContent =
        `Scope: ${scope.join(", ")}. User actions depend on your assigned permissions.`;
}
function updateSelection() {
    const count = selectedUsers.length;
    q("selectionSummary").textContent = `${count} users selected`;
    q("clearSelectionBtn").disabled = !count;
    document.querySelectorAll("[data-bulk-action]").forEach((button) => {
        button.disabled =
            !count ||
            !canEdit(
                button.dataset.bulkAction === "push"
                    ? "Send push notifications to users"
                    : "Send email or WhatsApp to users",
            );
        const labels = {
            push: "Send Push",
            email: "Send Email",
            whatsapp: "WhatsApp",
        };
        button.textContent = `${labels[button.dataset.bulkAction]} (${count})`;
    });
    const rows = visibleUsers();
    q("selectAllCheckbox").checked =
        rows.length > 0 &&
        rows.every((user) => selectedUsers.includes(user.id));
    q("selectAllCheckbox").indeterminate =
        count > 0 && !q("selectAllCheckbox").checked;
}
function renderUsers() {
    const rows = visibleUsers(),
        canBan = canEdit("Ban or unban user"),
        canRestrict = canEdit("Restrict or restore user access"),
        canEditUser = canEdit("Edit user profile data");
    q("userTableBody").innerHTML = rows.length
        ? rows
              .map(
                  (user) =>
                      `<tr><td><input class="row-checkbox" type="checkbox" data-user-id="${escapeHtml(user.id)}" ${selectedUsers.includes(user.id) ? "checked" : ""}/></td><td>${escapeHtml(user.id)}</td><td><div class="user-name"><a class="user-profile-link" href="./supporter-user-profile.html?userId=${encodeURIComponent(user.id)}">${escapeHtml(user.name)}</a><small>User Profile</small></div></td><td>${escapeHtml(user.phone)}</td><td>${escapeHtml(user.city)}</td><td>${escapeHtml(user.platform)}</td><td><span class="status-pill ${user.active === "Active" ? "active" : "inactive"}">${escapeHtml(user.active)}</span></td><td><span class="status-pill ${user.ban === "Not Banned" ? "open" : "banned"}">${escapeHtml(user.ban)}</span></td><td><span class="status-pill ${user.restricted === "Open Access" ? "open" : "restricted"}">${escapeHtml(user.restricted)}</span></td><td>${escapeHtml(user.createdDate)}</td><td><div class="row-actions"><button class="row-action view" data-user-action="view" data-user-id="${escapeHtml(user.id)}">View</button>${canBan ? `<button class="row-action ban" data-user-action="ban" data-user-id="${escapeHtml(user.id)}">${user.ban === "Not Banned" ? "Ban" : "Unban"}</button>` : ""}${canRestrict ? `<button class="row-action restrict" data-user-action="restrict" data-user-id="${escapeHtml(user.id)}">${user.restricted === "Open Access" ? "Restrict" : "Restore"}</button>` : ""}<button class="row-action message" data-user-action="message" data-user-id="${escapeHtml(user.id)}">Message</button>${canEditUser ? `<button class="row-action edit" data-user-action="edit" data-user-id="${escapeHtml(user.id)}">Edit</button>` : ""}</div></td></tr>`,
              )
              .join("")
        : '<tr><td colspan="11">No users match this supporter scope or filter.</td></tr>';
    bindRows();
    updateSelection();
    updateMetrics();
}
function profileHtml(user) {
    return `<div class="profile-data-grid"><p><strong>ID</strong><br>${escapeHtml(user.id)}</p><p><strong>Name</strong><br>${escapeHtml(user.name)}</p><p><strong>Phone</strong><br>${escapeHtml(user.phone)}</p><p><strong>Additional Number</strong><br>${escapeHtml(user.additionalNumber)}</p><p><strong>Email</strong><br>${escapeHtml(user.email)}</p><p><strong>Governorate</strong><br>${escapeHtml(user.city)}</p><p class="wide"><strong>Address</strong><br>${escapeHtml(user.address)}</p><p><strong>Wallet</strong><br>${money(user.wallet)}</p><p><strong>Status</strong><br>${escapeHtml(user.active)} / ${escapeHtml(user.ban)} / ${escapeHtml(user.restricted)}</p></div>`;
}
function userForm(user = {}) {
    return `<div class="supporter-edit-grid"><label><span>Full Name</span><input id="editUserName" value="${escapeHtml(user.name || "")}" required></label><label><span>Phone</span><input id="editUserPhone" value="${escapeHtml(user.phone || "")}" required></label><label><span>Additional Number</span><input id="editUserAdditional" value="${escapeHtml(user.additionalNumber || "")}"></label><label><span>Email</span><input id="editUserEmail" type="email" value="${escapeHtml(user.email || "")}" required></label><label><span>Governorate</span><select id="editUserCity">${scope.map((city) => `<option ${city === user.city ? "selected" : ""}>${escapeHtml(city)}</option>`).join("")}</select></label><label><span>Platform</span><select id="editUserPlatform"><option>Mobile App</option><option>Website</option><option>Call Center</option></select></label><label class="wide"><span>Address</span><textarea id="editUserAddress" rows="3" required>${escapeHtml(user.address || "")}</textarea></label></div>`;
}
function communicationForm(action, users) {
    const label = {
        push: "Push Notification",
        email: "Email",
        whatsapp: "WhatsApp",
    }[action];
    return `<div class="communication-form"><p><strong>Channel:</strong> ${label}</p><p><strong>Recipients:</strong> ${users.map((user) => escapeHtml(user.name)).join(", ")}</p><label class="communication-field"><span>Subject / Label</span><input id="communicationSubject" required></label><label class="communication-field"><span>Message</span><textarea id="communicationBody" rows="5" required></textarea></label></div>`;
}
function saveOverride(user, changes) {
    const overrides = readJson("supporterUserOverrides", {});
    overrides[user.id] = {
        ...(overrides[user.id] || {}),
        ...changes,
        updatedAt: new Date().toISOString(),
        updatedBy: session.supporterId || "SUP-0901",
    };
    writeJson("supporterUserOverrides", overrides);
}
function handleUserAction(action, user) {
    if (action === "view") {
        if (!canView("Open full user profile")) {
            showToast("No permission to open user profiles.");
            return;
        }
        openModal(
            user.name,
            "Full customer profile within your scope.",
            profileHtml(user),
        );
        addHistory(
            `Viewed user ${user.id}`,
            `Opened ${user.name} customer profile.`,
        );
    } else if (action === "message") {
        location.href = `./supporter-customer-messages.html?userId=${encodeURIComponent(user.id)}`;
    } else if (action === "ban") {
        saveOverride(user, {
            ban: user.ban === "Not Banned" ? "Temporary Ban" : "Not Banned",
        });
        addHistory(
            `Changed user ban ${user.id}`,
            `${user.name} ban status updated.`,
        );
        renderUsers();
        showToast("User ban status updated.");
    } else if (action === "restrict") {
        saveOverride(user, {
            restricted:
                user.restricted === "Open Access"
                    ? "Messaging Blocked"
                    : "Open Access",
        });
        addHistory(
            `Changed user restriction ${user.id}`,
            `${user.name} access restriction updated.`,
        );
        renderUsers();
        showToast("User restriction updated.");
    } else if (action === "edit") {
        pendingAction = { type: "edit", userId: user.id };
        openModal(
            `Edit ${user.name}`,
            "Update customer account data.",
            userForm(user),
            "Save Changes",
        );
    }
}
function bindRows() {
    document.querySelectorAll(".row-checkbox").forEach((box) =>
        box.addEventListener("change", () => {
            selectedUsers = box.checked
                ? [...new Set([...selectedUsers, box.dataset.userId])]
                : selectedUsers.filter((id) => id !== box.dataset.userId);
            renderUsers();
        }),
    );
    document.querySelectorAll("[data-user-action]").forEach((button) =>
        button.addEventListener("click", () => {
            const user = scopedUsers().find(
                (item) => item.id === button.dataset.userId,
            );
            if (user) handleUserAction(button.dataset.userAction, user);
        }),
    );
}
function savePending() {
    if (!pendingAction) {
        closeModal();
        return;
    }
    if (pendingAction.type === "edit" || pendingAction.type === "add") {
        const data = {
            name: q("editUserName").value.trim(),
            phone: q("editUserPhone").value.trim(),
            additionalNumber: q("editUserAdditional").value.trim(),
            email: q("editUserEmail").value.trim(),
            city: q("editUserCity").value,
            platform: q("editUserPlatform").value,
            address: q("editUserAddress").value.trim(),
        };
        if (!data.name || !data.phone || !data.email || !data.address) {
            showToast("Complete all required user fields.");
            return;
        }
        if (pendingAction.type === "edit") {
            const user = scopedUsers().find(
                (item) => item.id === pendingAction.userId,
            );
            saveOverride(user, data);
            addHistory(
                `Edited user ${user.id}`,
                `Updated ${data.name} profile data.`,
            );
        } else {
            const created = readJson("createdUsers", []),
                user = {
                    ...data,
                    id: `#USR-${Date.now().toString().slice(-6)}`,
                    wallet: 0,
                    type: "User",
                    active: "Active",
                    ban: "Not Banned",
                    restricted: "Open Access",
                    createdDate: new Date().toLocaleString("en"),
                };
            created.push(user);
            writeJson("createdUsers", created);
            addHistory(
                `Added user ${user.id}`,
                `Created customer account for ${user.name}.`,
            );
        }
        closeModal();
        renderUsers();
        showToast("User data saved.");
        return;
    }
    if (pendingAction.type === "communication") {
        const subject = q("communicationSubject").value.trim(),
            body = q("communicationBody").value.trim();
        if (!subject || !body) {
            showToast("Add a title and message before sending.");
            return;
        }
        const rows = readJson("supporterCustomerCommunications", []),
            sentAt = new Date().toISOString();
        rows.unshift({
            id: `COM-${Date.now()}`,
            supporterId: session.supporterId,
            channel: pendingAction.action,
            userIds: pendingAction.userIds,
            subject,
            body,
            sentAt,
        });
        writeJson("supporterCustomerCommunications", rows);
        addHistory(
            `Sent ${pendingAction.action} to users`,
            `${pendingAction.userIds.length} customer(s), ${new Date(sentAt).toLocaleString("en")}.`,
        );
        closeModal();
        showToast(`Message sent at ${new Date(sentAt).toLocaleString("en")}.`);
    }
}
q("userCityFilter").innerHTML =
    '<option value="all">All Assigned Governorates</option>' +
    scope.map((city) => `<option>${escapeHtml(city)}</option>`).join("");
q("addUserBtn").hidden = !canEdit("Add user account");
q("addUserBtn").addEventListener("click", () => {
    pendingAction = { type: "add" };
    openModal(
        "Add User",
        "Create a customer account within your assigned scope.",
        userForm(),
        "Create User",
    );
});
q("userSearch").addEventListener("input", renderUsers);
q("userCityFilter").addEventListener("change", () => {
    selectedUsers = [];
    renderUsers();
});
q("selectAllCheckbox").addEventListener("change", (event) => {
    selectedUsers = event.target.checked
        ? visibleUsers().map((user) => user.id)
        : [];
    renderUsers();
});
q("clearSelectionBtn").addEventListener("click", () => {
    selectedUsers = [];
    renderUsers();
});
document.querySelectorAll("[data-bulk-action]").forEach((button) =>
    button.addEventListener("click", () => {
        const users = scopedUsers().filter((user) =>
            selectedUsers.includes(user.id),
        );
        pendingAction = {
            type: "communication",
            action: button.dataset.bulkAction,
            userIds: users.map((user) => user.id),
        };
        openModal(
            `Send ${button.dataset.bulkAction}`,
            "Communicate with selected customers.",
            communicationForm(button.dataset.bulkAction, users),
            "Send Now",
        );
    }),
);
q("closeUserListModalBtn").addEventListener("click", closeModal);
q("closeUserListModalFooterBtn").addEventListener("click", savePending);
q("userListModal").addEventListener("click", (event) => {
    if (event.target === q("userListModal")) closeModal();
});
if (!canView("View scoped users list")) {
    document.querySelector(".layout").innerHTML =
        '<section class="list-card"><p class="permission-denied">Your account does not have permission to view users.</p></section>';
} else {
    renderUsers();
    const requestedUser = new URLSearchParams(location.search).get("userId");
    const user = scopedUsers().find((item) => item.id === requestedUser);
    if (user) handleUserAction("view", user);
}
