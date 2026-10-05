const partnerLoginTranslations = {
    en: {
        languageButton: "Arabic",
        partnerPortal: "Partner Portal",
        brandCopy:
            "Access your assigned work zone, managed maids, accepted orders, completed jobs, and direct dashboard messages from one partner account.",
        partnerAccount: "Partner Account",
        workZoneAccess: "Work Zone Access",
        ordersMaids: "Orders & Maids",
        welcomePartner: "Welcome Partner",
        partnerLogin: "Partner Login",
        loginCopy: "Login to open your partner profile and daily operations.",
        emailAddress: "Email Address",
        password: "Password",
        enterPassword: "Enter password",
        show: "Show",
        hide: "Hide",
        assignedGovernorate: "Assigned Governorate",
        selectGovernorate: "Select assigned governorate",
        workZone: "Work Zone",
        selectWorkZone: "Select assigned work zone",
        rememberMe: "Remember me",
        needAccess: "Need partner access?",
        loginButton: "Login To Partner Profile",
        missing:
            "Please enter email, password, assigned governorate, and work zone.",
        invalid: "Invalid partner credentials, governorate, or work zone.",
        success: "Access granted. Opening partner workspace...",
    },
    ar: {
        languageButton: "English",
        partnerPortal: "بوابة الشريك",
        brandCopy:
            "ادخل إلى نطاق عملك والعاملات تحت إدارتك والطلبات المقبولة والمنفذة ورسائل الداشبورد من حساب شريك واحد.",
        partnerAccount: "حساب الشريك",
        workZoneAccess: "صلاحية نطاق العمل",
        ordersMaids: "الطلبات والعاملات",
        welcomePartner: "مرحبا شريكنا",
        partnerLogin: "تسجيل دخول الشريك",
        loginCopy: "سجل الدخول لفتح بروفايل الشريك وعمليات اليوم.",
        emailAddress: "البريد الإلكتروني",
        password: "كلمة المرور",
        enterPassword: "ادخل كلمة المرور",
        show: "إظهار",
        hide: "إخفاء",
        assignedGovernorate: "المحافظة المسندة",
        selectGovernorate: "اختر المحافظة المسندة",
        workZone: "نطاق العمل",
        selectWorkZone: "اختر نطاق العمل",
        rememberMe: "تذكرني",
        needAccess: "تحتاج صلاحية شريك؟",
        loginButton: "الدخول لواجهة الشريك",
        missing: "برجاء إدخال البريد وكلمة المرور والمحافظة ونطاق العمل.",
        invalid: "بيانات الشريك أو المحافظة أو نطاق العمل غير صحيحة.",
        success: "تم السماح بالدخول. جاري فتح واجهة الشريك...",
    },
};
let partnerLoginLanguage =
    localStorage.getItem("partnerWorkspaceLanguage") || "en";
function loginT(key) {
    return (
        partnerLoginTranslations[partnerLoginLanguage]?.[key] ||
        partnerLoginTranslations.en[key] ||
        key
    );
}
function applyPartnerLoginLanguage() {
    document.documentElement.lang = partnerLoginLanguage;
    document.documentElement.dir =
        partnerLoginLanguage === "ar" ? "rtl" : "ltr";
    document.body.classList.toggle("rtl", partnerLoginLanguage === "ar");
    document.querySelectorAll("[data-i18n]").forEach((node) => {
        node.textContent = loginT(node.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
        node.placeholder = loginT(node.dataset.i18nPlaceholder);
    });
    document.getElementById("partnerLanguageToggleBtn").textContent =
        loginT("languageButton");
    document.getElementById("togglePartnerPasswordBtn").textContent =
        partnerPasswordInput?.type === "text" ? loginT("hide") : loginT("show");
}
function setPartnerLoginLanguage(language) {
    partnerLoginLanguage = language === "ar" ? "ar" : "en";
    localStorage.setItem("partnerWorkspaceLanguage", partnerLoginLanguage);
    applyPartnerLoginLanguage();
}
const defaultPartner = {
    email: "partner@tarwiqa.com",
    username: "ops.mona",
    demoPassword: "Partner@2026",
    partnerId: "OP-1024",
    id: "OP-1024",
    name: "Mona Adel",
    status: "Active",
    governorate: "Cairo",
    zone: "New Cairo",
    workZones: ["New Cairo"],
    forcePasswordChange: false,
    twoFactorEnabled: false,
};
const readJson = (key, fallback) => {
    try {
        return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch (error) {
        return fallback;
    }
};
const hashPassword = async (value) =>
    Array.from(
        new Uint8Array(
            await crypto.subtle.digest(
                "SHA-256",
                new TextEncoder().encode(value),
            ),
        ),
    )
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");
const partnerLoginForm = document.getElementById("partnerLoginForm");
const partnerEmailInput = document.getElementById("partnerEmail");
const partnerPasswordInput = document.getElementById("partnerPassword");
const partnerGovernorateInput = document.getElementById("partnerGovernorate");
const partnerZoneInput = document.getElementById("partnerZone");
const rememberPartnerInput = document.getElementById("rememberPartner");
const togglePartnerPasswordBtn = document.getElementById(
    "togglePartnerPasswordBtn",
);
const partnerLoginSubmitBtn = document.getElementById("partnerLoginSubmitBtn");
const partnerLoginMessage = document.getElementById("partnerLoginMessage");
const twoFactorPanel = document.getElementById("partnerTwoFactorPanel");
const partnerOtpInput = document.getElementById("partnerOtp");
const partnerOtpHint = document.getElementById("partnerOtpHint");
let pendingPartnerLogin = null;
let pendingOtp = "";

function getPartners() {
    return [defaultPartner, ...readJson("createdPartners", [])].map(
        (partner) => ({
            ...partner,
            partnerId: partner.partnerId || partner.id,
            zone: partner.zone || partner.workZone || partner.workZones?.[0],
            workZones: partner.workZones?.length
                ? partner.workZones
                : [partner.zone || partner.workZone].filter(Boolean),
        }),
    );
}
function populateScopeOptions() {
    const partners = getPartners();
    const governorates = [
        ...new Set(partners.map((item) => item.governorate).filter(Boolean)),
    ];
    const zones = [
        ...new Set(
            partners.flatMap((item) => item.workZones || []).filter(Boolean),
        ),
    ];
    const currentGovernorate = partnerGovernorateInput.value;
    const currentZone = partnerZoneInput.value;
    partnerGovernorateInput.innerHTML =
        '<option value="" data-i18n="selectGovernorate">Select assigned governorate</option>' +
        governorates
            .map((item) => `<option value="${item}">${item}</option>`)
            .join("");
    partnerZoneInput.innerHTML =
        '<option value="" data-i18n="selectWorkZone">Select assigned work zone</option>' +
        zones
            .map((item) => `<option value="${item}">${item}</option>`)
            .join("");
    partnerGovernorateInput.value = currentGovernorate;
    partnerZoneInput.value = currentZone;
}
function setPartnerLoginMessage(message, type = "") {
    partnerLoginMessage.textContent = message;
    partnerLoginMessage.className = `form-message ${type}`.trim();
}
function loadRememberedPartner() {
    const data = readJson("tarwiqaRememberedPartner", null);
    if (!data) return;
    partnerEmailInput.value = data.email || "";
    partnerGovernorateInput.value = data.governorate || "";
    partnerZoneInput.value = data.workZone || "";
    rememberPartnerInput.checked = true;
}
function createPartnerSession(partner) {
    const session = {
        email: partner.email,
        username: partner.username,
        role: "partner",
        workspaceRole: partner.role || "viewer",
        permissions: partner.permissions || [],
        partnerId: partner.partnerId,
        name: partner.name,
        governorate: partner.governorate,
        workZone: partnerZoneInput.value,
        workZones: partner.workZones,
        forcePasswordChange: Boolean(partner.forcePasswordChange),
        twoFactorVerified: Boolean(partner.twoFactorEnabled),
        loginAt: new Date().toISOString(),
    };
    localStorage.setItem("tarwiqaPartnerSession", JSON.stringify(session));
}
async function passwordMatches(partner, password) {
    if (partner.demoPassword) return password === partner.demoPassword;
    return (
        Boolean(partner.passwordHash) &&
        (await hashPassword(password)) === partner.passwordHash
    );
}
function completeLogin(partner) {
    createPartnerSession(partner);
    const remembered = {
        email: partner.email,
        governorate: partner.governorate,
        workZone: partnerZoneInput.value,
    };
    if (rememberPartnerInput.checked)
        localStorage.setItem(
            "tarwiqaRememberedPartner",
            JSON.stringify(remembered),
        );
    else localStorage.removeItem("tarwiqaRememberedPartner");
    partnerLoginSubmitBtn.disabled = true;
    setPartnerLoginMessage(loginT("success"), "success");
    window.setTimeout(() => {
        window.location.href = partner.forcePasswordChange
            ? "./partner-change-password.html"
            : `./partner-dashboard.html?partnerId=${encodeURIComponent(partner.partnerId)}`;
    }, 450);
}

togglePartnerPasswordBtn?.addEventListener("click", () => {
    const visible = partnerPasswordInput.type === "text";
    partnerPasswordInput.type = visible ? "password" : "text";
    togglePartnerPasswordBtn.textContent = visible
        ? loginT("show")
        : loginT("hide");
});
partnerLoginForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (pendingPartnerLogin) {
        if (partnerOtpInput.value.trim() !== pendingOtp) {
            setPartnerLoginMessage("Invalid verification code.", "error");
            return;
        }
        const partner = pendingPartnerLogin;
        pendingPartnerLogin = null;
        sessionStorage.removeItem("tarwiqaPartnerOtp");
        completeLogin(partner);
        return;
    }
    const identity = partnerEmailInput.value.trim().toLowerCase(),
        password = partnerPasswordInput.value,
        governorate = partnerGovernorateInput.value,
        workZone = partnerZoneInput.value;
    if (!identity || !password || !governorate || !workZone) {
        setPartnerLoginMessage(loginT("missing"), "error");
        return;
    }
    const partner = getPartners().find((item) =>
        [item.email, item.username].some(
            (value) => String(value || "").toLowerCase() === identity,
        ),
    );
    const active =
        partner &&
        partner.status !== "Paused" &&
        partner.status !== "Offline" &&
        (!partner.accountExpiry ||
            partner.accountExpiry >= new Date().toISOString().slice(0, 10));
    const validScope =
        active &&
        partner.governorate === governorate &&
        partner.workZones.includes(workZone);
    if (!validScope || !(await passwordMatches(partner, password))) {
        setPartnerLoginMessage(loginT("invalid"), "error");
        return;
    }
    if (partner.twoFactorEnabled) {
        pendingPartnerLogin = partner;
        pendingOtp = String(Math.floor(100000 + Math.random() * 900000));
        sessionStorage.setItem("tarwiqaPartnerOtp", pendingOtp);
        twoFactorPanel.classList.remove("hidden");
        partnerOtpHint.textContent = `Prototype verification code: ${pendingOtp}`;
        partnerOtpInput.focus();
        partnerLoginSubmitBtn.querySelector("span").textContent =
            "Verify & Login";
        setPartnerLoginMessage(
            "Two-factor verification is required.",
            "success",
        );
        return;
    }
    completeLogin(partner);
});
document
    .getElementById("partnerLanguageToggleBtn")
    ?.addEventListener("click", () =>
        setPartnerLoginLanguage(partnerLoginLanguage === "en" ? "ar" : "en"),
    );
populateScopeOptions();
loadRememberedPartner();
applyPartnerLoginLanguage();
