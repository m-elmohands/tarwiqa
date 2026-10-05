const governorates = [
  {
    id: "gov-cairo",
    name: "Cairo",
    market: "High density market",
    coverage: "96%",
    status: "Operational",
    widgets: [
      {
        id: "w-services",
        name: "Services Hub",
        description: "Core services exposed to users inside Cairo.",
        categories: [
          {
            id: "c-quick",
            name: "Quick Services",
            description: "Fast-access daily usage categories.",
            packages: [
              { name: "Starter Pack", description: "Base operational package for entry users.", type: "Public", status: "Live" },
              { name: "Priority Pack", description: "Higher quota and faster processing for heavy usage.", type: "Premium", status: "Live" },
              { name: "Corporate Pack", description: "Managed access for business accounts.", type: "B2B", status: "Review" }
            ]
          },
          {
            id: "c-special",
            name: "Special Services",
            description: "Higher-complexity categories with approval flows.",
            packages: [
              { name: "Gold Access", description: "Priority service routing with premium support.", type: "Premium", status: "Live" },
              { name: "Elite Access", description: "High-value package for strategic users.", type: "VIP", status: "Draft" }
            ]
          }
        ]
      },
      {
        id: "w-commerce",
        name: "Commerce Layer",
        description: "Commercial widget configuration and monetized offers.",
        categories: [
          {
            id: "c-marketplace",
            name: "Marketplace",
            description: "Cross-sell and upsell categories.",
            packages: [
              { name: "Merchant Basic", description: "Entry marketplace exposure for small partners.", type: "Vendor", status: "Live" }
            ]
          }
        ]
      },
      {
        id: "w-support",
        name: "Support Center",
        description: "Support and ticketing widget stack.",
        categories: [
          {
            id: "c-care",
            name: "Customer Care",
            description: "Tickets, complaints, and guided resolution.",
            packages: [
              { name: "Assist 24/7", description: "Round-the-clock service support package.", type: "Support", status: "Live" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "gov-alex",
    name: "Alexandria",
    market: "Coastal growth market",
    coverage: "83%",
    status: "Scaling",
    widgets: [
      {
        id: "w-city-services",
        name: "City Services",
        description: "Regional service bundle for Alexandria.",
        categories: [
          {
            id: "c-port",
            name: "Port Services",
            description: "Packages related to logistics-heavy flows.",
            packages: [
              { name: "Port Basic", description: "Standard operational package for logistics users.", type: "Logistics", status: "Live" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "gov-giza",
    name: "Giza",
    market: "Mixed urban service market",
    coverage: "74%",
    status: "Planning",
    widgets: [
      {
        id: "w-discovery",
        name: "Discovery Module",
        description: "Exploration-focused widget for new districts.",
        categories: [
          {
            id: "c-onboarding",
            name: "Onboarding",
            description: "Category templates for early rollout.",
            packages: [
              { name: "Launch Kit", description: "Foundation package for new districts entering activation.", type: "Internal", status: "Draft" }
            ]
          }
        ]
      }
    ]
  }
];

const governorateList = document.getElementById("governorateList");
const widgetList = document.getElementById("widgetList");
const categoryList = document.getElementById("categoryList");
const packageGrid = document.getElementById("packageGrid");
const structureTree = document.getElementById("structureTree");
const governorateName = document.getElementById("governorateName");
const widgetCount = document.getElementById("widgetCount");
const categoryCount = document.getElementById("categoryCount");
const packageCount = document.getElementById("packageCount");
const packagesTitle = document.getElementById("packagesTitle");
const creationModal = document.getElementById("creationModal");
const modalEyebrow = document.getElementById("modalEyebrow");
const modalTitle = document.getElementById("modalTitle");
const modalSubtitle = document.getElementById("modalSubtitle");
const modalFields = document.getElementById("modalFields");
const contextChain = document.getElementById("contextChain");
const contextHint = document.getElementById("contextHint");
const goalList = document.getElementById("goalList");
const submitModalBtn = document.getElementById("submitModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const cancelModalBtn = document.getElementById("cancelModalBtn");
const createButtons = document.querySelectorAll("[data-create-entity]");

let selectedGovernorateId = governorates[0].id;
let selectedWidgetId = governorates[0].widgets[0].id;
let selectedCategoryId = governorates[0].widgets[0].categories[0].id;
let activeCreationType = "governorate";
let creationSelection = {
  governorateId: selectedGovernorateId,
  widgetId: selectedWidgetId,
  categoryId: selectedCategoryId
};

const creationConfigs = {
  governorate: {
    eyebrow: "Add City",
    title: "Create Governorate",
    subtitle: "Start a new top-level region that will host widgets, categories, and package trees inside the application.",
    contextHint: "This becomes a first-class city/governorate entry in the app navigation and operational structure.",
    goals: [
      "Define market priority and rollout phase before attaching widgets.",
      "Set a coverage plan so the city can scale without restructuring later.",
      "Keep naming and codes API-friendly for future integrations."
    ],
    submitLabel: "Create Governorate",
    fields: [
      { label: "Governorate Name", type: "text", placeholder: "Example: Sharqia" },
      { label: "Internal Code", type: "text", placeholder: "Example: gov-sharqia" },
      { label: "Market Type", type: "select", options: ["Urban", "Mixed", "Coastal", "Growth Market"] },
      { label: "Rollout Status", type: "select", options: ["Planning", "Scaling", "Operational"] },
      { label: "Coverage Target", type: "text", placeholder: "Example: 78%" },
      { label: "Region Owner", type: "text", placeholder: "Example: Operations Team North" },
      { label: "Notes", type: "textarea", placeholder: "Add rollout notes, dependencies, or launch risks.", wide: true }
    ]
  },
    widget: {
      eyebrow: "Add Widget",
      title: "Create Widget",
      subtitle: "Add a functional module inside the selected governorate so teams can organize service areas cleanly.",
    contextHint: "Widgets are the operational modules that hold categories and define major app capabilities per city.",
    goals: [
      "Choose a widget name that reflects a real business domain.",
      "Keep the widget reusable across future governorates when possible.",
      "Document ownership so category creation remains consistent."
      ],
      submitLabel: "Create Widget",
      fields: [
        { label: "Governorate", type: "select", source: "governorates", key: "governorateId" },
        { label: "Widget Name", type: "text", placeholder: "Example: Payments Hub" },
        { label: "Widget Code", type: "text", placeholder: "Example: w-payments" },
        { label: "Widget Type", type: "select", options: ["Core Services", "Commerce", "Support", "Payments"] },
      { label: "Visibility", type: "select", options: ["Public", "Internal", "Pilot Only"] },
      { label: "Primary Owner", type: "text", placeholder: "Example: Product Team Payments" },
      { label: "SLA Group", type: "text", placeholder: "Example: Tier 1 Operations" },
      { label: "Widget Description", type: "textarea", placeholder: "Explain what this widget does and when it should be used.", wide: true }
    ]
  },
    category: {
      eyebrow: "Add Category",
      title: "Create Category",
      subtitle: "Create a category under the current widget to group related packages and control user-facing organization.",
    contextHint: "Categories split a widget into business-friendly buckets and become the parent layer for packages.",
    goals: [
      "Use categories to reduce clutter and keep package discovery intuitive.",
      "Keep names aligned with the widget purpose and not generic placeholders.",
      "Plan package eligibility before publishing the category."
      ],
      submitLabel: "Create Category",
      fields: [
        { label: "Governorate", type: "select", source: "governorates", key: "governorateId" },
        { label: "Widget", type: "select", source: "widgets", key: "widgetId" },
        { label: "Category Name", type: "text", placeholder: "Example: Bills & Utilities" },
        { label: "Category Code", type: "text", placeholder: "Example: c-bills" },
        { label: "Display Priority", type: "select", options: ["High", "Medium", "Low"] },
      { label: "Availability", type: "select", options: ["Live", "Draft", "Hidden"] },
      { label: "Target Segment", type: "text", placeholder: "Example: Consumers / SMEs" },
      { label: "Icon Key", type: "text", placeholder: "Example: bolt-circle" },
      { label: "Category Description", type: "textarea", placeholder: "Describe the purpose, audience, and main packages for this category.", wide: true }
    ]
  },
    package: {
      eyebrow: "Add Package",
      title: "Create Package",
      subtitle: "Create a package inside the selected category with pricing, visibility, and operational metadata ready for publishing.",
    contextHint: "Packages are the final sellable or assignable units shown to users inside a category.",
    goals: [
      "Define a clear package value proposition and target segment.",
      "Set visibility and lifecycle stage before release.",
      "Prepare commercial and operational metadata for API delivery later."
      ],
      submitLabel: "Create Package",
      fields: [
        { label: "Governorate", type: "select", source: "governorates", key: "governorateId" },
        { label: "Widget", type: "select", source: "widgets", key: "widgetId" },
        { label: "Category", type: "select", source: "categories", key: "categoryId" },
        { label: "Package Name", type: "text", placeholder: "Example: Family Gold Pack" },
        { label: "Package Code", type: "text", placeholder: "Example: pkg-family-gold" },
        { label: "Package Type", type: "select", options: ["Public", "Premium", "B2B", "Internal"] },
      { label: "Lifecycle Stage", type: "select", options: ["Draft", "Review", "Live"] },
      { label: "Price / Rule", type: "text", placeholder: "Example: EGP 149 monthly" },
      { label: "Eligibility", type: "text", placeholder: "Example: Cairo consumers only" },
      { label: "Package Description", type: "textarea", placeholder: "Describe the package offering, benefits, and rollout notes.", wide: true }
    ]
  }
};

function getSelectedGovernorate() {
  return governorates.find((item) => item.id === selectedGovernorateId);
}

function getSelectedWidget() {
  return getSelectedGovernorate().widgets.find((item) => item.id === selectedWidgetId);
}

function getSelectedCategory() {
  return getSelectedWidget().categories.find((item) => item.id === selectedCategoryId);
}

function renderGovernorates() {
  governorateList.innerHTML = governorates
    .map(
      (governorate) => `
        <button class="stack-item ${governorate.id === selectedGovernorateId ? "active" : ""}" type="button" data-governorate-id="${governorate.id}">
          <h4>${governorate.name}</h4>
          <p>${governorate.market}</p>
        </button>
      `
    )
    .join("");

  document.querySelectorAll("[data-governorate-id]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedGovernorateId = button.dataset.governorateId;
      selectedWidgetId = getSelectedGovernorate().widgets[0].id;
      selectedCategoryId = getSelectedGovernorate().widgets[0].categories[0].id;
      renderDashboard();
    });
  });
}

function renderWidgets() {
  const selectedGovernorate = getSelectedGovernorate();

  widgetList.innerHTML = selectedGovernorate.widgets
    .map(
      (widget) => `
        <button class="stack-item ${widget.id === selectedWidgetId ? "active" : ""}" type="button" data-widget-id="${widget.id}">
          <h4>${widget.name}</h4>
          <p>${widget.description}</p>
        </button>
      `
    )
    .join("");

  document.querySelectorAll("[data-widget-id]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedWidgetId = button.dataset.widgetId;
      selectedCategoryId = getSelectedWidget().categories[0].id;
      renderDashboard();
    });
  });
}

function renderCategories() {
  const selectedWidget = getSelectedWidget();

  categoryList.innerHTML = selectedWidget.categories
    .map(
      (category) => `
        <button class="stack-item ${category.id === selectedCategoryId ? "active" : ""}" type="button" data-category-id="${category.id}">
          <h4>${category.name}</h4>
          <p>${category.description}</p>
        </button>
      `
    )
    .join("");

  document.querySelectorAll("[data-category-id]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedCategoryId = button.dataset.categoryId;
      renderDashboard();
    });
  });
}

function renderPackages() {
  const selectedCategory = getSelectedCategory();

  packagesTitle.textContent = `Packages under ${selectedCategory.name}`;
  packageGrid.innerHTML = selectedCategory.packages
    .map(
      (pkg) => `
        <article class="package-card">
          <h4>${pkg.name}</h4>
          <p>${pkg.description}</p>
          <div class="package-meta">
            <span class="tag">${pkg.type}</span>
            <span class="tag warn">${pkg.status}</span>
          </div>
        </article>
      `
    )
    .join("");
}

function renderStructure() {
  const selectedGovernorate = getSelectedGovernorate();

  structureTree.innerHTML = selectedGovernorate.widgets
    .map(
      (widget) => `
        <div class="tree-group">
          <article class="tree-item">
            <h4>${widget.name}</h4>
            <p>${widget.categories.length} categories attached</p>
          </article>
          ${widget.categories
            .map(
              (category) => `
                <article class="tree-item">
                  <h4>${category.name}</h4>
                  <p>${category.packages.length} packages inside this category</p>
                </article>
              `
            )
            .join("")}
        </div>
      `
    )
    .join("");
}

function updateHero() {
  const selectedGovernorate = getSelectedGovernorate();
  const selectedWidget = getSelectedWidget();
  const selectedCategory = getSelectedCategory();
  const totalCategories = selectedGovernorate.widgets.reduce((sum, widget) => sum + widget.categories.length, 0);
  const totalPackages = selectedGovernorate.widgets.reduce(
    (sum, widget) => sum + widget.categories.reduce((inner, category) => inner + category.packages.length, 0),
    0
  );

  governorateName.textContent = selectedGovernorate.name;
  widgetCount.textContent = selectedGovernorate.widgets.length;
  categoryCount.textContent = totalCategories;
  packageCount.textContent = totalPackages;
  packagesTitle.textContent = `Packages under ${selectedCategory.name}`;

  document.querySelector(".hero-meta").innerHTML = `
    ${selectedGovernorate.market}
    <span class="dot"></span>
    ${selectedWidget.name}
    <span class="dot"></span>
    Coverage ${selectedGovernorate.coverage}
  `;

  document.querySelector(".pill.success").textContent = selectedGovernorate.status;
  document.querySelector(".pill.subtle").textContent = `Coverage ${selectedGovernorate.coverage}`;
}

function getContextByType(type) {
  const selectedGovernorate = getSelectedGovernorate();
  const selectedWidget = getSelectedWidget();
  const selectedCategory = getSelectedCategory();

  if (type === "governorate") {
    return {
      chain: "Application Root -> New Governorate",
      hint: creationConfigs[type].contextHint
    };
  }

  if (type === "widget") {
    return {
      chain: `${selectedGovernorate.name} -> New Widget`,
      hint: creationConfigs[type].contextHint
    };
  }

  if (type === "category") {
    return {
      chain: `${selectedGovernorate.name} -> ${selectedWidget.name} -> New Category`,
      hint: creationConfigs[type].contextHint
    };
  }

  return {
    chain: `${selectedGovernorate.name} -> ${selectedWidget.name} -> ${selectedCategory.name} -> New Package`,
    hint: creationConfigs[type].contextHint
  };
}

function getGovernorateOptions() {
  return governorates.map((governorate) => ({
    value: governorate.id,
    label: governorate.name
  }));
}

function getWidgetOptions(governorateId) {
  const governorate = governorates.find((item) => item.id === governorateId) || governorates[0];

  return governorate.widgets.map((widget) => ({
    value: widget.id,
    label: widget.name
  }));
}

function getCategoryOptions(governorateId, widgetId) {
  const governorate = governorates.find((item) => item.id === governorateId) || governorates[0];
  const widget = governorate.widgets.find((item) => item.id === widgetId) || governorate.widgets[0];

  return widget.categories.map((category) => ({
    value: category.id,
    label: category.name
  }));
}

function syncCreationSelection() {
  const widgetOptions = getWidgetOptions(creationSelection.governorateId);

  if (!widgetOptions.some((option) => option.value === creationSelection.widgetId)) {
    creationSelection.widgetId = widgetOptions[0]?.value || "";
  }

  const categoryOptions = getCategoryOptions(creationSelection.governorateId, creationSelection.widgetId);

  if (!categoryOptions.some((option) => option.value === creationSelection.categoryId)) {
    creationSelection.categoryId = categoryOptions[0]?.value || "";
  }
}

function getFieldOptions(field) {
  if (field.options) {
    return field.options.map((option) => ({
      value: option,
      label: option
    }));
  }

  if (field.source === "governorates") {
    return getGovernorateOptions();
  }

  if (field.source === "widgets") {
    return getWidgetOptions(creationSelection.governorateId);
  }

  if (field.source === "categories") {
    return getCategoryOptions(creationSelection.governorateId, creationSelection.widgetId);
  }

  return [];
}

function bindCreationDependencies() {
  modalFields.querySelectorAll("select[data-creation-key]").forEach((select) => {
    select.addEventListener("change", (event) => {
      const { creationKey } = event.target.dataset;
      creationSelection[creationKey] = event.target.value;

      if (creationKey === "governorateId") {
        creationSelection.widgetId = "";
        creationSelection.categoryId = "";
        syncCreationSelection();
        renderModalFields(activeCreationType);
      }

      if (creationKey === "widgetId") {
        creationSelection.categoryId = "";
        syncCreationSelection();
        renderModalFields(activeCreationType);
      }
    });
  });
}

function renderModalFields(type) {
  const config = creationConfigs[type];
  syncCreationSelection();

  modalFields.innerHTML = config.fields
    .map((field) => {
        if (field.type === "select") {
        const options = getFieldOptions(field);
        const selectedValue = field.key ? creationSelection[field.key] : "";

          return `
            <div class="form-field ${field.wide ? "wide" : ""}">
              <label>${field.label}</label>
              <select ${field.key ? `data-creation-key="${field.key}"` : ""}>
                ${options
                  .map(
                    (option) => `
                      <option value="${option.value}" ${option.value === selectedValue ? "selected" : ""}>
                        ${option.label}
                      </option>
                    `
                  )
                  .join("")}
              </select>
            </div>
          `;
        }

      if (field.type === "textarea") {
        return `
          <div class="form-field ${field.wide ? "wide" : ""}">
            <label>${field.label}</label>
            <textarea placeholder="${field.placeholder}"></textarea>
          </div>
        `;
      }

      return `
        <div class="form-field ${field.wide ? "wide" : ""}">
          <label>${field.label}</label>
          <input type="${field.type}" placeholder="${field.placeholder}" />
        </div>
      `;
      })
      .join("");

  bindCreationDependencies();
}

function openCreationModal(type) {
  activeCreationType = type;
  const config = creationConfigs[type];
  const context = getContextByType(type);
  creationSelection = {
    governorateId: selectedGovernorateId,
    widgetId: selectedWidgetId,
    categoryId: selectedCategoryId
  };
  syncCreationSelection();

  modalEyebrow.textContent = config.eyebrow;
  modalTitle.textContent = config.title;
  modalSubtitle.textContent = config.subtitle;
  submitModalBtn.textContent = config.submitLabel;
  contextChain.textContent = context.chain;
  contextHint.textContent = context.hint;
  goalList.innerHTML = config.goals.map((goal) => `<li>${goal}</li>`).join("");

  renderModalFields(type);
  creationModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeCreationModal() {
  creationModal.classList.add("hidden");
  document.body.style.overflow = "";
}

function renderDashboard() {
  renderGovernorates();
  renderWidgets();
  renderCategories();
  renderPackages();
  renderStructure();
  updateHero();
}

createButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openCreationModal(button.dataset.createEntity);
  });
});

closeModalBtn.addEventListener("click", closeCreationModal);
cancelModalBtn.addEventListener("click", closeCreationModal);

creationModal.addEventListener("click", (event) => {
  if (event.target === creationModal) {
    closeCreationModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !creationModal.classList.contains("hidden")) {
    closeCreationModal();
  }
});

submitModalBtn.addEventListener("click", () => {
  submitModalBtn.textContent = `${creationConfigs[activeCreationType].submitLabel} Ready`;
});

renderDashboard();
