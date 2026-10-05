const partners = [
    {
        id: "OP-1024",
        name: "Mona Adel",
        username: "ops.mona",
        governorate: "Cairo",
        zone: "New Cairo",
    },
    {
        id: "OP-1031",
        name: "Karim Samir",
        username: "ops.karim",
        governorate: "Cairo",
        zone: "Nasr City",
    },
];
const doneOrders = [
    {
        id: "ORD-9304",
        customerName: "Mariam Kamal",
        governorate: "Cairo",
        workZone: "New Cairo",
        sentMaid: "Hoda Ali",
        orderCost: 1650,
        executionDate: "2026-08-10",
        startHour: "08:00 AM",
        paymentMethod: "Cash",
    },
    {
        id: "ORD-9308",
        customerName: "Omar Hany",
        governorate: "Cairo",
        workZone: "New Cairo",
        sentMaid: "Laila Mostafa",
        orderCost: 920,
        executionDate: "2026-08-09",
        startHour: "09:00 AM",
        paymentMethod: "Bank Transfer",
    },
    {
        id: "ORD-9315",
        customerName: "Youssef Adel",
        governorate: "Cairo",
        workZone: "New Cairo",
        sentMaid: "Rana Fouad",
        orderCost: 2400,
        executionDate: "2026-08-08",
        startHour: "05:00 PM",
        paymentMethod: "Wallet",
    },
    {
        id: "ORD-9320",
        customerName: "Salma Emad",
        governorate: "Cairo",
        workZone: "Nasr City",
        sentMaid: "Amina Mostafa",
        orderCost: 1200,
        executionDate: "2026-08-07",
        startHour: "02:00 PM",
        paymentMethod: "Cash",
    },
];
const i18n = {
    en: {
        languageButton: "Arabic",
        partnerWorkspace: "Partner Workspace",
        partnerAccount: "Partner Account",
        navToday: "Today Schedule",
        navOrders: "Orders",
        navDoneOrders: "Done Orders",
        navSuperAdminMessages: "Super Admin Messages",
        navSupporterMessages: "Supporter Messages",
        navAvailability: "Availability",
        navMessages: "Messages",
        navProfile: "My Profile",
        logout: "Logout",
        doneOrdersEyebrow: "Completed Work",
        doneOrdersTitle: "Done Orders",
        subtitle:
            "Only operational order data is visible here. Customer details are limited to name only.",
        currentPartner: "Current Partner",
        doneOrders: "Done Orders",
        totalCost: "Total Cost",
        cashOrders: "Cash Orders",
        readOnlyData: "Read-only order data",
        searchDone: "Search order or maid",
        orderNumber: "Order Number",
        customerName: "Customer Name",
        workZone: "Work Zone",
        sentMaid: "Sent Maid",
        orderCost: "Order Cost",
        executionDate: "Execution Date",
        startHour: "Start Hour",
        paymentMethod: "Payment Method",
        noDoneOrders: "No done orders match the current search.",
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
        navSuperAdminMessages:
            "\u0631\u0633\u0627\u0626\u0644 \u0627\u0644\u0633\u0648\u0628\u0631 \u0623\u062f\u0645\u0646",
        navSupporterMessages:
            "\u0631\u0633\u0627\u0626\u0644 \u0627\u0644\u062f\u0639\u0645",
        navAvailability: "\u0627\u0644\u0625\u062a\u0627\u062d\u0629",
        navMessages: "\u0627\u0644\u0631\u0633\u0627\u0626\u0644",
        navProfile: "\u0645\u0644\u0641\u064a",
        logout: "\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062e\u0631\u0648\u062c",
        doneOrdersEyebrow: "\u0639\u0645\u0644 \u0645\u0646\u0641\u0630",
        doneOrdersTitle:
            "\u0627\u0644\u0637\u0644\u0628\u0627\u062a \u0627\u0644\u0645\u0646\u0641\u0630\u0629",
        subtitle:
            "\u062a\u0638\u0647\u0631 \u0647\u0646\u0627 \u0628\u064a\u0627\u0646\u0627\u062a \u062a\u0634\u063a\u064a\u0644\u064a\u0629 \u0641\u0642\u0637. \u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u0639\u0645\u064a\u0644 \u0645\u062d\u062f\u0648\u062f\u0629 \u0641\u064a \u0627\u0644\u0627\u0633\u0645 \u0641\u0642\u0637.",
        currentPartner:
            "\u0627\u0644\u0634\u0631\u064a\u0643 \u0627\u0644\u062d\u0627\u0644\u064a",
        doneOrders:
            "\u0637\u0644\u0628\u0627\u062a \u0645\u0646\u0641\u0630\u0629",
        totalCost:
            "\u0625\u062c\u0645\u0627\u0644\u064a \u0627\u0644\u062a\u0643\u0644\u0641\u0629",
        cashOrders: "\u0637\u0644\u0628\u0627\u062a \u0643\u0627\u0634",
        readOnlyData:
            "\u0628\u064a\u0627\u0646\u0627\u062a \u0644\u0644\u0639\u0631\u0636 \u0641\u0642\u0637",
        searchDone:
            "\u0627\u0628\u062d\u062b \u0628\u0631\u0642\u0645 \u0627\u0644\u0637\u0644\u0628 \u0623\u0648 \u0627\u0644\u0639\u0627\u0645\u0644\u0629",
        orderNumber: "\u0631\u0642\u0645 \u0627\u0644\u0637\u0644\u0628",
        customerName: "\u0627\u0633\u0645 \u0627\u0644\u0639\u0645\u064a\u0644",
        workZone: "\u0646\u0637\u0627\u0642 \u0627\u0644\u0639\u0645\u0644",
        sentMaid:
            "\u0627\u0644\u0639\u0627\u0645\u0644\u0629 \u0627\u0644\u0645\u0631\u0633\u0644\u0629",
        orderCost:
            "\u062a\u0643\u0644\u0641\u0629 \u0627\u0644\u0637\u0644\u0628",
        executionDate:
            "\u062a\u0627\u0631\u064a\u062e \u0627\u0644\u062a\u0646\u0641\u064a\u0630",
        startHour: "\u0633\u0627\u0639\u0629 \u0627\u0644\u0628\u062f\u0621",
        paymentMethod:
            "\u0637\u0631\u064a\u0642\u0629 \u0627\u0644\u062f\u0641\u0639",
        noDoneOrders:
            "\u0644\u0627 \u062a\u0648\u062c\u062f \u0637\u0644\u0628\u0627\u062a \u0645\u0646\u0641\u0630\u0629 \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0644\u0628\u062d\u062b.",
    },
};
const q = (id) => document.getElementById(id);
let language = localStorage.getItem("partnerWorkspaceLanguage") || "en";
function readJson(key, fallback) {
    try {
        return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch (error) {
        return fallback;
    }
}
function t(key) {
    return i18n[language]?.[key] || i18n.en[key] || key;
}
function money(value) {
    return new Intl.NumberFormat("en-EG", {
        style: "currency",
        currency: "EGP",
        maximumFractionDigits: 0,
    }).format(Number(value) || 0);
}
function formatDate(value) {
    const [year, month, day] = value.split("-");
    return `${day}-${month}-${year}`;
}
function resolvePartner() {
    const session = readJson("tarwiqaPartnerSession", null);
    const id = session?.partnerId || "OP-1024";
    const base = partners.find((item) => item.id === id) || partners[0];
    return {
        ...base,
        ...(session || {}),
        zone: session?.workZone || base.zone,
    };
}
const partner = resolvePartner();
function scopedDoneOrders() {
    return doneOrders.filter(
        (order) =>
            order.governorate === partner.governorate &&
            order.workZone === partner.zone,
    );
}
function applyLanguage() {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.body.classList.toggle("rtl", language === "ar");
    document.querySelectorAll("[data-i18n]").forEach((node) => {
        node.textContent = t(node.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
        node.placeholder = t(node.dataset.i18nPlaceholder);
    });
    q("doneLanguageToggleBtn").textContent = t("languageButton");
    q("doneOrdersSubtitle").textContent = t("subtitle");
}
function renderHeader() {
    q("partnerRoleLabel").textContent =
        `${t("partnerAccount")} / ${partner.id}`;
    q("partnerName").textContent = partner.name;
    q("partnerScope").textContent = `${partner.governorate} / ${partner.zone}`;
    q("profileLink").href =
        `./partner-profile.html?partnerId=${encodeURIComponent(partner.id)}`;
}
function renderRows() {
    const query = q("doneSearchInput").value.trim().toLowerCase();
    const rows = scopedDoneOrders().filter((order) =>
        `${order.id} ${order.customerName} ${order.workZone} ${order.sentMaid} ${order.paymentMethod}`
            .toLowerCase()
            .includes(query),
    );
    q("doneOrdersTableBody").innerHTML = rows.length
        ? rows
              .map(
                  (order) =>
                      `<tr><td><strong>${order.id}</strong></td><td>${order.customerName}</td><td>${order.workZone}</td><td>${order.sentMaid}</td><td><strong>${money(order.orderCost)}</strong></td><td>${formatDate(order.executionDate)}</td><td>${order.startHour}</td><td>${order.paymentMethod}</td></tr>`,
              )
              .join("")
        : `<tr><td colspan="8">${t("noDoneOrders")}</td></tr>`;
    q("doneCountMetric").textContent = rows.length;
    q("doneCostMetric").textContent = money(
        rows.reduce((sum, order) => sum + order.orderCost, 0),
    );
    q("cashCountMetric").textContent = rows.filter(
        (order) => order.paymentMethod === "Cash",
    ).length;
}
function setLanguage(next) {
    language = next === "ar" ? "ar" : "en";
    localStorage.setItem("partnerWorkspaceLanguage", language);
    applyLanguage();
    renderRows();
    renderHeader();
}
q("doneLanguageToggleBtn").addEventListener("click", () =>
    setLanguage(language === "en" ? "ar" : "en"),
);
q("doneSearchInput").addEventListener("input", renderRows);
q("logoutPartnerBtn").addEventListener("click", () => {
    localStorage.removeItem("tarwiqaPartnerSession");
    window.location.href = "./partner-login.html";
});
renderHeader();
renderRows();
applyLanguage();
