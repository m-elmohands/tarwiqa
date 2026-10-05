const governorates = ["Cairo", "Giza", "Alexandria", "Qalyubia", "Dakahlia", "Sharqia"];
const governorateData = {
  Cairo: { orders: 184, partners: 4 },
  Giza: { orders: 76, partners: 1 },
  Alexandria: { orders: 54, partners: 2 },
  Qalyubia: { orders: 31, partners: 1 },
  Dakahlia: { orders: 42, partners: 1 },
  Sharqia: { orders: 29, partners: 1 }
};
const defaultSupporters = [
  { id: "SUP-0901", name: "Hassan Mahmoud", username: "support.hassan", password: "Support@0901", phone: "+20 100 440 1182", email: "hassan@tarwiqa.app", status: "Active", role: "editor", governorates: ["Cairo", "Giza"], canViewOrders: true, canViewPartners: true, canExportReports: true, notes: "Cairo and Giza website support lead.", createdAt: "Jun 15, 2026" },
  { id: "SUP-0902", name: "Reem Ashraf", username: "support.reem", password: "Support@0902", phone: "+20 109 221 5044", email: "reem@tarwiqa.app", status: "Active", role: "viewer", governorates: ["Alexandria"], canViewOrders: true, canViewPartners: true, canExportReports: false, notes: "Alexandria website requests and partner follow-up.", createdAt: "Jun 18, 2026" },
  { id: "SUP-0903", name: "Omar Nabil", username: "support.omar", password: "Support@0903", phone: "+20 111 703 9912", email: "omar@tarwiqa.app", status: "Paused", role: "viewer", governorates: ["Qalyubia", "Dakahlia", "Sharqia"], canViewOrders: true, canViewPartners: true, canExportReports: false, notes: "Delta region support coverage.", createdAt: "Jun 21, 2026" }
];

const q = (id) => document.getElementById(id);
let supporters = [...defaultSupporters, ...loadJson("createdSupporters", [])];
const supporterOverrides = loadJson("supporterOverrides", {});
supporters = supporters.map((supporter) => ({ ...supporter, ...(supporterOverrides[supporter.id] || {}) }));
let activeEditSupporterId = null;
let toastTimer;

function loadJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch (error) {
    return fallback;
  }
}

function scopeTotals(supporter) {
  return supporter.governorates.reduce((total, governorate) => {
    const data = governorateData[governorate] || { orders: 0, partners: 0 };
    total.orders += supporter.canViewOrders ? data.orders : 0;
    total.partners += supporter.canViewPartners ? data.partners : 0;
    return total;
  }, { orders: 0, partners: 0 });
}

function filteredSupporters() {
  const query = q("supporterSearch").value.trim().toLowerCase();
  const governorate = q("governorateFilter").value;
  const status = q("statusFilter").value;
  return supporters.filter((supporter) => {
    const searchable = `${supporter.name} ${supporter.username} ${supporter.governorates.join(" ")}`.toLowerCase();
    return searchable.includes(query)
      && (governorate === "all" || supporter.governorates.includes(governorate))
      && (status === "all" || supporter.status === status);
  });
}

function showToast(message) {
  q("supportersToast").textContent = message;
  q("supportersToast").classList.remove("hidden");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => q("supportersToast").classList.add("hidden"), 2800);
}

function renderMetrics() {
  q("totalSupporters").textContent = supporters.length;
  q("activeSupporters").textContent = supporters.filter((supporter) => supporter.status === "Active").length;
  q("coveredGovernorates").textContent = new Set(supporters.flatMap((supporter) => supporter.governorates)).size;
  q("scopedOrders").textContent = supporters.reduce((sum, supporter) => sum + scopeTotals(supporter).orders, 0);
}

function renderTable() {
  const rows = filteredSupporters();
  q("supportersTableBody").innerHTML = rows.length ? rows.map((supporter) => {
    const totals = scopeTotals(supporter);
    return `
      <tr>
        <td><div class="name-cell"><strong>${supporter.name}</strong><small>${supporter.username} / ${supporter.id}</small></div></td>
        <td><span class="status-pill ${supporter.status.toLowerCase()}">${supporter.status}</span></td>
        <td><div class="governorates">${supporter.governorates.map((item) => `<span class="scope-pill">${item}</span>`).join("")}</div></td>
        <td>${supporter.canViewOrders ? "Allowed" : "Blocked"}</td>
        <td>${supporter.canViewPartners ? "Allowed" : "Blocked"}</td>
        <td><strong>${totals.orders}</strong></td>
        <td><strong>${totals.partners}</strong></td>
        <td><div class="row-actions"><button class="row-btn view" type="button" data-view-supporter="${supporter.id}">View</button><button class="row-btn edit" type="button" data-edit-supporter="${supporter.id}">Edit</button><button class="row-btn edit" type="button" data-toggle-supporter="${supporter.id}">${supporter.status === "Active" ? "Pause" : "Activate"}</button></div></td>
      </tr>
    `;
  }).join("") : '<tr><td colspan="9">No supporters match the selected filters.</td></tr>';
}

function openDetails(id) {
  window.location.href = `../supporter/supporter-profile.html?supporterId=${encodeURIComponent(id)}`;
}
function openEditSupporter(id) {
  const supporter = supporters.find((item) => item.id === id);
  if (!supporter) return;
  activeEditSupporterId = id;
  q("editSupporterTitle").textContent = `Edit ${supporter.name}`;
  q("editSupporterName").value = supporter.name;
  q("editSupporterUsername").value = supporter.username;
  q("editSupporterPassword").value = supporter.password || "";
  q("editSupporterPassword").type = "password";
  q("toggleEditSupporterPassword").textContent = "Show";
  q("toggleEditSupporterPassword").setAttribute("aria-pressed", "false");
  q("editSupporterStatus").value = supporter.status;
  q("editSupporterPhone").value = supporter.phone;
  q("editSupporterEmail").value = supporter.email;
  q("editSupporterNotes").value = supporter.notes || "";
  q("editSupporterModal").classList.remove("hidden");
  q("editSupporterModal").setAttribute("aria-hidden", "false");
}

function closeEditSupporter() {
  q("editSupporterModal").classList.add("hidden");
  q("editSupporterModal").setAttribute("aria-hidden", "true");
  activeEditSupporterId = null;
}

function toggleEditPassword() {
  const input = q("editSupporterPassword");
  const show = input.type === "password";
  input.type = show ? "text" : "password";
  q("toggleEditSupporterPassword").textContent = show ? "Hide" : "Show";
  q("toggleEditSupporterPassword").setAttribute("aria-pressed", String(show));
  input.focus();
}

function saveSupporterEdit() {
  if (!q("editSupporterForm").reportValidity() || !activeEditSupporterId) return;
  const supporter = supporters.find((item) => item.id === activeEditSupporterId);
  if (!supporter) return;
  supporter.name = q("editSupporterName").value.trim();
  supporter.username = q("editSupporterUsername").value.trim();
  supporter.password = q("editSupporterPassword").value;
  supporter.status = q("editSupporterStatus").value;
  supporter.phone = q("editSupporterPhone").value.trim();
  supporter.email = q("editSupporterEmail").value.trim();
  supporter.notes = q("editSupporterNotes").value.trim();

  const overrides = loadJson("supporterOverrides", {});
  overrides[supporter.id] = supporter;
  localStorage.setItem("supporterOverrides", JSON.stringify(overrides));
  const created = loadJson("createdSupporters", []);
  const createdIndex = created.findIndex((item) => item.id === supporter.id);
  if (createdIndex >= 0) {
    created[createdIndex] = supporter;
    localStorage.setItem("createdSupporters", JSON.stringify(created));
  }
  closeEditSupporter();
  renderMetrics();
  renderTable();
  showToast(`${supporter.name} account and password saved.`);
}

function toggleStatus(id) {
  const supporter = supporters.find((item) => item.id === id);
  if (!supporter) return;
  supporter.status = supporter.status === "Active" ? "Paused" : "Active";
  const createdIds = new Set(loadJson("createdSupporters", []).map((item) => item.id));
  localStorage.setItem("createdSupporters", JSON.stringify(supporters.filter((item) => createdIds.has(item.id))));
  renderMetrics();
  renderTable();
  showToast(`${supporter.name} is now ${supporter.status}.`);
}

q("governorateFilter").innerHTML += governorates.map((item) => `<option>${item}</option>`).join("");
q("supporterSearch").addEventListener("input", renderTable);
q("governorateFilter").addEventListener("change", renderTable);
q("statusFilter").addEventListener("change", renderTable);
q("supportersTableBody").addEventListener("click", (event) => {
  const view = event.target.closest("[data-view-supporter]");
  if (view) return openDetails(view.dataset.viewSupporter);
  const edit = event.target.closest("[data-edit-supporter]");
  if (edit) return openEditSupporter(edit.dataset.editSupporter);
  const toggle = event.target.closest("[data-toggle-supporter]");
  if (toggle) toggleStatus(toggle.dataset.toggleSupporter);
});
q("toggleEditSupporterPassword").addEventListener("click", toggleEditPassword);
q("saveEditSupporter").addEventListener("click", saveSupporterEdit);
q("closeEditSupporterModal").addEventListener("click", closeEditSupporter);
q("cancelEditSupporter").addEventListener("click", closeEditSupporter);
q("editSupporterModal").addEventListener("click", (event) => {
  if (event.target === q("editSupporterModal")) closeEditSupporter();
});
q("closeSupporterModal").addEventListener("click", () => q("supporterModal").classList.add("hidden"));
q("supporterModal").addEventListener("click", (event) => {
  if (event.target === q("supporterModal")) q("supporterModal").classList.add("hidden");
});
renderMetrics();
renderTable();





