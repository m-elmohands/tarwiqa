const cancelledOrdersDropdownBtn = document.getElementById("ordersDropdownBtn");
const cancelledOrdersDropdownContainer = cancelledOrdersDropdownBtn?.closest(".dropdown-block");
const cancelledOrdersTableBody = document.getElementById("cancelledOrdersTableBody");
const cancelledSearchTypeSelect = document.getElementById("cancelledSearchTypeSelect");
const cancelledSearchInput = document.getElementById("cancelledSearchInput");
const cancelledSortSelect = document.getElementById("cancelledSortSelect");
const cancelledCountMetric = document.getElementById("cancelledCountMetric");
const customerCancelledMetric = document.getElementById("customerCancelledMetric");
const opsRejectedMetric = document.getElementById("opsRejectedMetric");
const refundValueMetric = document.getElementById("refundValueMetric");
const cancelledOrderModal = document.getElementById("cancelledOrderModal");
const cancelledOrderModalContent = document.getElementById("cancelledOrderModalContent");
const closeCancelledOrderModalBtn = document.getElementById("closeCancelledOrderModalBtn");
const closeCancelledOrderFooterBtn = document.getElementById("closeCancelledOrderFooterBtn");

const cancelledOrders = [
  {
    id: "#ORD-7312",
    userName: "Salma Hany",
    city: "Tanta",
    widget: "Cleaning",
    category: "Kitchen Cleaning",
    price: 860,
    orderDate: "2026-04-22",
    orderDateLabel: "22 Apr 2026",
    cancelledDate: "2026-04-22",
    cancelledDateLabel: "22 Apr 2026",
    reason: "Customer schedule conflict",
    status: "Cancelled Order",
    refundStatus: "Refunded to wallet",
  },
  {
    id: "#ORD-7289",
    userName: "Karim Emad",
    city: "Mansoura",
    widget: "Maintenance",
    category: "AC Service",
    price: 980,
    orderDate: "2026-04-21",
    orderDateLabel: "21 Apr 2026",
    cancelledDate: "2026-04-21",
    cancelledDateLabel: "21 Apr 2026",
    reason: "Technician unavailable",
    status: "Cancelled Order",
    refundStatus: "Refunded to card",
  },
  {
    id: "#ORD-7264",
    userName: "Omar Hany",
    city: "Cairo",
    widget: "Cleaning",
    category: "Move In Service",
    price: 1650,
    orderDate: "2026-04-20",
    orderDateLabel: "20 Apr 2026",
    cancelledDate: "2026-04-20",
    cancelledDateLabel: "20 Apr 2026",
    reason: "Payment not confirmed",
    status: "Cancelled Order",
    refundStatus: "No capture collected",
  },
  {
    id: "#ORD-7240",
    userName: "Nour Hassan",
    city: "Giza",
    widget: "Laundry",
    category: "Office Service",
    price: 1750,
    orderDate: "2026-04-19",
    orderDateLabel: "19 Apr 2026",
    cancelledDate: "2026-04-19",
    cancelledDateLabel: "19 Apr 2026",
    reason: "Address verification issue",
    status: "Cancelled Order",
    refundStatus: "Refunded to wallet",
  },
];

if (cancelledOrdersDropdownBtn && cancelledOrdersDropdownContainer) {
  cancelledOrdersDropdownBtn.addEventListener("click", () => {
    cancelledOrdersDropdownContainer.classList.toggle("open");
  });
}

function formatCurrency(value) {
  return `EGP ${value.toLocaleString("en-US")}`;
}

function getFilteredCancelledOrders() {
  const searchType = cancelledSearchTypeSelect.value;
  const query = cancelledSearchInput.value.trim().toLowerCase();

  let filtered = [...cancelledOrders];

  if (query) {
    filtered = filtered.filter((order) => String(order[searchType]).toLowerCase().includes(query));
  }

  switch (cancelledSortSelect.value) {
    case "priceDesc":
      filtered.sort((left, right) => right.price - left.price);
      break;
    case "reasonAsc":
      filtered.sort((left, right) => left.reason.localeCompare(right.reason));
      break;
    default:
      filtered.sort((left, right) => right.cancelledDate.localeCompare(left.cancelledDate));
      break;
  }

  return filtered;
}

function renderCancelledMetrics(orders) {
  cancelledCountMetric.textContent = String(orders.length);
  customerCancelledMetric.textContent = String(
    orders.filter((order) => order.reason.toLowerCase().includes("customer")).length
  );
  opsRejectedMetric.textContent = String(
    orders.filter((order) => !order.reason.toLowerCase().includes("customer")).length
  );
  refundValueMetric.textContent = formatCurrency(
    orders.filter((order) => order.refundStatus !== "No capture collected").reduce((sum, order) => sum + order.price, 0)
  );
}

function renderCancelledOrders() {
  const orders = getFilteredCancelledOrders();

  cancelledOrdersTableBody.innerHTML = orders
    .map(
      (order) => `
        <tr>
          <td>${order.id}</td>
          <td>${order.userName}</td>
          <td>${order.city}</td>
          <td>${order.widget}</td>
          <td>${order.category}</td>
          <td>${formatCurrency(order.price)}</td>
          <td>${order.orderDateLabel}</td>
          <td>${order.cancelledDateLabel}</td>
          <td>${order.reason}</td>
          <td><span class="status-pill banned">${order.status}</span></td>
          <td><button class="row-action view" type="button" data-cancelled-order-id="${order.id}">View</button></td>
        </tr>
      `
    )
    .join("");

  renderCancelledMetrics(orders);
  bindCancelledOrderActions();
}

function openCancelledOrderModal(orderId) {
  const order = cancelledOrders.find((item) => item.id === orderId);

  if (!order) {
    return;
  }

  cancelledOrderModalContent.innerHTML = `
    <label class="field readonly-field"><span>Order ID</span><input type="text" value="${order.id}" readonly /></label>
    <label class="field readonly-field"><span>User Name</span><input type="text" value="${order.userName}" readonly /></label>
    <label class="field readonly-field"><span>City</span><input type="text" value="${order.city}" readonly /></label>
    <label class="field readonly-field"><span>Widget</span><input type="text" value="${order.widget}" readonly /></label>
    <label class="field readonly-field"><span>Category</span><input type="text" value="${order.category}" readonly /></label>
    <label class="field readonly-field"><span>Price</span><input type="text" value="${formatCurrency(order.price)}" readonly /></label>
    <label class="field readonly-field"><span>Order Date</span><input type="text" value="${order.orderDateLabel}" readonly /></label>
    <label class="field readonly-field"><span>Cancelled Date</span><input type="text" value="${order.cancelledDateLabel}" readonly /></label>
    <label class="field readonly-field"><span>Refund Status</span><input type="text" value="${order.refundStatus}" readonly /></label>
    <label class="field readonly-field wide-field"><span>Cancellation Reason</span><input type="text" value="${order.reason}" readonly /></label>
  `;

  cancelledOrderModal.classList.remove("hidden");
}

function closeCancelledOrderModal() {
  cancelledOrderModal.classList.add("hidden");
}

function bindCancelledOrderActions() {
  document.querySelectorAll("[data-cancelled-order-id]").forEach((button) => {
    button.addEventListener("click", () => {
      openCancelledOrderModal(button.dataset.cancelledOrderId);
    });
  });
}

cancelledSearchTypeSelect?.addEventListener("change", renderCancelledOrders);
cancelledSearchInput?.addEventListener("input", renderCancelledOrders);
cancelledSortSelect?.addEventListener("change", renderCancelledOrders);
closeCancelledOrderModalBtn?.addEventListener("click", closeCancelledOrderModal);
closeCancelledOrderFooterBtn?.addEventListener("click", closeCancelledOrderModal);
cancelledOrderModal?.addEventListener("click", (event) => {
  if (event.target === cancelledOrderModal) {
    closeCancelledOrderModal();
  }
});

renderCancelledOrders();
