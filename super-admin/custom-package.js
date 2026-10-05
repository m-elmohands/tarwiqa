const ordersDropdownBtn = document.getElementById("ordersDropdownBtn");
const ordersDropdownContainer = ordersDropdownBtn?.closest(".dropdown-block");

if (ordersDropdownBtn && ordersDropdownContainer) {
  ordersDropdownBtn.addEventListener("click", () => {
    ordersDropdownContainer.classList.toggle("open");
  });
}

const packagesGrid = document.getElementById("packagesGrid");

const widgetOptions = [
  "Home Cleaning",
  "Deep Cleaning",
  "Hourly Package",
  "Premium Package",
  "Move In Package",
];

const categoryOptions = [
  "Standard",
  "Family",
  "Premium",
  "Seasonal",
  "Corporate",
];

const quickServices = [
  "Floor Cleaning",
  "Kitchen Cleaning",
  "Bathroom Sanitizing",
  "Window Cleaning",
  "Sofa Refresh",
  "Ironing",
];

const packagesData = [
  {
    governorate: "Alexandria",
    widget: "Home Cleaning",
    category: "Standard",
    x: 12,
    c: 24,
    y: 36,
    services: ["Floor Cleaning", "Kitchen Cleaning", "Bathroom Sanitizing"],
  },
  {
    governorate: "North Coast",
    widget: "Premium Package",
    category: "Seasonal",
    x: 18,
    c: 28,
    y: 42,
    services: ["Villa Cleaning", "Balcony Wash", "Window Cleaning"],
  },
  {
    governorate: "Beheira",
    widget: "Hourly Package",
    category: "Family",
    x: 10,
    c: 22,
    y: 30,
    services: ["General Cleaning", "Kitchen Cleaning"],
  },
  {
    governorate: "Cairo",
    widget: "Deep Cleaning",
    category: "Premium",
    x: 20,
    c: 35,
    y: 48,
    services: ["Deep Cleaning", "Sofa Refresh", "Ironing"],
  },
  {
    governorate: "New Cairo",
    widget: "Move In Package",
    category: "Corporate",
    x: 24,
    c: 38,
    y: 54,
    services: ["Move In Cleaning", "Window Cleaning"],
  },
  {
    governorate: "Giza",
    widget: "Home Cleaning",
    category: "Standard",
    x: 14,
    c: 25,
    y: 34,
    services: ["Floor Cleaning", "Bathroom Sanitizing", "Ironing"],
  },
];

function createOptions(options, selectedValue) {
  return options
    .map(
      (option) =>
        `<option value="${option}"${option === selectedValue ? " selected" : ""}>${option}</option>`
    )
    .join("");
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderServicesRows(services) {
  if (!services.length) {
    return `<tr><td colspan="4" class="empty-state">No services added yet for this custom package.</td></tr>`;
  }

  return services
    .map(
      (service, serviceIndex) => `
        <tr>
          <td class="service-name">${escapeHtml(service)}</td>
          <td><span class="chip">Included</span></td>
          <td>${serviceIndex + 1}</td>
          <td>
            <button class="remove-btn" type="button" data-action="remove-service" data-service-index="${serviceIndex}">Remove</button>
          </td>
        </tr>
      `
    )
    .join("");
}

function renderPackageCard(packageItem, index) {
  return `
    <article class="package-card" data-package-index="${index}">
      <div class="package-head">
        <div class="package-meta">
          <span class="package-index">Package ${index + 1}</span>
          <h3>${escapeHtml(packageItem.governorate)}</h3>
        </div>
        <span class="service-count">${packageItem.services.length} services in package</span>
      </div>

      <div class="setup-grid">
        <label class="field">
          <span>Governorate</span>
          <input type="text" value="${escapeHtml(packageItem.governorate)}" readonly />
        </label>

        <label class="field">
          <span>Widget</span>
          <select data-field="widget">
            ${createOptions(widgetOptions, packageItem.widget)}
          </select>
        </label>

        <label class="field">
          <span>Category</span>
          <select data-field="category">
            ${createOptions(categoryOptions, packageItem.category)}
          </select>
        </label>
      </div>

      <div class="table-shell">
        <table>
          <thead>
            <tr>
              <th>Service Name</th>
              <th>Status</th>
              <th>Order</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${renderServicesRows(packageItem.services)}
          </tbody>
        </table>
      </div>

      <div class="service-builder">
        <div class="builder-panel">
          <div class="panel-title">
            <div>
              <h4>Add New Service</h4>
              <p>Add a new service under this custom package table.</p>
            </div>
          </div>

          <div class="builder-row">
            <label class="field">
              <span>Service Name</span>
              <input type="text" data-role="service-input" placeholder="Example: Carpet Cleaning" />
            </label>
            <button class="small-btn" type="button" data-action="add-service">Add Service</button>
          </div>
        </div>

        <div class="quick-panel">
          <div class="panel-title">
            <div>
              <h4>Quick Add List</h4>
              <p>Use the quick list below to add services instantly.</p>
            </div>
          </div>

          <div class="quick-list">
            ${quickServices
              .map(
                (service) =>
                  `<button class="quick-btn" type="button" data-action="quick-add" data-service="${escapeHtml(service)}">${escapeHtml(service)}</button>`
              )
              .join("")}
          </div>
        </div>
      </div>

      <div class="values-panel">
        <div class="panel-title">
          <div>
            <h4>Package Values</h4>
            <p>Each table has editable values for x, c, and y.</p>
          </div>
        </div>

        <div class="value-fields">
          <label class="field">
            <span>x =</span>
            <input type="number" value="${packageItem.x}" data-field="x" min="0" />
          </label>

          <label class="field">
            <span>c =</span>
            <input type="number" value="${packageItem.c}" data-field="c" min="0" />
          </label>

          <label class="field">
            <span>y =</span>
            <input type="number" value="${packageItem.y}" data-field="y" min="0" />
          </label>
        </div>
      </div>
    </article>
  `;
}

function renderPackages() {
  packagesGrid.innerHTML = packagesData.map(renderPackageCard).join("");
}

function addService(packageIndex, serviceName) {
  const normalizedName = serviceName.trim();

  if (!normalizedName) {
    return;
  }

  const packageItem = packagesData[packageIndex];
  const exists = packageItem.services.some(
    (service) => service.toLowerCase() === normalizedName.toLowerCase()
  );

  if (exists) {
    return;
  }

  packageItem.services.push(normalizedName);
  renderPackages();
}

function removeService(packageIndex, serviceIndex) {
  packagesData[packageIndex].services.splice(serviceIndex, 1);
  renderPackages();
}

packagesGrid.addEventListener("click", (event) => {
  const target = event.target.closest("button");

  if (!target) {
    return;
  }

  const packageCard = target.closest(".package-card");

  if (!packageCard) {
    return;
  }

  const packageIndex = Number(packageCard.dataset.packageIndex);

  if (target.dataset.action === "add-service") {
    const input = packageCard.querySelector('[data-role="service-input"]');
    addService(packageIndex, input.value);
    return;
  }

  if (target.dataset.action === "quick-add") {
    addService(packageIndex, target.dataset.service || "");
    return;
  }

  if (target.dataset.action === "remove-service") {
    removeService(packageIndex, Number(target.dataset.serviceIndex));
  }
});

packagesGrid.addEventListener("change", (event) => {
  const target = event.target;
  const packageCard = target.closest(".package-card");

  if (!packageCard || !target.dataset.field) {
    return;
  }

  const packageIndex = Number(packageCard.dataset.packageIndex);
  const fieldName = target.dataset.field;

  if (fieldName === "x" || fieldName === "c" || fieldName === "y") {
    packagesData[packageIndex][fieldName] = Number(target.value);
    return;
  }

  packagesData[packageIndex][fieldName] = target.value;
});

packagesGrid.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") {
    return;
  }

  const input = event.target.closest('[data-role="service-input"]');

  if (!input) {
    return;
  }

  event.preventDefault();
  const packageCard = input.closest(".package-card");
  const packageIndex = Number(packageCard.dataset.packageIndex);
  addService(packageIndex, input.value);
});

renderPackages();
