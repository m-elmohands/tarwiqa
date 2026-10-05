const partnerCatalog = [
    {
        id: "OP-1024",
        name: "Mona Adel",
        username: "ops.mona",
        status: "Active",
        governorate: "Cairo",
        zone: "New Cairo",
        managedMaids: 18,
        completedOrders: 246,
        joinedAt: "Jan 14, 2024",
        shift: "Morning",
        phone: "+20 100 220 4411",
        email: "mona@tarwiqa.app",
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
        joinedAt: "Mar 03, 2024",
        shift: "Morning",
        phone: "+20 101 442 1188",
        email: "karim@tarwiqa.app",
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
        joinedAt: "Feb 18, 2025",
        shift: "Evening",
        phone: "+20 109 228 5400",
        email: "nour.partner@tarwiqa.app",
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
        joinedAt: "Aug 08, 2023",
        shift: "Evening",
        phone: "+20 122 887 4011",
        email: "ahmed@tarwiqa.app",
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
        joinedAt: "May 22, 2025",
        shift: "Morning",
        phone: "+20 111 532 9021",
        email: "reem.alex@tarwiqa.app",
    },
];
const orderCatalog = [
    {
        id: "ORD-9401",
        governorate: "Cairo",
        zone: "New Cairo",
        arrivalDate: "2026-08-20",
        arrivalTime: "08:00 AM",
        offerName: "Premium Deep Clean",
        maids: ["Hoda Ali"],
        amountValue: 1650,
        paymentMethod: "Cash",
    },
    {
        id: "ORD-9402",
        governorate: "Cairo",
        zone: "New Cairo",
        arrivalDate: "2026-08-24",
        arrivalTime: "11:00 AM",
        offerName: "Gold Package",
        maids: ["Laila Mostafa"],
        amountValue: 2100,
        paymentMethod: "Wallet",
    },
    {
        id: "ORD-9412",
        governorate: "Cairo",
        zone: "Nasr City",
        arrivalDate: "2026-08-22",
        arrivalTime: "02:00 PM",
        offerName: "Kitchen Pro",
        maids: ["Amina Mostafa"],
        amountValue: 1200,
        paymentMethod: "Wallet",
    },
    {
        id: "ORD-9420",
        governorate: "Cairo",
        zone: "Maadi",
        arrivalDate: "2026-08-25",
        arrivalTime: "10:00 AM",
        offerName: "Business Standard",
        maids: [],
        amountValue: 1750,
        paymentMethod: "Bank Transfer",
    },
    {
        id: "ORD-9424",
        governorate: "Giza",
        zone: "October",
        arrivalDate: "2026-08-26",
        arrivalTime: "01:00 PM",
        offerName: "Move In Service",
        maids: ["Rana Fouad"],
        amountValue: 2400,
        paymentMethod: "Cash",
    },
    {
        id: "ORD-9431",
        governorate: "Alexandria",
        zone: "Smouha",
        arrivalDate: "2026-08-28",
        arrivalTime: "09:00 AM",
        offerName: "Summer Check",
        maids: ["Amal Fathy"],
        amountValue: 980,
        paymentMethod: "Wallet",
    },
];
const defaultMaids = [
    {
        id: "MD-1098",
        name: "Hoda Ali",
        phone: "+20 100 555 1098",
        personalId: "29804150123456",
        status: "available",
        address: "New Cairo, Cairo",
        operatorId: "OP-1024",
        salary: 9200,
        doneOrders: 231,
        offDay: "Friday",
        notes: "Experienced in deep cleaning.",
    },
    {
        id: "MD-1401",
        name: "Laila Mostafa",
        phone: "+20 101 555 1401",
        personalId: "29902020134567",
        status: "busy",
        address: "New Cairo, Cairo",
        operatorId: "OP-1024",
        salary: 8800,
        doneOrders: 96,
        offDay: "Saturday",
        notes: "Available for morning shifts.",
    },
    {
        id: "MD-1510",
        name: "Rana Fouad",
        phone: "+20 102 555 1510",
        personalId: "30003030145678",
        status: "paused",
        address: "October, Giza",
        operatorId: "OP-1057",
        salary: 7600,
        doneOrders: 44,
        offDay: "Friday",
        notes: "Temporary pause.",
    },
    {
        id: "MD-1042",
        name: "Amina Mostafa",
        phone: "+20 109 555 1042",
        personalId: "29706060156789",
        status: "available",
        address: "Nasr City, Cairo",
        operatorId: "OP-1031",
        salary: 8500,
        doneOrders: 248,
        offDay: "Sunday",
        notes: "Team lead experience.",
    },
    {
        id: "MD-1621",
        name: "Amal Fathy",
        phone: "+20 111 555 1621",
        personalId: "30107070167890",
        status: "available",
        address: "Smouha, Alexandria",
        operatorId: "OP-1201",
        salary: 8100,
        doneOrders: 61,
        offDay: "Friday",
        notes: "Alexandria scope.",
    },
];
const q = (id) => document.getElementById(id);
const params = new URLSearchParams(location.search);
let toastTimer;
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
function money(value) {
    return new Intl.NumberFormat("en-EG", {
        style: "currency",
        currency: "EGP",
        maximumFractionDigits: 0,
    }).format(Number(value) || 0);
}
function initials(name) {
    return name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0].toUpperCase())
        .join("");
}
function statusLabel(value) {
    return String(value).charAt(0).toUpperCase() + String(value).slice(1);
}
function formatDate(value) {
    const [year, month, day] = value.split("-");
    return `${day}-${month}-${year}`;
}
function showToast(message) {
    q("partnerProfileToast").textContent = message;
    q("partnerProfileToast").classList.remove("hidden");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(
        () => q("partnerProfileToast").classList.add("hidden"),
        2700,
    );
}
const session = readJson("tarwiqaSupporterSession", {});
const supporterRole = session.supporterRole || session.role || "editor";
const partner =
    partnerCatalog.find(
        (item) => item.id === (params.get("partnerId") || "OP-1024"),
    ) || partnerCatalog[0];
const supporterGovernorates = Array.isArray(session.governorates)
    ? session.governorates
    : ["Cairo", "Giza"];
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
function canEdit(name, fallback = supporterRole === "editor") {
    const item = permissionItem(name);
    return (
        supporterRole === "editor" && (item ? Boolean(item.canEdit) : fallback)
    );
}
const canAddMaid = canEdit("Add maid to scoped partner");
const canEditMaid = canEdit("Edit maid data for scoped partners");
const partnerAllowed =
    supporterGovernorates.includes(partner.governorate) &&
    canView("Open partner details", true);
const historyKey = `supporterActionHistory:${session.supporterId || "SUP-0901"}`;
function addHistory(action, details) {
    const current = readJson(historyKey, []);
    writeJson(
        historyKey,
        [
            {
                at: new Date().toLocaleString("en", {
                    dateStyle: "medium",
                    timeStyle: "short",
                }),
                action,
                details,
            },
            ...current,
        ].slice(0, 50),
    );
}
function partnerOrders() {
    return orderCatalog.filter(
        (order) =>
            order.governorate === partner.governorate &&
            order.zone === partner.zone,
    );
}
function getPartnerMaids() {
    const created = readJson("createdMaids", []);
    const overrides = readJson("maidProfileOverrides", {});
    return [...defaultMaids, ...created]
        .map((maid) => ({ ...maid, ...(overrides[maid.id] || {}) }))
        .filter(
            (maid, index, all) =>
                all.findIndex((item) => item.id === maid.id) === index,
        )
        .filter((maid) => maid.operatorId === partner.id);
}
function maidProfit(maid) {
    return (
        (Number(maid.doneOrders) || 0) * 35 + (Number(maid.salary) || 0) * 0.08
    );
}
function renderPartner() {
    if (!partnerAllowed) {
        document.querySelector(".profile-content").innerHTML =
            '<section class="profile-card"><h2>Partner access unavailable</h2><p class="access-note">This partner is outside your assigned governorates or your account does not have permission to open partner details.</p><a class="action-btn ghost" href="./supporter-dashboard.html#partnersSection">Back To Partners</a></section>';
        return;
    }
    const orders = partnerOrders(),
        maids = getPartnerMaids(),
        upcomingAmount = orders.reduce(
            (sum, order) => sum + order.amountValue,
            0,
        ),
        profit = upcomingAmount * 0.18,
        paid = profit * 0.55;
    document.title = `${partner.name} - Supporter Partner Profile`;
    q("partnerPageTitle").textContent = partner.name;
    q("partnerPageSubtitle").textContent =
        `${partner.governorate} / ${partner.zone} - same account and financial view available to the partner.`;
    q("partnerAvatar").textContent = initials(partner.name);
    q("partnerName").textContent = partner.name;
    q("partnerStatus").textContent = partner.status;
    q("partnerStatus").className =
        `status-pill ${partner.status.toLowerCase()}`;
    q("partnerMeta").textContent = `${partner.id} / ${partner.username}`;
    q("zoneMetric").textContent = `${partner.governorate} / ${partner.zone}`;
    q("ordersMetric").textContent = partner.completedOrders;
    q("upcomingOrdersMetric").textContent = orders.length;
    q("upcomingAmountMetric").textContent = money(upcomingAmount);
    q("partnerProfitMetric").textContent = money(profit);
    q("paidPartnerMetric").textContent = money(paid);
    q("remainingPartnerMetric").textContent = money(profit - paid);
    q("maidProfitMetric").textContent = money(
        maids.reduce((sum, maid) => sum + maidProfit(maid), 0),
    );
    q("financialDetailsTable").innerHTML = orders.length
        ? orders
              .map(
                  (order, index) =>
                      `<tr><td><strong>${escapeHtml(order.id)}</strong></td><td>${money(order.amountValue)}</td><td><strong>${money(order.amountValue * 0.18)}</strong></td><td>${money(order.amountValue * 0.12)}</td><td>${escapeHtml(order.paymentMethod)}</td><td><span class="status-pill ${index % 2 === 0 ? "active" : "paused"}">${index % 2 === 0 ? "Settled" : "Pending"}</span></td></tr>`,
              )
              .join("")
        : '<tr><td colspan="6">No financial details available for this partner.</td></tr>';
    q("partnerDetailsGrid").innerHTML =
        `<div><span>Partner ID</span><strong>${escapeHtml(partner.id)}</strong></div><div><span>Username</span><strong>${escapeHtml(partner.username)}</strong></div><div><span>Phone</span><strong>${escapeHtml(partner.phone)}</strong></div><div><span>Email</span><strong>${escapeHtml(partner.email)}</strong></div><div><span>Governorate</span><strong>${escapeHtml(partner.governorate)}</strong></div><div><span>Work Zone</span><strong>${escapeHtml(partner.zone)}</strong></div><div><span>Managed Maids</span><strong>${maids.length} visible / ${partner.managedMaids} system</strong></div><div><span>Joined At</span><strong>${escapeHtml(partner.joinedAt)}</strong></div>`;
    q("upcomingOrdersTable").innerHTML = orders.length
        ? orders
              .map(
                  (order) =>
                      `<tr><td><strong>${escapeHtml(order.id)}</strong></td><td>${formatDate(order.arrivalDate)}</td><td>${escapeHtml(order.arrivalTime)}</td><td>${escapeHtml(order.offerName)}</td><td><strong>${money(order.amountValue)}</strong></td><td>${escapeHtml(order.maids.join(", ") || "No maid assigned")}</td></tr>`,
              )
              .join("")
        : '<tr><td colspan="6">No upcoming orders assigned to this partner zone.</td></tr>';
    q("addMaidBtn").hidden = !canAddMaid;
    q("partnerMaidsTable").innerHTML = maids.length
        ? maids
              .map(
                  (maid) =>
                      `<tr><td><div class="maid-name"><strong>${escapeHtml(maid.name)}</strong><small>${escapeHtml(maid.id)} / ${escapeHtml(maid.address || "-")}</small></div></td><td>${escapeHtml(maid.phone || "-")}</td><td><span class="status-pill ${escapeHtml(maid.status)}">${escapeHtml(statusLabel(maid.status))}</span></td><td>${money(maid.salary)}</td><td>${Number(maid.doneOrders) || 0}</td><td><strong>${money(maidProfit(maid))}</strong></td><td><div class="maid-actions">${canEditMaid ? `<button class="maid-action-btn" type="button" data-edit-maid="${escapeHtml(maid.id)}">Edit Maid</button>` : "<span>View only</span>"}</div></td></tr>`,
              )
              .join("")
        : '<tr><td colspan="7">No maid profiles are assigned to this partner yet.</td></tr>';
}
function openMaidModal(maid = null) {
    if (maid && !canEditMaid) {
        showToast("No permission to edit maid data.");
        return;
    }
    if (!maid && !canAddMaid) {
        showToast("No permission to add a maid.");
        return;
    }
    q("maidForm").reset();
    q("maidId").value = maid?.id || "";
    q("maidPartner").value = `${partner.name} / ${partner.id}`;
    q("maidName").value = maid?.name || "";
    q("maidPhone").value = maid?.phone || "";
    q("maidPersonalId").value = maid?.personalId || "";
    q("maidStatus").value = maid?.status || "available";
    q("maidSalary").value = maid?.salary || "";
    q("maidDoneOrders").value = maid?.doneOrders || 0;
    q("maidOffDay").value = maid?.offDay || "Friday";
    q("maidAddress").value =
        maid?.address || `${partner.zone}, ${partner.governorate}`;
    q("maidNotes").value = maid?.notes || "";
    q("maidModalTitle").textContent = maid
        ? `Edit ${maid.name}`
        : "Add Maid To Partner";
    q("maidModal").classList.remove("hidden");
    q("maidModal").setAttribute("aria-hidden", "false");
    q("maidName").focus();
}
function closeMaidModal() {
    q("maidModal").classList.add("hidden");
    q("maidModal").setAttribute("aria-hidden", "true");
    q("maidForm").reset();
}
function saveMaid(event) {
    event.preventDefault();
    const existingId = q("maidId").value,
        documentFile = q("maidDocument").files[0],
        data = {
            name: q("maidName").value.trim(),
            phone: q("maidPhone").value.trim(),
            personalId: q("maidPersonalId").value.trim(),
            status: q("maidStatus").value,
            salary: Number(q("maidSalary").value) || 0,
            doneOrders: Number(q("maidDoneOrders").value) || 0,
            offDay: q("maidOffDay").value,
            address: q("maidAddress").value.trim(),
            notes: q("maidNotes").value.trim(),
            operatorId: partner.id,
            operatorName: partner.name,
        };
    if (existingId) {
        if (!canEditMaid) return;
        const overrides = readJson("maidProfileOverrides", {}),
            current = getPartnerMaids().find((maid) => maid.id === existingId),
            documents =
                overrides[existingId]?.documents || current?.documents || [];
        overrides[existingId] = {
            ...(overrides[existingId] || {}),
            ...data,
            id: existingId,
            documents: documentFile
                ? [
                      ...documents,
                      {
                          name: documentFile.name,
                          type: documentFile.type || "file",
                          uploadedAt: new Date().toISOString(),
                      },
                  ]
                : documents,
            updatedAt: new Date().toISOString(),
            updatedBy: session.supporterId || "SUP-0901",
        };
        writeJson("maidProfileOverrides", overrides);
        addHistory(
            `Updated maid ${existingId}`,
            `Updated ${data.name} under partner ${partner.id}.`,
        );
        showToast(`${data.name} updated successfully.`);
    } else {
        if (!canAddMaid) return;
        const created = readJson("createdMaids", []),
            maid = {
                ...data,
                id: `MD-${Date.now().toString().slice(-6)}`,
                documents: documentFile
                    ? [
                          {
                              name: documentFile.name,
                              type: documentFile.type || "file",
                              uploadedAt: new Date().toISOString(),
                          },
                      ]
                    : [],
                createdAt: new Date().toISOString(),
                createdBy: session.supporterId || "SUP-0901",
            };
        created.push(maid);
        writeJson("createdMaids", created);
        addHistory(
            `Added maid ${maid.id}`,
            `Added ${maid.name} under partner ${partner.id}.`,
        );
        showToast(`${maid.name} added to ${partner.name}.`);
    }
    closeMaidModal();
    renderPartner();
}
q("addMaidBtn").addEventListener("click", () => openMaidModal());
q("partnerMaidsTable").addEventListener("click", (event) => {
    const button = event.target.closest("[data-edit-maid]");
    if (button)
        openMaidModal(
            getPartnerMaids().find(
                (maid) => maid.id === button.dataset.editMaid,
            ),
        );
});
q("maidForm").addEventListener("submit", saveMaid);
q("closeMaidModalBtn").addEventListener("click", closeMaidModal);
q("cancelMaidBtn").addEventListener("click", closeMaidModal);
q("maidModal").addEventListener("click", (event) => {
    if (event.target === q("maidModal")) closeMaidModal();
});
q("openPartnerChatBtn").addEventListener("click", () => {
    if (!canEdit("Send direct message to a partner", true)) {
        showToast("No permission to message this partner.");
        return;
    }
    addHistory(
        `Opened chat ${partner.id}`,
        `Started partner chat from ${partner.name} profile.`,
    );
    location.href = `./supporter-messages.html?partnerId=${encodeURIComponent(partner.id)}`;
});
renderPartner();
