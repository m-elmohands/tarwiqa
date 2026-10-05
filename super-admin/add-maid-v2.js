const operators = [
  { id: "OP-1024", name: "Mona Adel", username: "ops.mona", zone: "New Cairo" },
  { id: "OP-1031", name: "Karim Samir", username: "ops.karim", zone: "Nasr City" },
  { id: "OP-1042", name: "Nour Hassan", username: "ops.nour", zone: "Maadi" },
  { id: "OP-1057", name: "Ahmed Fathy", username: "ops.ahmed", zone: "October" },
  { id: "OP-1073", name: "Salma Youssef", username: "ops.salma", zone: "Heliopolis" }
];

const q = (id) => document.getElementById(id);
const form = q("addMaidForm");
const fields = {
  id: q("maidIdInput"),
  name: q("nameInput"),
  phone: q("phoneInput"),
  startDate: q("startDateInput"),
  age: q("ageInput"),
  address: q("addressInput"),
  notes: q("notesInput"),
  personalId: q("personalIdInput"),
  salary: q("salaryInput")
};
let toastTimer;

function loadJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch (error) {
    return fallback;
  }
}

function getNextMaidId() {
  const created = loadJson("createdMaids", []);
  return `MD-${String(1421 + created.length).padStart(4, "0")}`;
}

function getPartner() {
  return operators.find((operator) => operator.id === q("operatorInput").value) || operators[0];
}

function getInitials(value) {
  return value.trim().split(/\s+/).filter(Boolean).slice(0, 2).map((word) => word[0].toUpperCase()).join("") || "NM";
}

function showToast(message) {
  const toast = q("addMaidToast");
  toast.textContent = message;
  toast.classList.remove("hidden");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.add("hidden"), 2800);
}

function updateSyncedFields() {
  const operator = getPartner();
  q("statusPreview").textContent = q("statusInput").value;
  q("genderPreview").textContent = q("genderInput").value;
  q("offDayPreview").textContent = q("offDayInput").value;
  q("operatorPreview").textContent = operator.name;
  q("statusReadonlyInput").value = q("statusInput").value;
  q("genderReadonlyInput").value = q("genderInput").value;
  q("offDayReadonlyInput").value = q("offDayInput").value;
  q("operatorReadonlyInput").value = `${operator.name} (${operator.username}) - ${operator.zone}`;
}

function updateCompletion() {
  const required = form.querySelectorAll("[data-required='true']");
  const completed = Array.from(required).filter((field) => String(field.value).trim()).length;
  q("completionScore").textContent = `${Math.round((completed / required.length) * 100)}%`;
}

function updateNamePreview() {
  const name = fields.name.value.trim();
  q("maidDisplayName").textContent = name || "New Maid";
  q("avatarPreview").textContent = getInitials(name);
}

function updateFilesPreview() {
  const files = Array.from(q("attachmentInput").files || []);
  q("selectedFilesPreview").textContent = files.length
    ? files.map((file) => file.name).join(", ")
    : "No files selected";
}

function collectMaid() {
  const operator = getPartner();
  return {
    id: fields.id.value,
    name: fields.name.value.trim(),
    phone: fields.phone.value.trim(),
    status: q("statusInput").value.toLowerCase(),
    startDate: fields.startDate.value,
    age: Math.max(18, Number(fields.age.value) || 18),
    address: fields.address.value.trim(),
    offDay: q("offDayInput").value,
    operatorId: operator.id,
    salary: Math.max(0, Number(fields.salary.value) || 0),
    doneOrders: 0,
    personalId: fields.personalId.value.trim(),
    gender: q("genderInput").value,
    attachment: q("attachmentInput").files.length ? "Ready" : "Pending",
    notes: fields.notes.value.trim()
  };
}

function validateMaid() {
  if (!form.reportValidity()) return false;
  if (fields.personalId.value.trim().length !== 14) {
    showToast("Personal ID must contain 14 digits.");
    fields.personalId.focus();
    return false;
  }
  if (Number(fields.salary.value) < 0) {
    showToast("Salary cannot be negative.");
    fields.salary.focus();
    return false;
  }
  return true;
}

function readFile(file) {
  if (file.size > 2 * 1024 * 1024) {
    return Promise.resolve("");
  }
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => resolve("");
    reader.readAsDataURL(file);
  });
}

async function saveMaidDocuments(maidId) {
  const files = Array.from(q("attachmentInput").files || []);
  const uploadedAt = new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });
  const documents = await Promise.all(files.map(async (file, index) => ({
    id: `${maidId}-${Date.now()}-${index}`,
    name: file.name,
    type: q("documentTypeInput").value,
    size: file.size < 1048576 ? `${(file.size / 1024).toFixed(1)} KB` : `${(file.size / 1048576).toFixed(1)} MB`,
    uploadedAt,
    status: "Ready",
    previewUrl: await readFile(file),
    mimeType: file.type
  })));
  localStorage.setItem(`maidDocuments:${maidId}`, JSON.stringify(documents));
}

function saveDraft() {
  localStorage.setItem("addMaidDraft", JSON.stringify(collectMaid()));
  showToast("Maid draft saved.");
}

async function createMaid() {
  if (!validateMaid()) return;
  const maid = collectMaid();
  const createdMaids = loadJson("createdMaids", []);
  createdMaids.push(maid);
  localStorage.setItem("createdMaids", JSON.stringify(createdMaids));

  const overrides = loadJson("maidProfileOverrides", {});
  overrides[maid.id] = maid;
  localStorage.setItem("maidProfileOverrides", JSON.stringify(overrides));
  await saveMaidDocuments(maid.id);
  localStorage.removeItem("addMaidDraft");
  showToast(`${maid.name} created successfully.`);
  setTimeout(() => {
    window.location.href = `../partner/maid-details.html?maidId=${encodeURIComponent(maid.id)}`;
  }, 650);
}

function resetForm() {
  form.reset();
  q("statusInput").value = "Active";
  q("genderInput").value = "Female";
  q("offDayInput").value = "Friday";
  q("operatorInput").value = operators[0].id;
  fields.id.value = getNextMaidId();
  fields.startDate.value = new Date().toISOString().slice(0, 10);
  q("startDatePreview").textContent = fields.startDate.value;
  q("selectedFilesPreview").textContent = "No files selected";
  updateNamePreview();
  updateSyncedFields();
  updateCompletion();
  localStorage.removeItem("addMaidDraft");
  showToast("Add Maid form reset.");
}

q("operatorInput").innerHTML = operators.map((operator) => `<option value="${operator.id}">${operator.name} - ${operator.zone}</option>`).join("");
fields.id.value = getNextMaidId();
fields.startDate.value = new Date().toISOString().slice(0, 10);
q("startDatePreview").textContent = fields.startDate.value;

fields.name.addEventListener("input", () => {
  updateNamePreview();
  updateCompletion();
});
form.querySelectorAll("[data-required='true']").forEach((field) => {
  field.addEventListener("input", updateCompletion);
});
["statusInput", "genderInput", "offDayInput", "operatorInput"].forEach((id) => {
  q(id).addEventListener("change", updateSyncedFields);
});
fields.startDate.addEventListener("input", () => {
  q("startDatePreview").textContent = fields.startDate.value || "-";
  updateCompletion();
});
q("attachmentInput").addEventListener("change", updateFilesPreview);
q("saveDraftBtn").addEventListener("click", saveDraft);
q("createMaidBtn").addEventListener("click", createMaid);
q("resetFormBtn").addEventListener("click", resetForm);

updateNamePreview();
updateSyncedFields();
updateCompletion();

