const session = (() => {
    try {
        return JSON.parse(localStorage.getItem("tarwiqaPartnerSession"));
    } catch {
        return null;
    }
})();
if (!session?.partnerId) location.href = "./partner-login.html";
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
document.querySelectorAll("[data-toggle]").forEach(
    (button) =>
        (button.onclick = () => {
            const input = document.getElementById(button.dataset.toggle),
                show = input.type === "password";
            input.type = show ? "text" : "password";
            button.textContent = show ? "Hide" : "Show";
        }),
);
document.getElementById("changePasswordForm").onsubmit = async (event) => {
    event.preventDefault();
    const password = document.getElementById("newPassword").value,
        confirm = document.getElementById("confirmPassword").value,
        message = document.getElementById("changePasswordMessage");
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
        message.textContent =
            "Use at least 8 characters with uppercase, lowercase, and a number.";
        message.className = "form-message error";
        return;
    }
    if (password !== confirm) {
        message.textContent = "Password confirmation does not match.";
        message.className = "form-message error";
        return;
    }
    const partners = JSON.parse(
            localStorage.getItem("createdPartners") || "[]",
        ),
        index = partners.findIndex((item) => item.id === session.partnerId);
    if (index < 0) {
        message.textContent = "Partner account was not found.";
        message.className = "form-message error";
        return;
    }
    partners[index].passwordHash = await hashPassword(password);
    partners[index].forcePasswordChange = false;
    partners[index].passwordChangedAt = new Date().toISOString();
    localStorage.setItem("createdPartners", JSON.stringify(partners));
    session.forcePasswordChange = false;
    localStorage.setItem("tarwiqaPartnerSession", JSON.stringify(session));
    message.textContent = "Password updated. Opening workspace...";
    message.className = "form-message success";
    setTimeout(
        () =>
            (location.href =
                "./partner-dashboard.html?partnerId=" +
                encodeURIComponent(session.partnerId)),
        400,
    );
};
