const tabButtons = document.querySelectorAll(".tab-btn");
const tabPanels = document.querySelectorAll(".tab-panel");
const quickLinks = document.querySelectorAll(".mini-link");
const nameInput = document.getElementById("nameInput");
const userDisplayName = document.getElementById("userDisplayName");
const avatarPreview = document.getElementById("avatarPreview");
const screenshotPermissionToggle = document.getElementById("screenshotPermissionToggle");
const cityInput = document.getElementById("cityInput");
const cityPreview = document.getElementById("cityPreview");
const typeInput = document.getElementById("typeInput");
const typePreview = document.getElementById("typePreview");
const platformInput = document.getElementById("platformInput");
const platformPreview = document.getElementById("platformPreview");
const walletInput = document.getElementById("walletInput");
const walletPreview = document.getElementById("walletPreview");
const completionScore = document.getElementById("completionScore");
const activeState = document.getElementById("activeState");
const statusPreview = document.getElementById("statusPreview");
const messageNamePreview = document.getElementById("messageNamePreview");
const resetFormBtn = document.getElementById("resetFormBtn");
const addUserForm = document.getElementById("addUserForm");

function setActiveTab(targetId) {
  tabButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === targetId);
  });

  quickLinks.forEach((button) => {
    button.classList.toggle("active", button.dataset.tabTarget === targetId);
  });

  tabPanels.forEach((panel) => {
    panel.classList.toggle("active", panel.id === targetId);
  });
}

function getInitials(value) {
  const words = value
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2);

  if (!words.length) {
    return "NU";
  }

  return words.map((word) => word[0].toUpperCase()).join("");
}

function updateCompletion() {
  const requiredFields = addUserForm.querySelectorAll("[data-required='true']");
  const filledCount = Array.from(requiredFields).filter((field) => field.value.trim() !== "").length;
  const percent = Math.round((filledCount / requiredFields.length) * 100);
  completionScore.textContent = `${percent}%`;
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => setActiveTab(button.dataset.tab));
});

quickLinks.forEach((button) => {
  button.addEventListener("click", () => setActiveTab(button.dataset.tabTarget));
});

nameInput.addEventListener("input", (event) => {
  const value = event.target.value.trim();
  userDisplayName.textContent = value || "New User";
  avatarPreview.textContent = getInitials(value);
  messageNamePreview.textContent = value || "there";
  updateCompletion();
});

cityInput.addEventListener("input", (event) => {
  cityPreview.textContent = event.target.value.trim() || "Cairo, Egypt";
  updateCompletion();
});

typeInput.addEventListener("change", (event) => {
  typePreview.textContent = event.target.value;
});

platformInput.addEventListener("change", (event) => {
  platformPreview.textContent = event.target.value;
});

walletInput.addEventListener("input", (event) => {
  walletPreview.textContent = event.target.value.trim() || "EGP 0.00";
});

activeState.addEventListener("change", (event) => {
  statusPreview.textContent = event.target.value;
});

addUserForm.querySelectorAll("input[data-required='true']").forEach((field) => {
  field.addEventListener("input", updateCompletion);
});

if (screenshotPermissionToggle) {
  screenshotPermissionToggle.addEventListener("click", () => {
    const isAllowed = screenshotPermissionToggle.classList.contains("allowed");

    screenshotPermissionToggle.classList.toggle("allowed", !isAllowed);
    screenshotPermissionToggle.classList.toggle("blocked", isAllowed);
    screenshotPermissionToggle.setAttribute("aria-pressed", String(!isAllowed));
    screenshotPermissionToggle.textContent = isAllowed
      ? "Screenshot Blocked"
      : "Screenshot Allowed";
  });
}

resetFormBtn.addEventListener("click", () => {
  addUserForm.reset();
  nameInput.value = "";
  cityInput.value = "Cairo";
  walletInput.value = "EGP 0.00";
  typeInput.value = "Retail Customer";
  platformInput.value = "Mobile App";
  activeState.value = "Enabled";
  userDisplayName.textContent = "New User";
  avatarPreview.textContent = "NU";
  cityPreview.textContent = "Cairo, Egypt";
  typePreview.textContent = "Retail Customer";
  platformPreview.textContent = "Mobile App";
  walletPreview.textContent = "EGP 0.00";
  statusPreview.textContent = "Enabled";
  messageNamePreview.textContent = "there";
  updateCompletion();
});

updateCompletion();
