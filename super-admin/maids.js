const ordersDropdownBtn = document.getElementById("ordersDropdownBtn");
const ordersDropdownContainer = ordersDropdownBtn?.closest(".dropdown-block");
const maidsTableBody = document.getElementById("maidsTableBody");
const maidSearchInput = document.getElementById("maidSearchInput");
const statusFilter = document.getElementById("statusFilter");
const operatorFilter = document.getElementById("operatorFilter");
const exportMaidsBtn = document.getElementById("exportMaidsBtn");
const maidModal = document.getElementById("maidModal");
const maidModalTitle = document.getElementById("maidModalTitle");
const maidModalSubtitle = document.getElementById("maidModalSubtitle");
const maidModalContent = document.getElementById("maidModalContent");
const closeMaidModalBtn = document.getElementById("closeMaidModalBtn");
const closeMaidModalFooterBtn = document.getElementById("closeMaidModalFooterBtn");
const maidToast = document.getElementById("maidToast");
const maidToastText = document.getElementById("maidToastText");

const operators = [
  { id: "OP-1024", name: "Mona Adel", username: "ops.mona", zone: "New Cairo" },
  { id: "OP-1031", name: "Karim Samir", username: "ops.karim", zone: "Nasr City" },
  { id: "OP-1042", name: "Nour Hassan", username: "ops.nour", zone: "Maadi" },
  { id: "OP-1057", name: "Ahmed Fathy", username: "ops.ahmed", zone: "October" },
  { id: "OP-1073", name: "Salma Youssef", username: "ops.salma", zone: "Heliopolis" }
];

const maids = [
  { id: "MD-1042", name: "Amina Mostafa", phone: "+20 100 445 2211", status: "active", startDate: "2024-01-14", age: 29, address: "Nasr City, Cairo", offDay: "Friday", operatorId: "OP-1031", salary: 8500, doneOrders: 248, personalId: "29803121500412", gender: "Female", attachment: "Ready", notes: "Top performer in recurring home cleaning bookings." },
  { id: "MD-1098", name: "Hoda Ali", phone: "+20 109 782 4451", status: "active", startDate: "2023-09-22", age: 33, address: "Dokki, Giza", offDay: "Monday", operatorId: "OP-1024", salary: 9200, doneOrders: 231, personalId: "29311241500764", gender: "Female", attachment: "Ready", notes: "Currently assigned to premium package orders." },
  { id: "MD-1121", name: "Salwa Nabil", phone: "+20 111 660 8842", status: "paused", startDate: "2024-03-03", age: 27, address: "Smouha, Alexandria", offDay: "Sunday", operatorId: "OP-1073", salary: 7800, doneOrders: 225, personalId: "29707031500981", gender: "Female", attachment: "Pending", notes: "Waiting for renewed police clearance attachment." },
  { id: "MD-1186", name: "Amal Fathy", phone: "+20 122 311 5560", status: "active", startDate: "2022-11-09", age: 36, address: "Mokattam, Cairo", offDay: "Thursday", operatorId: "OP-1042", salary: 10500, doneOrders: 214, personalId: "29006081500193", gender: "Female", attachment: "Ready", notes: "Excellent customer ratings and low cancellation rate." },
  { id: "MD-1214", name: "Dina Kamal", phone: "+20 128 740 0035", status: "expired", startDate: "2021-08-18", age: 31, address: "6th of October, Giza", offDay: "Tuesday", operatorId: "OP-1057", salary: 8000, doneOrders: 193, personalId: "29512121500872", gender: "Female", attachment: "Ready", notes: "Temporarily inactive pending reactivation interview." }
];

try {
  const legacyStatusMap = { available: "active", busy: "active", off: "paused", inactive: "expired" };
  const profileOverrides = JSON.parse(localStorage.getItem("maidProfileOverrides")) || {};
  const createdMaids = JSON.parse(localStorage.getItem("createdMaids")) || [];
  createdMaids.forEach((maid) => {
    if (!maids.some((item) => item.id === maid.id)) maids.push(maid);
  });
  maids.forEach((maid) => {
    if (profileOverrides[maid.id]) {
      Object.assign(maid, profileOverrides[maid.id]);
    }
    maid.status = legacyStatusMap[maid.status] || maid.status;
  });
} catch (error) {
  // Keep default maid records when saved data is unavailable.
}

let toastTimeoutId = null;

function showToast(message) {
  maidToastText.textContent = message;
  maidToast.classList.remove("hidden");

  if (toastTimeoutId) {
    window.clearTimeout(toastTimeoutId);
  }

  toastTimeoutId = window.setTimeout(() => {
    maidToast.classList.add("hidden");
  }, 3000);
}

function openModal(title, subtitle, content) {
  maidModalTitle.textContent = title;
  maidModalSubtitle.textContent = subtitle;
  maidModalContent.innerHTML = content;
  maidModal.classList.remove("hidden");
}

function closeModal() {
  maidModal.classList.add("hidden");
}

function getMaidById(maidId) {
  return maids.find((maid) => maid.id === maidId);
}

function getPartnerById(operatorId) {
  return operators.find((operator) => operator.id === operatorId) || operators[0];
}

function getPartnerLabel(operatorId) {
  const operator = getPartnerById(operatorId);
  return `${operator.name} / ${operator.zone}`;
}

function renderPartnerOptions(selectedId) {
  return operators
    .map((operator) => `<option value="${operator.id}" ${selectedId === operator.id ? "selected" : ""}>${operator.name} - ${operator.zone}</option>`)
    .join("");
}

function populatePartnerFilter() {
  operatorFilter.innerHTML = `<option value="all">All Partners</option>${renderPartnerOptions()}`;
}

function formatSalary(value) {
  return new Intl.NumberFormat("en-EG", {
    style: "currency",
    currency: "EGP",
    maximumFractionDigits: 0
  }).format(value);
}

function getStatusLabel(status) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function buildMaidDetails(maid) {
  const operator = getPartnerById(maid.operatorId);
  return `<p><strong>ID:</strong> ${maid.id}</p>
    <p><strong>Name:</strong> ${maid.name}</p>
    <p><strong>Phone:</strong> ${maid.phone}</p>
    <p><strong>Status:</strong> ${getStatusLabel(maid.status)}</p>
    <p><strong>Start Date:</strong> ${maid.startDate}</p>
    <p><strong>Age:</strong> ${maid.age}</p>
    <p><strong>Address:</strong> ${maid.address}</p>
    <p><strong>Off Day:</strong> ${maid.offDay}</p>
    <p><strong>Partner:</strong> ${operator.name} (${operator.username}) - ${operator.zone}</p>
    <p><strong>Salary:</strong> ${formatSalary(maid.salary)}</p>
    <p><strong>Done Orders:</strong> ${maid.doneOrders}</p>
    <p><strong>Personal ID:</strong> ${maid.personalId}</p>
    <p><strong>Gender:</strong> ${maid.gender}</p>
    <p><strong>Attachment:</strong> ${maid.attachment}</p>
    <p><strong>Notes:</strong> ${maid.notes}</p>`;
}

function renderRows(items) {
  maidsTableBody.innerHTML = items.map((maid) => {
    const attachmentClass = maid.attachment.toLowerCase() === "ready" ? "ready" : "pending";
    const statusLabel = getStatusLabel(maid.status);
    const operator = getPartnerById(maid.operatorId);
    return `
      <tr>
        <td>${maid.id}</td>
        <td><div class="name-cell"><strong>${maid.name}</strong><small>${maid.gender}</small></div></td>
        <td>${maid.phone}</td>
        <td><span class="status-pill ${maid.status}">${statusLabel}</span></td>
        <td>${maid.startDate}</td>
        <td>${maid.age}</td>
        <td><span class="address-cell">${maid.address}</span></td>
        <td>${maid.offDay}</td>
        <td><div class="operator-cell"><strong>${operator.name}</strong><small>${operator.zone}</small></div></td>
        <td><span class="salary-cell">${formatSalary(maid.salary)}</span></td>
        <td>${maid.doneOrders}</td>
        <td>${maid.personalId}</td>
        <td>${maid.gender}</td>
        <td><span class="doc-badge ${attachmentClass}">${maid.attachment}</span></td>
        <td><span class="notes-cell">${maid.notes}</span></td>
        <td><div class="action-group"><button class="row-action view" type="button" data-maid-action="view" data-maid-id="${maid.id}">View</button><button class="row-action edit" type="button" data-maid-action="edit" data-maid-id="${maid.id}">Edit</button></div></td>
      </tr>
    `;
  }).join("");
}

function getFilteredMaids() {
  const query = maidSearchInput.value.trim().toLowerCase();
  const selectedStatus = statusFilter.value;
  const selectedPartner = operatorFilter.value;
  return maids.filter((maid) => {
    const operator = getPartnerById(maid.operatorId);
    const searchableText = `${maid.name} ${maid.id} ${maid.phone} ${operator.name} ${operator.username} ${operator.zone}`.toLowerCase();
    const matchesQuery = searchableText.includes(query);
    const matchesStatus = selectedStatus === "all" || maid.status === selectedStatus;
    const matchesPartner = selectedPartner === "all" || maid.operatorId === selectedPartner;
    return matchesQuery && matchesStatus && matchesPartner;
  });
}

function applyFilters() {
  renderRows(getFilteredMaids());
}

function openEditMaid(maid) {
  openModal(
    `Edit ${maid.name}`,
    "Update operational status, assigned partner, off day, document status, and notes.",
    `<form class="maid-edit-form" id="maidEditForm">
      <label><span>Status</span><select id="editMaidStatus">
        <option value="active" ${maid.status === "active" ? "selected" : ""}>Active</option>
        <option value="paused" ${maid.status === "paused" ? "selected" : ""}>Paused</option>
        <option value="expired" ${maid.status === "expired" ? "selected" : ""}>Expired</option>
      </select></label>
      <label><span>Assigned Partner</span><select id="editMaidPartner">
        ${renderPartnerOptions(maid.operatorId)}
      </select></label>
      <label><span>Salary (EGP)</span><input id="editMaidSalary" type="number" min="0" step="100" value="${maid.salary}" required /></label>
      <label><span>Off Day</span><select id="editMaidOffDay">
        ${["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => `<option ${maid.offDay === day ? "selected" : ""}>${day}</option>`).join("")}
      </select></label>
      <label><span>Attachment</span><select id="editMaidAttachment">
        <option ${maid.attachment === "Ready" ? "selected" : ""}>Ready</option>
        <option ${maid.attachment === "Pending" ? "selected" : ""}>Pending</option>
      </select></label>
      <label class="wide"><span>Notes</span><textarea id="editMaidNotes" rows="4">${maid.notes}</textarea></label>
      <div class="form-submit-row wide"><button class="action-btn primary" type="submit">Save Changes</button></div>
    </form>`
  );

  document.getElementById("maidEditForm").addEventListener("submit", (event) => {
    event.preventDefault();
    maid.status = document.getElementById("editMaidStatus").value;
    maid.operatorId = document.getElementById("editMaidPartner").value;
    maid.salary = Math.max(0, Number(document.getElementById("editMaidSalary").value) || 0);
    maid.offDay = document.getElementById("editMaidOffDay").value;
    maid.attachment = document.getElementById("editMaidAttachment").value;
    maid.notes = document.getElementById("editMaidNotes").value.trim();
    applyFilters();
    closeModal();
    showToast(`${maid.name} assigned to ${getPartnerLabel(maid.operatorId)}.`);
  });
}

function exportMaids() {
  const exportedAt = new Date().toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
  const filtered = getFilteredMaids();
  openModal(
    "Maids Export Ready",
    "The current workforce view is ready for export.",
    `<p><strong>Records:</strong> ${filtered.length}</p>
    <p><strong>Exported At:</strong> ${exportedAt}</p>
    <p><strong>Included Fields:</strong> ID, name, phone, status, partner, salary, documents, orders, and notes.</p>
    <p><strong>Status:</strong> Export package generated successfully.</p>`
  );
  showToast("Maids export generated.");
}

if (ordersDropdownBtn && ordersDropdownContainer) {
  ordersDropdownBtn.addEventListener("click", () => {
    ordersDropdownContainer.classList.toggle("open");
  });
}

maidsTableBody.addEventListener("click", (event) => {
  const button = event.target.closest("[data-maid-action]");
  if (!button) return;

  const maid = getMaidById(button.dataset.maidId);
  if (!maid) return;

  if (button.dataset.maidAction === "view") {
    window.location.href = `../partner/maid-details.html?maidId=${encodeURIComponent(maid.id)}`;
    return;
  }

  if (button.dataset.maidAction === "edit") {
    openEditMaid(maid);
  }
});

exportMaidsBtn.addEventListener("click", exportMaids);
maidSearchInput.addEventListener("input", applyFilters);
statusFilter.addEventListener("change", applyFilters);
operatorFilter.addEventListener("change", applyFilters);
closeMaidModalBtn.addEventListener("click", closeModal);
closeMaidModalFooterBtn.addEventListener("click", closeModal);
maidModal.addEventListener("click", (event) => {
  if (event.target === maidModal) {
    closeModal();
  }
});

populatePartnerFilter();
renderRows(maids);










