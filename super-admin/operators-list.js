const seedOperators = [
  {
    id: "OP-1024",
    name: "Mona Adel",
    username: "ops.mona",
    status: "Active",
    governorate: "Cairo",
    zone: "New Cairo",
    managedMaids: 18,
    completedOrders: 246,
    lastMessage: "Please review the 4 PM assignments before confirmation."
  },
  {
    id: "OP-1031",
    name: "Karim Samir",
    username: "ops.karim",
    status: "Active",
    governorate: "Cairo",
    zone: "Nasr City",
    managedMaids: 14,
    completedOrders: 198,
    lastMessage: "Waiting list has two urgent orders for tomorrow."
  },
  {
    id: "OP-1042",
    name: "Nour Hassan",
    username: "ops.nour",
    status: "Paused",
    governorate: "Cairo",
    zone: "Maadi",
    managedMaids: 9,
    completedOrders: 132,
    lastMessage: "Shift is paused until the evening handover."
  },
  {
    id: "OP-1057",
    name: "Ahmed Fathy",
    username: "ops.ahmed",
    status: "Offline",
    governorate: "Giza",
    zone: "October",
    managedMaids: 11,
    completedOrders: 176,
    lastMessage: "Last handover completed yesterday at 8:15 PM."
  },
  {
    id: "OP-1073",
    name: "Salma Youssef",
    username: "ops.salma",
    status: "Active",
    governorate: "Cairo",
    zone: "Heliopolis",
    managedMaids: 16,
    completedOrders: 221,
    lastMessage: "All accepted orders have confirmed maids."
  }
];

function loadCreatedPartners() {
  try {
    const created = JSON.parse(localStorage.getItem("createdPartners")) || [];
    return created.map((partner) => ({
      ...partner,
      zone: partner.zone || partner.workZone || partner.workZones?.[0] || "Not assigned",
      managedMaids: Number(partner.managedMaids ?? partner.assignedMaidIds?.length ?? 0),
      completedOrders: Number(partner.completedOrders || 0),
      lastMessage: partner.lastMessage || "New partner account created."
    }));
  } catch (error) {
    return [];
  }
}

const operators = [...seedOperators, ...loadCreatedPartners()].filter(
  (partner, index, all) => all.findIndex((item) => item.id === partner.id) === index
);

const operatorsTableBody = document.getElementById("operatorsTableBody");
const operatorSearch = document.getElementById("operatorSearch");
const statusFilter = document.getElementById("statusFilter");
const totalPartners = document.getElementById("totalPartners");
const activePartners = document.getElementById("activePartners");
const managedMaids = document.getElementById("managedMaids");
const completedOrders = document.getElementById("completedOrders");
const addPartnerBtn = document.getElementById("addPartnerBtn");
const exportPartnersBtn = document.getElementById("exportPartnersBtn");
const chatModal = document.getElementById("chatModal");
const chatModalTitle = document.getElementById("chatModalTitle");
const chatPartnerProfile = document.getElementById("chatPartnerProfile");
const chatThread = document.getElementById("chatThread");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatModalClose = document.getElementById("chatModalClose");
const operatorsToast = document.getElementById("operatorsToast");
const operatorDetailsModal = document.getElementById("operatorDetailsModal");
const operatorDetailsTitle = document.getElementById("operatorDetailsTitle");
const operatorDetailsContent = document.getElementById("operatorDetailsContent");
const operatorDetailsClose = document.getElementById("operatorDetailsClose");

let activeChatPartner = null;

function getFilteredPartners() {
  const query = operatorSearch.value.trim().toLowerCase();
  const status = statusFilter.value;

  return operators.filter((operator) => {
    const matchesStatus = status === "all" || operator.status === status;
    const matchesSearch = [operator.name, operator.username, operator.status, operator.governorate, operator.zone, operator.id]
      .join(" ")
      .toLowerCase()
      .includes(query);

    return matchesStatus && matchesSearch;
  });
}

function statusClass(status) {
  return status.toLowerCase();
}

function renderMetrics() {
  totalPartners.textContent = String(operators.length);
  activePartners.textContent = String(operators.filter((operator) => operator.status === "Active").length);
  managedMaids.textContent = String(operators.reduce((sum, operator) => sum + operator.managedMaids, 0));
  completedOrders.textContent = String(operators.reduce((sum, operator) => sum + operator.completedOrders, 0));
}

function renderPartners() {
  const rows = getFilteredPartners();

  if (!rows.length) {
    operatorsTableBody.innerHTML = '<tr><td class="empty-row" colspan="7">No partners match the current filters.</td></tr>';
    return;
  }

  operatorsTableBody.innerHTML = rows
    .map(
      (operator) => `
        <tr>
          <td>
            <div class="operator-name">
              <strong>${operator.name}</strong>
              <span>${operator.username} / ${operator.id}</span>
            </div>
          </td>
          <td><span class="status-pill ${statusClass(operator.status)}">${operator.status}</span></td>
          <td>${operator.governorate}</td>
          <td>${operator.zone}</td>
          <td><strong>${operator.managedMaids}</strong></td>
          <td><strong>${operator.completedOrders}</strong></td>
          <td><div class="operator-action-group"><button class="view-btn" type="button" data-view-partner="${operator.id}">View</button><button class="chat-btn" type="button" data-operator-id="${operator.id}">Chat</button></div></td>
        </tr>
      `
    )
    .join("");

  document.querySelectorAll(".view-btn").forEach((button) => {
    button.addEventListener("click", () => openPartnerDetails(button.dataset.viewPartner));
  });

  document.querySelectorAll(".chat-btn").forEach((button) => {
    button.addEventListener("click", () => openChat(button.dataset.operatorId));
  });
}

function openPartnerDetails(partnerId) {
  window.location.href = `../partner/partner-profile.html?partnerId=${encodeURIComponent(partnerId)}`;
}
function closePartnerDetails() {
  operatorDetailsModal.classList.add("hidden");
  operatorDetailsModal.setAttribute("aria-hidden", "true");
}

function openChat(operatorId) {
  activeChatPartner = operators.find((operator) => operator.id === operatorId);

  if (!activeChatPartner) {
    return;
  }

  chatModalTitle.textContent = `Chat with ${activeChatPartner.name}`;
  chatPartnerProfile.innerHTML = `
    <div><span>Status</span><strong>${activeChatPartner.status}</strong></div>
    <div><span>Work Zone</span><strong>${activeChatPartner.zone}</strong></div>
    <div><span>Managed Maids</span><strong>${activeChatPartner.managedMaids}</strong></div>
    <div><span>Completed Orders</span><strong>${activeChatPartner.completedOrders}</strong></div>
  `;
  chatThread.innerHTML = `
    <div class="chat-message">
      <p>${activeChatPartner.lastMessage}</p>
      <small>${activeChatPartner.name} / Last update</small>
    </div>
  `;

  chatModal.classList.remove("hidden");
  chatModal.setAttribute("aria-hidden", "false");
  chatInput.focus();
}

function closeChat() {
  chatModal.classList.add("hidden");
  chatModal.setAttribute("aria-hidden", "true");
  activeChatPartner = null;
  chatInput.value = "";
}

function showToast(message) {
  operatorsToast.textContent = message;
  operatorsToast.classList.remove("hidden");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    operatorsToast.classList.add("hidden");
  }, 2600);
}

function sendChatMessage(event) {
  event.preventDefault();

  const message = chatInput.value.trim();

  if (!message || !activeChatPartner) {
    return;
  }

  const sentAt = new Date().toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });

  chatThread.insertAdjacentHTML(
    "beforeend",
    `
      <div class="chat-message me">
        <p>${message}</p>
        <small>Admin / ${sentAt}</small>
      </div>
    `
  );

  activeChatPartner.lastMessage = message;
  chatInput.value = "";
  showToast(`Message sent to ${activeChatPartner.name}.`);
}

function exportPartners() {
  const rows = getFilteredPartners();
  showToast(`Prepared export for ${rows.length} partners.`);
}

operatorSearch.addEventListener("input", renderPartners);
statusFilter.addEventListener("change", renderPartners);
addPartnerBtn.addEventListener("click", () => {
  window.location.href = "./add-operators.html";
});
exportPartnersBtn.addEventListener("click", exportPartners);
chatForm.addEventListener("submit", sendChatMessage);
operatorDetailsClose.addEventListener("click", closePartnerDetails);
operatorDetailsModal.addEventListener("click", (event) => {
  if (event.target === operatorDetailsModal) closePartnerDetails();
});
chatModalClose.addEventListener("click", closeChat);
chatModal.addEventListener("click", (event) => {
  if (event.target === chatModal) {
    closeChat();
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !chatModal.classList.contains("hidden")) {
    closeChat();
  }
});

renderMetrics();
renderPartners();






