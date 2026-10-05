const governorates = ["Cairo", "Giza", "Alexandria", "Qalyubia", "Dakahlia", "Sharqia"];
const permissionData = [
  {
    section: "Supporter Dashboard",
    items: [
      "View dashboard summary",
      "View scoped KPIs for assigned governorates",
      "View current session and online status"
    ]
  },
  {
    section: "Scoped Orders",
    items: [
      "View scoped orders list",
      "Search and filter scoped orders",
      "Open full order details",
      "View customer name and address inside scoped orders",
      "View payment method and order amount",
      "Change order status",
      "Add support note while changing order status",
      "Open original order page"
    ]
  },
  {
    section: "Scoped Partners",
    items: [
      "View scoped partners list",
      "Search and filter scoped partners",
      "Open partner details",
      "View partner workload and managed maids",
      "Add maid to scoped partner",
      "Edit maid data for scoped partners",
      "Open partner chat",
      "Send direct message to a partner"
    ]
  },
  {
    section: "Scoped Users",
    items: [
      "View scoped users list",
      "Open full user profile",
      "Edit user profile data",
      "Ban or unban user",
      "Restrict or restore user access",
      "Send push notifications to users",
      "Send email or WhatsApp to users"
    ]
  },
  {
    section: "Customer Messages",
    items: [
      "View customer inbox",
      "Open customer conversation",
      "Mark customer messages as read",
      "Reply to customer messages",
      "Move customer messages to junk or inbox"
    ]
  },  {
    section: "Supporter Messages",
    items: [
      "View supporter message center",
      "Filter messages by Super Admin or Partner",
      "Mark supporter messages as read",
      "Reply to supporter workspace messages"
    ]
  },
  {
    section: "Activity & Profile",
    items: [
      "View my supporter profile",
      "View assigned governorates and access scope",
      "View detailed permissions",
      "View my action history",
      "Search my action history",
      "View last seen and worked hours"
    ]
  },
  {
    section: "Reports",
    items: [
      "View scoped orders reports",
      "View scoped partners reports",
      "Export scoped reports"
    ]
  }
]

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

function getRole() {
  return q("supporterRole").value;
}

function getPermissions() {
  return permissionData.map((group, groupIndex) => ({
    section: group.section,
    items: group.items.map((name, itemIndex) => {
      const key = `${groupIndex}-${itemIndex}`;
      return {
        name,
        canView: Boolean(document.querySelector(`.supporter-view[data-key="${key}"]`)?.checked),
        canEdit: Boolean(document.querySelector(`.supporter-edit[data-key="${key}"]`)?.checked)
      };
    })
  }));
}

function permissionCounts() {
  const items = getPermissions().flatMap((group) => group.items);
  return {
    view: items.filter((item) => item.canView).length,
    edit: items.filter((item) => item.canEdit).length
  };
}

function showToast(message) {
  q("supporterToast").textContent = message;
  q("supporterToast").classList.remove("hidden");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => q("supporterToast").classList.add("hidden"), 2800);
}

function renderPermissions() {
  q("supporterPermissions").innerHTML = permissionData.map((group, groupIndex) => `
    <section class="supporter-permission-group">
      <h3>${group.section}</h3>
      <div class="supporter-permission-list">
        ${group.items.map((item, itemIndex) => {
          const key = `${groupIndex}-${itemIndex}`;
          return `
            <div class="supporter-permission-row">
              <span>${item}</span>
              <div class="permission-toggles">
                <label class="permission-toggle"><input class="supporter-view" data-key="${key}" type="checkbox" /> View</label>
                <label class="permission-toggle edit"><input class="supporter-edit" data-key="${key}" type="checkbox" /> Edit</label>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    </section>
  `).join("");

  document.querySelectorAll(".supporter-view").forEach((input) => {
    input.addEventListener("change", () => {
      if (!input.checked) {
        const edit = document.querySelector(`.supporter-edit[data-key="${input.dataset.key}"]`);
        if (edit) edit.checked = false;
      }
      updatePreview();
    });
  });
  document.querySelectorAll(".supporter-edit").forEach((input) => {
    input.addEventListener("change", () => {
      if (input.checked) {
        const view = document.querySelector(`.supporter-view[data-key="${input.dataset.key}"]`);
        if (view) view.checked = true;
      }
      updatePreview();
    });
  });
  updateRoleState();
}

function updateRoleState() {
  const viewer = getRole() === "viewer";
  document.querySelectorAll(".supporter-edit").forEach((input) => {
    if (viewer) input.checked = false;
    input.disabled = viewer;
  });
  updatePreview();
}

function updatePreview() {
  const selected = selectedGovernorates();
  const counts = permissionCounts();
  q("previewName").textContent = q("supporterName").value.trim() || "New Supporter";
  q("previewStatus").textContent = q("supporterStatus").value;
  q("previewRole").textContent = getRole() === "viewer" ? "Viewer" : "Editor";
  q("previewPermissions").textContent = `${counts.view} View / ${counts.edit} Edit`;
  q("previewGovernorates").textContent = selected.length ? selected.join(", ") : "None selected";
  q("previewOrders").textContent = q("canViewOrders").checked ? "Allowed" : "Blocked";
  q("previewPartners").textContent = q("canViewPartners").checked ? "Allowed" : "Blocked";
  q("supporterViewCount").textContent = counts.view;
  q("supporterEditCount").textContent = counts.edit;
}

function toggleCreatePassword() {
  const input = q("supporterPassword");
  const show = input.type === "password";
  input.type = show ? "text" : "password";
  q("toggleSupporterPassword").textContent = show ? "Hide" : "Show";
  q("toggleSupporterPassword").setAttribute("aria-pressed", String(show));
  input.focus();
}

function resetForm() {
  q("supporterForm").reset();
  q("supporterRole").value = "viewer";
  q("canViewOrders").checked = true;
  q("canViewPartners").checked = true;
  document.querySelectorAll(".supporter-view,.supporter-edit").forEach((input) => {
    input.checked = false;
  });
  updateRoleState();
  showToast("Supporter form reset.");
}

function createSupporter() {
  if (!q("supporterForm").reportValidity()) return;
  const assignedGovernorates = selectedGovernorates();
  const counts = permissionCounts();
  if (!assignedGovernorates.length) {
    showToast("Select at least one governorate.");
    return;
  }
  if (!counts.view) {
    showToast("Select at least one View permission.");
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
    role: getRole(),
    governorates: assignedGovernorates,
    canViewOrders: q("canViewOrders").checked,
    canViewPartners: q("canViewPartners").checked,
    canExportReports: q("canExportReports").checked,
    permissions: getPermissions(),
    notes: q("supporterNotes").value.trim(),
    createdAt: new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })
  };
  current.push(supporter);
  localStorage.setItem("createdSupporters", JSON.stringify(current));
  showToast(`${supporter.name} created with ${counts.view} View and ${counts.edit} Edit permissions.`);
  setTimeout(() => { location.href = "./supporters-list.html"; }, 650);
}

q("governorateGrid").innerHTML = governorates.map((governorate) => `
  <label class="check-card">
    <input type="checkbox" value="${governorate}" data-governorate />
    <div><strong>${governorate}</strong><small>Orders and partners access</small></div>
  </label>
`).join("");

renderPermissions();
q("supporterForm").addEventListener("input", updatePreview);
q("supporterForm").addEventListener("change", updatePreview);
q("supporterRole").addEventListener("change", updateRoleState);
q("createSupporterBtn").addEventListener("click", createSupporter);
q("toggleSupporterPassword").addEventListener("click", toggleCreatePassword);
q("resetSupporterBtn").addEventListener("click", resetForm);
updatePreview();

