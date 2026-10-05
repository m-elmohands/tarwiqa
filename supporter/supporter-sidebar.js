(function () {
    const mount = document.querySelector("[data-supporter-sidebar]");
    if (!mount) return;
    function readJson(key, fallback) {
        try {
            return JSON.parse(localStorage.getItem(key)) ?? fallback;
        } catch (error) {
            return fallback;
        }
    }
    const session = readJson("tarwiqaSupporterSession", {});
    function groupVisible(section, fallback = true) {
        const groups = Array.isArray(session.permissions)
            ? session.permissions
            : [];
        const group = groups.find((item) => item.section === section);
        return group
            ? (group.items || []).some((item) => item.canView || item.canEdit)
            : fallback;
    }
    function unreadTeamMessages() {
        const messages = readJson(
            `supporterMessages:${session.supporterId || "SUP-0901"}`,
            null,
        );
        return Array.isArray(messages)
            ? messages.filter(
                  (message) => message.unread || message.status === "unread",
              ).length
            : 2;
    }
    function unreadCustomerMessages() {
        const messages = readJson(
            `supporterCustomerMessages:${session.supporterId || "SUP-0901"}`,
            null,
        );
        return Array.isArray(messages)
            ? messages.reduce(
                  (total, message) =>
                      total + (Number(message.unreadCount) || 0),
                  0,
              )
            : 7;
    }
    const active = mount.dataset.activeSection || "orders";
    const role = session.supporterRole || session.role || "supporter";
    const roleLabel =
        role === "editor"
            ? "Editor"
            : role === "viewer"
              ? "Viewer"
              : "Support Team";
    const dashboardLinks = mount.dataset.dashboardLocal === "true";
    const href = (hash) =>
        dashboardLinks ? hash : `./supporter-dashboard.html${hash}`;
    const links = [
        {
            key: "orders",
            label: "Scoped Orders",
            href: href("#ordersSection"),
            visible: groupVisible("Scoped Orders", true),
        },
        {
            key: "partners",
            label: "Partners",
            href: href("#partnersSection"),
            visible: groupVisible("Scoped Partners", true),
        },
        {
            key: "users",
            label: "Users",
            href: "./supporter-users.html",
            visible: groupVisible("Scoped Users", true),
        },
        {
            key: "customer-messages",
            label: "Customer Messages",
            href: "./supporter-customer-messages.html",
            visible: groupVisible("Customer Messages", true),
            badge: unreadCustomerMessages(),
        },
        {
            key: "messages",
            label: "Team Messages",
            href: "./supporter-messages.html",
            visible: groupVisible("Supporter Messages", true),
            badge: unreadTeamMessages(),
        },
        {
            key: "history",
            label: "Action History",
            href: href("#historySection"),
            visible: groupVisible("Activity & Profile", true),
        },
        {
            key: "profile",
            label: "My Profile",
            href: `./supporter-profile.html?supporterId=${encodeURIComponent(session.supporterId || "SUP-0901")}`,
            visible: groupVisible("Activity & Profile", true),
        },
    ];
    mount.classList.add("supporter-sidebar");
    mount.innerHTML = `<div class="brand-block"><p class="eyebrow">Supporter Workspace</p><h1>TARWIQA</h1><span id="supporterRoleLabel">${roleLabel} / ${session.supporterId || "SUP-0901"}</span></div><nav class="workspace-nav" aria-label="Supporter workspace navigation">${links
        .filter((link) => link.visible)
        .map(
            (link) =>
                `<a href="${link.href}"${link.key === "profile" ? ' id="profileLink"' : ""} class="${active === link.key ? "active" : ""}" data-supporter-nav="${link.key}">${link.label}${link.badge ? `<span class="nav-badge">${link.badge}</span>` : ""}</a>`,
        )
        .join(
            "",
        )}</nav><button class="logout-btn" id="logoutSupporterBtn" type="button">Logout</button>`;
    document
        .getElementById("logoutSupporterBtn")
        ?.addEventListener("click", () => {
            localStorage.removeItem("tarwiqaSupporterSession");
            window.location.href = "./supporter-login.html";
        });
})();
