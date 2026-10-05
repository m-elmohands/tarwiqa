const shortNoteInput = document.getElementById("shortNoteInput");
const orderPreviewPill = document.getElementById("orderPreviewPill");
const extrasListBody = document.getElementById("extrasListBody");
const createExtraBtn = document.getElementById("createExtraBtn");
const exportExtrasBtn = document.getElementById("exportExtrasBtn");
const saveExtraBtn = document.getElementById("saveExtraBtn");
const resetExtraBtn = document.getElementById("resetExtraBtn");
const extraFormCard = document.getElementById("extraFormCard");
const extraIdInput = document.getElementById("extraIdInput");
const extraCreatedDateInput = document.getElementById("extraCreatedDateInput");
const extraReasonInput = document.getElementById("extraReasonInput");
const extraDescriptionInput = document.getElementById("extraDescriptionInput");
const deletedExtrasStorageKey = "temporarilyDeletedExtras";
const customExtrasStorageKey = "customExtrasCatalog";

const defaultExtrasCatalog = [
  { id: "#EXT-2048", createdDate: "23 Apr 2026", name: "Deep Cleaning Kit", description: "Additional deep-cleaning tools and supplies." },
  { id: "#EXT-2041", createdDate: "23 Apr 2026", name: "Ironing", description: "Add garment ironing to the selected service." },
  { id: "#EXT-2034", createdDate: "22 Apr 2026", name: "Window Cleaning", description: "Interior window and glass cleaning service." },
  { id: "#EXT-2027", createdDate: "22 Apr 2026", name: "Kitchen Sanitizing", description: "Focused kitchen surface sanitizing." },
  { id: "#EXT-2019", createdDate: "21 Apr 2026", name: "Carpet Refresh", description: "Quick carpet deodorizing and refresh." },
  { id: "#EXT-2012", createdDate: "20 Apr 2026", name: "Fridge Cleaning", description: "Interior refrigerator cleaning add-on." }
];

let customExtrasCatalog = loadArray(customExtrasStorageKey);
let temporarilyDeletedExtras = loadArray(deletedExtrasStorageKey);

function loadArray(key) {
  try {
    const stored = JSON.parse(localStorage.getItem(key));
    return Array.isArray(stored) ? stored : [];
  } catch (error) {
    return [];
  }
}

function getExtrasCatalog() {
  return [...defaultExtrasCatalog, ...customExtrasCatalog];
}

function saveState() {
  localStorage.setItem(deletedExtrasStorageKey, JSON.stringify(temporarilyDeletedExtras));
  localStorage.setItem(customExtrasStorageKey, JSON.stringify(customExtrasCatalog));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getNextExtraId() {
  const highest = getExtrasCatalog().reduce((max, extra) => {
    const value = Number(String(extra.id).replace(/\D/g, ""));
    return Math.max(max, Number.isFinite(value) ? value : 0);
  }, 2048);
  return `#EXT-${highest + 1}`;
}

function formatCreatedDate() {
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date());
}

function resetExtraForm() {
  extraIdInput.value = getNextExtraId();
  extraCreatedDateInput.value = formatCreatedDate();
  extraReasonInput.value = "";
  extraDescriptionInput.value = "";
  shortNoteInput.value = "";
  orderPreviewPill.textContent = "Extra note";
}

function renderExtrasList() {
  extrasListBody.innerHTML = getExtrasCatalog().map((extra) => {
    const deleted = temporarilyDeletedExtras.includes(extra.name);
    return `
      <tr class="${deleted ? "temporarily-deleted-row" : ""}">
        <td>${escapeHtml(extra.id)}</td>
        <td>${escapeHtml(extra.createdDate)}</td>
        <td><strong>${escapeHtml(extra.name)}</strong></td>
        <td>${escapeHtml(extra.description)}</td>
        <td><span class="extra-status ${deleted ? "deleted" : "active"}">${deleted ? "Temporarily Deleted" : "Active"}</span></td>
        <td><button class="extra-state-btn ${deleted ? "restore" : "delete"}" type="button" data-extra-name="${escapeHtml(extra.name)}" data-extra-action="${deleted ? "restore" : "delete"}">${deleted ? "Restore" : "Temporarily Delete"}</button></td>
      </tr>`;
  }).join("");
}

function saveExtra() {
  const name = shortNoteInput.value.trim();
  const description = extraDescriptionInput.value.trim();
  if (!name || !description || !extraReasonInput.value.trim()) {
    window.alert("Complete the extra name, reason, and description first.");
    return;
  }
  if (getExtrasCatalog().some((extra) => extra.name.toLowerCase() === name.toLowerCase())) {
    window.alert("An extra with this name already exists.");
    return;
  }

  customExtrasCatalog.push({ id: extraIdInput.value, createdDate: extraCreatedDateInput.value, name, description });
  saveState();
  renderExtrasList();
  resetExtraForm();
}

function exportExtras() {
  const rows = [["Extra ID", "Created Date", "Extra Name", "Description", "Status"], ...getExtrasCatalog().map((extra) => [extra.id, extra.createdDate, extra.name, extra.description, temporarilyDeletedExtras.includes(extra.name) ? "Temporarily Deleted" : "Active"])];
  const csv = rows.map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(",")).join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "extras-list.csv";
  link.click();
  URL.revokeObjectURL(url);
}

extrasListBody.addEventListener("click", (event) => {
  const button = event.target.closest("[data-extra-action]");
  if (!button) return;
  const name = button.dataset.extraName;
  temporarilyDeletedExtras = button.dataset.extraAction === "delete"
    ? [...new Set([...temporarilyDeletedExtras, name])]
    : temporarilyDeletedExtras.filter((item) => item !== name);
  saveState();
  renderExtrasList();
});

shortNoteInput.addEventListener("input", () => {
  orderPreviewPill.textContent = shortNoteInput.value.trim() || "Extra note";
});
createExtraBtn.addEventListener("click", () => {
  extraFormCard.scrollIntoView({ behavior: "smooth", block: "start" });
  shortNoteInput.focus();
});
exportExtrasBtn.addEventListener("click", exportExtras);
saveExtraBtn.addEventListener("click", saveExtra);
resetExtraBtn.addEventListener("click", resetExtraForm);

renderExtrasList();
resetExtraForm();