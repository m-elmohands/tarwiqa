const supporterCredentials = {
    email: "hassan@tarwiqa.app",
    username: "support.hassan",
    password: "Support@0901",
    supporterId: "SUP-0901",
    name: "Hassan Mahmoud",
    role: "editor",
    governorates: ["Cairo", "Giza"],
};

const supporterLoginForm = document.getElementById("supporterLoginForm");
const supporterEmailInput = document.getElementById("supporterEmail");
const supporterPasswordInput = document.getElementById("supporterPassword");
const rememberSupporterInput = document.getElementById("rememberSupporter");
const toggleSupporterPasswordBtn = document.getElementById(
    "toggleSupporterPasswordBtn",
);
const supporterLoginSubmitBtn = document.getElementById(
    "supporterLoginSubmitBtn",
);
const supporterLoginMessage = document.getElementById("supporterLoginMessage");

function setSupporterLoginMessage(message, type = "") {
    supporterLoginMessage.textContent = message;
    supporterLoginMessage.className = `form-message ${type}`.trim();
}

function loadRememberedSupporter() {
    const remembered = localStorage.getItem("tarwiqaRememberedSupporter");
    if (!remembered) return;

    try {
        const data = JSON.parse(remembered);
        supporterEmailInput.value = data.email || "";
        rememberSupporterInput.checked = true;
    } catch (error) {
        localStorage.removeItem("tarwiqaRememberedSupporter");
    }
}

function createSupporterSession() {
    const session = {
        email: supporterCredentials.email,
        username: supporterCredentials.username,
        role: "supporter",
        supporterRole: supporterCredentials.role,
        supporterId: supporterCredentials.supporterId,
        name: supporterCredentials.name,
        governorates: supporterCredentials.governorates,
        loginAt: new Date().toISOString(),
    };
    localStorage.setItem("tarwiqaSupporterSession", JSON.stringify(session));
}

toggleSupporterPasswordBtn?.addEventListener("click", () => {
    const isPasswordVisible = supporterPasswordInput.type === "text";
    supporterPasswordInput.type = isPasswordVisible ? "password" : "text";
    toggleSupporterPasswordBtn.textContent = isPasswordVisible
        ? "Show"
        : "Hide";
});

supporterLoginForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const loginName = supporterEmailInput.value.trim().toLowerCase();
    const password = supporterPasswordInput.value;

    if (!loginName || !password) {
        setSupporterLoginMessage(
            "Please enter username and password.",
            "error",
        );
        return;
    }

    const validCredentials =
        (loginName === supporterCredentials.email ||
            loginName === supporterCredentials.username) &&
        password === supporterCredentials.password;

    if (!validCredentials) {
        setSupporterLoginMessage(
            "Invalid supporter username or password.",
            "error",
        );
        return;
    }

    supporterLoginSubmitBtn.disabled = true;
    setSupporterLoginMessage(
        "Access granted. Opening supporter workspace...",
        "success",
    );
    createSupporterSession();

    if (rememberSupporterInput.checked) {
        localStorage.setItem(
            "tarwiqaRememberedSupporter",
            JSON.stringify({ email: loginName }),
        );
    } else {
        localStorage.removeItem("tarwiqaRememberedSupporter");
    }

    window.setTimeout(() => {
        window.location.href = `./supporter-dashboard.html?supporterId=${encodeURIComponent(supporterCredentials.supporterId)}`;
    }, 450);
});

loadRememberedSupporter();
