const addMaidForm = document.getElementById("addMaidForm");
const nameInput = document.getElementById("nameInput");
const maidDisplayName = document.getElementById("maidDisplayName");
const avatarPreview = document.getElementById("avatarPreview");
const statusInput = document.getElementById("statusInput");
const statusPreview = document.getElementById("statusPreview");
const genderInput = document.getElementById("genderInput");
const genderPreview = document.getElementById("genderPreview");
const offDayInput = document.getElementById("offDayInput");
const offDayPreview = document.getElementById("offDayPreview");
const operatorInput = document.getElementById("operatorInput");
const operatorPreview = document.getElementById("operatorPreview");
const operatorReadonlyInput = document.getElementById("operatorReadonlyInput");
const startDateInput = document.getElementById("startDateInput");
const startDatePreview = document.getElementById("startDatePreview");
const completionScore = document.getElementById("completionScore");
const resetFormBtn = document.getElementById("resetFormBtn");

const operators = [
  { id: "OP-1024", name: "Mona Adel", username: "ops.mona", zone: "New Cairo" },
  { id: "OP-1031", name: "Karim Samir", username: "ops.karim", zone: "Nasr City" },
  { id: "OP-1042", name: "Nour Hassan", username: "ops.nour", zone: "Maadi" },
  { id: "OP-1057", name: "Ahmed Fathy", username: "ops.ahmed", zone: "October" },
  { id: "OP-1073", name: "Salma Youssef", username: "ops.salma", zone: "Heliopolis" }
];

function getInitials(value) {
  const words = value.trim().split(/\s+/).filter(Boolean).slice(0, 2);
  if (!words.length) return "NM";
  return words.map((word) => word[0].toUpperCase()).join("");
}

function getSelectedPartner() {
  return operators.find((operator) => operator.id === operatorInput.value) || operators[0];
}

function getPartnerLabel(operator) {
  return `${operator.name} / ${operator.zone}`;
}

function renderPartnerOptions() {
  operatorInput.innerHTML = operators
    .map((operator) => `<option value="${operator.id}">${operator.name} - ${operator.zone}</option>`)
    .join("");
}

function updatePartnerPreview() {
  const operator = getSelectedPartner();
  operatorPreview.textContent = operator.name;
  operatorReadonlyInput.value = `${operator.name} (${operator.username}) - ${operator.zone}`;
}

function updateCompletion() {
  const requiredFields = addMaidForm.querySelectorAll("[data-required='true']");
  const filledCount = Array.from(requiredFields).filter((field) => field.value.trim() !== "").length;
  const percent = Math.round((filledCount / requiredFields.length) * 100);
  completionScore.textContent = `${percent}%`;
}

nameInput.addEventListener("input", (event) => {
  const value = event.target.value.trim();
  maidDisplayName.textContent = value || "New Maid";
  avatarPreview.textContent = getInitials(value);
  updateCompletion();
});
statusInput.addEventListener("change", (event) => { statusPreview.textContent = event.target.value; });
genderInput.addEventListener("change", (event) => { genderPreview.textContent = event.target.value; });
offDayInput.addEventListener("change", (event) => { offDayPreview.textContent = event.target.value; });
operatorInput.addEventListener("change", updatePartnerPreview);
startDateInput.addEventListener("input", (event) => {
  startDatePreview.textContent = event.target.value || "2026-04-23";
  updateCompletion();
});
addMaidForm.querySelectorAll("input[data-required='true']").forEach((field) => {
  field.addEventListener("input", updateCompletion);
});
resetFormBtn.addEventListener("click", () => {
  addMaidForm.reset();
  maidDisplayName.textContent = "New Maid";
  avatarPreview.textContent = "NM";
  statusInput.value = "Active";
  genderInput.value = "Female";
  offDayInput.value = "Friday";
  operatorInput.value = operators[0].id;
  statusPreview.textContent = "Active";
  genderPreview.textContent = "Female";
  offDayPreview.textContent = "Friday";
  updatePartnerPreview();
  startDateInput.value = "2026-04-23";
  startDatePreview.textContent = "2026-04-23";
  updateCompletion();
});

renderPartnerOptions();
updatePartnerPreview();
updateCompletion();


