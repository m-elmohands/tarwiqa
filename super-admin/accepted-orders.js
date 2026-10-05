const ordersDropdownBtn = document.getElementById("ordersDropdownBtn");
const ordersDropdownContainer = ordersDropdownBtn?.closest(".dropdown-block");
const ordersTableBody = document.getElementById("ordersTableBody");
const searchTypeSelect = document.getElementById("searchTypeSelect");
const searchInput = document.getElementById("searchInput");
const dateSearchInput = document.getElementById("dateSearchInput");
const dateSearchField = document.getElementById("dateSearchField");
const sortSelect = document.getElementById("sortSelect");
const clearFiltersBtn = document.getElementById("clearFiltersBtn");
const openAddOrderBtn = document.getElementById("openAddOrderBtn");
const reviewCount = document.getElementById("reviewCount");
const highestPriceMetric = document.getElementById("highestPriceMetric");
const todayRequestsMetric = document.getElementById("todayRequestsMetric");
const earliestArrivalMetric = document.getElementById("earliestArrivalMetric");

const editOrderModal = document.getElementById("editOrderModal");
const editOrderForm = document.getElementById("editOrderForm");
const editOrderTitle = document.getElementById("editOrderTitle");
const closeEditModalBtn = document.getElementById("closeEditModalBtn");
const cancelEditBtn = document.getElementById("cancelEditBtn");
const modalOrderId = document.getElementById("modalOrderId");
const modalUserName = document.getElementById("modalUserName");
const modalCity = document.getElementById("modalCity");
const modalAddressSelect = document.getElementById("modalAddressSelect");
const modalCreatedDate = document.getElementById("modalCreatedDate");
const modalTotalPrice = document.getElementById("modalTotalPrice");
const modalWallet = document.getElementById("modalWallet");
const modalDeposit = document.getElementById("modalDeposit");
const modalDiscount = document.getElementById("modalDiscount");
const modalFinalPrice = document.getElementById("modalFinalPrice");
const modalStatus = document.getElementById("modalStatus");
const modalPaymentMethod = document.getElementById("modalPaymentMethod");
const modalOrderDate = document.getElementById("modalOrderDate");
const modalArrivalTime = document.getElementById("modalArrivalTime");
const modalMaidSelect = document.getElementById("modalMaidSelect");
const modalPartnerSelect = document.getElementById("modalPartnerSelect");
const modalExtrasSelect = document.getElementById("modalExtrasSelect");
const modalBreakdownValue = document.getElementById("modalBreakdownValue");
const modalSelectedAddressValue = document.getElementById("modalSelectedAddressValue");
const modalAssignedMaidValue = document.getElementById("modalAssignedMaidValue");
const modalAssignedPartnerValue = document.getElementById("modalAssignedPartnerValue");
const modalExtrasValue = document.getElementById("modalExtrasValue");

const addOrderModal = document.getElementById("addOrderModal");
const addOrderForm = document.getElementById("addOrderForm");
const closeAddModalBtn = document.getElementById("closeAddModalBtn");
const cancelAddBtn = document.getElementById("cancelAddBtn");
const addOrderId = document.getElementById("addOrderId");
const customerSearchType = document.getElementById("customerSearchType");
const customerSearchInput = document.getElementById("customerSearchInput");
const addUserName = document.getElementById("addUserName");
const addCitySelect = document.getElementById("addCitySelect");
const addWidgetSelect = document.getElementById("addWidgetSelect");
const addCategorySelect = document.getElementById("addCategorySelect");
const addPackageSelect = document.getElementById("addPackageSelect");
const addAddressInput = document.getElementById("addAddressInput");
const addCreatedDate = document.getElementById("addCreatedDate");
const addTotalPrice = document.getElementById("addTotalPrice");
const addWallet = document.getElementById("addWallet");
const addDeposit = document.getElementById("addDeposit");
const addDiscount = document.getElementById("addDiscount");
const addFinalPrice = document.getElementById("addFinalPrice");
const addStatus = document.getElementById("addStatus");
const addPaymentMethod = document.getElementById("addPaymentMethod");
const addOrderDate = document.getElementById("addOrderDate");
const addArrivalTime = document.getElementById("addArrivalTime");
const addMaidSelect = document.getElementById("addMaidSelect");
const addPartnerSelect = document.getElementById("addPartnerSelect");
const addExtrasSelect = document.getElementById("addExtrasSelect");
const addBreakdownValue = document.getElementById("addBreakdownValue");
const addAssignedMaidValue = document.getElementById("addAssignedMaidValue");
const addAssignedPartnerValue = document.getElementById("addAssignedPartnerValue");
const addExtrasValue = document.getElementById("addExtrasValue");

const activeMaids = ["Amina Mostafa", "Hoda Ali", "Amal Fathy", "Eman Yasser", "Reham Ashraf", "Aya Tarek"];
const activePartners = [
  { name: "Mona Adel", governorate: "Cairo" },
  { name: "Karim Samir", governorate: "Cairo" },
  { name: "Nour Hassan", governorate: "Cairo" },
  { name: "Ahmed Fathy", governorate: "Giza" },
  { name: "Salma Youssef", governorate: "Cairo" }
];
const defaultExtras = ["Deep Cleaning Kit", "Ironing", "Window Cleaning", "Kitchen Sanitizing", "Carpet Refresh", "Fridge Cleaning"];
const temporarilyDeletedExtras = (() => {
  try {
    const stored = JSON.parse(localStorage.getItem("temporarilyDeletedExtras"));
    return Array.isArray(stored) ? stored : [];
  } catch (error) {
    return [];
  }
})();
const customExtras = (() => {
  try {
    const stored = JSON.parse(localStorage.getItem("customExtrasCatalog"));
    return Array.isArray(stored) ? stored.map((extra) => extra.name).filter(Boolean) : [];
  } catch (error) {
    return [];
  }
})();
const activeExtras = [...new Set([...defaultExtras, ...customExtras])].filter((extra) => !temporarilyDeletedExtras.includes(extra));

const customers = [
  { userId: "#USR-102938", phone: "+201095550198", name: "Mariam Kamal" },
  { userId: "#USR-204511", phone: "+201113450011", name: "Youssef Adel" },
  { userId: "#USR-318900", phone: "+201225900144", name: "Nour Hassan" },
  { userId: "#USR-442300", phone: "+201066120077", name: "Salma Emad" },
  { userId: "#USR-559910", phone: "+201288700035", name: "Omar Hany" },
  { userId: "#USR-661104", phone: "+201027700551", name: "Aya Tarek" }
];

const customerAddressBook = {
  "Mariam Kamal": ["12 Nile Corniche, Maadi", "34 Road 9, Maadi", "15 New Cairo First Settlement"],
  "Youssef Adel": ["45 Tahrir St, Dokki", "18 Lebanon Square, Mohandessin", "7 Sheikh Zayed District 2"],
  "Nour Hassan": ["21 El-Horreya Rd, Roushdy", "14 Smouha Square, Alexandria", "8 Sidi Gaber Road"],
  "Salma Emad": ["88 Abbas El Akkad, Nasr City", "22 Makram Ebeid, Nasr City", "5 Heliopolis Square"],
  "Omar Hany": ["17 El Gomhoria St, Mansoura", "40 El Mashaya, Mansoura"],
  "Aya Tarek": ["9 El Nozha St, Heliopolis", "13 El Merghany St, Heliopolis", "6 New Cairo Fifth Settlement"]
};
const serviceCatalog = {
  Cairo: {
    widgets: {
      Cleaning: {
        categories: {
          "Home Cleaning": [
            { name: "Premium Deep Clean", price: 2400 },
            { name: "Express Plus", price: 860 }
          ],
          "Move In Service": [
            { name: "Gold Package", price: 2100 },
            { name: "Silver Package", price: 1650 }
          ],
          "Kitchen Cleaning": [
            { name: "Kitchen Pro", price: 990 },
            { name: "Express Plus", price: 860 }
          ]
        }
      },
      Maintenance: {
        categories: {
          "AC Service": [
            { name: "Summer Check", price: 980 },
            { name: "Premium AC Care", price: 1450 }
          ]
        }
      }
    }
  },
  Giza: {
    widgets: {
      Cleaning: {
        categories: {
          "Office Service": [
            { name: "Business Standard", price: 1750 },
            { name: "Business Premium", price: 2400 }
          ]
        }
      },
      Laundry: {
        categories: {
          "Wash & Fold": [
            { name: "Family Bundle", price: 620 },
            { name: "Large Bundle", price: 880 }
          ]
        }
      }
    }
  },
  Alexandria: {
    widgets: {
      Maintenance: {
        categories: {
          "AC Service": [
            { name: "Summer Check", price: 980 },
            { name: "Coastal Care", price: 1320 }
          ]
        }
      },
      Cleaning: {
        categories: {
          "Home Cleaning": [
            { name: "Sea Breeze Package", price: 1540 },
            { name: "Premium Deep Clean", price: 2290 }
          ]
        }
      }
    }
  },
  Mansoura: {
    widgets: {
      Laundry: {
        categories: {
          "Wash & Fold": [
            { name: "Family Bundle", price: 620 },
            { name: "Quick Laundry", price: 420 }
          ]
        }
      }
    }
  }
};

const orders = [
  { id: "ORD-9102", userName: "Mariam Kamal", userLink: "./index.html", city: "Cairo", widget: "Cleaning", category: "Home Cleaning", packageName: "Premium Deep Clean", totalPrice: 2400, wallet: 250, deposit: 300, discount: 100, address: "12 Nile Corniche, Maadi", createdDate: "2026-04-23 09:10 AM", orderDate: "2026-04-25", arrivalTime: "08:00", queueOrder: 1, status: "Accepted Orders", paymentMethod: "Cash", maid: "Amina Mostafa", extras: ["Deep Cleaning Kit", "Ironing"] },
  { id: "ORD-9105", userName: "Youssef Adel", userLink: "./index.html", city: "Giza", widget: "Cleaning", category: "Office Service", packageName: "Business Standard", totalPrice: 1750, wallet: 0, deposit: 400, discount: 50, address: "45 Tahrir St, Dokki", createdDate: "2026-04-23 09:35 AM", orderDate: "2026-04-24", arrivalTime: "13:00", queueOrder: 2, status: "Accepted Orders", paymentMethod: "Bank Transfer", maid: "Hoda Ali", extras: ["Window Cleaning"] },
  { id: "ORD-9108", userName: "Nour Hassan", userLink: "./index.html", city: "Alexandria", widget: "Maintenance", category: "AC Service", packageName: "Summer Check", totalPrice: 980, wallet: 80, deposit: 100, discount: 0, address: "21 El-Horreya Rd, Roushdy", createdDate: "2026-04-23 10:05 AM", orderDate: "2026-04-26", arrivalTime: "11:00", queueOrder: 3, status: "Accepted Orders", paymentMethod: "E-Wallet", maid: "Amal Fathy", extras: ["Fridge Cleaning"] },
  { id: "ORD-9111", userName: "Salma Emad", userLink: "./index.html", city: "Cairo", widget: "Cleaning", category: "Move In Service", packageName: "Gold Package", totalPrice: 2100, wallet: 100, deposit: 250, discount: 75, address: "88 Abbas El Akkad, Nasr City", createdDate: "2026-04-23 10:48 AM", orderDate: "2026-04-24", arrivalTime: "09:30", queueOrder: 4, status: "Accepted Orders", paymentMethod: "Cash", maid: "Eman Yasser", extras: ["Kitchen Sanitizing", "Carpet Refresh"] },
  { id: "ORD-9114", userName: "Omar Hany", userLink: "./index.html", city: "Mansoura", widget: "Laundry", category: "Wash & Fold", packageName: "Family Bundle", totalPrice: 620, wallet: 0, deposit: 120, discount: 20, address: "17 El Gomhoria St, Mansoura", createdDate: "2026-04-23 11:22 AM", orderDate: "2026-04-27", arrivalTime: "15:00", queueOrder: 5, status: "Accepted Orders", paymentMethod: "Cash", maid: "Reham Ashraf", extras: [] },
  { id: "ORD-9117", userName: "Aya Tarek", userLink: "./index.html", city: "Cairo", widget: "Cleaning", category: "Kitchen Cleaning", packageName: "Express Plus", totalPrice: 860, wallet: 60, deposit: 120, discount: 30, address: "9 El Nozha St, Heliopolis", createdDate: "2026-04-23 12:02 PM", orderDate: "2026-04-25", arrivalTime: "18:00", queueOrder: 6, status: "Accepted Orders", paymentMethod: "E-Wallet", maid: "Aya Tarek", extras: ["Ironing"] }
];
orders.forEach((order, index) => {
  if (!order.partner) order.partner = activePartners[index % activePartners.length].name;
  if (!Array.isArray(order.maids)) order.maids = order.maid ? [order.maid] : [];
});

let activeOrderId = null;
let activeOrderMode = "edit";

function formatCurrency(value) {
  return `EGP ${Number(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatTimeLabel(value) {
  const [hours, minutes] = value.split(":").map(Number);
  const suffix = hours >= 12 ? "PM" : "AM";
  const normalized = hours % 12 || 12;
  return `${String(normalized).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

function getStatusClass(status) {
  return status.toLowerCase().replace(/\s+/g, "-");
}

function nowLabel() {
  return "2026-04-23 02:30 PM";
}

function nextOrderId() {
  const max = orders.reduce((acc, order) => Math.max(acc, Number(order.id.replace("ORD-", ""))), 9100);
  return `ORD-${max + 1}`;
}

function populateReferenceLists() {
  const maidOptions = '<option value="">Not Assigned</option>' + activeMaids.map((maid) => `<option value="${maid}">${maid}</option>`).join("");
  const extrasOptions = activeExtras.map((extra) => `<option value="${extra}">${extra}</option>`).join("");
  const partnerOptions = '<option value="">Not Assigned</option>' + activePartners.map((partner) => `<option value="${partner.name}">${partner.name} - ${partner.governorate}</option>`).join("");
  modalMaidSelect.innerHTML = maidOptions;
  addMaidSelect.innerHTML = maidOptions;
  modalPartnerSelect.innerHTML = partnerOptions;
  addPartnerSelect.innerHTML = partnerOptions;
  modalPartnerSelect.multiple = false;
  addPartnerSelect.multiple = false;
  modalExtrasSelect.innerHTML = extrasOptions;
  addExtrasSelect.innerHTML = extrasOptions;
}

function populateCityOptions() {
  addCitySelect.innerHTML = Object.keys(serviceCatalog).map((city) => `<option value="${city}">${city}</option>`).join("");
}

function syncServiceSelectors() {
  const city = addCitySelect.value;
  const widgets = Object.keys(serviceCatalog[city].widgets);
  addWidgetSelect.innerHTML = widgets.map((widget) => `<option value="${widget}">${widget}</option>`).join("");
  syncCategoryOptions();
}

function syncCategoryOptions() {
  const city = addCitySelect.value;
  const widget = addWidgetSelect.value;
  const categories = Object.keys(serviceCatalog[city].widgets[widget].categories);
  addCategorySelect.innerHTML = categories.map((category) => `<option value="${category}">${category}</option>`).join("");
  syncPackageOptions();
}

function syncPackageOptions() {
  const city = addCitySelect.value;
  const widget = addWidgetSelect.value;
  const category = addCategorySelect.value;
  const packages = serviceCatalog[city].widgets[widget].categories[category];
  addPackageSelect.innerHTML = packages.map((item) => `<option value="${item.name}" data-price="${item.price}">${item.name}</option>`).join("");
  const selected = addPackageSelect.selectedOptions[0];
  if (selected) addTotalPrice.value = selected.dataset.price;
  updateAddModalComputedValues();
}

function findCustomer() {
  const query = customerSearchInput.value.trim().toLowerCase();
  const byPhone = customerSearchType.value === "phone";
  const customer = customers.find((item) => (byPhone ? item.phone.toLowerCase() === query : item.userId.toLowerCase() === query));
  addUserName.value = customer ? customer.name : "No matching customer";
}

function updateSummaryMetrics() {
  reviewCount.textContent = String(orders.length);
  highestPriceMetric.textContent = formatCurrency(Math.max(...orders.map((order) => order.totalPrice)));
  todayRequestsMetric.textContent = String(orders.filter((order) => order.createdDate.startsWith("2026-04-23")).length);
  earliestArrivalMetric.textContent = formatTimeLabel([...orders].sort((a, b) => a.arrivalTime.localeCompare(b.arrivalTime))[0].arrivalTime);
}

function renderRows(items) {
  updateSummaryMetrics();
  if (!items.length) {
    ordersTableBody.innerHTML = '<tr><td colspan="13" class="empty-state">No orders match the current filters.</td></tr>';
    return;
  }
  ordersTableBody.innerHTML = items.map((order) => `
    <tr>
      <td>${order.id}</td>
      <td><a class="user-link" href="${order.userLink}"><span>${order.userName}</span><small>Open user profile</small></a></td>
      <td>${order.city}</td>
      <td>${order.widget}</td>
      <td>${order.category}</td>
      <td>${order.packageName}</td>
      <td><span class="price">${formatCurrency(order.totalPrice)}</span></td>
      <td><span class="address-cell">${order.address}</span></td>
      <td>${order.createdDate}</td>
      <td>${order.orderDate}</td>
      <td>${formatTimeLabel(order.arrivalTime)}</td>
      <td><span class="status-badge ${getStatusClass(order.status)}">${order.status}</span></td>
      <td><div class="action-group"><button class="row-action view" type="button" data-action="view" data-order-id="${order.id}">View</button><button class="row-action edit" type="button" data-action="edit" data-order-id="${order.id}">Edit</button><button class="row-action delete" type="button" data-action="delete" data-order-id="${order.id}">Delete</button></div></td>
    </tr>
  `).join("");
}

function getFilteredOrders() {
  const searchType = searchTypeSelect.value;
  const textQuery = searchInput.value.trim().toLowerCase();
  const dateQuery = dateSearchInput.value;
  let filtered = orders.filter((order) => {
    if (searchType === "orderDate") return !dateQuery || order.orderDate === dateQuery;
    if (!textQuery) return true;
    if (searchType === "orderId") return order.id.toLowerCase().includes(textQuery);
    if (searchType === "userName") return order.userName.toLowerCase().includes(textQuery);
    return true;
  });
  const sortType = sortSelect.value;
  filtered = [...filtered].sort((a, b) => {
    if (sortType === "priceDesc") return b.totalPrice - a.totalPrice;
    if (sortType === "queueAsc") return a.queueOrder - b.queueOrder;
    if (sortType === "dateAsc") return new Date(a.orderDate) - new Date(b.orderDate);
    if (sortType === "dateDesc") return new Date(b.orderDate) - new Date(a.orderDate);
    return 0;
  });
  return filtered;
}

function applyFilters() {
  renderRows(getFilteredOrders());
}

function syncSearchMode() {
  const isDateMode = searchTypeSelect.value === "orderDate";
  dateSearchField.classList.toggle("hidden", !isDateMode);
  searchInput.classList.toggle("hidden", isDateMode);
  if (isDateMode) searchInput.value = "";
  else dateSearchInput.value = "";
  applyFilters();
}

function updateModalComputedValues() {
  const totalPrice = Number(modalTotalPrice.value) || 0;
  const wallet = Number(modalWallet.value) || 0;
  const deposit = Number(modalDeposit.value) || 0;
  const discount = Number(modalDiscount.value) || 0;
  const finalPrice = Math.max(0, totalPrice - wallet - deposit - discount);
  modalFinalPrice.value = formatCurrency(finalPrice);
  modalBreakdownValue.textContent = `${formatCurrency(totalPrice)} - ${formatCurrency(wallet + deposit + discount)}`;
  modalSelectedAddressValue.textContent = modalAddressSelect.value || "No Address";
  const selectedMaids = Array.from(modalMaidSelect.selectedOptions).map((option) => option.value);
  modalAssignedMaidValue.textContent = selectedMaids.length ? selectedMaids.join(", ") : "Not Assigned";
  modalAssignedPartnerValue.textContent = modalPartnerSelect.value || "Not Assigned";
  const selectedExtras = Array.from(modalExtrasSelect.selectedOptions).map((option) => option.value);
  modalExtrasValue.textContent = selectedExtras.length ? selectedExtras.join(", ") : "No Extras";
}

function updateAddModalComputedValues() {
  const totalPrice = Number(addTotalPrice.value) || 0;
  const wallet = Number(addWallet.value) || 0;
  const deposit = Number(addDeposit.value) || 0;
  const discount = Number(addDiscount.value) || 0;
  const finalPrice = Math.max(0, totalPrice - wallet - deposit - discount);
  addFinalPrice.value = formatCurrency(finalPrice);
  addBreakdownValue.textContent = `${formatCurrency(totalPrice)} - ${formatCurrency(wallet + deposit + discount)}`;
  const selectedMaids = Array.from(addMaidSelect.selectedOptions).map((option) => option.value);
  addAssignedMaidValue.textContent = selectedMaids.length ? selectedMaids.join(", ") : "Not Assigned";
  addAssignedPartnerValue.textContent = addPartnerSelect.value || "Not Assigned";
  const selectedExtras = Array.from(addExtrasSelect.selectedOptions).map((option) => option.value);
  addExtrasValue.textContent = selectedExtras.length ? selectedExtras.join(", ") : "No Extras";
}

function setOrderModalMode(mode) {
  const isView = mode === "view";
  editOrderTitle.textContent = isView ? "View Order" : "Edit Order";
  const subtitle = editOrderModal.querySelector(".modal-subtitle");
  if (subtitle) subtitle.textContent = isView ? "Read-only order details. No content can be changed in View mode." : "Update booking details, customer address, pricing, assignment, and operational status.";
  editOrderForm.classList.toggle("view-only", isView);
  editOrderForm.querySelectorAll("input, select").forEach((field) => {
    field.disabled = isView;
  });
  const saveButton = editOrderForm.querySelector('button[type="submit"]');
  if (saveButton) saveButton.style.display = isView ? "none" : "";
  cancelEditBtn.textContent = isView ? "Close" : "Cancel";
}

function openEditModal(orderId, mode = "edit") {
  const order = orders.find((item) => item.id === orderId);
  if (!order) return;
  activeOrderId = orderId;
  modalOrderId.value = order.id;
  modalUserName.value = order.userName;
  modalCity.value = order.city;
  const savedAddresses = customerAddressBook[order.userName] || [];
  const availableAddresses = [...new Set([order.address, ...savedAddresses].filter(Boolean))];
  modalAddressSelect.innerHTML = availableAddresses.map((address) => `<option value="${address}">${address}</option>`).join("");
  modalAddressSelect.value = order.address || availableAddresses[0] || "";
  modalCreatedDate.value = order.createdDate;
  modalTotalPrice.value = order.totalPrice;
  modalWallet.value = order.wallet;
  modalDeposit.value = order.deposit;
  modalDiscount.value = order.discount;
  modalStatus.value = order.status;
  modalPaymentMethod.value = order.paymentMethod;
  modalOrderDate.value = order.orderDate;
  modalArrivalTime.value = order.arrivalTime;
  Array.from(modalMaidSelect.options).forEach((option) => {
    option.selected = (order.maids || []).includes(option.value);
  });
  modalPartnerSelect.value = order.partner || "";
  Array.from(modalExtrasSelect.options).forEach((option) => { option.selected = order.extras.includes(option.value); });
  updateModalComputedValues();
  activeOrderMode = mode;
  setOrderModalMode(mode);
  editOrderModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeEditModal() {
  editOrderModal.classList.add("hidden");
  document.body.style.overflow = "";
  activeOrderId = null;
}

function openAddModal() {
  addOrderForm.reset();
  addOrderId.value = nextOrderId();
  addCreatedDate.value = nowLabel();
  addUserName.value = "";
  populateCityOptions();
  syncServiceSelectors();
  addStatus.value = "Accepted Orders";
  addPaymentMethod.value = "Cash";
  Array.from(addMaidSelect.options).forEach((option) => { option.selected = false; });
  addPartnerSelect.value = "";
  Array.from(addExtrasSelect.options).forEach((option) => { option.selected = false; });
  addTotalPrice.value = addPackageSelect.selectedOptions[0]?.dataset.price || "0";
  updateAddModalComputedValues();
  addOrderModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeAddModal() {
  addOrderModal.classList.add("hidden");
  document.body.style.overflow = "";
}

function saveActiveOrder() {
  if (!activeOrderId || activeOrderMode === "view") return;
  const order = orders.find((item) => item.id === activeOrderId);
  if (!order) return;
  order.address = modalAddressSelect.value;
  order.totalPrice = Number(modalTotalPrice.value) || 0;
  order.wallet = Number(modalWallet.value) || 0;
  order.deposit = Number(modalDeposit.value) || 0;
  order.discount = Number(modalDiscount.value) || 0;
  order.status = modalStatus.value;
  order.paymentMethod = modalPaymentMethod.value;
  order.orderDate = modalOrderDate.value;
  order.arrivalTime = modalArrivalTime.value;
  order.maids = Array.from(modalMaidSelect.selectedOptions).map((option) => option.value);
  order.maid = order.maids[0] || "";
  order.partner = modalPartnerSelect.value;
  order.extras = Array.from(modalExtrasSelect.selectedOptions).map((option) => option.value);
  closeEditModal();
  applyFilters();
}

function saveNewOrder() {
  const packageOption = addPackageSelect.selectedOptions[0];
  const newOrder = {
    id: addOrderId.value,
    userName: addUserName.value || "Unknown Customer",
    userLink: "./index.html",
    city: addCitySelect.value,
    widget: addWidgetSelect.value,
    category: addCategorySelect.value,
    packageName: packageOption ? packageOption.value : "",
    totalPrice: Number(addTotalPrice.value) || 0,
    wallet: Number(addWallet.value) || 0,
    deposit: Number(addDeposit.value) || 0,
    discount: Number(addDiscount.value) || 0,
    address: addAddressInput.value || "No address provided",
    createdDate: addCreatedDate.value,
    orderDate: addOrderDate.value,
    arrivalTime: addArrivalTime.value || "08:00",
    queueOrder: orders.length + 1,
    status: addStatus.value,
    paymentMethod: addPaymentMethod.value,
    maids: Array.from(addMaidSelect.selectedOptions).map((option) => option.value),
    maid: addMaidSelect.selectedOptions[0]?.value || "",
    partner: addPartnerSelect.value,
    extras: Array.from(addExtrasSelect.selectedOptions).map((option) => option.value)
  };
  orders.unshift(newOrder);
  closeAddModal();
  applyFilters();
}

if (ordersDropdownBtn && ordersDropdownContainer) {
  ordersDropdownBtn.addEventListener("click", () => {
    ordersDropdownContainer.classList.toggle("open");
  });
}

[modalTotalPrice, modalWallet, modalDeposit, modalDiscount, modalAddressSelect, modalMaidSelect, modalPartnerSelect, modalExtrasSelect].forEach((field) => {
  field.addEventListener("input", updateModalComputedValues);
  field.addEventListener("change", updateModalComputedValues);
});

[addTotalPrice, addWallet, addDeposit, addDiscount, addMaidSelect, addPartnerSelect, addExtrasSelect].forEach((field) => {
  field.addEventListener("input", updateAddModalComputedValues);
  field.addEventListener("change", updateAddModalComputedValues);
});

customerSearchType.addEventListener("change", () => {
  customerSearchInput.value = "";
  addUserName.value = "";
});
customerSearchInput.addEventListener("input", findCustomer);
addCitySelect.addEventListener("change", syncServiceSelectors);
addWidgetSelect.addEventListener("change", syncCategoryOptions);
addCategorySelect.addEventListener("change", syncPackageOptions);
addPackageSelect.addEventListener("change", () => {
  const selected = addPackageSelect.selectedOptions[0];
  if (selected) addTotalPrice.value = selected.dataset.price;
  updateAddModalComputedValues();
});

searchTypeSelect.addEventListener("change", syncSearchMode);
searchInput.addEventListener("input", applyFilters);
dateSearchInput.addEventListener("change", applyFilters);
sortSelect.addEventListener("change", applyFilters);
clearFiltersBtn.addEventListener("click", () => {
  searchTypeSelect.value = "orderId";
  searchInput.value = "";
  dateSearchInput.value = "";
  sortSelect.value = "priceDesc";
  syncSearchMode();
});
openAddOrderBtn.addEventListener("click", openAddModal);

ordersTableBody.addEventListener("click", (event) => {
  const actionButton = event.target.closest("[data-action]");
  if (!actionButton) return;
  const { action, orderId } = actionButton.dataset;
  if (action === "edit") openEditModal(orderId, "edit");
  if (action === "view") openEditModal(orderId, "view");
  if (action === "delete") {
    const index = orders.findIndex((order) => order.id === orderId);
    if (index >= 0) {
      orders.splice(index, 1);
      applyFilters();
    }
  }
});

closeEditModalBtn.addEventListener("click", closeEditModal);
cancelEditBtn.addEventListener("click", closeEditModal);
editOrderModal.addEventListener("click", (event) => {
  if (event.target === editOrderModal) closeEditModal();
});
editOrderForm.addEventListener("submit", (event) => {
  event.preventDefault();
  saveActiveOrder();
});

closeAddModalBtn.addEventListener("click", closeAddModal);
cancelAddBtn.addEventListener("click", closeAddModal);
addOrderModal.addEventListener("click", (event) => {
  if (event.target === addOrderModal) closeAddModal();
});
addOrderForm.addEventListener("submit", (event) => {
  event.preventDefault();
  saveNewOrder();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (!editOrderModal.classList.contains("hidden")) closeEditModal();
    if (!addOrderModal.classList.contains("hidden")) closeAddModal();
  }
});

populateReferenceLists();
populateCityOptions();
syncServiceSelectors();
syncSearchMode();






