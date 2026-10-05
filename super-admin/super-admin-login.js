const superAdminCredentials = {
  email: "superadmin@tarwiqa.com",
  password: "Super@2026"
};

const loginForm = document.getElementById("superAdminLoginForm");
const emailInput = document.getElementById("adminEmail");
const passwordInput = document.getElementById("adminPassword");
const rememberInput = document.getElementById("rememberAdmin");
const togglePasswordBtn = document.getElementById("togglePasswordBtn");
const loginSubmitBtn = document.getElementById("loginSubmitBtn");
const loginMessage = document.getElementById("loginMessage");

function setLoginMessage(message, type = "") {
  loginMessage.textContent = message;
  loginMessage.className = `form-message ${type}`.trim();
}

function setRememberedEmail() {
  const rememberedEmail = localStorage.getItem("tarwiqaRememberedSuperAdmin");
  if (rememberedEmail) {
    emailInput.value = rememberedEmail;
    rememberInput.checked = true;
  }
}

function createSuperAdminSession(email) {
  const session = {
    email,
    role: "super-admin",
    loginAt: new Date().toISOString()
  };
  localStorage.setItem("tarwiqaSuperAdminSession", JSON.stringify(session));
}

togglePasswordBtn?.addEventListener("click", () => {
  const isPasswordVisible = passwordInput.type === "text";
  passwordInput.type = isPasswordVisible ? "password" : "text";
  togglePasswordBtn.textContent = isPasswordVisible ? "Show" : "Hide";
});

loginForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = emailInput.value.trim().toLowerCase();
  const password = passwordInput.value;

  if (!email || !password) {
    setLoginMessage("Please enter email and password.", "error");
    return;
  }

  if (email !== superAdminCredentials.email || password !== superAdminCredentials.password) {
    setLoginMessage("Invalid super admin credentials.", "error");
    return;
  }

  loginSubmitBtn.disabled = true;
  setLoginMessage("Access granted. Opening dashboard...", "success");
  createSuperAdminSession(email);

  if (rememberInput.checked) {
    localStorage.setItem("tarwiqaRememberedSuperAdmin", email);
  } else {
    localStorage.removeItem("tarwiqaRememberedSuperAdmin");
  }

  window.setTimeout(() => {
    window.location.href = "./admin-dashboard.html";
  }, 450);
});

setRememberedEmail();
