const governorates = ["Cairo", "Giza", "Alexandria", "Qalyubia", "Dakahlia", "Sharqia"];
const q = (id) => document.getElementById(id);
let toastTimer;

function loadJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch (error) {
    return fallback;
  }
}

function selectedGovernorates() {
  return Array.from(document.querySelectorAll("[data-governorate]:checked")).map((input) => input.value);
}

function showToast(message) {
  q("supporterToast").textContent = message;
  q("supporterToast").classList.remove("hidden");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => q("supporterToast").classList.add("hidden"), 2800);
}

function updatePreview() {
  const selected = selectedGovernorates();
  q("previewName").textContent = q("supporterName").value.trim() || "New Supporter";
  q("previewStatus").textContent = q("supporterStatus").value;
  q("previewGovernorates").textContent = selected.length ? selected.join(", ") : "None selected";
  q("previewOrders").textContent = q("canViewOrders").checked ? "Allowed" : "Blocked";
  q("previewPartners").textContent = q("canViewPartners").checked ? "Allowed" : "Blocked";
}

function resetForm() {
  q("supporterForm").reset();
  q("canViewOrders").checked = true;
  q("canViewPartners").checked = true;
  updatePreview();
  showToast("Supporter form reset.");
}

function createSupporter() {
  if (!q("supporterForm").reportValidity()) return;
  const assignedGovernorates = selectedGovernorates();
  if (!assignedGovernorates.length) {
    showToast("Select at least one governorate.");
    return;
  }

  const current = loadJson("createdSupporters", []);
  const supporter = {
    id: `SUP-${String(1001 + current.length).padStart(4, "0")}`,
    name: q("supporterName").value.trim(),
    username: q("supporterUsername").value.trim(),
    password: q("supporterPassword").value,
    phone: q("supporterPhone").value.trim(),
    email: q("supporterEmail").value.trim(),
    status: q("supporterStatus").value,
    governorates: assignedGovernorates,
    canViewOrders: q("canViewOrders").checked,
    canViewPartners: q("canViewPartners").checked,
    canExportReports: q("canExportReports").checked,
    notes: q("supporterNotes").value.trim(),
    createdAt: new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })
  };
  current.push(supporter);
  localStorage.setItem("createdSupporters", JSON.stringify(current));
  showToast(`${supporter.name} created successfully.`);
  setTimeout(() => { location.href = "./supporters-list.html"; }, 650);
}

q("governorateGrid").innerHTML = governorates.map((governorate) => `
  <label class="check-card">
    <input type="checkbox" value="${governorate}" data-governorate />
    <div><strong>${governorate}</strong><small>Orders and partners access</small></div>
  </label>
`).join("");

q("supporterForm").addEventListener("input", updatePreview);
q("supporterForm").addEventListener("change", updatePreview);
q("createSupporterBtn").addEventListener("click", createSupporter);
q("resetSupporterBtn").addEventListener("click", resetForm);
updatePreview();
