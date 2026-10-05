const ordersDropdownBtn = document.getElementById("ordersDropdownBtn");
const ordersDropdownContainer = ordersDropdownBtn?.closest(".dropdown-block");
const doneOrdersTableBody = document.getElementById("doneOrdersTableBody");
const doneSearchTypeSelect = document.getElementById("doneSearchTypeSelect");
const doneSearchInput = document.getElementById("doneSearchInput");
const doneSortSelect = document.getElementById("doneSortSelect");
const doneCountMetric = document.getElementById("doneCountMetric");
const doneRevenueMetric = document.getElementById("doneRevenueMetric");
const doneTopCityMetric = document.getElementById("doneTopCityMetric");
const doneAvgTimeMetric = document.getElementById("doneAvgTimeMetric");
const doneOrderModal = document.getElementById("doneOrderModal");
const doneOrderModalContent = document.getElementById("doneOrderModalContent");
const closeDoneOrderModalBtn = document.getElementById("closeDoneOrderModalBtn");
const closeDoneOrderFooterBtn = document.getElementById("closeDoneOrderFooterBtn");
const exportDoneOrdersBtn = document.getElementById("exportDoneOrdersBtn");

const doneOrders = [
  {
    id: "#ORD-7421",
    userName: "mariam ashraf awad",
    city: "Cairo",
    widget: "Cleaning",
    category: "Home Cleaning",
    packageName: "Premium Deep Clean",
    finalPrice: 2400,
    assignedMaid: "Amina Mostafa",
    orderDate: "2026-04-22",
    orderDateLabel: "22 Apr 2026",
    doneDate: "2026-04-22",
    doneDateLabel: "22 Apr 2026",
    duration: "2h 10m",
    status: "Done Orders",
    notes: "Customer confirmed full satisfaction after completion.",
  },
  {
    id: "#ORD-7398",
    userName: "Youssef Adel",
    city: "Alexandria",
    widget: "Cleaning",
    category: "Move In Service",
    packageName: "Gold Package",
    finalPrice: 2100,
    assignedMaid: "Hoda Ali",
    orderDate: "2026-04-21",
    orderDateLabel: "21 Apr 2026",
    doneDate: "2026-04-21",
    doneDateLabel: "21 Apr 2026",
    duration: "2h 25m",
    status: "Done Orders",
    notes: "Property handover checklist completed successfully.",
  },
  {
    id: "#ORD-7364",
    userName: "Nour Hassan",
    city: "Giza",
    widget: "Laundry",
    category: "Office Service",
    packageName: "Business Standard",
    finalPrice: 1750,
    assignedMaid: "Amal Fathy",
    orderDate: "2026-04-20",
    orderDateLabel: "20 Apr 2026",
    doneDate: "2026-04-20",
    doneDateLabel: "20 Apr 2026",
    duration: "2h 18m",
    status: "Done Orders",
    notes: "Office cleaning completed before opening hours.",
  },
  {
    id: "#ORD-7340",
    userName: "Karim Emad",
    city: "Mansoura",
    widget: "Maintenance",
    category: "AC Service",
    packageName: "Premium AC Care",
    finalPrice: 1450,
    assignedMaid: "Eman Yasser",
    orderDate: "2026-04-19",
    orderDateLabel: "19 Apr 2026",
    doneDate: "2026-04-19",
    doneDateLabel: "19 Apr 2026",
    duration: "1h 54m",
    status: "Done Orders",
    notes: "Cooling issue fully resolved and tested.",
  },
];

const completedOrderDetails = {
  "#ORD-7421": { address: "12 Nile Corniche, Maadi, Cairo", createdDate: "22 Apr 2026, 08:15 AM", totalPrice: 2600, wallet: 100, deposit: 250, discount: 350, paymentMethod: "E-Wallet", arrivalTime: "09:00 AM", assignedMaids: ["Amina Mostafa", "Hoda Ali"], assignedPartner: "Cairo Premium Partner", extras: ["Deep Cleaning Kit", "Window Cleaning"] },
  "#ORD-7398": { address: "18 Fawzy Moaz Street, Smouha, Alexandria", createdDate: "21 Apr 2026, 09:30 AM", totalPrice: 2300, wallet: 0, deposit: 300, discount: 200, paymentMethod: "Cash", arrivalTime: "10:00 AM", assignedMaids: ["Hoda Ali"], assignedPartner: "Alexandria Service Partner", extras: ["Kitchen Sanitizing"] },
  "#ORD-7364": { address: "9 Tahrir Street, Dokki, Giza", createdDate: "20 Apr 2026, 06:40 AM", totalPrice: 1900, wallet: 100, deposit: 200, discount: 250, paymentMethod: "Bank Transfer", arrivalTime: "08:00 AM", assignedMaids: ["Amal Fathy", "Eman Yasser"], assignedPartner: "Giza Operations Partner", extras: ["Ironing", "Carpet Refresh"] },
  "#ORD-7340": { address: "17 El Gomhoria Street, Mansoura", createdDate: "19 Apr 2026, 11:10 AM", totalPrice: 1600, wallet: 50, deposit: 200, discount: 300, paymentMethod: "Cash", arrivalTime: "01:00 PM", assignedMaids: ["Eman Yasser"], assignedPartner: "Delta Services Partner", extras: ["Fridge Cleaning"] }
};

doneOrders.forEach((order) => Object.assign(order, completedOrderDetails[order.id] || {}));
if (ordersDropdownBtn && ordersDropdownContainer) {
  ordersDropdownBtn.addEventListener("click", () => {
    ordersDropdownContainer.classList.toggle("open");
  });
}

function formatCurrency(value) {
  return `EGP ${value.toLocaleString("en-US")}`;
}

function getFilteredDoneOrders() {
  const searchType = doneSearchTypeSelect.value;
  const query = doneSearchInput.value.trim().toLowerCase();

  let filtered = [...doneOrders];

  if (query) {
    filtered = filtered.filter((order) => String(order[searchType]).toLowerCase().includes(query));
  }

  switch (doneSortSelect.value) {
    case "priceDesc":
      filtered.sort((left, right) => right.finalPrice - left.finalPrice);
      break;
    case "cityAsc":
      filtered.sort((left, right) => left.city.localeCompare(right.city));
      break;
    default:
      filtered.sort((left, right) => right.doneDate.localeCompare(left.doneDate));
      break;
  }

  return filtered;
}

function renderDoneMetrics(orders) {
  doneCountMetric.textContent = String(orders.length);
  doneRevenueMetric.textContent = formatCurrency(orders.reduce((sum, order) => sum + order.finalPrice, 0));

  const cityCounts = orders.reduce((accumulator, order) => {
    accumulator[order.city] = (accumulator[order.city] || 0) + 1;
    return accumulator;
  }, {});
  doneTopCityMetric.textContent =
    Object.entries(cityCounts).sort((left, right) => right[1] - left[1])[0]?.[0] || "N/A";
  doneAvgTimeMetric.textContent = orders.length ? "2h 12m" : "0h 00m";
}

function renderDoneOrders() {
  const orders = getFilteredDoneOrders();

  doneOrdersTableBody.innerHTML = orders
    .map(
      (order) => `
        <tr>
          <td>${order.id}</td>
          <td>${order.userName}</td>
          <td>${order.city}</td>
          <td>${order.widget}</td>
          <td>${order.category}</td>
          <td>${order.packageName}</td>
          <td>${formatCurrency(order.finalPrice)}</td>
          <td>${order.assignedMaid}</td>
          <td>${order.orderDateLabel}</td>
          <td>${order.doneDateLabel}</td>
          <td><span class="status-pill active">${order.status}</span></td>
          <td><div class="action-group"><button class="row-action view" type="button" data-done-action="view" data-done-order-id="${order.id}">View</button><button class="row-action print" type="button" data-done-action="print" data-done-order-id="${order.id}">Print</button></div></td>
        </tr>
      `
    )
    .join("");

  renderDoneMetrics(orders);
  bindDoneOrderActions();
}

function escapeHtml(value) {
  return String(value ?? "-")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getDoneOrderDetails(order) {
  return [
    ["Order ID", order.id],
    ["Account User Name", order.userName],
    ["City", order.city],
    ["Customer Address", order.address],
    ["Widget", order.widget],
    ["Category", order.category],
    ["Package", order.packageName],
    ["Created Date", order.createdDate],
    ["Total Price", formatCurrency(order.totalPrice)],
    ["Wallet", formatCurrency(order.wallet)],
    ["Deposit", formatCurrency(order.deposit)],
    ["Discount", formatCurrency(order.discount)],
    ["Final Price", formatCurrency(order.finalPrice)],
    ["Status", order.status],
    ["Payment Method", order.paymentMethod],
    ["Order Date", order.orderDateLabel],
    ["Arrival Time", order.arrivalTime],
    ["Assigned Maids", order.assignedMaids.join(", ") || "Not Assigned"],
    ["Assigned Partner", order.assignedPartner || "Not Assigned"],
    ["Selected Extras", order.extras.join(", ") || "No Extras"],
    ["Done Date", order.doneDateLabel],
    ["Completion Duration", order.duration],
    ["Completion Notes", order.notes]
  ];
}

function openDoneOrderModal(orderId) {
  const order = doneOrders.find((item) => item.id === orderId);
  if (!order) return;

  doneOrderModalContent.innerHTML = getDoneOrderDetails(order)
    .map(([label, value]) => `
      <div class="field readonly-field done-detail-field">
        <span>${escapeHtml(label)}</span>
        <div class="readonly-value">${escapeHtml(value)}</div>
      </div>
    `)
    .join("");

  doneOrderModal.classList.remove("hidden");
}

function printDoneOrder(orderId) {
  const order = doneOrders.find((item) => item.id === orderId);
  if (!order) return;

  const printWindow = window.open("", "_blank", "width=960,height=760");
  if (!printWindow) return;

  const details = getDoneOrderDetails(order)
    .map(([label, value]) => `<div class="detail"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`)
    .join("");

  printWindow.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(order.id)} - Done Order</title><style>body{font-family:Arial,sans-serif;color:#172033;margin:32px}header{border-bottom:2px solid #071a3d;padding-bottom:18px;margin-bottom:22px}h1{margin:0 0 8px}.meta{color:#667085}.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.detail{border:1px solid #dfe4ec;border-radius:8px;padding:12px}.detail span{display:block;color:#667085;font-size:12px;margin-bottom:6px}.detail strong{font-size:14px;word-break:break-word}@media print{body{margin:18mm}.detail{break-inside:avoid}}</style></head><body><header><h1>Done Order ${escapeHtml(order.id)}</h1><div class="meta">Complete order details</div></header><main class="grid">${details}</main></body></html>`);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
}
function closeDoneOrderModal() {
  doneOrderModal.classList.add("hidden");
}

function exportDoneOrders() {
  const headers = getDoneOrderDetails(doneOrders[0]).map(([label]) => label);
  const rows = getFilteredDoneOrders().map((order) => getDoneOrderDetails(order).map(([, value]) => value));
  const csv = [headers, ...rows]
    .map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(","))
    .join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "done-orders.csv";
  link.click();
  URL.revokeObjectURL(url);
}
function bindDoneOrderActions() {
  document.querySelectorAll("[data-done-action]").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.doneAction === "print") {
        printDoneOrder(button.dataset.doneOrderId);
      } else {
        openDoneOrderModal(button.dataset.doneOrderId);
      }
    });
  });
}
doneSearchTypeSelect?.addEventListener("change", renderDoneOrders);
doneSearchInput?.addEventListener("input", renderDoneOrders);
doneSortSelect?.addEventListener("change", renderDoneOrders);
exportDoneOrdersBtn?.addEventListener("click", exportDoneOrders);
closeDoneOrderModalBtn?.addEventListener("click", closeDoneOrderModal);
closeDoneOrderFooterBtn?.addEventListener("click", closeDoneOrderModal);
doneOrderModal?.addEventListener("click", (event) => {
  if (event.target === doneOrderModal) {
    closeDoneOrderModal();
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !doneOrderModal.classList.contains("hidden")) {
    closeDoneOrderModal();
  }
});

renderDoneOrders();
