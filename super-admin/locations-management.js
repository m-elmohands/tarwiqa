const governoratesData = {
  Cairo: ["Maadi", "Nasr City", "Heliopolis", "Shorouk", "New Cairo"],
  Alexandria: ["Smouha", "Gleem", "Sidi Gaber", "Stanley", "Miami"],
  Giza: ["Dokki", "Mohandessin", "Haram", "Faisal", "Sheikh Zayed"]
};

const archivedAreasStorageKey = "temporarilyDeletedAreas";
const governorateTabs = document.getElementById("governorateTabs");
const selectedGovernorateInput = document.getElementById("selectedGovernorateInput");
const panelGovernorateName = document.getElementById("panelGovernorateName");
const locationsCount = document.getElementById("locationsCount");
const locationsList = document.getElementById("locationsList");
const newLocationInput = document.getElementById("newLocationInput");
const addLocationBtn = document.getElementById("addLocationBtn");
const appGovernorateReadonly = document.getElementById("appGovernorateReadonly");
const appLocationSelect = document.getElementById("appLocationSelect");

let activeGovernorate = "Cairo";
let temporarilyDeletedAreas = loadTemporarilyDeletedAreas();

function loadTemporarilyDeletedAreas() {
  try {
    const stored = JSON.parse(localStorage.getItem(archivedAreasStorageKey));
    return stored && typeof stored === "object" ? stored : {};
  } catch (error) {
    return {};
  }
}

function saveTemporarilyDeletedAreas() {
  localStorage.setItem(archivedAreasStorageKey, JSON.stringify(temporarilyDeletedAreas));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getDeletedAreas(governorate) {
  return temporarilyDeletedAreas[governorate] || [];
}

function isAreaDeleted(governorate, area) {
  return getDeletedAreas(governorate).includes(area);
}

function setAreaDeleted(governorate, area, isDeleted) {
  const deletedAreas = getDeletedAreas(governorate);
  temporarilyDeletedAreas[governorate] = isDeleted
    ? [...new Set([...deletedAreas, area])]
    : deletedAreas.filter((item) => item !== area);
  saveTemporarilyDeletedAreas();
  renderLocationsManager();
}

function renderGovernorateTabs() {
  governorateTabs.innerHTML = Object.keys(governoratesData)
    .map(
      (governorate) => `
        <button class="tab-btn ${governorate === activeGovernorate ? "active" : ""}" data-governorate="${escapeHtml(governorate)}" type="button">
          ${escapeHtml(governorate)}
        </button>
      `
    )
    .join("");

  document.querySelectorAll("[data-governorate]").forEach((button) => {
    button.addEventListener("click", () => {
      activeGovernorate = button.dataset.governorate;
      renderLocationsManager();
    });
  });
}

function renderLocationsManager() {
  const allAreas = governoratesData[activeGovernorate];
  const activeAreas = allAreas.filter((area) => !isAreaDeleted(activeGovernorate, area));
  const deletedCount = allAreas.length - activeAreas.length;

  selectedGovernorateInput.value = activeGovernorate;
  panelGovernorateName.textContent = activeGovernorate;
  appGovernorateReadonly.value = activeGovernorate;
  locationsCount.textContent = `${activeAreas.length} active${deletedCount ? `, ${deletedCount} temporarily deleted` : ""}`;

  locationsList.innerHTML = allAreas
    .map((area) => {
      const deleted = isAreaDeleted(activeGovernorate, area);
      return `
        <div class="location-chip ${deleted ? "temporarily-deleted" : ""}">
          <span>${escapeHtml(area)}</span>
          ${deleted ? '<small>Temporarily Deleted</small>' : ""}
          <button class="area-state-btn ${deleted ? "restore" : "delete"}" type="button" data-area="${escapeHtml(area)}" data-area-action="${deleted ? "restore" : "delete"}">
            ${deleted ? "Restore" : "Temporarily Delete"}
          </button>
        </div>
      `;
    })
    .join("");

  appLocationSelect.innerHTML = activeAreas.length
    ? activeAreas.map((area) => `<option>${escapeHtml(area)}</option>`).join("")
    : '<option disabled selected>No active areas available</option>';

  renderGovernorateTabs();
}

locationsList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-area-action]");
  if (!button) return;
  setAreaDeleted(activeGovernorate, button.dataset.area, button.dataset.areaAction === "delete");
});

addLocationBtn.addEventListener("click", () => {
  const value = newLocationInput.value.trim();
  if (!value) return;

  const existingArea = governoratesData[activeGovernorate].find(
    (area) => area.toLowerCase() === value.toLowerCase()
  );

  if (existingArea) {
    setAreaDeleted(activeGovernorate, existingArea, false);
  } else {
    governoratesData[activeGovernorate].push(value);
    renderLocationsManager();
  }

  newLocationInput.value = "";
});

renderLocationsManager();