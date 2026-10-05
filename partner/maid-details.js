const operators = [
    {
        id: "OP-1024",
        name: "Mona Adel",
        username: "ops.mona",
        zone: "New Cairo",
    },
    {
        id: "OP-1031",
        name: "Karim Samir",
        username: "ops.karim",
        zone: "Nasr City",
    },
    { id: "OP-1042", name: "Nour Hassan", username: "ops.nour", zone: "Maadi" },
    {
        id: "OP-1057",
        name: "Ahmed Fathy",
        username: "ops.ahmed",
        zone: "October",
    },
    {
        id: "OP-1073",
        name: "Salma Youssef",
        username: "ops.salma",
        zone: "Heliopolis",
    },
];

const defaultMaids = [
    {
        id: "MD-1042",
        name: "Amina Mostafa",
        phone: "+20 100 445 2211",
        status: "active",
        startDate: "2024-01-14",
        age: 29,
        address: "Nasr City, Cairo",
        offDay: "Friday",
        operatorId: "OP-1031",
        salary: 8500,
        doneOrders: 248,
        personalId: "29803121500412",
        gender: "Female",
        notes: "Top performer in recurring home cleaning bookings.",
    },
    {
        id: "MD-1098",
        name: "Hoda Ali",
        phone: "+20 109 782 4451",
        status: "active",
        startDate: "2023-09-22",
        age: 33,
        address: "Dokki, Giza",
        offDay: "Monday",
        operatorId: "OP-1024",
        salary: 9200,
        doneOrders: 231,
        personalId: "29311241500764",
        gender: "Female",
        notes: "Currently assigned to premium package orders.",
    },
    {
        id: "MD-1121",
        name: "Salwa Nabil",
        phone: "+20 111 660 8842",
        status: "paused",
        startDate: "2024-03-03",
        age: 27,
        address: "Smouha, Alexandria",
        offDay: "Sunday",
        operatorId: "OP-1073",
        salary: 7800,
        doneOrders: 225,
        personalId: "29707031500981",
        gender: "Female",
        notes: "Waiting for renewed police clearance attachment.",
    },
    {
        id: "MD-1186",
        name: "Amal Fathy",
        phone: "+20 122 311 5560",
        status: "active",
        startDate: "2022-11-09",
        age: 36,
        address: "Mokattam, Cairo",
        offDay: "Thursday",
        operatorId: "OP-1042",
        salary: 10500,
        doneOrders: 214,
        personalId: "29006081500193",
        gender: "Female",
        notes: "Excellent customer ratings and low cancellation rate.",
    },
    {
        id: "MD-1214",
        name: "Dina Kamal",
        phone: "+20 128 740 0035",
        status: "expired",
        startDate: "2021-08-18",
        age: 31,
        address: "6th of October, Giza",
        offDay: "Tuesday",
        operatorId: "OP-1057",
        salary: 8000,
        doneOrders: 193,
        personalId: "29512121500872",
        gender: "Female",
        notes: "Temporarily inactive pending reactivation interview.",
    },
];

const maidId = new URLSearchParams(location.search).get("maidId") || "MD-1042";
const profileKey = "maidProfileOverrides";
const documentsKey = `maidDocuments:${maidId}`;
const q = (id) => document.getElementById(id);
const fieldIds = [
    "maidId",
    "maidName",
    "maidPhone",
    "maidPersonalId",
    "maidStatus",
    "maidGender",
    "maidAge",
    "maidStartDate",
    "maidOffDay",
    "maidSalary",
    "maidPartner",
    "maidDoneOrders",
    "maidAddress",
    "maidNotes",
];
const fields = Object.fromEntries(fieldIds.map((id) => [id, q(`${id}Input`)]));

function loadJson(key, fallback) {
    try {
        return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch (error) {
        return fallback;
    }
}

const baseMaid =
    defaultMaids.find((item) => item.id === maidId) || defaultMaids[0];
let maid = { ...baseMaid, ...(loadJson(profileKey, {})[maidId] || {}) };
const legacyStatuses = {
    available: "active",
    busy: "active",
    off: "paused",
    inactive: "expired",
};
maid.status = legacyStatuses[maid.status] || maid.status;
let documents = loadJson(documentsKey, [
    {
        id: `${maidId}-personal-id`,
        name: `${maidId}-personal-id.pdf`,
        type: "Personal ID",
        size: "1.2 MB",
        uploadedAt: "Apr 23, 2026, 10:00 AM",
        status: "Ready",
    },
]);
let toastTimer;
const maidPageTranslations = {
    en: {
        languageButton: "Arabic",
        partnerWorkspace: "Partner Workspace",
        partnerAccount: "Partner Account",
        navToday: "Today Schedule",
        navOrders: "Orders",
        navDoneOrders: "Done Orders",
        navAvailability: "Availability",
        navMessages: "Messages",
        navSuperAdminMessages: "Super Admin Messages",
        navSupporterMessages: "Supporter Messages",
        navProfile: "My Profile",
        logout: "Logout",
    },
    ar: {
        languageButton: "English",
        partnerWorkspace:
            "\u0648\u0627\u062c\u0647\u0629 \u0627\u0644\u0634\u0631\u064a\u0643",
        partnerAccount:
            "\u062d\u0633\u0627\u0628 \u0627\u0644\u0634\u0631\u064a\u0643",
        navToday: "\u062c\u062f\u0648\u0644 \u0627\u0644\u064a\u0648\u0645",
        navOrders: "\u0627\u0644\u0637\u0644\u0628\u0627\u062a",
        navDoneOrders:
            "\u0627\u0644\u0637\u0644\u0628\u0627\u062a \u0627\u0644\u0645\u0646\u0641\u0630\u0629",
        navAvailability: "\u0627\u0644\u0625\u062a\u0627\u062d\u0629",
        navMessages: "\u0627\u0644\u0631\u0633\u0627\u0626\u0644",
        navSuperAdminMessages:
            "\u0631\u0633\u0627\u0626\u0644 \u0627\u0644\u0633\u0648\u0628\u0631 \u0623\u062f\u0645\u0646",
        navSupporterMessages:
            "\u0631\u0633\u0627\u0626\u0644 \u0627\u0644\u062f\u0639\u0645",
        navProfile: "\u0645\u0644\u0641\u064a",
        logout: "\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062e\u0631\u0648\u062c",
    },
};
let maidPageLanguage = localStorage.getItem("partnerWorkspaceLanguage") || "en";
function maidT(key) {
    return (
        maidPageTranslations[maidPageLanguage]?.[key] ||
        maidPageTranslations.en[key] ||
        key
    );
}
function readPartnerSession() {
    try {
        return JSON.parse(localStorage.getItem("tarwiqaPartnerSession")) || {};
    } catch (error) {
        return {};
    }
}
function applyMaidPageLanguage() {
    document.documentElement.lang = maidPageLanguage;
    document.documentElement.dir = maidPageLanguage === "ar" ? "rtl" : "ltr";
    document.body.classList.toggle("rtl", maidPageLanguage === "ar");
    document.querySelectorAll("[data-i18n]").forEach((node) => {
        node.textContent = maidT(node.dataset.i18n);
    });
    q("maidLanguageToggleBtn").textContent = maidT("languageButton");
    const session = readPartnerSession();
    q("partnerRoleLabel").textContent =
        `${maidT("partnerAccount")} / ${session.partnerId || "OP-1024"}`;
    q("profileLink").href =
        `./partner-profile.html?partnerId=${encodeURIComponent(session.partnerId || "OP-1024")}`;
}
function setMaidPageLanguage(language) {
    maidPageLanguage = language === "ar" ? "ar" : "en";
    localStorage.setItem("partnerWorkspaceLanguage", maidPageLanguage);
    applyMaidPageLanguage();
}

const getPartner = (id) =>
    operators.find((operator) => operator.id === id) || operators[0];
const formatSalary = (value) =>
    new Intl.NumberFormat("en-EG", {
        style: "currency",
        currency: "EGP",
        maximumFractionDigits: 0,
    }).format(value);
const statusLabel = (value) => value.charAt(0).toUpperCase() + value.slice(1);
const initials = (name) =>
    name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0].toUpperCase())
        .join("") || "MD";
const escapeHtml = (value) =>
    String(value).replace(
        /[&<>'"]/g,
        (character) =>
            ({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                "'": "&#39;",
                '"': "&quot;",
            })[character],
    );
const formatFileSize = (bytes) =>
    bytes < 1024
        ? `${bytes} B`
        : bytes < 1048576
          ? `${(bytes / 1024).toFixed(1)} KB`
          : `${(bytes / 1048576).toFixed(1)} MB`;

function showToast(message) {
    const toast = q("maidDetailsToast");
    toast.textContent = message;
    toast.classList.remove("hidden");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.add("hidden"), 2800);
}

function populateForm() {
    fields.maidPartner.innerHTML = operators
        .map(
            (operator) =>
                `<option value="${operator.id}">${operator.name} - ${operator.zone}</option>`,
        )
        .join("");
    const values = {
        maidId: maid.id,
        maidName: maid.name,
        maidPhone: maid.phone,
        maidPersonalId: maid.personalId,
        maidStatus: maid.status,
        maidGender: maid.gender,
        maidAge: maid.age,
        maidStartDate: maid.startDate,
        maidOffDay: maid.offDay,
        maidSalary: maid.salary,
        maidPartner: maid.operatorId,
        maidDoneOrders: maid.doneOrders,
        maidAddress: maid.address,
        maidNotes: maid.notes,
    };
    Object.entries(values).forEach(([key, value]) => {
        fields[key].value = value ?? "";
    });
    applyPartnerMaidReadOnly();
}

function applyPartnerMaidReadOnly() {
    q("maidDetailsForm")
        .querySelectorAll("input, select, textarea")
        .forEach((control) => {
            control.disabled = true;
            control.setAttribute("aria-readonly", "true");
        });
}
function readForm() {
    return {
        ...maid,
        name: fields.maidName.value.trim(),
        phone: fields.maidPhone.value.trim(),
        personalId: fields.maidPersonalId.value.trim(),
        status: fields.maidStatus.value,
        gender: fields.maidGender.value,
        age: Math.max(18, Number(fields.maidAge.value) || 18),
        startDate: fields.maidStartDate.value,
        offDay: fields.maidOffDay.value,
        salary: Math.max(0, Number(fields.maidSalary.value) || 0),
        operatorId: fields.maidPartner.value,
        address: fields.maidAddress.value.trim(),
        notes: fields.maidNotes.value.trim(),
    };
}

function renderProfile() {
    const operator = getPartner(maid.operatorId);
    document.title = `${maid.name} - Maid Details`;
    q("pageTitle").textContent = maid.name;
    q("pageSubtitle").textContent =
        `${maid.id} complete workforce profile and document record.`;
    q("maidAvatar").textContent = initials(maid.name);
    q("maidNameHeading").textContent = maid.name;
    q("maidStatusBadge").textContent = statusLabel(maid.status);
    q("maidStatusBadge").className = `status-pill ${maid.status}`;
    q("maidIdentityMeta").textContent =
        `${maid.id} / ${maid.gender} / ${maid.address}`;
    q("salaryMetric").textContent = formatSalary(maid.salary);
    q("ordersMetric").textContent = maid.doneOrders;
    q("operatorMetric").textContent = operator.name;
    q("documentsMetric").textContent = documents.length;
    q("assignmentSummary").innerHTML =
        `<div><span>Assigned Partner</span><strong>${operator.name} (${operator.username})</strong></div><div><span>Partner Zone</span><strong>${operator.zone}</strong></div><div><span>Availability</span><strong>${statusLabel(maid.status)}</strong></div><div><span>Off Day</span><strong>${maid.offDay}</strong></div>`;
    q("performanceSummary").innerHTML =
        `<div><span>Completed Orders</span><strong>${maid.doneOrders}</strong></div><div><span>Current Salary</span><strong>${formatSalary(maid.salary)}</strong></div><div><span>Start Date</span><strong>${maid.startDate}</strong></div><div><span>Document State</span><strong>${documents.length} files</strong></div>`;
}

function renderDocuments() {
    q("documentsMetric").textContent = documents.length;
    q("documentsTableBody").innerHTML = documents.length
        ? documents
              .map(
                  (file) => `
    <tr>
      <td><div class="file-name"><button class="file-view-link" type="button" data-view-file="${escapeHtml(file.id)}">${escapeHtml(file.name)}</button><small>${escapeHtml(file.id)}</small></div></td>
      <td>${escapeHtml(file.type)}</td>
      <td>${escapeHtml(file.size)}</td>
      <td>${escapeHtml(file.uploadedAt)}</td>
      <td><span class="file-status">${escapeHtml(file.status)}</span></td>
      <td><div class="file-action-group"><button class="view-file-btn" type="button" data-view-file="${escapeHtml(file.id)}">View</button></div></td>
    </tr>
  `,
              )
              .join("")
        : '<tr><td class="empty-files" colspan="6">No files uploaded for this maid yet.</td></tr>';
}

function saveMaid() {
    if (!q("maidDetailsForm").reportValidity()) return;
    maid = readForm();
    const overrides = loadJson(profileKey, {});
    overrides[maid.id] = maid;
    localStorage.setItem(profileKey, JSON.stringify(overrides));
    populateForm();
    renderProfile();
    showToast(`${maid.name} details saved successfully.`);
}

function addFiles() {
    const files = Array.from(q("maidFilesInput").files || []);
    if (!files.length) {
        showToast("Select one or more files first.");
        return;
    }
    const uploadedAt = new Date().toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
    });
    files.forEach((file, index) =>
        documents.push({
            id: `${maidId}-${Date.now()}-${index}`,
            name: file.name,
            type: q("documentTypeInput").value,
            size: formatFileSize(file.size),
            uploadedAt,
            status: "Ready",
        }),
    );
    localStorage.setItem(documentsKey, JSON.stringify(documents));
    q("maidFilesInput").value = "";
    renderDocuments();
    renderProfile();
    showToast(`${files.length} file${files.length === 1 ? "" : "s"} added.`);
}

q("saveMaidBtn")?.addEventListener("click", saveMaid);
q("cancelEditBtn")?.addEventListener("click", () => {
    maid = { ...baseMaid, ...(loadJson(profileKey, {})[maidId] || {}) };
    populateForm();
    renderProfile();
    showToast("Unsaved changes cancelled.");
});
q("uploadFilesBtn").addEventListener("click", addFiles);
function openFilePreview(fileId) {
    const file = documents.find((item) => item.id === fileId);
    if (!file) return;
    q("filePreviewTitle").textContent = file.name;
    const body = q("filePreviewBody");
    if (!file.previewUrl) {
        body.innerHTML =
            '<div class="preview-unavailable">The original file is not available in this demo record. Upload the file again to enable viewing.</div>';
    } else if ((file.mimeType || "").startsWith("image/")) {
        body.innerHTML = `<img src="${file.previewUrl}" alt="${escapeHtml(file.name)}" />`;
    } else {
        body.innerHTML = `<iframe src="${file.previewUrl}" title="${escapeHtml(file.name)}"></iframe>`;
    }
    q("filePreviewModal").classList.remove("hidden");
    q("filePreviewModal").setAttribute("aria-hidden", "false");
}

function closeFilePreview() {
    q("filePreviewModal").classList.add("hidden");
    q("filePreviewModal").setAttribute("aria-hidden", "true");
    q("filePreviewBody").innerHTML = "";
}

q("closeFilePreviewBtn").addEventListener("click", closeFilePreview);
q("filePreviewModal").addEventListener("click", (event) => {
    if (event.target === q("filePreviewModal")) closeFilePreview();
});
q("documentsTableBody").addEventListener("click", (event) => {
    const viewButton = event.target.closest("[data-view-file]");
    if (viewButton) {
        openFilePreview(viewButton.dataset.viewFile);
        return;
    }
    const button = event.target.closest("[data-remove-file]");
    if (!button) return;
    documents = documents.filter(
        (file) => file.id !== button.dataset.removeFile,
    );
    localStorage.setItem(documentsKey, JSON.stringify(documents));
    renderDocuments();
    renderProfile();
    showToast("File removed from maid profile.");
});

q("maidLanguageToggleBtn")?.addEventListener("click", () =>
    setMaidPageLanguage(maidPageLanguage === "en" ? "ar" : "en"),
);
q("logoutPartnerBtn")?.addEventListener("click", () => {
    localStorage.removeItem("tarwiqaPartnerSession");
    window.location.href = "./partner-login.html";
});
populateForm();
applyPartnerMaidReadOnly();
renderProfile();
renderDocuments();
applyMaidPageLanguage();
