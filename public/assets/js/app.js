/* TARWIQA consolidated scripts. Each legacy page runs in its own scope. */
(() => {
    "use strict";
    /* Shared reviewed helpers */
    const __shared = {
        formatCurrency_1: function (value) {
            return `EGP ${Number(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        },
        formatTimeLabel_2: function (value) {
            const [hours, minutes] = value.split(":").map(Number);
            const suffix = hours >= 12 ? "PM" : "AM";
            const normalized = hours % 12 || 12;
            return `${String(normalized).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${suffix}`;
        },
        getStatusClass_3: function (status) {
            return status.toLowerCase().replace(/\s+/g, "-");
        },
        nowLabel_4: function () {
            return "2026-04-23 02:30 PM";
        },
        loadJson_5: function (key, fallback) {
            try {
                return JSON.parse(localStorage.getItem(key)) ?? fallback;
            } catch (error) {
                return fallback;
            }
        },
        escapeHtml_6: function (value) {
            return String(value)
                .replaceAll("&", "&amp;")
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;")
                .replaceAll('"', "&quot;")
                .replaceAll("'", "&#039;");
        },
        formatCurrency_7: function (value) {
            return `EGP ${value.toLocaleString("en-US")}`;
        },
        getInitials_8: function (name) {
            return name
                .split(" ")
                .slice(0, 2)
                .map((part) => part[0]?.toUpperCase() || "")
                .join("");
        },
    };

    const modules = {
        "accepted-orders": () => {
            const ordersDropdownBtn =
                document.getElementById("ordersDropdownBtn");
            const ordersDropdownContainer =
                ordersDropdownBtn?.closest(".dropdown-block");
            const ordersTableBody = document.getElementById("ordersTableBody");
            const searchTypeSelect =
                document.getElementById("searchTypeSelect");
            const searchInput = document.getElementById("searchInput");
            const dateSearchInput = document.getElementById("dateSearchInput");
            const dateSearchField = document.getElementById("dateSearchField");
            const sortSelect = document.getElementById("sortSelect");
            const clearFiltersBtn = document.getElementById("clearFiltersBtn");
            const openAddOrderBtn = document.getElementById("openAddOrderBtn");
            const reviewCount = document.getElementById("reviewCount");
            const highestPriceMetric =
                document.getElementById("highestPriceMetric");
            const todayRequestsMetric = document.getElementById(
                "todayRequestsMetric",
            );
            const earliestArrivalMetric = document.getElementById(
                "earliestArrivalMetric",
            );

            const editOrderModal = document.getElementById("editOrderModal");
            const editOrderForm = document.getElementById("editOrderForm");
            const editOrderTitle = document.getElementById("editOrderTitle");
            const closeEditModalBtn =
                document.getElementById("closeEditModalBtn");
            const cancelEditBtn = document.getElementById("cancelEditBtn");
            const modalOrderId = document.getElementById("modalOrderId");
            const modalUserName = document.getElementById("modalUserName");
            const modalCity = document.getElementById("modalCity");
            const modalAddressSelect =
                document.getElementById("modalAddressSelect");
            const modalCreatedDate =
                document.getElementById("modalCreatedDate");
            const modalTotalPrice = document.getElementById("modalTotalPrice");
            const modalWallet = document.getElementById("modalWallet");
            const modalDeposit = document.getElementById("modalDeposit");
            const modalDiscount = document.getElementById("modalDiscount");
            const modalFinalPrice = document.getElementById("modalFinalPrice");
            const modalStatus = document.getElementById("modalStatus");
            const modalPaymentMethod =
                document.getElementById("modalPaymentMethod");
            const modalOrderDate = document.getElementById("modalOrderDate");
            const modalArrivalTime =
                document.getElementById("modalArrivalTime");
            const modalMaidSelect = document.getElementById("modalMaidSelect");
            const modalPartnerSelect =
                document.getElementById("modalPartnerSelect");
            const modalExtrasSelect =
                document.getElementById("modalExtrasSelect");
            const modalBreakdownValue = document.getElementById(
                "modalBreakdownValue",
            );
            const modalSelectedAddressValue = document.getElementById(
                "modalSelectedAddressValue",
            );
            const modalAssignedMaidValue = document.getElementById(
                "modalAssignedMaidValue",
            );
            const modalAssignedPartnerValue = document.getElementById(
                "modalAssignedPartnerValue",
            );
            const modalExtrasValue =
                document.getElementById("modalExtrasValue");

            const addOrderModal = document.getElementById("addOrderModal");
            const addOrderForm = document.getElementById("addOrderForm");
            const closeAddModalBtn =
                document.getElementById("closeAddModalBtn");
            const cancelAddBtn = document.getElementById("cancelAddBtn");
            const addOrderId = document.getElementById("addOrderId");
            const customerSearchType =
                document.getElementById("customerSearchType");
            const customerSearchInput = document.getElementById(
                "customerSearchInput",
            );
            const addUserName = document.getElementById("addUserName");
            const addCitySelect = document.getElementById("addCitySelect");
            const addWidgetSelect = document.getElementById("addWidgetSelect");
            const addCategorySelect =
                document.getElementById("addCategorySelect");
            const addPackageSelect =
                document.getElementById("addPackageSelect");
            const addAddressInput = document.getElementById("addAddressInput");
            const addCreatedDate = document.getElementById("addCreatedDate");
            const addTotalPrice = document.getElementById("addTotalPrice");
            const addWallet = document.getElementById("addWallet");
            const addDeposit = document.getElementById("addDeposit");
            const addDiscount = document.getElementById("addDiscount");
            const addFinalPrice = document.getElementById("addFinalPrice");
            const addStatus = document.getElementById("addStatus");
            const addPaymentMethod =
                document.getElementById("addPaymentMethod");
            const addOrderDate = document.getElementById("addOrderDate");
            const addArrivalTime = document.getElementById("addArrivalTime");
            const addMaidSelect = document.getElementById("addMaidSelect");
            const addPartnerSelect =
                document.getElementById("addPartnerSelect");
            const addExtrasSelect = document.getElementById("addExtrasSelect");
            const addBreakdownValue =
                document.getElementById("addBreakdownValue");
            const addAssignedMaidValue = document.getElementById(
                "addAssignedMaidValue",
            );
            const addAssignedPartnerValue = document.getElementById(
                "addAssignedPartnerValue",
            );
            const addExtrasValue = document.getElementById("addExtrasValue");

            const activeMaids = [
                "Amina Mostafa",
                "Hoda Ali",
                "Amal Fathy",
                "Eman Yasser",
                "Reham Ashraf",
                "Aya Tarek",
            ];
            const activePartners = [
                { name: "Mona Adel", governorate: "Cairo" },
                { name: "Karim Samir", governorate: "Cairo" },
                { name: "Nour Hassan", governorate: "Cairo" },
                { name: "Ahmed Fathy", governorate: "Giza" },
                { name: "Salma Youssef", governorate: "Cairo" },
            ];
            const defaultExtras = [
                "Deep Cleaning Kit",
                "Ironing",
                "Window Cleaning",
                "Kitchen Sanitizing",
                "Carpet Refresh",
                "Fridge Cleaning",
            ];
            const temporarilyDeletedExtras = (() => {
                try {
                    const stored = JSON.parse(
                        localStorage.getItem("temporarilyDeletedExtras"),
                    );
                    return Array.isArray(stored) ? stored : [];
                } catch (error) {
                    return [];
                }
            })();
            const customExtras = (() => {
                try {
                    const stored = JSON.parse(
                        localStorage.getItem("customExtrasCatalog"),
                    );
                    return Array.isArray(stored)
                        ? stored.map((extra) => extra.name).filter(Boolean)
                        : [];
                } catch (error) {
                    return [];
                }
            })();
            const activeExtras = [
                ...new Set([...defaultExtras, ...customExtras]),
            ].filter((extra) => !temporarilyDeletedExtras.includes(extra));

            const customers = [
                {
                    userId: "#USR-102938",
                    phone: "+201095550198",
                    name: "Mariam Kamal",
                },
                {
                    userId: "#USR-204511",
                    phone: "+201113450011",
                    name: "Youssef Adel",
                },
                {
                    userId: "#USR-318900",
                    phone: "+201225900144",
                    name: "Nour Hassan",
                },
                {
                    userId: "#USR-442300",
                    phone: "+201066120077",
                    name: "Salma Emad",
                },
                {
                    userId: "#USR-559910",
                    phone: "+201288700035",
                    name: "Omar Hany",
                },
                {
                    userId: "#USR-661104",
                    phone: "+201027700551",
                    name: "Aya Tarek",
                },
            ];

            const customerAddressBook = {
                "Mariam Kamal": [
                    "12 Nile Corniche, Maadi",
                    "34 Road 9, Maadi",
                    "15 New Cairo First Settlement",
                ],
                "Youssef Adel": [
                    "45 Tahrir St, Dokki",
                    "18 Lebanon Square, Mohandessin",
                    "7 Sheikh Zayed District 2",
                ],
                "Nour Hassan": [
                    "21 El-Horreya Rd, Roushdy",
                    "14 Smouha Square, Alexandria",
                    "8 Sidi Gaber Road",
                ],
                "Salma Emad": [
                    "88 Abbas El Akkad, Nasr City",
                    "22 Makram Ebeid, Nasr City",
                    "5 Heliopolis Square",
                ],
                "Omar Hany": [
                    "17 El Gomhoria St, Mansoura",
                    "40 El Mashaya, Mansoura",
                ],
                "Aya Tarek": [
                    "9 El Nozha St, Heliopolis",
                    "13 El Merghany St, Heliopolis",
                    "6 New Cairo Fifth Settlement",
                ],
            };
            const serviceCatalog = {
                Cairo: {
                    widgets: {
                        Cleaning: {
                            categories: {
                                "Home Cleaning": [
                                    { name: "Premium Deep Clean", price: 2400 },
                                    { name: "Express Plus", price: 860 },
                                ],
                                "Move In Service": [
                                    { name: "Gold Package", price: 2100 },
                                    { name: "Silver Package", price: 1650 },
                                ],
                                "Kitchen Cleaning": [
                                    { name: "Kitchen Pro", price: 990 },
                                    { name: "Express Plus", price: 860 },
                                ],
                            },
                        },
                        Maintenance: {
                            categories: {
                                "AC Service": [
                                    { name: "Summer Check", price: 980 },
                                    { name: "Premium AC Care", price: 1450 },
                                ],
                            },
                        },
                    },
                },
                Giza: {
                    widgets: {
                        Cleaning: {
                            categories: {
                                "Office Service": [
                                    { name: "Business Standard", price: 1750 },
                                    { name: "Business Premium", price: 2400 },
                                ],
                            },
                        },
                        Laundry: {
                            categories: {
                                "Wash & Fold": [
                                    { name: "Family Bundle", price: 620 },
                                    { name: "Large Bundle", price: 880 },
                                ],
                            },
                        },
                    },
                },
                Alexandria: {
                    widgets: {
                        Maintenance: {
                            categories: {
                                "AC Service": [
                                    { name: "Summer Check", price: 980 },
                                    { name: "Coastal Care", price: 1320 },
                                ],
                            },
                        },
                        Cleaning: {
                            categories: {
                                "Home Cleaning": [
                                    { name: "Sea Breeze Package", price: 1540 },
                                    { name: "Premium Deep Clean", price: 2290 },
                                ],
                            },
                        },
                    },
                },
                Mansoura: {
                    widgets: {
                        Laundry: {
                            categories: {
                                "Wash & Fold": [
                                    { name: "Family Bundle", price: 620 },
                                    { name: "Quick Laundry", price: 420 },
                                ],
                            },
                        },
                    },
                },
            };

            const orders = [
                {
                    id: "ORD-9102",
                    userName: "Mariam Kamal",
                    userLink: "./index.html",
                    city: "Cairo",
                    widget: "Cleaning",
                    category: "Home Cleaning",
                    packageName: "Premium Deep Clean",
                    totalPrice: 2400,
                    wallet: 250,
                    deposit: 300,
                    discount: 100,
                    address: "12 Nile Corniche, Maadi",
                    createdDate: "2026-04-23 09:10 AM",
                    orderDate: "2026-04-25",
                    arrivalTime: "08:00",
                    queueOrder: 1,
                    status: "Accepted Orders",
                    paymentMethod: "Cash",
                    maid: "Amina Mostafa",
                    extras: ["Deep Cleaning Kit", "Ironing"],
                },
                {
                    id: "ORD-9105",
                    userName: "Youssef Adel",
                    userLink: "./index.html",
                    city: "Giza",
                    widget: "Cleaning",
                    category: "Office Service",
                    packageName: "Business Standard",
                    totalPrice: 1750,
                    wallet: 0,
                    deposit: 400,
                    discount: 50,
                    address: "45 Tahrir St, Dokki",
                    createdDate: "2026-04-23 09:35 AM",
                    orderDate: "2026-04-24",
                    arrivalTime: "13:00",
                    queueOrder: 2,
                    status: "Accepted Orders",
                    paymentMethod: "Bank Transfer",
                    maid: "Hoda Ali",
                    extras: ["Window Cleaning"],
                },
                {
                    id: "ORD-9108",
                    userName: "Nour Hassan",
                    userLink: "./index.html",
                    city: "Alexandria",
                    widget: "Maintenance",
                    category: "AC Service",
                    packageName: "Summer Check",
                    totalPrice: 980,
                    wallet: 80,
                    deposit: 100,
                    discount: 0,
                    address: "21 El-Horreya Rd, Roushdy",
                    createdDate: "2026-04-23 10:05 AM",
                    orderDate: "2026-04-26",
                    arrivalTime: "11:00",
                    queueOrder: 3,
                    status: "Accepted Orders",
                    paymentMethod: "E-Wallet",
                    maid: "Amal Fathy",
                    extras: ["Fridge Cleaning"],
                },
                {
                    id: "ORD-9111",
                    userName: "Salma Emad",
                    userLink: "./index.html",
                    city: "Cairo",
                    widget: "Cleaning",
                    category: "Move In Service",
                    packageName: "Gold Package",
                    totalPrice: 2100,
                    wallet: 100,
                    deposit: 250,
                    discount: 75,
                    address: "88 Abbas El Akkad, Nasr City",
                    createdDate: "2026-04-23 10:48 AM",
                    orderDate: "2026-04-24",
                    arrivalTime: "09:30",
                    queueOrder: 4,
                    status: "Accepted Orders",
                    paymentMethod: "Cash",
                    maid: "Eman Yasser",
                    extras: ["Kitchen Sanitizing", "Carpet Refresh"],
                },
                {
                    id: "ORD-9114",
                    userName: "Omar Hany",
                    userLink: "./index.html",
                    city: "Mansoura",
                    widget: "Laundry",
                    category: "Wash & Fold",
                    packageName: "Family Bundle",
                    totalPrice: 620,
                    wallet: 0,
                    deposit: 120,
                    discount: 20,
                    address: "17 El Gomhoria St, Mansoura",
                    createdDate: "2026-04-23 11:22 AM",
                    orderDate: "2026-04-27",
                    arrivalTime: "15:00",
                    queueOrder: 5,
                    status: "Accepted Orders",
                    paymentMethod: "Cash",
                    maid: "Reham Ashraf",
                    extras: [],
                },
                {
                    id: "ORD-9117",
                    userName: "Aya Tarek",
                    userLink: "./index.html",
                    city: "Cairo",
                    widget: "Cleaning",
                    category: "Kitchen Cleaning",
                    packageName: "Express Plus",
                    totalPrice: 860,
                    wallet: 60,
                    deposit: 120,
                    discount: 30,
                    address: "9 El Nozha St, Heliopolis",
                    createdDate: "2026-04-23 12:02 PM",
                    orderDate: "2026-04-25",
                    arrivalTime: "18:00",
                    queueOrder: 6,
                    status: "Accepted Orders",
                    paymentMethod: "E-Wallet",
                    maid: "Aya Tarek",
                    extras: ["Ironing"],
                },
            ];
            orders.forEach((order, index) => {
                if (!order.partner)
                    order.partner =
                        activePartners[index % activePartners.length].name;
                if (!Array.isArray(order.maids))
                    order.maids = order.maid ? [order.maid] : [];
            });

            let activeOrderId = null;
            let activeOrderMode = "edit";

            const formatCurrency = __shared.formatCurrency_1;

            const formatTimeLabel = __shared.formatTimeLabel_2;

            const getStatusClass = __shared.getStatusClass_3;

            const nowLabel = __shared.nowLabel_4;

            function nextOrderId() {
                const max = orders.reduce(
                    (acc, order) =>
                        Math.max(acc, Number(order.id.replace("ORD-", ""))),
                    9100,
                );
                return `ORD-${max + 1}`;
            }

            function populateReferenceLists() {
                const maidOptions =
                    '<option value="">Not Assigned</option>' +
                    activeMaids
                        .map(
                            (maid) =>
                                `<option value="${maid}">${maid}</option>`,
                        )
                        .join("");
                const extrasOptions = activeExtras
                    .map(
                        (extra) => `<option value="${extra}">${extra}</option>`,
                    )
                    .join("");
                const partnerOptions =
                    '<option value="">Not Assigned</option>' +
                    activePartners
                        .map(
                            (partner) =>
                                `<option value="${partner.name}">${partner.name} - ${partner.governorate}</option>`,
                        )
                        .join("");
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
                addCitySelect.innerHTML = Object.keys(serviceCatalog)
                    .map((city) => `<option value="${city}">${city}</option>`)
                    .join("");
            }

            function syncServiceSelectors() {
                const city = addCitySelect.value;
                const widgets = Object.keys(serviceCatalog[city].widgets);
                addWidgetSelect.innerHTML = widgets
                    .map(
                        (widget) =>
                            `<option value="${widget}">${widget}</option>`,
                    )
                    .join("");
                syncCategoryOptions();
            }

            function syncCategoryOptions() {
                const city = addCitySelect.value;
                const widget = addWidgetSelect.value;
                const categories = Object.keys(
                    serviceCatalog[city].widgets[widget].categories,
                );
                addCategorySelect.innerHTML = categories
                    .map(
                        (category) =>
                            `<option value="${category}">${category}</option>`,
                    )
                    .join("");
                syncPackageOptions();
            }

            function syncPackageOptions() {
                const city = addCitySelect.value;
                const widget = addWidgetSelect.value;
                const category = addCategorySelect.value;
                const packages =
                    serviceCatalog[city].widgets[widget].categories[category];
                addPackageSelect.innerHTML = packages
                    .map(
                        (item) =>
                            `<option value="${item.name}" data-price="${item.price}">${item.name}</option>`,
                    )
                    .join("");
                const selected = addPackageSelect.selectedOptions[0];
                if (selected) addTotalPrice.value = selected.dataset.price;
                updateAddModalComputedValues();
            }

            function findCustomer() {
                const query = customerSearchInput.value.trim().toLowerCase();
                const byPhone = customerSearchType.value === "phone";
                const customer = customers.find((item) =>
                    byPhone
                        ? item.phone.toLowerCase() === query
                        : item.userId.toLowerCase() === query,
                );
                addUserName.value = customer
                    ? customer.name
                    : "No matching customer";
            }

            function updateSummaryMetrics() {
                reviewCount.textContent = String(orders.length);
                highestPriceMetric.textContent = formatCurrency(
                    Math.max(...orders.map((order) => order.totalPrice)),
                );
                todayRequestsMetric.textContent = String(
                    orders.filter((order) =>
                        order.createdDate.startsWith("2026-04-23"),
                    ).length,
                );
                earliestArrivalMetric.textContent = formatTimeLabel(
                    [...orders].sort((a, b) =>
                        a.arrivalTime.localeCompare(b.arrivalTime),
                    )[0].arrivalTime,
                );
            }

            function renderRows(items) {
                updateSummaryMetrics();
                if (!items.length) {
                    ordersTableBody.innerHTML =
                        '<tr><td colspan="13" class="empty-state">No orders match the current filters.</td></tr>';
                    return;
                }
                ordersTableBody.innerHTML = items
                    .map(
                        (order) => `
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
  `,
                    )
                    .join("");
            }

            function getFilteredOrders() {
                const searchType = searchTypeSelect.value;
                const textQuery = searchInput.value.trim().toLowerCase();
                const dateQuery = dateSearchInput.value;
                let filtered = orders.filter((order) => {
                    if (searchType === "orderDate")
                        return !dateQuery || order.orderDate === dateQuery;
                    if (!textQuery) return true;
                    if (searchType === "orderId")
                        return order.id.toLowerCase().includes(textQuery);
                    if (searchType === "userName")
                        return order.userName.toLowerCase().includes(textQuery);
                    return true;
                });
                const sortType = sortSelect.value;
                filtered = [...filtered].sort((a, b) => {
                    if (sortType === "priceDesc")
                        return b.totalPrice - a.totalPrice;
                    if (sortType === "queueAsc")
                        return a.queueOrder - b.queueOrder;
                    if (sortType === "dateAsc")
                        return new Date(a.orderDate) - new Date(b.orderDate);
                    if (sortType === "dateDesc")
                        return new Date(b.orderDate) - new Date(a.orderDate);
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
                const finalPrice = Math.max(
                    0,
                    totalPrice - wallet - deposit - discount,
                );
                modalFinalPrice.value = formatCurrency(finalPrice);
                modalBreakdownValue.textContent = `${formatCurrency(totalPrice)} - ${formatCurrency(wallet + deposit + discount)}`;
                modalSelectedAddressValue.textContent =
                    modalAddressSelect.value || "No Address";
                const selectedMaids = Array.from(
                    modalMaidSelect.selectedOptions,
                ).map((option) => option.value);
                modalAssignedMaidValue.textContent = selectedMaids.length
                    ? selectedMaids.join(", ")
                    : "Not Assigned";
                modalAssignedPartnerValue.textContent =
                    modalPartnerSelect.value || "Not Assigned";
                const selectedExtras = Array.from(
                    modalExtrasSelect.selectedOptions,
                ).map((option) => option.value);
                modalExtrasValue.textContent = selectedExtras.length
                    ? selectedExtras.join(", ")
                    : "No Extras";
            }

            function updateAddModalComputedValues() {
                const totalPrice = Number(addTotalPrice.value) || 0;
                const wallet = Number(addWallet.value) || 0;
                const deposit = Number(addDeposit.value) || 0;
                const discount = Number(addDiscount.value) || 0;
                const finalPrice = Math.max(
                    0,
                    totalPrice - wallet - deposit - discount,
                );
                addFinalPrice.value = formatCurrency(finalPrice);
                addBreakdownValue.textContent = `${formatCurrency(totalPrice)} - ${formatCurrency(wallet + deposit + discount)}`;
                const selectedMaids = Array.from(
                    addMaidSelect.selectedOptions,
                ).map((option) => option.value);
                addAssignedMaidValue.textContent = selectedMaids.length
                    ? selectedMaids.join(", ")
                    : "Not Assigned";
                addAssignedPartnerValue.textContent =
                    addPartnerSelect.value || "Not Assigned";
                const selectedExtras = Array.from(
                    addExtrasSelect.selectedOptions,
                ).map((option) => option.value);
                addExtrasValue.textContent = selectedExtras.length
                    ? selectedExtras.join(", ")
                    : "No Extras";
            }

            function setOrderModalMode(mode) {
                const isView = mode === "view";
                editOrderTitle.textContent = isView
                    ? "View Order"
                    : "Edit Order";
                const subtitle =
                    editOrderModal.querySelector(".modal-subtitle");
                if (subtitle)
                    subtitle.textContent = isView
                        ? "Read-only order details. No content can be changed in View mode."
                        : "Update booking details, customer address, pricing, assignment, and operational status.";
                editOrderForm.classList.toggle("view-only", isView);
                editOrderForm
                    .querySelectorAll("input, select")
                    .forEach((field) => {
                        field.disabled = isView;
                    });
                const saveButton = editOrderForm.querySelector(
                    'button[type="submit"]',
                );
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
                const savedAddresses =
                    customerAddressBook[order.userName] || [];
                const availableAddresses = [
                    ...new Set(
                        [order.address, ...savedAddresses].filter(Boolean),
                    ),
                ];
                modalAddressSelect.innerHTML = availableAddresses
                    .map(
                        (address) =>
                            `<option value="${address}">${address}</option>`,
                    )
                    .join("");
                modalAddressSelect.value =
                    order.address || availableAddresses[0] || "";
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
                    option.selected = (order.maids || []).includes(
                        option.value,
                    );
                });
                modalPartnerSelect.value = order.partner || "";
                Array.from(modalExtrasSelect.options).forEach((option) => {
                    option.selected = order.extras.includes(option.value);
                });
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
                Array.from(addMaidSelect.options).forEach((option) => {
                    option.selected = false;
                });
                addPartnerSelect.value = "";
                Array.from(addExtrasSelect.options).forEach((option) => {
                    option.selected = false;
                });
                addTotalPrice.value =
                    addPackageSelect.selectedOptions[0]?.dataset.price || "0";
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
                order.maids = Array.from(modalMaidSelect.selectedOptions).map(
                    (option) => option.value,
                );
                order.maid = order.maids[0] || "";
                order.partner = modalPartnerSelect.value;
                order.extras = Array.from(
                    modalExtrasSelect.selectedOptions,
                ).map((option) => option.value);
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
                    maids: Array.from(addMaidSelect.selectedOptions).map(
                        (option) => option.value,
                    ),
                    maid: addMaidSelect.selectedOptions[0]?.value || "",
                    partner: addPartnerSelect.value,
                    extras: Array.from(addExtrasSelect.selectedOptions).map(
                        (option) => option.value,
                    ),
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

            [
                modalTotalPrice,
                modalWallet,
                modalDeposit,
                modalDiscount,
                modalAddressSelect,
                modalMaidSelect,
                modalPartnerSelect,
                modalExtrasSelect,
            ].forEach((field) => {
                field.addEventListener("input", updateModalComputedValues);
                field.addEventListener("change", updateModalComputedValues);
            });

            [
                addTotalPrice,
                addWallet,
                addDeposit,
                addDiscount,
                addMaidSelect,
                addPartnerSelect,
                addExtrasSelect,
            ].forEach((field) => {
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
                    const index = orders.findIndex(
                        (order) => order.id === orderId,
                    );
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
                    if (!editOrderModal.classList.contains("hidden"))
                        closeEditModal();
                    if (!addOrderModal.classList.contains("hidden"))
                        closeAddModal();
                }
            });

            populateReferenceLists();
            populateCityOptions();
            syncServiceSelectors();
            syncSearchMode();
        },
        "add-maid-v2": () => {
            const operators = [
                {
                    id: "OP-1024",
                    name: "Mona Adel",
                    username: "ops.mona",
                    zone: "New Cairo",
                },
                {
                    id: "OP-1031",
                    name: "Karim Samir",
                    username: "ops.karim",
                    zone: "Nasr City",
                },
                {
                    id: "OP-1042",
                    name: "Nour Hassan",
                    username: "ops.nour",
                    zone: "Maadi",
                },
                {
                    id: "OP-1057",
                    name: "Ahmed Fathy",
                    username: "ops.ahmed",
                    zone: "October",
                },
                {
                    id: "OP-1073",
                    name: "Salma Youssef",
                    username: "ops.salma",
                    zone: "Heliopolis",
                },
            ];

            const q = (id) => document.getElementById(id);
            const form = q("addMaidForm");
            const fields = {
                id: q("maidIdInput"),
                name: q("nameInput"),
                phone: q("phoneInput"),
                startDate: q("startDateInput"),
                age: q("ageInput"),
                address: q("addressInput"),
                notes: q("notesInput"),
                personalId: q("personalIdInput"),
                salary: q("salaryInput"),
            };
            let toastTimer;

            const loadJson = __shared.loadJson_5;

            function getNextMaidId() {
                const created = loadJson("createdMaids", []);
                return `MD-${String(1421 + created.length).padStart(4, "0")}`;
            }

            function getPartner() {
                return (
                    operators.find(
                        (operator) => operator.id === q("operatorInput").value,
                    ) || operators[0]
                );
            }

            function getInitials(value) {
                return (
                    value
                        .trim()
                        .split(/\s+/)
                        .filter(Boolean)
                        .slice(0, 2)
                        .map((word) => word[0].toUpperCase())
                        .join("") || "NM"
                );
            }

            function showToast(message) {
                const toast = q("addMaidToast");
                toast.textContent = message;
                toast.classList.remove("hidden");
                clearTimeout(toastTimer);
                toastTimer = setTimeout(
                    () => toast.classList.add("hidden"),
                    2800,
                );
            }

            function updateSyncedFields() {
                const operator = getPartner();
                q("statusPreview").textContent = q("statusInput").value;
                q("genderPreview").textContent = q("genderInput").value;
                q("offDayPreview").textContent = q("offDayInput").value;
                q("operatorPreview").textContent = operator.name;
                q("statusReadonlyInput").value = q("statusInput").value;
                q("genderReadonlyInput").value = q("genderInput").value;
                q("offDayReadonlyInput").value = q("offDayInput").value;
                q("operatorReadonlyInput").value =
                    `${operator.name} (${operator.username}) - ${operator.zone}`;
            }

            function updateCompletion() {
                const required = form.querySelectorAll(
                    "[data-required='true']",
                );
                const completed = Array.from(required).filter((field) =>
                    String(field.value).trim(),
                ).length;
                q("completionScore").textContent =
                    `${Math.round((completed / required.length) * 100)}%`;
            }

            function updateNamePreview() {
                const name = fields.name.value.trim();
                q("maidDisplayName").textContent = name || "New Maid";
                q("avatarPreview").textContent = getInitials(name);
            }

            function updateFilesPreview() {
                const files = Array.from(q("attachmentInput").files || []);
                q("selectedFilesPreview").textContent = files.length
                    ? files.map((file) => file.name).join(", ")
                    : "No files selected";
            }

            function collectMaid() {
                const operator = getPartner();
                return {
                    id: fields.id.value,
                    name: fields.name.value.trim(),
                    phone: fields.phone.value.trim(),
                    status: q("statusInput").value.toLowerCase(),
                    startDate: fields.startDate.value,
                    age: Math.max(18, Number(fields.age.value) || 18),
                    address: fields.address.value.trim(),
                    offDay: q("offDayInput").value,
                    operatorId: operator.id,
                    salary: Math.max(0, Number(fields.salary.value) || 0),
                    doneOrders: 0,
                    personalId: fields.personalId.value.trim(),
                    gender: q("genderInput").value,
                    attachment: q("attachmentInput").files.length
                        ? "Ready"
                        : "Pending",
                    notes: fields.notes.value.trim(),
                };
            }

            function validateMaid() {
                if (!form.reportValidity()) return false;
                if (fields.personalId.value.trim().length !== 14) {
                    showToast("Personal ID must contain 14 digits.");
                    fields.personalId.focus();
                    return false;
                }
                if (Number(fields.salary.value) < 0) {
                    showToast("Salary cannot be negative.");
                    fields.salary.focus();
                    return false;
                }
                return true;
            }

            function readFile(file) {
                if (file.size > 2 * 1024 * 1024) {
                    return Promise.resolve("");
                }
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = () => resolve("");
                    reader.readAsDataURL(file);
                });
            }

            async function saveMaidDocuments(maidId) {
                const files = Array.from(q("attachmentInput").files || []);
                const uploadedAt = new Date().toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                });
                const documents = await Promise.all(
                    files.map(async (file, index) => ({
                        id: `${maidId}-${Date.now()}-${index}`,
                        name: file.name,
                        type: q("documentTypeInput").value,
                        size:
                            file.size < 1048576
                                ? `${(file.size / 1024).toFixed(1)} KB`
                                : `${(file.size / 1048576).toFixed(1)} MB`,
                        uploadedAt,
                        status: "Ready",
                        previewUrl: await readFile(file),
                        mimeType: file.type,
                    })),
                );
                localStorage.setItem(
                    `maidDocuments:${maidId}`,
                    JSON.stringify(documents),
                );
            }

            function saveDraft() {
                localStorage.setItem(
                    "addMaidDraft",
                    JSON.stringify(collectMaid()),
                );
                showToast("Maid draft saved.");
            }

            async function createMaid() {
                if (!validateMaid()) return;
                const maid = collectMaid();
                const createdMaids = loadJson("createdMaids", []);
                createdMaids.push(maid);
                localStorage.setItem(
                    "createdMaids",
                    JSON.stringify(createdMaids),
                );

                const overrides = loadJson("maidProfileOverrides", {});
                overrides[maid.id] = maid;
                localStorage.setItem(
                    "maidProfileOverrides",
                    JSON.stringify(overrides),
                );
                await saveMaidDocuments(maid.id);
                localStorage.removeItem("addMaidDraft");
                showToast(`${maid.name} created successfully.`);
                setTimeout(() => {
                    window.location.href = `../partner/maid-details.html?maidId=${encodeURIComponent(maid.id)}`;
                }, 650);
            }

            function resetForm() {
                form.reset();
                q("statusInput").value = "Active";
                q("genderInput").value = "Female";
                q("offDayInput").value = "Friday";
                q("operatorInput").value = operators[0].id;
                fields.id.value = getNextMaidId();
                fields.startDate.value = new Date().toISOString().slice(0, 10);
                q("startDatePreview").textContent = fields.startDate.value;
                q("selectedFilesPreview").textContent = "No files selected";
                updateNamePreview();
                updateSyncedFields();
                updateCompletion();
                localStorage.removeItem("addMaidDraft");
                showToast("Add Maid form reset.");
            }

            q("operatorInput").innerHTML = operators
                .map(
                    (operator) =>
                        `<option value="${operator.id}">${operator.name} - ${operator.zone}</option>`,
                )
                .join("");
            fields.id.value = getNextMaidId();
            fields.startDate.value = new Date().toISOString().slice(0, 10);
            q("startDatePreview").textContent = fields.startDate.value;

            fields.name.addEventListener("input", () => {
                updateNamePreview();
                updateCompletion();
            });
            form.querySelectorAll("[data-required='true']").forEach((field) => {
                field.addEventListener("input", updateCompletion);
            });
            [
                "statusInput",
                "genderInput",
                "offDayInput",
                "operatorInput",
            ].forEach((id) => {
                q(id).addEventListener("change", updateSyncedFields);
            });
            fields.startDate.addEventListener("input", () => {
                q("startDatePreview").textContent =
                    fields.startDate.value || "-";
                updateCompletion();
            });
            q("attachmentInput").addEventListener("change", updateFilesPreview);
            q("saveDraftBtn").addEventListener("click", saveDraft);
            q("createMaidBtn").addEventListener("click", createMaid);
            q("resetFormBtn").addEventListener("click", resetForm);

            updateNamePreview();
            updateSyncedFields();
            updateCompletion();
        },

        "add-operators": () => {
            const $ = (id) => document.getElementById(id);
            const read = (key, fallback) => {
                try {
                    return JSON.parse(localStorage.getItem(key)) ?? fallback;
                } catch {
                    return fallback;
                }
            };
            const write = (key, value) =>
                localStorage.setItem(key, JSON.stringify(value));
            const esc = (value) =>
                String(value ?? "").replace(
                    /[&<>"']/g,
                    (c) =>
                        ({
                            "&": "&amp;",
                            "<": "&lt;",
                            ">": "&gt;",
                            '"': "&quot;",
                            "'": "&#39;",
                        })[c],
                );
            const hashPassword = async (value) =>
                Array.from(
                    new Uint8Array(
                        await crypto.subtle.digest(
                            "SHA-256",
                            new TextEncoder().encode(value),
                        ),
                    ),
                )
                    .map((byte) => byte.toString(16).padStart(2, "0"))
                    .join("");

            const zones = [
                "New Cairo",
                "Nasr City",
                "Maadi",
                "Heliopolis",
                "6th October",
                "Dokki",
                "Mohandessin",
            ];
            const days = [
                "Saturday",
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
            ];
            const serviceNames = [
                "Home Cleaning",
                "Office Cleaning",
                "Deep Cleaning",
                "Move In / Out",
                "Kitchen Cleaning",
                "Laundry & Ironing",
            ];
            const seedMaids = [
                { id: "MD-1098", name: "Hoda Ali", operatorId: "OP-1024" },
                { id: "MD-1401", name: "Laila Mostafa", operatorId: "OP-1024" },
                { id: "MD-1510", name: "Rana Fouad", operatorId: "OP-1024" },
                { id: "MD-1042", name: "Amina Mostafa", operatorId: "OP-1031" },
            ];
            const reserved = [
                {
                    username: "ops.mona",
                    email: "partner@tarwiqa.com",
                    phone: "+201002204411",
                },
                {
                    username: "ops.karim",
                    email: "karim@tarwiqa.app",
                    phone: "+201014421188",
                },
                {
                    username: "ops.ahmed",
                    email: "ahmed@tarwiqa.app",
                    phone: "+201228874011",
                },
            ];
            const permissionData = [
                {
                    section: "Dashboard & Schedule",
                    page: "partner-dashboard.html",
                    items: [
                        ["View dashboard KPIs and today's schedule", 0],
                        [
                            "View protected customer data after the release countdown",
                            0,
                        ],
                        ["View Partner Notifications Center", 0],
                    ],
                },
                {
                    section: "Assigned Orders",
                    page: "partner-dashboard.html#ordersSection",
                    items: [
                        [
                            "View and filter assigned orders for Today, Tomorrow, or All",
                            0,
                        ],
                        [
                            "Open released order details, payment method, offer, and extras",
                            0,
                        ],
                        ["Assign one or more eligible maids to an order", 1],
                        ["Submit the Order Handover Checklist", 1],
                    ],
                },
                {
                    section: "Done Orders",
                    page: "partner-done-orders.html",
                    items: [
                        [
                            "View completed order summaries without private customer details",
                            0,
                        ],
                    ],
                },
                {
                    section: "Managed Maids",
                    page: "partner-dashboard.html#maidsSection",
                    items: [
                        ["View assigned maids and availability", 0],
                        ["Open read-only maid profiles", 0],
                        ["Upload a document to an assigned maid profile", 1],
                        ["Submit a request to add a new maid", 1],
                    ],
                },
                {
                    section: "Messages",
                    page: "partner-messages.html",
                    items: [
                        ["View messages from Super Admin and Supporters", 0],
                        ["Reply to Super Admin and Supporters", 1],
                    ],
                },
                {
                    section: "Partner Profile & Finance",
                    page: "partner-profile.html",
                    items: [
                        [
                            "View account, Work Zone, financial details, and profits",
                            0,
                        ],
                        ["View completed and upcoming order totals", 0],
                    ],
                },
            ];
            let pending = null;

            function renderSetup() {
                $("workZonesList").innerHTML = zones
                    .map(
                        (x) =>
                            '<label class="choice-option"><input name="workZone" type="checkbox" value="' +
                            x +
                            '"> ' +
                            x +
                            "</label>",
                    )
                    .join("");
                $("workingDaysList").innerHTML = days
                    .map(
                        (x, i) =>
                            '<label class="choice-option"><input name="workingDay" type="checkbox" value="' +
                            x +
                            '" ' +
                            (i < 6 ? "checked" : "") +
                            "> " +
                            x +
                            "</label>",
                    )
                    .join("");
                $("servicesList").innerHTML = serviceNames
                    .map(
                        (x) =>
                            '<label class="choice-option"><input name="service" type="checkbox" value="' +
                            x +
                            '" checked> ' +
                            x +
                            "</label>",
                    )
                    .join("");
                const overrides = read("maidProfileOverrides", {}),
                    maids = [...seedMaids, ...read("createdMaids", [])]
                        .map((x) => ({ ...x, ...(overrides[x.id] || {}) }))
                        .filter(
                            (x, i, a) =>
                                a.findIndex((y) => y.id === x.id) === i,
                        );
                $("assignedMaids").innerHTML = maids
                    .map(
                        (x) =>
                            '<option value="' +
                            esc(x.id) +
                            '">' +
                            esc(x.name) +
                            " (" +
                            esc(x.id) +
                            ") - " +
                            (x.operatorId ? "Assigned" : "Unassigned") +
                            "</option>",
                    )
                    .join("");
            }
            function renderPermissions() {
                $("permissionsSections").innerHTML = permissionData
                    .map(
                        (g, gi) =>
                            '<article class="permission-section"><div class="section-head"><div><p class="eyebrow">' +
                            g.page +
                            "</p><h3>" +
                            g.section +
                            '</h3></div></div><div class="permission-list">' +
                            g.items
                                .map((item, ii) => {
                                    const k = gi + "-" + ii;
                                    return (
                                        '<div class="permission-row"><div class="permission-info"><strong>' +
                                        item[0] +
                                        '</strong><div class="permission-meta">' +
                                        (item[1]
                                            ? "Operational action available only to an Editor."
                                            : "View-only Partner Workspace capability.") +
                                        '</div></div><div class="toggle-group"><label class="toggle-label"><input class="view-toggle" data-key="' +
                                        k +
                                        '" type="checkbox" checked> View</label><label class="toggle-label edit"><input class="edit-toggle" data-key="' +
                                        k +
                                        '" type="checkbox" ' +
                                        (!item[1]
                                            ? 'disabled data-fixed="1"'
                                            : "") +
                                        "> Edit</label></div></div>"
                                    );
                                })
                                .join("") +
                            "</div></article>",
                    )
                    .join("");
                document.querySelectorAll(".view-toggle").forEach(
                    (x) =>
                    (x.onchange = () => {
                        const e = document.querySelector(
                            '.edit-toggle[data-key="' +
                            x.dataset.key +
                            '"]',
                        );
                        if (!x.checked) e.checked = false;
                        summary();
                    }),
                );
                document.querySelectorAll(".edit-toggle").forEach(
                    (x) =>
                    (x.onchange = () => {
                        const v = document.querySelector(
                            '.view-toggle[data-key="' +
                            x.dataset.key +
                            '"]',
                        );
                        if (x.checked) v.checked = true;
                        summary();
                    }),
                );
                roleUI();
                summary();
            }
            const role = () =>
                document.querySelector('input[name="operatorRole"]:checked')
                    ?.value || "viewer";
            function roleUI() {
                const viewer = role() === "viewer";
                $("viewerRoleOption").classList.toggle("active", viewer);
                $("editorRoleOption").classList.toggle("active", !viewer);
                $("selectedRoleLabel").textContent = viewer
                    ? "Viewer"
                    : "Operational Editor";
                document.querySelectorAll(".edit-toggle").forEach((x) => {
                    if (viewer) x.checked = false;
                    x.disabled = viewer || x.dataset.fixed === "1";
                });
            }
            function summary() {
                $("viewPermissionsCount").textContent =
                    document.querySelectorAll(".view-toggle:checked").length;
                $("editPermissionsCount").textContent =
                    document.querySelectorAll(".edit-toggle:checked").length;
            }
            function permissions() {
                return permissionData
                    .map((g, gi) => ({
                        section: g.section,
                        page: g.page,
                        items: g.items
                            .map((item, ii) => {
                                const k = gi + "-" + ii;
                                return {
                                    name: item[0],
                                    canView: !!document.querySelector(
                                        '.view-toggle[data-key="' + k + '"]',
                                    )?.checked,
                                    canEdit: !!document.querySelector(
                                        '.edit-toggle[data-key="' + k + '"]',
                                    )?.checked,
                                };
                            })
                            .filter((x) => x.canView || x.canEdit),
                    }))
                    .filter((x) => x.items.length);
            }
            const checked = (name) =>
                [
                    ...document.querySelectorAll(
                        'input[name="' + name + '"]:checked',
                    ),
                ].map((x) => x.value);
            const selected = (id) =>
                [...$(id).selectedOptions].map((x) => x.value);
            const norm = (x) =>
                String(x || "")
                    .trim()
                    .toLowerCase()
                    .replace(/\s+/g, "");
            function toast(message) {
                $("operatorToast").textContent = message;
                $("operatorToast").classList.remove("hidden");
                clearTimeout(toast.timer);
                toast.timer = setTimeout(
                    () => $("operatorToast").classList.add("hidden"),
                    3200,
                );
            }
            function fail(message, id) {
                toast(message);
                $(id)?.focus();
                return null;
            }
            function doc(id, type, expiry) {
                const f = $(id).files[0];
                return f
                    ? {
                        type,
                        name: f.name,
                        size: f.size,
                        mimeType: f.type || "unknown",
                        expiry,
                        uploadedAt: new Date().toISOString(),
                    }
                    : null;
            }

            function collect() {
                const type = $("partnerAccountType").value,
                    name = $("partnerName").value.trim(),
                    username = $("operatorUsername").value.trim(),
                    email = $("partnerEmail").value.trim().toLowerCase(),
                    phone = $("partnerPhone").value.trim();
                const password = $("operatorPassword").value,
                    confirm = $("confirmPartnerPassword").value,
                    gov = $("partnerGovernorate").value,
                    zone = $("partnerPrimaryZone").value;
                const workZones = [
                    ...new Set(
                        [zone, ...checked("workZone")].filter(Boolean),
                    ),
                ],
                    workDays = checked("workingDay"),
                    services = checked("service"),
                    maids = selected("assignedMaids");
                const method = $("settlementMethod").value,
                    commission = Number($("commissionPercent").value),
                    capacity = Number($("maxDailyOrders").value),
                    expiry = $("documentExpiry").value,
                    today = new Date().toISOString().slice(0, 10);
                const all = [...reserved, ...read("createdPartners", [])];
                if (!name)
                    return fail(
                        "Enter the partner full or company name.",
                        "partnerName",
                    );
                if (!/^[a-zA-Z0-9._-]{4,}$/.test(username))
                    return fail(
                        "Enter a unique username of at least 4 valid characters.",
                        "operatorUsername",
                    );
                if (all.some((x) => norm(x.username) === norm(username)))
                    return fail(
                        "This username is already used.",
                        "operatorUsername",
                    );
                if (!email || !$("partnerEmail").checkValidity())
                    return fail("Enter a valid email address.", "partnerEmail");
                if (all.some((x) => norm(x.email) === norm(email)))
                    return fail("This email is already used.", "partnerEmail");
                if (!phone)
                    return fail(
                        "Enter the partner phone number.",
                        "partnerPhone",
                    );
                if (all.some((x) => norm(x.phone) === norm(phone)))
                    return fail(
                        "This phone number is already used.",
                        "partnerPhone",
                    );
                if (!gov || !zone)
                    return fail(
                        "Select the assigned governorate and primary Work Zone.",
                        !gov ? "partnerGovernorate" : "partnerPrimaryZone",
                    );
                if (!$("partnerAddress").value.trim())
                    return fail(
                        "Enter the registered address.",
                        "partnerAddress",
                    );
                if (
                    !$("emergencyName").value.trim() ||
                    !$("emergencyPhone").value.trim()
                )
                    return fail(
                        "Enter complete emergency contact details.",
                        "emergencyName",
                    );
                if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password))
                    return fail(
                        "Password needs uppercase, lowercase, a number, and at least 8 characters.",
                        "operatorPassword",
                    );
                if (password !== confirm)
                    return fail(
                        "Password confirmation does not match.",
                        "confirmPartnerPassword",
                    );
                if (
                    $("accountExpiry").value &&
                    $("accountExpiry").value <= today
                )
                    return fail(
                        "Account expiry must be a future date.",
                        "accountExpiry",
                    );
                if (!workDays.length)
                    return fail("Select at least one working day.");
                if (
                    !$("workStart").value ||
                    !$("workEnd").value ||
                    $("workStart").value >= $("workEnd").value
                )
                    return fail(
                        "Working end time must be after start time.",
                        "workEnd",
                    );
                if (
                    !Number.isInteger(capacity) ||
                    capacity < 1 ||
                    capacity > 100
                )
                    return fail(
                        "Maximum daily orders must be from 1 to 100.",
                        "maxDailyOrders",
                    );
                if (!services.length)
                    return fail("Select at least one supported service.");
                if (
                    !Number.isFinite(commission) ||
                    commission < 0 ||
                    commission > 100
                )
                    return fail(
                        "Commission must be from 0 to 100.",
                        "commissionPercent",
                    );
                if (
                    method === "bank" &&
                    (!$("bankName").value.trim() ||
                        !$("accountHolder").value.trim() ||
                        !$("bankAccount").value.trim())
                )
                    return fail(
                        "Complete all bank settlement details.",
                        "bankName",
                    );
                if (method === "wallet" && !$("walletPhone").value.trim())
                    return fail(
                        "Enter the settlement wallet phone.",
                        "walletPhone",
                    );
                if (
                    type === "individual" &&
                    !/^\d{14}$/.test($("nationalId").value.trim())
                )
                    return fail(
                        "National ID must contain 14 digits.",
                        "nationalId",
                    );
                if (
                    type === "company" &&
                    (!$("commercialRegistration").value.trim() ||
                        !$("taxNumber").value.trim())
                )
                    return fail(
                        "Enter commercial registration and tax number.",
                        "commercialRegistration",
                    );
                if (!expiry || expiry <= today)
                    return fail(
                        "Select a future legal document expiry date.",
                        "documentExpiry",
                    );
                if (!$("identityFile").files.length)
                    return fail(
                        "Upload the identity or registration file.",
                        "identityFile",
                    );
                if (!$("contractFile").files.length)
                    return fail("Upload the signed contract.", "contractFile");
                if (!$("paymentProofFile").files.length)
                    return fail(
                        "Upload the settlement proof.",
                        "paymentProofFile",
                    );
                const access = permissions();
                if (!access.length)
                    return fail(
                        "Select at least one Partner Workspace permission.",
                    );
                const next =
                    Math.max(
                        1100,
                        ...read("createdPartners", []).map(
                            (x) =>
                                Number(String(x.id).replace(/\D/g, "")) ||
                                0,
                        ),
                    ) + 1,
                    id = "OP-" + next;
                return {
                    id,
                    name,
                    username,
                    email,
                    phone,
                    _password: password,
                    status: $("partnerStatus").value,
                    role: role(),
                    accountType: type,
                    governorate: gov,
                    zone,
                    workZone: zone,
                    workZones,
                    address: $("partnerAddress").value.trim(),
                    emergencyContact: {
                        name: $("emergencyName").value.trim(),
                        phone: $("emergencyPhone").value.trim(),
                    },
                    workingDays: workDays,
                    workingHours: {
                        start: $("workStart").value,
                        end: $("workEnd").value,
                    },
                    maxDailyOrders: capacity,
                    services,
                    assignedMaidIds: maids,
                    managedMaids: maids.length,
                    completedOrders: 0,
                    lastMessage:
                        "Partner account created and ready for onboarding.",
                    commissionPercent: commission,
                    settlement: {
                        method,
                        bankName: $("bankName").value.trim(),
                        accountHolder: $("accountHolder").value.trim(),
                        accountNumber: $("bankAccount").value.trim(),
                        walletPhone: $("walletPhone").value.trim(),
                    },
                    legal: {
                        nationalId: $("nationalId").value.trim(),
                        commercialRegistration: $(
                            "commercialRegistration",
                        ).value.trim(),
                        taxNumber: $("taxNumber").value.trim(),
                        documentExpiry: expiry,
                    },
                    documents: [
                        doc("identityFile", "Identity / Registration", expiry),
                        doc("contractFile", "Signed Contract", expiry),
                        doc("paymentProofFile", "Settlement Proof", expiry),
                    ].filter(Boolean),
                    forcePasswordChange: $("forcePasswordChange").checked,
                    twoFactorEnabled: $("twoFactorEnabled").checked,
                    accountExpiry: $("accountExpiry").value || null,
                    notes: $("internalNotes").value.trim(),
                    permissions: access,
                    joinedAt: new Date().toLocaleDateString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                    }),
                    createdAt: new Date().toISOString(),
                };
            }
            function modal(title, body, button, action) {
                $("operatorModalEyebrow").textContent = "Create Partner";
                $("operatorModalTitle").textContent = title;
                $("operatorModalBody").innerHTML = body;
                $("operatorModalPrimary").textContent = button;
                $("operatorModalPrimary").onclick = action;
                $("operatorModal").classList.remove("hidden");
                $("operatorModal").setAttribute("aria-hidden", "false");
            }
            function closeModal() {
                $("operatorModal").classList.add("hidden");
                $("operatorModal").setAttribute("aria-hidden", "true");
                $("operatorModalPrimary").onclick = null;
            }
            const accessRows = (p) =>
                p.permissions
                    .flatMap((g) =>
                        g.items.map(
                            (x) =>
                                '<div class="modal-row"><div><strong>' +
                                esc(g.section) +
                                "</strong><span>" +
                                esc(x.name) +
                                "</span></div><b>" +
                                (x.canEdit ? "Editor" : "Viewer") +
                                "</b></div>",
                        ),
                    )
                    .join("");
            function preview() {
                const p = collect();
                if (!p) return;
                pending = p;
                modal(
                    "Create " + esc(p.name),
                    '<div class="modal-summary-grid"><div><span>Partner ID</span><strong>' +
                    p.id +
                    "</strong></div><div><span>Work Scope</span><strong>" +
                    esc(p.governorate + " / " + p.zone) +
                    "</strong></div><div><span>Work Zones</span><strong>" +
                    p.workZones.length +
                    "</strong></div><div><span>Assigned Maids</span><strong>" +
                    p.managedMaids +
                    "</strong></div><div><span>Commission</span><strong>" +
                    p.commissionPercent +
                    '%</strong></div></div><div class="review-block"><strong>Security</strong><p>First-login password change: ' +
                    (p.forcePasswordChange ? "Required" : "Not required") +
                    " / 2FA: " +
                    (p.twoFactorEnabled ? "Enabled" : "Disabled") +
                    '</p></div><div class="modal-table">' +
                    accessRows(p) +
                    "</div>",
                    "Confirm & Create",
                    save,
                );
            }
            async function save() {
                if (!pending) return;
                const stored = {
                    ...pending,
                    passwordHash: await hashPassword(pending._password),
                };
                delete stored._password;
                const partners = read("createdPartners", []);
                partners.push(stored);
                write("createdPartners", partners);
                if (stored.assignedMaidIds.length) {
                    const overrides = read("maidProfileOverrides", {});
                    stored.assignedMaidIds.forEach(
                        (id) =>
                        (overrides[id] = {
                            ...(overrides[id] || {}),
                            operatorId: stored.id,
                            operator: stored.name,
                        }),
                    );
                    write("maidProfileOverrides", overrides);
                }
                closeModal();
                $("createPartnerBtn").textContent = "Partner Created";
                $("createPartnerBtn").disabled = true;
                toast(
                    stored.name +
                    " created successfully and added to Partners List.",
                );
                pending = null;
            }
            function previewAccess() {
                const p = { permissions: permissions() };
                modal(
                    "Partner Workspace Permissions",
                    '<div class="modal-table">' +
                    (accessRows(p) ||
                        '<p class="empty-state">No permissions selected.</p>') +
                    "</div>",
                    "Print",
                    () => window.print(),
                );
            }
            function toggle(id, button) {
                const input = $(id),
                    show = input.type === "password";
                input.type = show ? "text" : "password";
                button.textContent = show ? "Hide" : "Show";
            }
            function legal() {
                const company = $("partnerAccountType").value === "company";
                document
                    .querySelectorAll(".legal-company")
                    .forEach((x) => x.classList.toggle("hidden", !company));
                document
                    .querySelectorAll(".legal-individual")
                    .forEach((x) => x.classList.toggle("hidden", company));
            }
            function finance() {
                const method = $("settlementMethod").value;
                document
                    .querySelectorAll(".financial-field")
                    .forEach((x) =>
                        x.classList.toggle(
                            "hidden",
                            x.dataset.method !== method,
                        ),
                    );
            }
            function primaryZone() {
                document
                    .querySelectorAll('input[name="workZone"]')
                    .forEach((x) => {
                        x.disabled = x.value === $("partnerPrimaryZone").value;
                        if (x.disabled) x.checked = true;
                    });
            }

            document.querySelectorAll('input[name="operatorRole"]').forEach(
                (x) =>
                (x.onchange = () => {
                    roleUI();
                    summary();
                }),
            );
            $("partnerAccountType").onchange = legal;
            $("settlementMethod").onchange = finance;
            $("partnerPrimaryZone").onchange = primaryZone;
            $("togglePartnerPassword").onclick = (e) =>
                toggle("operatorPassword", e.currentTarget);
            $("toggleConfirmPassword").onclick = (e) =>
                toggle("confirmPartnerPassword", e.currentTarget);
            $("createPartnerBtn").onclick = preview;
            $("exportPermissionsBtn").onclick = previewAccess;
            $("operatorsListBtn").onclick = () =>
                (location.href = "./operators-list.html");
            $("operatorModalClose").onclick = closeModal;
            $("operatorModalSecondary").onclick = closeModal;
            $("operatorModal").onclick = (e) => {
                if (e.target === $("operatorModal")) closeModal();
            };
            document.onkeydown = (e) => {
                if (e.key === "Escape") closeModal();
            };
            renderSetup();
            renderPermissions();
            legal();
            finance();
        },
        "add-products": () => {
            const escapeHtml = __shared.escapeHtml_6;
            const productForm = document.getElementById("productForm");
            const productName = document.getElementById("productName");
            const productCategory = document.getElementById("productCategory");
            const productPrice = document.getElementById("productPrice");
            const productStock = document.getElementById("productStock");
            const productStatus = document.getElementById("productStatus");
            const productSku = document.getElementById("productSku");
            const productDescription =
                document.getElementById("productDescription");
            const productImage = document.getElementById("productImage");
            const productImageName =
                document.getElementById("productImageName");
            const productPreviewImage = document.getElementById(
                "productPreviewImage",
            );
            const productPreviewPlaceholderTemplate = document.getElementById(
                "productPreviewPlaceholderTemplate",
            );
            const previewStatus = document.getElementById("previewStatus");
            const previewName = document.getElementById("previewName");
            const previewDescription =
                document.getElementById("previewDescription");
            const previewCategory = document.getElementById("previewCategory");
            const previewPrice = document.getElementById("previewPrice");
            const previewStock = document.getElementById("previewStock");
            const previewSku = document.getElementById("previewSku");
            const previewStockBar = document.getElementById("previewStockBar");
            const previewInventory =
                document.getElementById("previewInventory");
            const productsTableBody =
                document.getElementById("productsTableBody");
            const productsCount = document.getElementById("productsCount");
            const resetProductBtn = document.getElementById("resetProductBtn");
            const saveProductTopBtn =
                document.getElementById("saveProductTopBtn");
            const productToast = document.getElementById("productToast");
            const productToastText =
                document.getElementById("productToastText");

            let products = [];
            let toastTimeoutId = null;
            let selectedImageName = "No image";
            let previewObjectUrl = null;

            function showToast(message) {
                productToastText.textContent = message;
                productToast.classList.remove("hidden");

                if (toastTimeoutId) {
                    window.clearTimeout(toastTimeoutId);
                }

                toastTimeoutId = window.setTimeout(() => {
                    productToast.classList.add("hidden");
                }, 3000);
            }

            function formatPrice(value) {
                return `EGP ${(Number(value) || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            }

            function getStatusClass(status) {
                return status.toLowerCase().replaceAll(" ", "-");
            }

            function generateSku() {
                return `PRD-${String(products.length + 1).padStart(4, "0")}`;
            }

            function updatePreview() {
                const status = productStatus.value;
                previewStatus.textContent = status;
                previewStatus.className = `status-pill ${getStatusClass(status)}`;
                previewName.textContent =
                    productName.value.trim() || "Product Name";
                previewDescription.textContent =
                    productDescription.value.trim() ||
                    "Product description will appear here.";
                previewCategory.textContent = productCategory.value;
                previewPrice.textContent = formatPrice(productPrice.value);
                previewSku.textContent =
                    productSku.value.trim() || "Auto-generated";
                const stock = Math.max(0, Number(productStock.value) || 0);
                previewStock.textContent = `${stock} ${stock === 1 ? "item" : "items"} in stock`;
                previewStockBar.style.width = `${Math.min(stock, 100)}%`;
                previewInventory.classList.toggle("empty", stock === 0);
                previewInventory.classList.toggle(
                    "low",
                    stock > 0 && stock <= 10,
                );
            }

            function renderProducts() {
                productsCount.textContent = `${products.length} product${products.length === 1 ? "" : "s"}`;
                productsTableBody.innerHTML = products
                    .map(
                        (product) => `<tr>
      <td>${escapeHtml(product.sku)}</td>
      <td><strong>${escapeHtml(product.name)}</strong><br><small>${escapeHtml(product.imageName)}</small></td>
      <td>${escapeHtml(product.category)}</td>
      <td>${formatPrice(product.price)}</td>
      <td>${escapeHtml(product.stock)}</td>
      <td><span class="status-pill ${getStatusClass(product.status)}">${escapeHtml(product.status)}</span></td>
    </tr>`,
                    )
                    .join("");
            }

            function resetPreviewImage() {
                if (previewObjectUrl) {
                    URL.revokeObjectURL(previewObjectUrl);
                    previewObjectUrl = null;
                }
                selectedImageName = "No image";
                productImageName.textContent = "No image selected";
                const placeholder =
                    productPreviewPlaceholderTemplate.content.cloneNode(true);
                productPreviewImage.replaceChildren(placeholder);
            }

            [
                productName,
                productCategory,
                productPrice,
                productStock,
                productStatus,
                productSku,
                productDescription,
            ].forEach((field) => {
                field.addEventListener("input", updatePreview);
                field.addEventListener("change", updatePreview);
            });

            productImage.addEventListener("change", () => {
                const file = productImage.files?.[0];

                if (!file) {
                    resetPreviewImage();
                    return;
                }

                selectedImageName = file.name;
                productImageName.textContent = file.name;
                if (previewObjectUrl) URL.revokeObjectURL(previewObjectUrl);
                previewObjectUrl = URL.createObjectURL(file);
                const preview = document.createElement("img");
                preview.src = previewObjectUrl;
                preview.alt = "Selected product preview";
                productPreviewImage.replaceChildren(preview);
            });

            productForm.addEventListener("submit", (event) => {
                event.preventDefault();
                const product = {
                    sku: productSku.value.trim() || generateSku(),
                    name: productName.value.trim(),
                    category: productCategory.value,
                    price: Number(productPrice.value) || 0,
                    stock: Number(productStock.value) || 0,
                    status: productStatus.value,
                    description: productDescription.value.trim(),
                    imageName: selectedImageName,
                };

                products.unshift(product);
                renderProducts();
                showToast(`${product.name} added to products.`);
                productForm.reset();
                resetPreviewImage();
                updatePreview();
            });

            productForm.addEventListener("reset", () => {
                window.setTimeout(() => {
                    resetPreviewImage();
                    updatePreview();
                }, 0);
            });

            resetProductBtn.addEventListener("click", () => {
                productForm.reset();
                resetPreviewImage();
                updatePreview();
                showToast("Product form reset.");
            });

            saveProductTopBtn.addEventListener("click", () => {
                productForm.requestSubmit();
            });

            updatePreview();
            renderProducts();
        },
        "add-supporter-v2": () => {
            const governorates = [
                "Cairo",
                "Giza",
                "Alexandria",
                "Qalyubia",
                "Dakahlia",
                "Sharqia",
            ];
            const permissionData = [
                {
                    section: "Supporter Dashboard",
                    items: [
                        "View dashboard summary",
                        "View scoped KPIs for assigned governorates",
                        "View current session and online status",
                    ],
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
                        "Open original order page",
                    ],
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
                        "Send direct message to a partner",
                    ],
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
                        "Send email or WhatsApp to users",
                    ],
                },
                {
                    section: "Customer Messages",
                    items: [
                        "View customer inbox",
                        "Open customer conversation",
                        "Mark customer messages as read",
                        "Reply to customer messages",
                        "Move customer messages to junk or inbox",
                    ],
                },
                {
                    section: "Supporter Messages",
                    items: [
                        "View supporter message center",
                        "Filter messages by Super Admin or Partner",
                        "Mark supporter messages as read",
                        "Reply to supporter workspace messages",
                    ],
                },
                {
                    section: "Activity & Profile",
                    items: [
                        "View my supporter profile",
                        "View assigned governorates and access scope",
                        "View detailed permissions",
                        "View my action history",
                        "Search my action history",
                        "View last seen and worked hours",
                    ],
                },
                {
                    section: "Reports",
                    items: [
                        "View scoped orders reports",
                        "View scoped partners reports",
                        "Export scoped reports",
                    ],
                },
            ];

            const q = (id) => document.getElementById(id);
            let toastTimer;

            const loadJson = __shared.loadJson_5;

            function selectedGovernorates() {
                return Array.from(
                    document.querySelectorAll("[data-governorate]:checked"),
                ).map((input) => input.value);
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
                            canView: Boolean(
                                document.querySelector(
                                    `.supporter-view[data-key="${key}"]`,
                                )?.checked,
                            ),
                            canEdit: Boolean(
                                document.querySelector(
                                    `.supporter-edit[data-key="${key}"]`,
                                )?.checked,
                            ),
                        };
                    }),
                }));
            }

            function permissionCounts() {
                const items = getPermissions().flatMap((group) => group.items);
                return {
                    view: items.filter((item) => item.canView).length,
                    edit: items.filter((item) => item.canEdit).length,
                };
            }

            function showToast(message) {
                q("supporterToast").textContent = message;
                q("supporterToast").classList.remove("hidden");
                clearTimeout(toastTimer);
                toastTimer = setTimeout(
                    () => q("supporterToast").classList.add("hidden"),
                    2800,
                );
            }

            function renderPermissions() {
                q("supporterPermissions").innerHTML = permissionData
                    .map(
                        (group, groupIndex) => `
    <section class="supporter-permission-group">
      <h3>${group.section}</h3>
      <div class="supporter-permission-list">
        ${group.items
                                .map((item, itemIndex) => {
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
                                })
                                .join("")}
      </div>
    </section>
  `,
                    )
                    .join("");

                document
                    .querySelectorAll(".supporter-view")
                    .forEach((input) => {
                        input.addEventListener("change", () => {
                            if (!input.checked) {
                                const edit = document.querySelector(
                                    `.supporter-edit[data-key="${input.dataset.key}"]`,
                                );
                                if (edit) edit.checked = false;
                            }
                            updatePreview();
                        });
                    });
                document
                    .querySelectorAll(".supporter-edit")
                    .forEach((input) => {
                        input.addEventListener("change", () => {
                            if (input.checked) {
                                const view = document.querySelector(
                                    `.supporter-view[data-key="${input.dataset.key}"]`,
                                );
                                if (view) view.checked = true;
                            }
                            updatePreview();
                        });
                    });
                updateRoleState();
            }

            function updateRoleState() {
                const viewer = getRole() === "viewer";
                document
                    .querySelectorAll(".supporter-edit")
                    .forEach((input) => {
                        if (viewer) input.checked = false;
                        input.disabled = viewer;
                    });
                updatePreview();
            }

            function updatePreview() {
                const selected = selectedGovernorates();
                const counts = permissionCounts();
                q("previewName").textContent =
                    q("supporterName").value.trim() || "New Supporter";
                q("previewStatus").textContent = q("supporterStatus").value;
                q("previewRole").textContent =
                    getRole() === "viewer" ? "Viewer" : "Editor";
                q("previewPermissions").textContent =
                    `${counts.view} View / ${counts.edit} Edit`;
                q("previewGovernorates").textContent = selected.length
                    ? selected.join(", ")
                    : "None selected";
                q("previewOrders").textContent = q("canViewOrders").checked
                    ? "Allowed"
                    : "Blocked";
                q("previewPartners").textContent = q("canViewPartners").checked
                    ? "Allowed"
                    : "Blocked";
                q("supporterViewCount").textContent = counts.view;
                q("supporterEditCount").textContent = counts.edit;
            }

            function toggleCreatePassword() {
                const input = q("supporterPassword");
                const show = input.type === "password";
                input.type = show ? "text" : "password";
                q("toggleSupporterPassword").textContent = show
                    ? "Hide"
                    : "Show";
                q("toggleSupporterPassword").setAttribute(
                    "aria-pressed",
                    String(show),
                );
                input.focus();
            }

            function resetForm() {
                q("supporterForm").reset();
                q("supporterRole").value = "viewer";
                q("canViewOrders").checked = true;
                q("canViewPartners").checked = true;
                document
                    .querySelectorAll(".supporter-view,.supporter-edit")
                    .forEach((input) => {
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
                    createdAt: new Date().toLocaleString("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                    }),
                };
                current.push(supporter);
                localStorage.setItem(
                    "createdSupporters",
                    JSON.stringify(current),
                );
                showToast(
                    `${supporter.name} created with ${counts.view} View and ${counts.edit} Edit permissions.`,
                );
                setTimeout(() => {
                    location.href = "./supporters-list.html";
                }, 650);
            }

            q("governorateGrid").innerHTML = governorates
                .map(
                    (governorate) => `
  <label class="check-card">
    <input type="checkbox" value="${governorate}" data-governorate />
    <div><strong>${governorate}</strong><small>Orders and partners access</small></div>
  </label>
`,
                )
                .join("");

            renderPermissions();
            q("supporterForm").addEventListener("input", updatePreview);
            q("supporterForm").addEventListener("change", updatePreview);
            q("supporterRole").addEventListener("change", updateRoleState);
            q("createSupporterBtn").addEventListener("click", createSupporter);
            q("toggleSupporterPassword").addEventListener(
                "click",
                toggleCreatePassword,
            );
            q("resetSupporterBtn").addEventListener("click", resetForm);
            updatePreview();
        },

        "add-user": () => {
            const tabButtons = document.querySelectorAll(".tab-btn");
            const tabPanels = document.querySelectorAll(".tab-panel");
            const quickLinks = document.querySelectorAll(".mini-link");
            const nameInput = document.getElementById("nameInput");
            const userDisplayName = document.getElementById("userDisplayName");
            const avatarPreview = document.getElementById("avatarPreview");
            const screenshotPermissionToggle = document.getElementById(
                "screenshotPermissionToggle",
            );
            const cityInput = document.getElementById("cityInput");
            const cityPreview = document.getElementById("cityPreview");
            const typeInput = document.getElementById("typeInput");
            const typePreview = document.getElementById("typePreview");
            const platformInput = document.getElementById("platformInput");
            const platformPreview = document.getElementById("platformPreview");
            const walletInput = document.getElementById("walletInput");
            const walletPreview = document.getElementById("walletPreview");
            const completionScore = document.getElementById("completionScore");
            const activeState = document.getElementById("activeState");
            const statusPreview = document.getElementById("statusPreview");
            const messageNamePreview =
                document.getElementById("messageNamePreview");
            const resetFormBtn = document.getElementById("resetFormBtn");
            const addUserForm = document.getElementById("addUserForm");

            function setActiveTab(targetId) {
                tabButtons.forEach((button) => {
                    button.classList.toggle(
                        "active",
                        button.dataset.tab === targetId,
                    );
                });

                quickLinks.forEach((button) => {
                    button.classList.toggle(
                        "active",
                        button.dataset.tabTarget === targetId,
                    );
                });

                tabPanels.forEach((panel) => {
                    panel.classList.toggle("active", panel.id === targetId);
                });
            }

            function getInitials(value) {
                const words = value
                    .trim()
                    .split(/\s+/)
                    .filter(Boolean)
                    .slice(0, 2);

                if (!words.length) {
                    return "NU";
                }

                return words.map((word) => word[0].toUpperCase()).join("");
            }

            function updateCompletion() {
                const requiredFields = addUserForm.querySelectorAll(
                    "[data-required='true']",
                );
                const filledCount = Array.from(requiredFields).filter(
                    (field) => field.value.trim() !== "",
                ).length;
                const percent = Math.round(
                    (filledCount / requiredFields.length) * 100,
                );
                completionScore.textContent = `${percent}%`;
            }

            tabButtons.forEach((button) => {
                button.addEventListener("click", () =>
                    setActiveTab(button.dataset.tab),
                );
            });

            quickLinks.forEach((button) => {
                button.addEventListener("click", () =>
                    setActiveTab(button.dataset.tabTarget),
                );
            });

            nameInput.addEventListener("input", (event) => {
                const value = event.target.value.trim();
                userDisplayName.textContent = value || "New User";
                avatarPreview.textContent = getInitials(value);
                messageNamePreview.textContent = value || "there";
                updateCompletion();
            });

            cityInput.addEventListener("input", (event) => {
                cityPreview.textContent =
                    event.target.value.trim() || "Cairo, Egypt";
                updateCompletion();
            });

            typeInput.addEventListener("change", (event) => {
                typePreview.textContent = event.target.value;
            });

            platformInput.addEventListener("change", (event) => {
                platformPreview.textContent = event.target.value;
            });

            walletInput.addEventListener("input", (event) => {
                walletPreview.textContent =
                    event.target.value.trim() || "EGP 0.00";
            });

            activeState.addEventListener("change", (event) => {
                statusPreview.textContent = event.target.value;
            });

            addUserForm
                .querySelectorAll("input[data-required='true']")
                .forEach((field) => {
                    field.addEventListener("input", updateCompletion);
                });

            if (screenshotPermissionToggle) {
                screenshotPermissionToggle.addEventListener("click", () => {
                    const isAllowed =
                        screenshotPermissionToggle.classList.contains(
                            "allowed",
                        );

                    screenshotPermissionToggle.classList.toggle(
                        "allowed",
                        !isAllowed,
                    );
                    screenshotPermissionToggle.classList.toggle(
                        "blocked",
                        isAllowed,
                    );
                    screenshotPermissionToggle.setAttribute(
                        "aria-pressed",
                        String(!isAllowed),
                    );
                    screenshotPermissionToggle.textContent = isAllowed
                        ? "Screenshot Blocked"
                        : "Screenshot Allowed";
                });
            }

            resetFormBtn.addEventListener("click", () => {
                addUserForm.reset();
                nameInput.value = "";
                cityInput.value = "Cairo";
                walletInput.value = "EGP 0.00";
                typeInput.value = "Retail Customer";
                platformInput.value = "Mobile App";
                activeState.value = "Enabled";
                userDisplayName.textContent = "New User";
                avatarPreview.textContent = "NU";
                cityPreview.textContent = "Cairo, Egypt";
                typePreview.textContent = "Retail Customer";
                platformPreview.textContent = "Mobile App";
                walletPreview.textContent = "EGP 0.00";
                statusPreview.textContent = "Enabled";
                messageNamePreview.textContent = "there";
                updateCompletion();
            });

            updateCompletion();
        },
        "admin-dashboard": () => {
            const ordersDropdownBtn =
                document.getElementById("ordersDropdownBtn");
            const ordersDropdownContainer =
                ordersDropdownBtn?.closest(".dropdown-block");

            if (ordersDropdownBtn && ordersDropdownContainer) {
                ordersDropdownBtn.addEventListener("click", () => {
                    ordersDropdownContainer.classList.toggle("open");
                });
            }

            const refreshKpisBtn = document.getElementById("refreshKpisBtn");
            const activePartnersMetric = document.getElementById(
                "activePartnersMetric",
            );
            const activePartnersNote =
                document.getElementById("activePartnersNote");
            const partnerProfitMetric = document.getElementById(
                "partnerProfitMetric",
            );
            const maidProfitMetric =
                document.getElementById("maidProfitMetric");

            const dashboardFinancialDefaults = {
                activePartners: 26,
                partnerProfit: 612000,
                maidProfit: 1020000,
            };

            function readFinancialSnapshot() {
                try {
                    const stored = JSON.parse(
                        localStorage.getItem("dashboardFinancialSnapshot"),
                    );
                    return stored && typeof stored === "object"
                        ? { ...dashboardFinancialDefaults, ...stored }
                        : dashboardFinancialDefaults;
                } catch (error) {
                    return dashboardFinancialDefaults;
                }
            }

            function formatCompactCurrency(value) {
                return `EGP ${Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 2 }).format(Number(value) || 0)}`;
            }

            function renderFinancialSnapshot() {
                const snapshot = readFinancialSnapshot();
                activePartnersMetric.textContent = Intl.NumberFormat(
                    "en",
                ).format(Number(snapshot.activePartners) || 0);
                partnerProfitMetric.textContent = formatCompactCurrency(
                    snapshot.partnerProfit,
                );
                maidProfitMetric.textContent = formatCompactCurrency(
                    snapshot.maidProfit,
                );
                activePartnersNote.textContent = `Currently active across all work zones - updated ${new Date().toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit" })}`;
            }

            refreshKpisBtn?.addEventListener("click", renderFinancialSnapshot);
            renderFinancialSnapshot();
        },
        "ads-history": () => {
            const publishedAds = [
                {
                    title: "Hero Cleaning Campaign",
                    slot: "Home Hero Banner",
                    status: "Live",
                    createdAt: "2026-04-01 10:30 AM",
                    endsAt: "2026-07-30 11:59 PM",
                    impressions: 12400,
                    clicks: 1840,
                    link: "tarwiqa.app/offers/cleaning-gold",
                },
                {
                    title: "Referral Push Banner",
                    slot: "Sidebar Slot",
                    status: "Live",
                    createdAt: "2026-03-14 12:00 PM",
                    endsAt: "2026-04-30 11:59 PM",
                    impressions: 9800,
                    clicks: 1210,
                    link: "tarwiqa.app/referrals/spring",
                },
                {
                    title: "Gold Access Promo",
                    slot: "Offer Card",
                    status: "Live",
                    createdAt: "2026-05-02 09:00 AM",
                    endsAt: "2026-09-01 11:59 PM",
                    impressions: 1900,
                    clicks: 310,
                    link: "tarwiqa.app/offers/gold-access",
                },
                {
                    title: "Ramadan Deep Clean",
                    slot: "Home Slider",
                    status: "Ended",
                    createdAt: "2026-02-10 08:45 AM",
                    endsAt: "2026-03-20 11:59 PM",
                    impressions: 22100,
                    clicks: 2840,
                    link: "tarwiqa.app/offers/ramadan-clean",
                },
                {
                    title: "Weekend Maid Offer",
                    slot: "Discovery Widget",
                    status: "Ended",
                    createdAt: "2026-01-05 11:20 AM",
                    endsAt: "2026-02-05 11:59 PM",
                    impressions: 15400,
                    clicks: 1705,
                    link: "tarwiqa.app/offers/weekend",
                },
            ];

            const tableBody = document.getElementById("adsHistoryTableBody");
            const publishedAdsMetric =
                document.getElementById("publishedAdsMetric");
            const impressionsMetric =
                document.getElementById("impressionsMetric");
            const clicksMetric = document.getElementById("clicksMetric");
            const bestCtrMetric = document.getElementById("bestCtrMetric");

            function formatNumber(value) {
                return value.toLocaleString();
            }

            function getCtr(ad) {
                return ad.impressions ? (ad.clicks / ad.impressions) * 100 : 0;
            }

            function renderSummary() {
                const totalImpressions = publishedAds.reduce(
                    (sum, ad) => sum + ad.impressions,
                    0,
                );
                const totalClicks = publishedAds.reduce(
                    (sum, ad) => sum + ad.clicks,
                    0,
                );
                const bestCtr = Math.max(...publishedAds.map(getCtr));

                publishedAdsMetric.textContent = String(publishedAds.length);
                impressionsMetric.textContent = formatNumber(totalImpressions);
                clicksMetric.textContent = formatNumber(totalClicks);
                bestCtrMetric.textContent = `${bestCtr.toFixed(1)}%`;
            }

            function renderTable() {
                tableBody.innerHTML = publishedAds
                    .map((ad) => {
                        const ctr = getCtr(ad).toFixed(1);
                        return `<tr>
        <td><strong>${ad.title}</strong></td>
        <td>${ad.slot}</td>
        <td><span class="status-pill ${ad.status.toLowerCase()}">${ad.status}</span></td>
        <td>${ad.createdAt}</td>
        <td>${ad.endsAt}</td>
        <td>${formatNumber(ad.impressions)}</td>
        <td>${formatNumber(ad.clicks)}</td>
        <td>${ctr}%</td>
        <td class="link-cell">${ad.link}</td>
      </tr>`;
                    })
                    .join("");
            }

            renderSummary();
            renderTable();
        },
        "ads-spaces": () => {
            const ads = {
                "hero-cleaning": {
                    title: "Hero Cleaning Campaign",
                    headline: "Refresh Your Home With TARWIQA",
                    slot: "Home Hero Banner",
                    status: "Live",
                    link: "tarwiqa.app/offers/cleaning-gold",
                    description:
                        "Primary homepage banner promoting premium cleaning packages and direct request conversion.",
                    imageName: "Built-in hero creative",
                    impressions: 12400,
                    clicks: 1840,
                    createdAt: "2026-04-01 10:30 AM",
                    endsAt: "2026-07-30 11:59 PM",
                },
                "referral-push": {
                    title: "Referral Push Banner",
                    headline: "Invite Friends & Save More",
                    slot: "Sidebar Slot",
                    status: "Scheduled",
                    link: "tarwiqa.app/referrals/spring",
                    description:
                        "Promotes customer referral activity and opens the shares campaign landing page.",
                    imageName: "Built-in referral creative",
                    impressions: 4100,
                    clicks: 520,
                    createdAt: "2026-04-08 01:15 PM",
                    endsAt: "2026-08-15 11:59 PM",
                },
                "gold-access": {
                    title: "Gold Access Promo",
                    headline: "North Star Offer",
                    slot: "Offer Card",
                    status: "Live",
                    link: "tarwiqa.app/offers/gold-access",
                    description:
                        "Highlights the most requested premium offer inside offers and widget discovery sections.",
                    imageName: "Built-in offer creative",
                    impressions: 1900,
                    clicks: 310,
                    createdAt: "2026-05-02 09:00 AM",
                    endsAt: "2026-09-01 11:59 PM",
                },
            };

            const createAdSlotBtn = document.getElementById("createAdSlotBtn");
            const showHistoryBtn = document.getElementById("showHistoryBtn");
            const adsGrid = document.getElementById("adsGrid");
            const adsModal = document.getElementById("adsModal");
            const adsModalTitle = document.getElementById("adsModalTitle");
            const adsModalSubtitle =
                document.getElementById("adsModalSubtitle");
            const adsModalContent = document.getElementById("adsModalContent");
            const closeAdsModalBtn =
                document.getElementById("closeAdsModalBtn");
            const closeAdsModalFooterBtn = document.getElementById(
                "closeAdsModalFooterBtn",
            );
            const adsToast = document.getElementById("adsToast");
            const adsToastText = document.getElementById("adsToastText");

            let toastTimeoutId = null;
            let editingAdId = null;

            const escapeHtml = __shared.escapeHtml_6;

            function showToast(message) {
                adsToastText.textContent = message;
                adsToast.classList.remove("hidden");

                if (toastTimeoutId) {
                    window.clearTimeout(toastTimeoutId);
                }

                toastTimeoutId = window.setTimeout(() => {
                    adsToast.classList.add("hidden");
                }, 3000);
            }

            function openModal(title, subtitle, content) {
                adsModalTitle.textContent = title;
                adsModalSubtitle.textContent = subtitle;
                adsModalContent.innerHTML = content;
                adsModal.classList.remove("hidden");
            }

            function closeModal() {
                adsModal.classList.add("hidden");
                editingAdId = null;
            }

            function getAdCardFromId(adId) {
                return adsGrid.querySelector(`[data-ad-id="${adId}"]`);
            }

            function getAdCard(button) {
                return button.closest("[data-ad-id]");
            }

            function getAd(adId) {
                return ads[adId];
            }

            function setAdStatus(card, ad, status) {
                ad.status = status;
                const statusPill = card.querySelector(".status-pill");
                const pauseButton = card.querySelector(
                    '[data-ad-action="pause"]',
                );

                if (statusPill) {
                    statusPill.textContent = status;
                    statusPill.className = `status-pill ${status.toLowerCase()}`;
                }

                if (pauseButton) {
                    pauseButton.textContent =
                        status === "Live" ? "Pause" : "Active";
                }
            }

            function updateAdCard(adId) {
                const ad = getAd(adId);
                const card = getAdCardFromId(adId);

                if (!ad || !card) {
                    return;
                }

                const cardTitle = card.querySelector(".ad-head h3");
                const visualTitle = card.querySelector(
                    ".ad-visual h2, .ad-visual h3",
                );
                const description = card.querySelector(".ad-meta p");
                const link = card.querySelector(".ad-meta a");

                if (cardTitle) cardTitle.textContent = ad.title;
                if (visualTitle) visualTitle.textContent = ad.headline;
                if (description) description.textContent = ad.description;
                if (link) link.textContent = ad.link;
                setAdStatus(card, ad, ad.status);
            }

            function buildAdDetails(ad) {
                return `<p><strong>Ad:</strong> ${escapeHtml(ad.title)}</p>
    <p><strong>Main Headline:</strong> ${escapeHtml(ad.headline)}</p>
    <p><strong>Slot:</strong> ${escapeHtml(ad.slot)}</p>
    <p><strong>Status:</strong> ${escapeHtml(ad.status)}</p>
    <p><strong>Destination:</strong> ${escapeHtml(ad.link)}</p>
    <p><strong>Text:</strong> ${escapeHtml(ad.description)}</p>
    <p><strong>Image:</strong> ${escapeHtml(ad.imageName)}</p>`;
            }

            function buildEditForm(adId, ad) {
                return `<form class="ads-form" id="editAdForm">
    <label><span>Ad Title</span><input id="editAdTitle" type="text" value="${escapeHtml(ad.title)}" /></label>
    <label><span>Main Headline</span><input id="editAdHeadline" type="text" value="${escapeHtml(ad.headline)}" /></label>
    <label class="wide"><span>Destination Link</span><input id="editAdLink" type="text" value="${escapeHtml(ad.link)}" /></label>
    <label class="wide"><span>Ad Text</span><textarea id="editAdDescription" rows="4">${escapeHtml(ad.description)}</textarea></label>
    <label class="wide image-upload-field">
      <span>Ad Image</span>
      <input id="adImageInput" type="file" accept="image/*" />
      <small id="adImageFileName">Current: ${escapeHtml(ad.imageName)}</small>
    </label>
    <div class="ad-image-preview wide" id="adImagePreview">
      <span>Upload a new image to replace the current ad image</span>
    </div>
    <div class="form-submit-row wide">
      <button class="mini-btn primary" type="submit">Save Changes</button>
    </div>
  </form>`;
            }

            function bindAdImageUpload() {
                const imageInput = document.getElementById("adImageInput");
                const imagePreview = document.getElementById("adImagePreview");
                const imageFileName =
                    document.getElementById("adImageFileName");

                if (!imageInput || !imagePreview || !imageFileName) {
                    return;
                }

                imageInput.addEventListener("change", () => {
                    const file = imageInput.files?.[0];

                    if (!file) {
                        imageFileName.textContent = editingAdId
                            ? `Current: ${ads[editingAdId].imageName}`
                            : "No image selected";
                        imagePreview.innerHTML =
                            "<span>Image preview will appear here</span>";
                        return;
                    }

                    imageFileName.textContent = file.name;
                    const previewUrl = URL.createObjectURL(file);
                    imagePreview.innerHTML = `<img src="${previewUrl}" alt="Selected ad preview" />`;
                });
            }

            function bindEditAdForm(adId) {
                const form = document.getElementById("editAdForm");
                if (!form) return;

                form.addEventListener("submit", (event) => {
                    event.preventDefault();
                    const ad = getAd(adId);
                    const imageInput = document.getElementById("adImageInput");
                    const selectedImage = imageInput?.files?.[0];

                    ad.title =
                        document.getElementById("editAdTitle").value.trim() ||
                        ad.title;
                    ad.headline =
                        document
                            .getElementById("editAdHeadline")
                            .value.trim() || ad.headline;
                    ad.link =
                        document.getElementById("editAdLink").value.trim() ||
                        ad.link;
                    ad.description =
                        document
                            .getElementById("editAdDescription")
                            .value.trim() || ad.description;

                    if (selectedImage) {
                        ad.imageName = selectedImage.name;
                    }

                    updateAdCard(adId);
                    closeModal();
                    showToast(`${ad.title} updated successfully.`);
                });
            }

            function openCreateAdModal() {
                editingAdId = null;
                openModal(
                    "Create Ad Slot",
                    "Prepare a new slider ad placement for the app.",
                    `<div class="ads-form">
      <label><span>Ad Title</span><input type="text" value="New Seasonal Campaign" /></label>
      <label><span>Slot Name</span><input type="text" value="Home Slider" /></label>
      <label><span>Destination Link</span><input type="text" value="tarwiqa.app/offers/new-campaign" /></label>
      <label class="wide"><span>Description</span><textarea rows="4">Describe the campaign message, target audience, and where this slider should appear.</textarea></label>
      <label class="wide image-upload-field">
        <span>Ad Image</span>
        <input id="adImageInput" type="file" accept="image/*" />
        <small id="adImageFileName">No image selected</small>
      </label>
      <div class="ad-image-preview wide" id="adImagePreview">
        <span>Image preview will appear here</span>
      </div>
    </div>`,
                );
                bindAdImageUpload();
                showToast("New ad slot form opened.");
            }

            function showHistory() {
                window.location.href = "./ads-history.html";
            }

            function buildPreview(ad) {
                const ctr = ad.impressions
                    ? ((ad.clicks / ad.impressions) * 100).toFixed(1)
                    : "0.0";
                return `<div class="preview-report" id="adPreviewReport">
    <div class="preview-header">
      <div>
        <p class="eyebrow">Ad Preview Report</p>
        <h3>${escapeHtml(ad.title)}</h3>
      </div>
      <button class="mini-btn primary" type="button" id="printAdPreviewBtn">Print</button>
    </div>
    ${buildAdDetails(ad)}
    <div class="preview-metrics">
      <article><span>Impressions</span><strong>${ad.impressions.toLocaleString()}</strong></article>
      <article><span>Ad Clicks</span><strong>${ad.clicks.toLocaleString()}</strong></article>
      <article><span>Click Rate</span><strong>${ctr}%</strong></article>
      <article><span>Created Date</span><strong>${escapeHtml(ad.createdAt)}</strong></article>
      <article><span>End Date</span><strong>${escapeHtml(ad.endsAt)}</strong></article>
    </div>
  </div>`;
            }

            function bindPrintPreview() {
                const printButton =
                    document.getElementById("printAdPreviewBtn");
                if (!printButton) return;

                printButton.addEventListener("click", () => {
                    window.print();
                });
            }

            function handleAdAction(button) {
                const action = button.dataset.adAction;
                const card = getAdCard(button);
                const adId = card?.dataset.adId;
                const ad = getAd(adId);

                if (!ad || !card) {
                    return;
                }

                if (action === "edit") {
                    editingAdId = adId;
                    openModal(
                        "Edit Ad",
                        "Update image, link, text, and main headline.",
                        buildEditForm(adId, ad),
                    );
                    bindAdImageUpload();
                    bindEditAdForm(adId);
                    showToast(`${ad.title} opened for editing.`);
                    return;
                }

                if (action === "pause") {
                    const nextStatus = ad.status === "Live" ? "Paused" : "Live";
                    setAdStatus(card, ad, nextStatus);
                    showToast(`${ad.title} is now ${nextStatus}.`);
                    return;
                }

                if (action === "preview") {
                    openModal(
                        "Ad Preview",
                        "Full campaign data, performance metrics, and dates.",
                        buildPreview(ad),
                    );
                    bindPrintPreview();
                    showToast(`${ad.title} preview opened.`);
                }
            }

            createAdSlotBtn.addEventListener("click", openCreateAdModal);
            showHistoryBtn.addEventListener("click", showHistory);

            adsGrid.addEventListener("click", (event) => {
                const actionButton = event.target.closest("[data-ad-action]");
                if (actionButton) {
                    handleAdAction(actionButton);
                }
            });

            closeAdsModalBtn.addEventListener("click", closeModal);
            closeAdsModalFooterBtn.addEventListener("click", closeModal);
            adsModal.addEventListener("click", (event) => {
                if (event.target === adsModal) {
                    closeModal();
                }
            });
        },
        "approval-center": () => {
            const q = (id) => document.getElementById(id),
                read = (k, f) => {
                    try {
                        return JSON.parse(localStorage.getItem(k)) ?? f;
                    } catch {
                        return f;
                    }
                },
                write = (k, v) => localStorage.setItem(k, JSON.stringify(v)),
                esc = (v) =>
                    String(v ?? "").replace(
                        /[&<>"']/g,
                        (c) =>
                            ({
                                "&": "&amp;",
                                "<": "&lt;",
                                ">": "&gt;",
                                '"': "&quot;",
                                "'": "&#39;",
                            })[c],
                    );
            const seeds = [
                {
                    id: "APR-26081",
                    type: "Finance",
                    subject: "Customer wallet adjustment",
                    target: "USR-102938 / Mariam Kamal",
                    requestedBy: "Sara Nabil",
                    requesterRole: "Supporter",
                    before: "EGP 420",
                    after: "EGP 920",
                    priority: "Urgent",
                    submittedAt: "2026-08-18T09:20:00",
                    reason: "Compensation approved after a duplicated wallet charge.",
                    evidence: "wallet-case-102938.pdf",
                    status: "Pending",
                },
                {
                    id: "APR-26082",
                    type: "Partners",
                    subject: "Partner commission change",
                    target: "OP-1024 / Mona Adel",
                    requestedBy: "Omar Hassan",
                    requesterRole: "Finance Editor",
                    before: "18%",
                    after: "20%",
                    priority: "Normal",
                    submittedAt: "2026-08-18T08:45:00",
                    reason: "Temporary commission increase for the August performance target.",
                    evidence: "commission-review.xlsx",
                    status: "Pending",
                },
                {
                    id: "APR-26083",
                    type: "Orders",
                    subject: "Paid order cancellation refund",
                    target: "ORD-9402 / Nada Fathy",
                    requestedBy: "Dina Adel",
                    requesterRole: "Supporter",
                    before: "Confirmed / EGP 2,100",
                    after: "Cancelled / Full refund",
                    priority: "Urgent",
                    submittedAt: "2026-08-18T08:10:00",
                    reason: "Customer reported an emergency before partner handover.",
                    evidence: "customer-confirmation.pdf",
                    status: "Pending",
                },
                {
                    id: "APR-26084",
                    type: "Maids",
                    subject: "Maid salary update",
                    target: "MD-1098 / Hoda Ali",
                    requestedBy: "Ahmed Fathy",
                    requesterRole: "Operations Editor",
                    before: "EGP 9,200",
                    after: "EGP 9,800",
                    priority: "Normal",
                    submittedAt: "2026-08-17T16:35:00",
                    reason: "Monthly performance review and completed-order target achieved.",
                    evidence: "performance-august.pdf",
                    status: "Pending",
                },
                {
                    id: "APR-26079",
                    type: "Pricing",
                    subject: "Gold Package price change",
                    target: "PKG-204 / Gold Package",
                    requestedBy: "Youssef Ali",
                    requesterRole: "Pricing Editor",
                    before: "EGP 1,850",
                    after: "EGP 1,950",
                    priority: "Normal",
                    submittedAt: "2026-08-17T10:15:00",
                    reason: "Supplier and operating cost adjustment.",
                    evidence: "pricing-sheet.pdf",
                    status: "Approved",
                    decidedBy: "Super Admin",
                    decidedAt: "2026-08-18T07:40:00",
                    decisionNote: "Approved for the next publishing cycle.",
                },
                {
                    id: "APR-26077",
                    type: "Partners",
                    subject: "Pause partner account",
                    target: "OP-1057 / Ahmed Fathy",
                    requestedBy: "Karim Samir",
                    requesterRole: "Supporter",
                    before: "Active",
                    after: "Paused",
                    priority: "Urgent",
                    submittedAt: "2026-08-16T13:30:00",
                    reason: "Incomplete contract renewal documents.",
                    evidence: "document-check.pdf",
                    status: "Rejected",
                    decidedBy: "Super Admin",
                    decidedAt: "2026-08-17T14:05:00",
                    decisionNote:
                        "Partner submitted valid renewal documents before the deadline.",
                },
            ];
            let requests = read("approvalCenterRequests", null);
            if (!Array.isArray(requests)) {
                requests = seeds;
                write("approvalCenterRequests", requests);
            }
            let currentView = "pending",
                activeId = null,
                decisionType = null;
            const today = () => new Date().toISOString().slice(0, 10),
                formatDate = (v) =>
                    new Date(v).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                    });
            function filtered() {
                const term = q("approvalSearch").value.trim().toLowerCase(),
                    type = q("typeFilter").value,
                    priority = q("priorityFilter").value;
                return requests.filter(
                    (r) =>
                        (currentView === "pending"
                            ? r.status === "Pending"
                            : r.status !== "Pending") &&
                        (type === "all" || r.type === type) &&
                        (priority === "all" || r.priority === priority) &&
                        [r.id, r.subject, r.target, r.requestedBy, r.type]
                            .join(" ")
                            .toLowerCase()
                            .includes(term),
                );
            }
            function metrics() {
                const date = today();
                q("pendingMetric").textContent = requests.filter(
                    (r) => r.status === "Pending",
                ).length;
                q("urgentMetric").textContent = requests.filter(
                    (r) => r.status === "Pending" && r.priority === "Urgent",
                ).length;
                q("approvedMetric").textContent = requests.filter(
                    (r) =>
                        r.status === "Approved" &&
                        r.decidedAt?.slice(0, 10) === date,
                ).length;
                q("rejectedMetric").textContent = requests.filter(
                    (r) =>
                        r.status === "Rejected" &&
                        r.decidedAt?.slice(0, 10) === date,
                ).length;
                localStorage.setItem(
                    "approvalPendingCount",
                    String(
                        requests.filter((r) => r.status === "Pending").length,
                    ),
                );
                document.dispatchEvent(
                    new CustomEvent("approval-count-updated"),
                );
            }
            function render() {
                const rows = filtered();
                q("approvalTableBody").innerHTML = rows
                    .map(
                        (r) =>
                            '<tr><td><div class="request-cell"><strong>' +
                            esc(r.subject) +
                            "</strong><span>" +
                            r.id +
                            " / " +
                            esc(r.target) +
                            "</span></div></td><td>" +
                            r.type +
                            "</td><td><strong>" +
                            esc(r.requestedBy) +
                            '</strong><div class="muted">' +
                            esc(r.requesterRole) +
                            '</div></td><td><div class="change-cell"><span>' +
                            esc(r.before) +
                            "</span><b>To: " +
                            esc(r.after) +
                            '</b></div></td><td><span class="pill ' +
                            r.priority.toLowerCase() +
                            '">' +
                            r.priority +
                            "</span></td><td>" +
                            formatDate(r.submittedAt) +
                            '</td><td><span class="pill ' +
                            r.status.toLowerCase() +
                            '">' +
                            r.status +
                            '</span></td><td><div class="actions"><button class="table-btn" data-view-id="' +
                            r.id +
                            '" type="button">View</button>' +
                            (r.status === "Pending"
                                ? '<button class="table-btn approve" data-approve-id="' +
                                r.id +
                                '" type="button">Approve</button><button class="table-btn reject" data-reject-id="' +
                                r.id +
                                '" type="button">Reject</button>'
                                : "") +
                            "</div></td></tr>",
                    )
                    .join("");
                q("approvalEmpty").classList.toggle("hidden", rows.length > 0);
                bindRows();
                metrics();
            }
            function bindRows() {
                document
                    .querySelectorAll("[data-view-id]")
                    .forEach(
                        (b) =>
                            (b.onclick = () => openDetails(b.dataset.viewId)),
                    );
                document
                    .querySelectorAll("[data-approve-id]")
                    .forEach(
                        (b) =>
                        (b.onclick = () =>
                            openDecision(b.dataset.approveId, "Approved")),
                    );
                document
                    .querySelectorAll("[data-reject-id]")
                    .forEach(
                        (b) =>
                        (b.onclick = () =>
                            openDecision(b.dataset.rejectId, "Rejected")),
                    );
            }
            function detailBody(r) {
                return (
                    '<div class="detail-grid"><div class="detail-item"><span>Request ID</span><strong>' +
                    r.id +
                    '</strong></div><div class="detail-item"><span>Requested By</span><strong>' +
                    esc(r.requestedBy) +
                    '</strong></div><div class="detail-item"><span>Submitted</span><strong>' +
                    formatDate(r.submittedAt) +
                    '</strong></div></div><div class="change-panel"><div class="change-column"><span>Current Value</span><strong>' +
                    esc(r.before) +
                    '</strong></div><div class="change-arrow">-&gt;</div><div class="change-column"><span>Requested Value</span><strong>' +
                    esc(r.after) +
                    '</strong></div></div><div class="reason-panel"><strong>Business Reason</strong><p>' +
                    esc(r.reason) +
                    '</p></div><div class="evidence-row"><span>Supporting File</span><strong>' +
                    esc(r.evidence || "No attachment") +
                    "</strong></div>" +
                    (r.status !== "Pending"
                        ? '<div class="reason-panel"><strong>' +
                        r.status +
                        " by " +
                        esc(r.decidedBy) +
                        "</strong><p>" +
                        esc(r.decisionNote) +
                        '</p><span class="muted">' +
                        formatDate(r.decidedAt) +
                        "</span></div>"
                        : "")
                );
            }
            function showModal(r) {
                activeId = r.id;
                q("approvalModalTitle").textContent = r.subject;
                q("approvalModalEyebrow").textContent = r.type + " Approval";
                q("approvalModalBody").innerHTML = detailBody(r);
                q("approvalModal").classList.remove("hidden");
                q("approvalModal").setAttribute("aria-hidden", "false");
            }
            function openDetails(id) {
                const r = requests.find((x) => x.id === id);
                if (!r) return;
                decisionType = null;
                showModal(r);
                q("decisionForm").classList.add("hidden");
                q("confirmDecisionBtn").classList.add("hidden");
                q("approveRequestBtn").classList.toggle(
                    "hidden",
                    r.status !== "Pending",
                );
                q("rejectRequestBtn").classList.toggle(
                    "hidden",
                    r.status !== "Pending",
                );
            }
            function openDecision(id, type) {
                const r = requests.find((x) => x.id === id);
                if (!r || r.status !== "Pending") return;
                showModal(r);
                decisionType = type;
                q("approveRequestBtn").classList.add("hidden");
                q("rejectRequestBtn").classList.add("hidden");
                q("decisionForm").classList.remove("hidden");
                q("confirmDecisionBtn").classList.remove("hidden");
                q("confirmDecisionBtn").textContent = "Confirm " + type;
                q("decisionNoteLabel").textContent =
                    type === "Rejected"
                        ? "Rejection Reason *"
                        : "Approval Note";
                q("decisionNote").value = "";
                q("decisionError").textContent = "";
                q("decisionNote").focus();
            }
            function confirmDecision() {
                const r = requests.find((x) => x.id === activeId),
                    note = q("decisionNote").value.trim();
                if (!r) return;
                if (decisionType === "Rejected" && !note) {
                    q("decisionError").textContent =
                        "A rejection reason is required.";
                    q("decisionNote").focus();
                    return;
                }
                const finalDecision = decisionType;
                r.status = finalDecision;
                r.decidedBy = "Super Admin";
                r.decidedAt = new Date().toISOString();
                r.decisionNote =
                    note ||
                    finalDecision + " after reviewing the submitted evidence.";
                write("approvalCenterRequests", requests);
                closeModal();
                render();
                toast(r.id + " was " + finalDecision.toLowerCase() + ".");
            }
            function closeModal() {
                q("approvalModal").classList.add("hidden");
                q("approvalModal").setAttribute("aria-hidden", "true");
                activeId = null;
                decisionType = null;
            }
            function setView(view) {
                currentView = view;
                document
                    .querySelectorAll("[data-view]")
                    .forEach((b) =>
                        b.classList.toggle("active", b.dataset.view === view),
                    );
                q("tableEyebrow").textContent =
                    view === "pending" ? "Decision Queue" : "Audit History";
                q("tableTitle").textContent =
                    view === "pending"
                        ? "Pending Approval Requests"
                        : "Approval Decision History";
                q("showHistoryBtn").textContent =
                    view === "pending" ? "Show History" : "Show Pending";
                render();
            }
            function toast(m) {
                q("approvalToast").textContent = m;
                q("approvalToast").classList.remove("hidden");
                clearTimeout(toast.timer);
                toast.timer = setTimeout(
                    () => q("approvalToast").classList.add("hidden"),
                    2600,
                );
            }
            document
                .querySelectorAll("[data-view]")
                .forEach((b) => (b.onclick = () => setView(b.dataset.view)));
            ["approvalSearch", "typeFilter", "priorityFilter"].forEach((id) =>
                q(id).addEventListener(
                    id === "approvalSearch" ? "input" : "change",
                    render,
                ),
            );
            q("clearApprovalFilters").onclick = () => {
                q("approvalSearch").value = "";
                q("typeFilter").value = "all";
                q("priorityFilter").value = "all";
                render();
            };
            q("showHistoryBtn").onclick = () =>
                setView(currentView === "pending" ? "history" : "pending");
            q("refreshApprovalsBtn").onclick = () => {
                requests = read("approvalCenterRequests", seeds);
                render();
                toast("Approval queue refreshed.");
            };
            q("approvalModalClose").onclick = closeModal;
            q("approvalModalSecondary").onclick = closeModal;
            q("approveRequestBtn").onclick = () =>
                openDecision(activeId, "Approved");
            q("rejectRequestBtn").onclick = () =>
                openDecision(activeId, "Rejected");
            q("confirmDecisionBtn").onclick = confirmDecision;
            q("approvalModal").onclick = (e) => {
                if (e.target === q("approvalModal")) closeModal();
            };
            document.addEventListener("keydown", (e) => {
                if (e.key === "Escape") closeModal();
            });
            render();
        },
        "cancelled-orders": () => {
            const cancelledOrdersDropdownBtn =
                document.getElementById("ordersDropdownBtn");
            const cancelledOrdersDropdownContainer =
                cancelledOrdersDropdownBtn?.closest(".dropdown-block");
            const cancelledOrdersTableBody = document.getElementById(
                "cancelledOrdersTableBody",
            );
            const cancelledSearchTypeSelect = document.getElementById(
                "cancelledSearchTypeSelect",
            );
            const cancelledSearchInput = document.getElementById(
                "cancelledSearchInput",
            );
            const cancelledSortSelect = document.getElementById(
                "cancelledSortSelect",
            );
            const cancelledCountMetric = document.getElementById(
                "cancelledCountMetric",
            );
            const customerCancelledMetric = document.getElementById(
                "customerCancelledMetric",
            );
            const opsRejectedMetric =
                document.getElementById("opsRejectedMetric");
            const refundValueMetric =
                document.getElementById("refundValueMetric");
            const cancelledOrderModal = document.getElementById(
                "cancelledOrderModal",
            );
            const cancelledOrderModalContent = document.getElementById(
                "cancelledOrderModalContent",
            );
            const closeCancelledOrderModalBtn = document.getElementById(
                "closeCancelledOrderModalBtn",
            );
            const closeCancelledOrderFooterBtn = document.getElementById(
                "closeCancelledOrderFooterBtn",
            );

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

            if (
                cancelledOrdersDropdownBtn &&
                cancelledOrdersDropdownContainer
            ) {
                cancelledOrdersDropdownBtn.addEventListener("click", () => {
                    cancelledOrdersDropdownContainer.classList.toggle("open");
                });
            }

            const formatCurrency = __shared.formatCurrency_7;

            function getFilteredCancelledOrders() {
                const searchType = cancelledSearchTypeSelect.value;
                const query = cancelledSearchInput.value.trim().toLowerCase();

                let filtered = [...cancelledOrders];

                if (query) {
                    filtered = filtered.filter((order) =>
                        String(order[searchType]).toLowerCase().includes(query),
                    );
                }

                switch (cancelledSortSelect.value) {
                    case "priceDesc":
                        filtered.sort(
                            (left, right) => right.price - left.price,
                        );
                        break;
                    case "reasonAsc":
                        filtered.sort((left, right) =>
                            left.reason.localeCompare(right.reason),
                        );
                        break;
                    default:
                        filtered.sort((left, right) =>
                            right.cancelledDate.localeCompare(
                                left.cancelledDate,
                            ),
                        );
                        break;
                }

                return filtered;
            }

            function renderCancelledMetrics(orders) {
                cancelledCountMetric.textContent = String(orders.length);
                customerCancelledMetric.textContent = String(
                    orders.filter((order) =>
                        order.reason.toLowerCase().includes("customer"),
                    ).length,
                );
                opsRejectedMetric.textContent = String(
                    orders.filter(
                        (order) =>
                            !order.reason.toLowerCase().includes("customer"),
                    ).length,
                );
                refundValueMetric.textContent = formatCurrency(
                    orders
                        .filter(
                            (order) =>
                                order.refundStatus !== "No capture collected",
                        )
                        .reduce((sum, order) => sum + order.price, 0),
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
      `,
                    )
                    .join("");

                renderCancelledMetrics(orders);
                bindCancelledOrderActions();
            }

            function openCancelledOrderModal(orderId) {
                const order = cancelledOrders.find(
                    (item) => item.id === orderId,
                );

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
                document
                    .querySelectorAll("[data-cancelled-order-id]")
                    .forEach((button) => {
                        button.addEventListener("click", () => {
                            openCancelledOrderModal(
                                button.dataset.cancelledOrderId,
                            );
                        });
                    });
            }

            cancelledSearchTypeSelect?.addEventListener(
                "change",
                renderCancelledOrders,
            );
            cancelledSearchInput?.addEventListener(
                "input",
                renderCancelledOrders,
            );
            cancelledSortSelect?.addEventListener(
                "change",
                renderCancelledOrders,
            );
            closeCancelledOrderModalBtn?.addEventListener(
                "click",
                closeCancelledOrderModal,
            );
            closeCancelledOrderFooterBtn?.addEventListener(
                "click",
                closeCancelledOrderModal,
            );
            cancelledOrderModal?.addEventListener("click", (event) => {
                if (event.target === cancelledOrderModal) {
                    closeCancelledOrderModal();
                }
            });

            renderCancelledOrders();
        },
        "custom-package": () => {
            const ordersDropdownBtn =
                document.getElementById("ordersDropdownBtn");
            const ordersDropdownContainer =
                ordersDropdownBtn?.closest(".dropdown-block");

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
                    services: [
                        "Floor Cleaning",
                        "Kitchen Cleaning",
                        "Bathroom Sanitizing",
                    ],
                },
                {
                    governorate: "North Coast",
                    widget: "Premium Package",
                    category: "Seasonal",
                    x: 18,
                    c: 28,
                    y: 42,
                    services: [
                        "Villa Cleaning",
                        "Balcony Wash",
                        "Window Cleaning",
                    ],
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
                    services: [
                        "Floor Cleaning",
                        "Bathroom Sanitizing",
                        "Ironing",
                    ],
                },
            ];

            function createOptions(options, selectedValue) {
                return options
                    .map(
                        (option) =>
                            `<option value="${option}"${option === selectedValue ? " selected" : ""}>${option}</option>`,
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
      `,
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
                                `<button class="quick-btn" type="button" data-action="quick-add" data-service="${escapeHtml(service)}">${escapeHtml(service)}</button>`,
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
                packagesGrid.innerHTML = packagesData
                    .map(renderPackageCard)
                    .join("");
            }

            function addService(packageIndex, serviceName) {
                const normalizedName = serviceName.trim();

                if (!normalizedName) {
                    return;
                }

                const packageItem = packagesData[packageIndex];
                const exists = packageItem.services.some(
                    (service) =>
                        service.toLowerCase() === normalizedName.toLowerCase(),
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
                    const input = packageCard.querySelector(
                        '[data-role="service-input"]',
                    );
                    addService(packageIndex, input.value);
                    return;
                }

                if (target.dataset.action === "quick-add") {
                    addService(packageIndex, target.dataset.service || "");
                    return;
                }

                if (target.dataset.action === "remove-service") {
                    removeService(
                        packageIndex,
                        Number(target.dataset.serviceIndex),
                    );
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

                if (
                    fieldName === "x" ||
                    fieldName === "c" ||
                    fieldName === "y"
                ) {
                    packagesData[packageIndex][fieldName] = Number(
                        target.value,
                    );
                    return;
                }

                packagesData[packageIndex][fieldName] = target.value;
            });

            packagesGrid.addEventListener("keydown", (event) => {
                if (event.key !== "Enter") {
                    return;
                }

                const input = event.target.closest(
                    '[data-role="service-input"]',
                );

                if (!input) {
                    return;
                }

                event.preventDefault();
                const packageCard = input.closest(".package-card");
                const packageIndex = Number(packageCard.dataset.packageIndex);
                addService(packageIndex, input.value);
            });

            renderPackages();
        },
        "done-orders": () => {
            const ordersDropdownBtn =
                document.getElementById("ordersDropdownBtn");
            const ordersDropdownContainer =
                ordersDropdownBtn?.closest(".dropdown-block");
            const doneOrdersTableBody = document.getElementById(
                "doneOrdersTableBody",
            );
            const doneSearchTypeSelect = document.getElementById(
                "doneSearchTypeSelect",
            );
            const doneSearchInput = document.getElementById("doneSearchInput");
            const doneSortSelect = document.getElementById("doneSortSelect");
            const doneCountMetric = document.getElementById("doneCountMetric");
            const doneRevenueMetric =
                document.getElementById("doneRevenueMetric");
            const doneTopCityMetric =
                document.getElementById("doneTopCityMetric");
            const doneAvgTimeMetric =
                document.getElementById("doneAvgTimeMetric");
            const doneOrderModal = document.getElementById("doneOrderModal");
            const doneOrderModalContent = document.getElementById(
                "doneOrderModalContent",
            );
            const closeDoneOrderModalBtn = document.getElementById(
                "closeDoneOrderModalBtn",
            );
            const closeDoneOrderFooterBtn = document.getElementById(
                "closeDoneOrderFooterBtn",
            );
            const exportDoneOrdersBtn = document.getElementById(
                "exportDoneOrdersBtn",
            );

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
                "#ORD-7421": {
                    address: "12 Nile Corniche, Maadi, Cairo",
                    createdDate: "22 Apr 2026, 08:15 AM",
                    totalPrice: 2600,
                    wallet: 100,
                    deposit: 250,
                    discount: 350,
                    paymentMethod: "E-Wallet",
                    arrivalTime: "09:00 AM",
                    assignedMaids: ["Amina Mostafa", "Hoda Ali"],
                    assignedPartner: "Cairo Premium Partner",
                    extras: ["Deep Cleaning Kit", "Window Cleaning"],
                },
                "#ORD-7398": {
                    address: "18 Fawzy Moaz Street, Smouha, Alexandria",
                    createdDate: "21 Apr 2026, 09:30 AM",
                    totalPrice: 2300,
                    wallet: 0,
                    deposit: 300,
                    discount: 200,
                    paymentMethod: "Cash",
                    arrivalTime: "10:00 AM",
                    assignedMaids: ["Hoda Ali"],
                    assignedPartner: "Alexandria Service Partner",
                    extras: ["Kitchen Sanitizing"],
                },
                "#ORD-7364": {
                    address: "9 Tahrir Street, Dokki, Giza",
                    createdDate: "20 Apr 2026, 06:40 AM",
                    totalPrice: 1900,
                    wallet: 100,
                    deposit: 200,
                    discount: 250,
                    paymentMethod: "Bank Transfer",
                    arrivalTime: "08:00 AM",
                    assignedMaids: ["Amal Fathy", "Eman Yasser"],
                    assignedPartner: "Giza Operations Partner",
                    extras: ["Ironing", "Carpet Refresh"],
                },
                "#ORD-7340": {
                    address: "17 El Gomhoria Street, Mansoura",
                    createdDate: "19 Apr 2026, 11:10 AM",
                    totalPrice: 1600,
                    wallet: 50,
                    deposit: 200,
                    discount: 300,
                    paymentMethod: "Cash",
                    arrivalTime: "01:00 PM",
                    assignedMaids: ["Eman Yasser"],
                    assignedPartner: "Delta Services Partner",
                    extras: ["Fridge Cleaning"],
                },
            };

            doneOrders.forEach((order) =>
                Object.assign(order, completedOrderDetails[order.id] || {}),
            );
            if (ordersDropdownBtn && ordersDropdownContainer) {
                ordersDropdownBtn.addEventListener("click", () => {
                    ordersDropdownContainer.classList.toggle("open");
                });
            }

            const formatCurrency = __shared.formatCurrency_7;

            function getFilteredDoneOrders() {
                const searchType = doneSearchTypeSelect.value;
                const query = doneSearchInput.value.trim().toLowerCase();

                let filtered = [...doneOrders];

                if (query) {
                    filtered = filtered.filter((order) =>
                        String(order[searchType]).toLowerCase().includes(query),
                    );
                }

                switch (doneSortSelect.value) {
                    case "priceDesc":
                        filtered.sort(
                            (left, right) => right.finalPrice - left.finalPrice,
                        );
                        break;
                    case "cityAsc":
                        filtered.sort((left, right) =>
                            left.city.localeCompare(right.city),
                        );
                        break;
                    default:
                        filtered.sort((left, right) =>
                            right.doneDate.localeCompare(left.doneDate),
                        );
                        break;
                }

                return filtered;
            }

            function renderDoneMetrics(orders) {
                doneCountMetric.textContent = String(orders.length);
                doneRevenueMetric.textContent = formatCurrency(
                    orders.reduce((sum, order) => sum + order.finalPrice, 0),
                );

                const cityCounts = orders.reduce((accumulator, order) => {
                    accumulator[order.city] =
                        (accumulator[order.city] || 0) + 1;
                    return accumulator;
                }, {});
                doneTopCityMetric.textContent =
                    Object.entries(cityCounts).sort(
                        (left, right) => right[1] - left[1],
                    )[0]?.[0] || "N/A";
                doneAvgTimeMetric.textContent = orders.length
                    ? "2h 12m"
                    : "0h 00m";
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
      `,
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
                    [
                        "Assigned Maids",
                        order.assignedMaids.join(", ") || "Not Assigned",
                    ],
                    [
                        "Assigned Partner",
                        order.assignedPartner || "Not Assigned",
                    ],
                    ["Selected Extras", order.extras.join(", ") || "No Extras"],
                    ["Done Date", order.doneDateLabel],
                    ["Completion Duration", order.duration],
                    ["Completion Notes", order.notes],
                ];
            }

            function openDoneOrderModal(orderId) {
                const order = doneOrders.find((item) => item.id === orderId);
                if (!order) return;

                doneOrderModalContent.innerHTML = getDoneOrderDetails(order)
                    .map(
                        ([label, value]) => `
      <div class="field readonly-field done-detail-field">
        <span>${escapeHtml(label)}</span>
        <div class="readonly-value">${escapeHtml(value)}</div>
      </div>
    `,
                    )
                    .join("");

                doneOrderModal.classList.remove("hidden");
            }

            function printDoneOrder(orderId) {
                const order = doneOrders.find((item) => item.id === orderId);
                if (!order) return;

                const printWindow = window.open(
                    "",
                    "_blank",
                    "width=960,height=760",
                );
                if (!printWindow) return;

                const details = getDoneOrderDetails(order)
                    .map(
                        ([label, value]) =>
                            `<div class="detail"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`,
                    )
                    .join("");

                printWindow.document.write(
                    `<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(order.id)} - Done Order</title><style>body{font-family:Arial,sans-serif;color:#172033;margin:32px}header{border-bottom:2px solid #071a3d;padding-bottom:18px;margin-bottom:22px}h1{margin:0 0 8px}.meta{color:#667085}.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.detail{border:1px solid #dfe4ec;border-radius:8px;padding:12px}.detail span{display:block;color:#667085;font-size:12px;margin-bottom:6px}.detail strong{font-size:14px;word-break:break-word}@media print{body{margin:18mm}.detail{break-inside:avoid}}</style></head><body><header><h1>Done Order ${escapeHtml(order.id)}</h1><div class="meta">Complete order details</div></header><main class="grid">${details}</main></body></html>`,
                );
                printWindow.document.close();
                printWindow.focus();
                printWindow.print();
            }
            function closeDoneOrderModal() {
                doneOrderModal.classList.add("hidden");
            }

            function exportDoneOrders() {
                const headers = getDoneOrderDetails(doneOrders[0]).map(
                    ([label]) => label,
                );
                const rows = getFilteredDoneOrders().map((order) =>
                    getDoneOrderDetails(order).map(([, value]) => value),
                );
                const csv = [headers, ...rows]
                    .map((row) =>
                        row
                            .map(
                                (value) =>
                                    `"${String(value).replaceAll('"', '""')}"`,
                            )
                            .join(","),
                    )
                    .join("\n");
                const url = URL.createObjectURL(
                    new Blob([csv], { type: "text/csv;charset=utf-8" }),
                );
                const link = document.createElement("a");
                link.href = url;
                link.download = "done-orders.csv";
                link.click();
                URL.revokeObjectURL(url);
            }
            function bindDoneOrderActions() {
                document
                    .querySelectorAll("[data-done-action]")
                    .forEach((button) => {
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
            closeDoneOrderModalBtn?.addEventListener(
                "click",
                closeDoneOrderModal,
            );
            closeDoneOrderFooterBtn?.addEventListener(
                "click",
                closeDoneOrderModal,
            );
            doneOrderModal?.addEventListener("click", (event) => {
                if (event.target === doneOrderModal) {
                    closeDoneOrderModal();
                }
            });
            document.addEventListener("keydown", (event) => {
                if (
                    event.key === "Escape" &&
                    !doneOrderModal.classList.contains("hidden")
                ) {
                    closeDoneOrderModal();
                }
            });

            renderDoneOrders();
        },
        "extra-comments": () => {
            const shortNoteInput = document.getElementById("shortNoteInput");
            const orderPreviewPill =
                document.getElementById("orderPreviewPill");
            const extrasListBody = document.getElementById("extrasListBody");
            const createExtraBtn = document.getElementById("createExtraBtn");
            const exportExtrasBtn = document.getElementById("exportExtrasBtn");
            const saveExtraBtn = document.getElementById("saveExtraBtn");
            const resetExtraBtn = document.getElementById("resetExtraBtn");
            const extraFormCard = document.getElementById("extraFormCard");
            const extraIdInput = document.getElementById("extraIdInput");
            const extraCreatedDateInput = document.getElementById(
                "extraCreatedDateInput",
            );
            const extraReasonInput =
                document.getElementById("extraReasonInput");
            const extraDescriptionInput = document.getElementById(
                "extraDescriptionInput",
            );
            const deletedExtrasStorageKey = "temporarilyDeletedExtras";
            const customExtrasStorageKey = "customExtrasCatalog";

            const defaultExtrasCatalog = [
                {
                    id: "#EXT-2048",
                    createdDate: "23 Apr 2026",
                    name: "Deep Cleaning Kit",
                    description: "Additional deep-cleaning tools and supplies.",
                },
                {
                    id: "#EXT-2041",
                    createdDate: "23 Apr 2026",
                    name: "Ironing",
                    description: "Add garment ironing to the selected service.",
                },
                {
                    id: "#EXT-2034",
                    createdDate: "22 Apr 2026",
                    name: "Window Cleaning",
                    description: "Interior window and glass cleaning service.",
                },
                {
                    id: "#EXT-2027",
                    createdDate: "22 Apr 2026",
                    name: "Kitchen Sanitizing",
                    description: "Focused kitchen surface sanitizing.",
                },
                {
                    id: "#EXT-2019",
                    createdDate: "21 Apr 2026",
                    name: "Carpet Refresh",
                    description: "Quick carpet deodorizing and refresh.",
                },
                {
                    id: "#EXT-2012",
                    createdDate: "20 Apr 2026",
                    name: "Fridge Cleaning",
                    description: "Interior refrigerator cleaning add-on.",
                },
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
                localStorage.setItem(
                    deletedExtrasStorageKey,
                    JSON.stringify(temporarilyDeletedExtras),
                );
                localStorage.setItem(
                    customExtrasStorageKey,
                    JSON.stringify(customExtrasCatalog),
                );
            }

            const escapeHtml = __shared.escapeHtml_6;

            function getNextExtraId() {
                const highest = getExtrasCatalog().reduce((max, extra) => {
                    const value = Number(String(extra.id).replace(/\D/g, ""));
                    return Math.max(max, Number.isFinite(value) ? value : 0);
                }, 2048);
                return `#EXT-${highest + 1}`;
            }

            function formatCreatedDate() {
                return new Intl.DateTimeFormat("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                }).format(new Date());
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
                extrasListBody.innerHTML = getExtrasCatalog()
                    .map((extra) => {
                        const deleted = temporarilyDeletedExtras.includes(
                            extra.name,
                        );
                        return `
      <tr class="${deleted ? "temporarily-deleted-row" : ""}">
        <td>${escapeHtml(extra.id)}</td>
        <td>${escapeHtml(extra.createdDate)}</td>
        <td><strong>${escapeHtml(extra.name)}</strong></td>
        <td>${escapeHtml(extra.description)}</td>
        <td><span class="extra-status ${deleted ? "deleted" : "active"}">${deleted ? "Temporarily Deleted" : "Active"}</span></td>
        <td><button class="extra-state-btn ${deleted ? "restore" : "delete"}" type="button" data-extra-name="${escapeHtml(extra.name)}" data-extra-action="${deleted ? "restore" : "delete"}">${deleted ? "Restore" : "Temporarily Delete"}</button></td>
      </tr>`;
                    })
                    .join("");
            }

            function saveExtra() {
                const name = shortNoteInput.value.trim();
                const description = extraDescriptionInput.value.trim();
                if (!name || !description || !extraReasonInput.value.trim()) {
                    window.alert(
                        "Complete the extra name, reason, and description first.",
                    );
                    return;
                }
                if (
                    getExtrasCatalog().some(
                        (extra) =>
                            extra.name.toLowerCase() === name.toLowerCase(),
                    )
                ) {
                    window.alert("An extra with this name already exists.");
                    return;
                }

                customExtrasCatalog.push({
                    id: extraIdInput.value,
                    createdDate: extraCreatedDateInput.value,
                    name,
                    description,
                });
                saveState();
                renderExtrasList();
                resetExtraForm();
            }

            function exportExtras() {
                const rows = [
                    [
                        "Extra ID",
                        "Created Date",
                        "Extra Name",
                        "Description",
                        "Status",
                    ],
                    ...getExtrasCatalog().map((extra) => [
                        extra.id,
                        extra.createdDate,
                        extra.name,
                        extra.description,
                        temporarilyDeletedExtras.includes(extra.name)
                            ? "Temporarily Deleted"
                            : "Active",
                    ]),
                ];
                const csv = rows
                    .map((row) =>
                        row
                            .map(
                                (value) =>
                                    `"${String(value).replaceAll('"', '""')}"`,
                            )
                            .join(","),
                    )
                    .join("\n");
                const url = URL.createObjectURL(
                    new Blob([csv], { type: "text/csv;charset=utf-8" }),
                );
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
                temporarilyDeletedExtras =
                    button.dataset.extraAction === "delete"
                        ? [...new Set([...temporarilyDeletedExtras, name])]
                        : temporarilyDeletedExtras.filter(
                            (item) => item !== name,
                        );
                saveState();
                renderExtrasList();
            });

            shortNoteInput.addEventListener("input", () => {
                orderPreviewPill.textContent =
                    shortNoteInput.value.trim() || "Extra note";
            });
            createExtraBtn.addEventListener("click", () => {
                extraFormCard.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
                shortNoteInput.focus();
            });
            exportExtrasBtn.addEventListener("click", exportExtras);
            saveExtraBtn.addEventListener("click", saveExtra);
            resetExtraBtn.addEventListener("click", resetExtraForm);

            renderExtrasList();
            resetExtraForm();
        },
        "governorates-dashboard": () => {
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
                            description:
                                "Core services exposed to users inside Cairo.",
                            categories: [
                                {
                                    id: "c-quick",
                                    name: "Quick Services",
                                    description:
                                        "Fast-access daily usage categories.",
                                    packages: [
                                        {
                                            name: "Starter Pack",
                                            description:
                                                "Base operational package for entry users.",
                                            type: "Public",
                                            status: "Live",
                                        },
                                        {
                                            name: "Priority Pack",
                                            description:
                                                "Higher quota and faster processing for heavy usage.",
                                            type: "Premium",
                                            status: "Live",
                                        },
                                        {
                                            name: "Corporate Pack",
                                            description:
                                                "Managed access for business accounts.",
                                            type: "B2B",
                                            status: "Review",
                                        },
                                    ],
                                },
                                {
                                    id: "c-special",
                                    name: "Special Services",
                                    description:
                                        "Higher-complexity categories with approval flows.",
                                    packages: [
                                        {
                                            name: "Gold Access",
                                            description:
                                                "Priority service routing with premium support.",
                                            type: "Premium",
                                            status: "Live",
                                        },
                                        {
                                            name: "Elite Access",
                                            description:
                                                "High-value package for strategic users.",
                                            type: "VIP",
                                            status: "Draft",
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            id: "w-commerce",
                            name: "Commerce Layer",
                            description:
                                "Commercial widget configuration and monetized offers.",
                            categories: [
                                {
                                    id: "c-marketplace",
                                    name: "Marketplace",
                                    description:
                                        "Cross-sell and upsell categories.",
                                    packages: [
                                        {
                                            name: "Merchant Basic",
                                            description:
                                                "Entry marketplace exposure for small partners.",
                                            type: "Vendor",
                                            status: "Live",
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            id: "w-support",
                            name: "Support Center",
                            description: "Support and ticketing widget stack.",
                            categories: [
                                {
                                    id: "c-care",
                                    name: "Customer Care",
                                    description:
                                        "Tickets, complaints, and guided resolution.",
                                    packages: [
                                        {
                                            name: "Assist 24/7",
                                            description:
                                                "Round-the-clock service support package.",
                                            type: "Support",
                                            status: "Live",
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
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
                            description:
                                "Regional service bundle for Alexandria.",
                            categories: [
                                {
                                    id: "c-port",
                                    name: "Port Services",
                                    description:
                                        "Packages related to logistics-heavy flows.",
                                    packages: [
                                        {
                                            name: "Port Basic",
                                            description:
                                                "Standard operational package for logistics users.",
                                            type: "Logistics",
                                            status: "Live",
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
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
                            description:
                                "Exploration-focused widget for new districts.",
                            categories: [
                                {
                                    id: "c-onboarding",
                                    name: "Onboarding",
                                    description:
                                        "Category templates for early rollout.",
                                    packages: [
                                        {
                                            name: "Launch Kit",
                                            description:
                                                "Foundation package for new districts entering activation.",
                                            type: "Internal",
                                            status: "Draft",
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
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
            const createButtons = document.querySelectorAll(
                "[data-create-entity]",
            );

            let selectedGovernorateId = governorates[0].id;
            let selectedWidgetId = governorates[0].widgets[0].id;
            let selectedCategoryId =
                governorates[0].widgets[0].categories[0].id;
            let activeCreationType = "governorate";
            let creationSelection = {
                governorateId: selectedGovernorateId,
                widgetId: selectedWidgetId,
                categoryId: selectedCategoryId,
            };

            const creationConfigs = {
                governorate: {
                    eyebrow: "Add City",
                    title: "Create Governorate",
                    subtitle:
                        "Start a new top-level region that will host widgets, categories, and package trees inside the application.",
                    contextHint:
                        "This becomes a first-class city/governorate entry in the app navigation and operational structure.",
                    goals: [
                        "Define market priority and rollout phase before attaching widgets.",
                        "Set a coverage plan so the city can scale without restructuring later.",
                        "Keep naming and codes API-friendly for future integrations.",
                    ],
                    submitLabel: "Create Governorate",
                    fields: [
                        {
                            label: "Governorate Name",
                            type: "text",
                            placeholder: "Example: Sharqia",
                        },
                        {
                            label: "Internal Code",
                            type: "text",
                            placeholder: "Example: gov-sharqia",
                        },
                        {
                            label: "Market Type",
                            type: "select",
                            options: [
                                "Urban",
                                "Mixed",
                                "Coastal",
                                "Growth Market",
                            ],
                        },
                        {
                            label: "Rollout Status",
                            type: "select",
                            options: ["Planning", "Scaling", "Operational"],
                        },
                        {
                            label: "Coverage Target",
                            type: "text",
                            placeholder: "Example: 78%",
                        },
                        {
                            label: "Region Owner",
                            type: "text",
                            placeholder: "Example: Operations Team North",
                        },
                        {
                            label: "Notes",
                            type: "textarea",
                            placeholder:
                                "Add rollout notes, dependencies, or launch risks.",
                            wide: true,
                        },
                    ],
                },
                widget: {
                    eyebrow: "Add Widget",
                    title: "Create Widget",
                    subtitle:
                        "Add a functional module inside the selected governorate so teams can organize service areas cleanly.",
                    contextHint:
                        "Widgets are the operational modules that hold categories and define major app capabilities per city.",
                    goals: [
                        "Choose a widget name that reflects a real business domain.",
                        "Keep the widget reusable across future governorates when possible.",
                        "Document ownership so category creation remains consistent.",
                    ],
                    submitLabel: "Create Widget",
                    fields: [
                        {
                            label: "Governorate",
                            type: "select",
                            source: "governorates",
                            key: "governorateId",
                        },
                        {
                            label: "Widget Name",
                            type: "text",
                            placeholder: "Example: Payments Hub",
                        },
                        {
                            label: "Widget Code",
                            type: "text",
                            placeholder: "Example: w-payments",
                        },
                        {
                            label: "Widget Type",
                            type: "select",
                            options: [
                                "Core Services",
                                "Commerce",
                                "Support",
                                "Payments",
                            ],
                        },
                        {
                            label: "Visibility",
                            type: "select",
                            options: ["Public", "Internal", "Pilot Only"],
                        },
                        {
                            label: "Primary Owner",
                            type: "text",
                            placeholder: "Example: Product Team Payments",
                        },
                        {
                            label: "SLA Group",
                            type: "text",
                            placeholder: "Example: Tier 1 Operations",
                        },
                        {
                            label: "Widget Description",
                            type: "textarea",
                            placeholder:
                                "Explain what this widget does and when it should be used.",
                            wide: true,
                        },
                    ],
                },
                category: {
                    eyebrow: "Add Category",
                    title: "Create Category",
                    subtitle:
                        "Create a category under the current widget to group related packages and control user-facing organization.",
                    contextHint:
                        "Categories split a widget into business-friendly buckets and become the parent layer for packages.",
                    goals: [
                        "Use categories to reduce clutter and keep package discovery intuitive.",
                        "Keep names aligned with the widget purpose and not generic placeholders.",
                        "Plan package eligibility before publishing the category.",
                    ],
                    submitLabel: "Create Category",
                    fields: [
                        {
                            label: "Governorate",
                            type: "select",
                            source: "governorates",
                            key: "governorateId",
                        },
                        {
                            label: "Widget",
                            type: "select",
                            source: "widgets",
                            key: "widgetId",
                        },
                        {
                            label: "Category Name",
                            type: "text",
                            placeholder: "Example: Bills & Utilities",
                        },
                        {
                            label: "Category Code",
                            type: "text",
                            placeholder: "Example: c-bills",
                        },
                        {
                            label: "Display Priority",
                            type: "select",
                            options: ["High", "Medium", "Low"],
                        },
                        {
                            label: "Availability",
                            type: "select",
                            options: ["Live", "Draft", "Hidden"],
                        },
                        {
                            label: "Target Segment",
                            type: "text",
                            placeholder: "Example: Consumers / SMEs",
                        },
                        {
                            label: "Icon Key",
                            type: "text",
                            placeholder: "Example: bolt-circle",
                        },
                        {
                            label: "Category Description",
                            type: "textarea",
                            placeholder:
                                "Describe the purpose, audience, and main packages for this category.",
                            wide: true,
                        },
                    ],
                },
                package: {
                    eyebrow: "Add Package",
                    title: "Create Package",
                    subtitle:
                        "Create a package inside the selected category with pricing, visibility, and operational metadata ready for publishing.",
                    contextHint:
                        "Packages are the final sellable or assignable units shown to users inside a category.",
                    goals: [
                        "Define a clear package value proposition and target segment.",
                        "Set visibility and lifecycle stage before release.",
                        "Prepare commercial and operational metadata for API delivery later.",
                    ],
                    submitLabel: "Create Package",
                    fields: [
                        {
                            label: "Governorate",
                            type: "select",
                            source: "governorates",
                            key: "governorateId",
                        },
                        {
                            label: "Widget",
                            type: "select",
                            source: "widgets",
                            key: "widgetId",
                        },
                        {
                            label: "Category",
                            type: "select",
                            source: "categories",
                            key: "categoryId",
                        },
                        {
                            label: "Package Name",
                            type: "text",
                            placeholder: "Example: Family Gold Pack",
                        },
                        {
                            label: "Package Code",
                            type: "text",
                            placeholder: "Example: pkg-family-gold",
                        },
                        {
                            label: "Package Type",
                            type: "select",
                            options: ["Public", "Premium", "B2B", "Internal"],
                        },
                        {
                            label: "Lifecycle Stage",
                            type: "select",
                            options: ["Draft", "Review", "Live"],
                        },
                        {
                            label: "Price / Rule",
                            type: "text",
                            placeholder: "Example: EGP 149 monthly",
                        },
                        {
                            label: "Eligibility",
                            type: "text",
                            placeholder: "Example: Cairo consumers only",
                        },
                        {
                            label: "Package Description",
                            type: "textarea",
                            placeholder:
                                "Describe the package offering, benefits, and rollout notes.",
                            wide: true,
                        },
                    ],
                },
            };

            function getSelectedGovernorate() {
                return governorates.find(
                    (item) => item.id === selectedGovernorateId,
                );
            }

            function getSelectedWidget() {
                return getSelectedGovernorate().widgets.find(
                    (item) => item.id === selectedWidgetId,
                );
            }

            function getSelectedCategory() {
                return getSelectedWidget().categories.find(
                    (item) => item.id === selectedCategoryId,
                );
            }

            function renderGovernorates() {
                governorateList.innerHTML = governorates
                    .map(
                        (governorate) => `
        <button class="stack-item ${governorate.id === selectedGovernorateId ? "active" : ""}" type="button" data-governorate-id="${governorate.id}">
          <h4>${governorate.name}</h4>
          <p>${governorate.market}</p>
        </button>
      `,
                    )
                    .join("");

                document
                    .querySelectorAll("[data-governorate-id]")
                    .forEach((button) => {
                        button.addEventListener("click", () => {
                            selectedGovernorateId =
                                button.dataset.governorateId;
                            selectedWidgetId =
                                getSelectedGovernorate().widgets[0].id;
                            selectedCategoryId =
                                getSelectedGovernorate().widgets[0]
                                    .categories[0].id;
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
      `,
                    )
                    .join("");

                document
                    .querySelectorAll("[data-widget-id]")
                    .forEach((button) => {
                        button.addEventListener("click", () => {
                            selectedWidgetId = button.dataset.widgetId;
                            selectedCategoryId =
                                getSelectedWidget().categories[0].id;
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
      `,
                    )
                    .join("");

                document
                    .querySelectorAll("[data-category-id]")
                    .forEach((button) => {
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
      `,
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
              `,
                                )
                                .join("")}
        </div>
      `,
                    )
                    .join("");
            }

            function updateHero() {
                const selectedGovernorate = getSelectedGovernorate();
                const selectedWidget = getSelectedWidget();
                const selectedCategory = getSelectedCategory();
                const totalCategories = selectedGovernorate.widgets.reduce(
                    (sum, widget) => sum + widget.categories.length,
                    0,
                );
                const totalPackages = selectedGovernorate.widgets.reduce(
                    (sum, widget) =>
                        sum +
                        widget.categories.reduce(
                            (inner, category) =>
                                inner + category.packages.length,
                            0,
                        ),
                    0,
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

                document.querySelector(".pill.success").textContent =
                    selectedGovernorate.status;
                document.querySelector(".pill.subtle").textContent =
                    `Coverage ${selectedGovernorate.coverage}`;
            }

            function getContextByType(type) {
                const selectedGovernorate = getSelectedGovernorate();
                const selectedWidget = getSelectedWidget();
                const selectedCategory = getSelectedCategory();

                if (type === "governorate") {
                    return {
                        chain: "Application Root -> New Governorate",
                        hint: creationConfigs[type].contextHint,
                    };
                }

                if (type === "widget") {
                    return {
                        chain: `${selectedGovernorate.name} -> New Widget`,
                        hint: creationConfigs[type].contextHint,
                    };
                }

                if (type === "category") {
                    return {
                        chain: `${selectedGovernorate.name} -> ${selectedWidget.name} -> New Category`,
                        hint: creationConfigs[type].contextHint,
                    };
                }

                return {
                    chain: `${selectedGovernorate.name} -> ${selectedWidget.name} -> ${selectedCategory.name} -> New Package`,
                    hint: creationConfigs[type].contextHint,
                };
            }

            function getGovernorateOptions() {
                return governorates.map((governorate) => ({
                    value: governorate.id,
                    label: governorate.name,
                }));
            }

            function getWidgetOptions(governorateId) {
                const governorate =
                    governorates.find((item) => item.id === governorateId) ||
                    governorates[0];

                return governorate.widgets.map((widget) => ({
                    value: widget.id,
                    label: widget.name,
                }));
            }

            function getCategoryOptions(governorateId, widgetId) {
                const governorate =
                    governorates.find((item) => item.id === governorateId) ||
                    governorates[0];
                const widget =
                    governorate.widgets.find((item) => item.id === widgetId) ||
                    governorate.widgets[0];

                return widget.categories.map((category) => ({
                    value: category.id,
                    label: category.name,
                }));
            }

            function syncCreationSelection() {
                const widgetOptions = getWidgetOptions(
                    creationSelection.governorateId,
                );

                if (
                    !widgetOptions.some(
                        (option) => option.value === creationSelection.widgetId,
                    )
                ) {
                    creationSelection.widgetId = widgetOptions[0]?.value || "";
                }

                const categoryOptions = getCategoryOptions(
                    creationSelection.governorateId,
                    creationSelection.widgetId,
                );

                if (
                    !categoryOptions.some(
                        (option) =>
                            option.value === creationSelection.categoryId,
                    )
                ) {
                    creationSelection.categoryId =
                        categoryOptions[0]?.value || "";
                }
            }

            function getFieldOptions(field) {
                if (field.options) {
                    return field.options.map((option) => ({
                        value: option,
                        label: option,
                    }));
                }

                if (field.source === "governorates") {
                    return getGovernorateOptions();
                }

                if (field.source === "widgets") {
                    return getWidgetOptions(creationSelection.governorateId);
                }

                if (field.source === "categories") {
                    return getCategoryOptions(
                        creationSelection.governorateId,
                        creationSelection.widgetId,
                    );
                }

                return [];
            }

            function bindCreationDependencies() {
                modalFields
                    .querySelectorAll("select[data-creation-key]")
                    .forEach((select) => {
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
                            const selectedValue = field.key
                                ? creationSelection[field.key]
                                : "";

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
                    `,
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
                    categoryId: selectedCategoryId,
                };
                syncCreationSelection();

                modalEyebrow.textContent = config.eyebrow;
                modalTitle.textContent = config.title;
                modalSubtitle.textContent = config.subtitle;
                submitModalBtn.textContent = config.submitLabel;
                contextChain.textContent = context.chain;
                contextHint.textContent = context.hint;
                goalList.innerHTML = config.goals
                    .map((goal) => `<li>${goal}</li>`)
                    .join("");

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
                if (
                    event.key === "Escape" &&
                    !creationModal.classList.contains("hidden")
                ) {
                    closeCreationModal();
                }
            });

            submitModalBtn.addEventListener("click", () => {
                submitModalBtn.textContent = `${creationConfigs[activeCreationType].submitLabel} Ready`;
            });

            renderDashboard();
        },
        "locations-management": () => {
            const governoratesData = {
                Cairo: [
                    "Maadi",
                    "Nasr City",
                    "Heliopolis",
                    "Shorouk",
                    "New Cairo",
                ],
                Alexandria: [
                    "Smouha",
                    "Gleem",
                    "Sidi Gaber",
                    "Stanley",
                    "Miami",
                ],
                Giza: [
                    "Dokki",
                    "Mohandessin",
                    "Haram",
                    "Faisal",
                    "Sheikh Zayed",
                ],
            };

            const archivedAreasStorageKey = "temporarilyDeletedAreas";
            const governorateTabs = document.getElementById("governorateTabs");
            const selectedGovernorateInput = document.getElementById(
                "selectedGovernorateInput",
            );
            const panelGovernorateName = document.getElementById(
                "panelGovernorateName",
            );
            const locationsCount = document.getElementById("locationsCount");
            const locationsList = document.getElementById("locationsList");
            const newLocationInput =
                document.getElementById("newLocationInput");
            const addLocationBtn = document.getElementById("addLocationBtn");
            const appGovernorateReadonly = document.getElementById(
                "appGovernorateReadonly",
            );
            const appLocationSelect =
                document.getElementById("appLocationSelect");

            let activeGovernorate = "Cairo";
            let temporarilyDeletedAreas = loadTemporarilyDeletedAreas();

            function loadTemporarilyDeletedAreas() {
                try {
                    const stored = JSON.parse(
                        localStorage.getItem(archivedAreasStorageKey),
                    );
                    return stored && typeof stored === "object" ? stored : {};
                } catch (error) {
                    return {};
                }
            }

            function saveTemporarilyDeletedAreas() {
                localStorage.setItem(
                    archivedAreasStorageKey,
                    JSON.stringify(temporarilyDeletedAreas),
                );
            }

            const escapeHtml = __shared.escapeHtml_6;

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
      `,
                    )
                    .join("");

                document
                    .querySelectorAll("[data-governorate]")
                    .forEach((button) => {
                        button.addEventListener("click", () => {
                            activeGovernorate = button.dataset.governorate;
                            renderLocationsManager();
                        });
                    });
            }

            function renderLocationsManager() {
                const allAreas = governoratesData[activeGovernorate];
                const activeAreas = allAreas.filter(
                    (area) => !isAreaDeleted(activeGovernorate, area),
                );
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
          ${deleted ? "<small>Temporarily Deleted</small>" : ""}
          <button class="area-state-btn ${deleted ? "restore" : "delete"}" type="button" data-area="${escapeHtml(area)}" data-area-action="${deleted ? "restore" : "delete"}">
            ${deleted ? "Restore" : "Temporarily Delete"}
          </button>
        </div>
      `;
                    })
                    .join("");

                appLocationSelect.innerHTML = activeAreas.length
                    ? activeAreas
                        .map((area) => `<option>${escapeHtml(area)}</option>`)
                        .join("")
                    : "<option disabled selected>No active areas available</option>";

                renderGovernorateTabs();
            }

            locationsList.addEventListener("click", (event) => {
                const button = event.target.closest("[data-area-action]");
                if (!button) return;
                setAreaDeleted(
                    activeGovernorate,
                    button.dataset.area,
                    button.dataset.areaAction === "delete",
                );
            });

            addLocationBtn.addEventListener("click", () => {
                const value = newLocationInput.value.trim();
                if (!value) return;

                const existingArea = governoratesData[activeGovernorate].find(
                    (area) => area.toLowerCase() === value.toLowerCase(),
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
        },
        "logs-inquiries": () => {
            const openFunnelBtn = document.getElementById("openFunnelBtn");
            const closeFunnelBtn = document.getElementById("closeFunnelBtn");
            const funnelOverlay = document.getElementById("funnelOverlay");
            const logsTableBody = document.getElementById("logsTableBody");
            const userIdSearchInput =
                document.getElementById("userIdSearchInput");
            const sessionDateSearchInput = document.getElementById(
                "sessionDateSearchInput",
            );
            const clearSearchBtn = document.getElementById("clearSearchBtn");

            const inquiryLogs = [
                {
                    customerName: "Mariam Kamal",
                    customerNote: "Repeat app visitor",
                    userId: "#USR-102938",
                    sessionDate: "2026-04-23",
                    sessionDateLabel: "23 Apr 2026",
                    sessionTime: "10:42 AM",
                    governorate: "Cairo",
                    widget: "Services Hub",
                    category: "Quick Services",
                    offer: "Priority Pack",
                    result: "Requested",
                },
                {
                    customerName: "Youssef Adel",
                    customerNote: "Viewed multiple offers",
                    userId: "#USR-102954",
                    sessionDate: "2026-04-23",
                    sessionDateLabel: "23 Apr 2026",
                    sessionTime: "09:18 AM",
                    governorate: "Alexandria",
                    widget: "City Services",
                    category: "Port Services",
                    offer: "Port Basic",
                    result: "Viewed Only",
                },
                {
                    customerName: "Nour Hassan",
                    customerNote: "Escalated browsing behavior",
                    userId: "#USR-103004",
                    sessionDate: "2026-04-22",
                    sessionDateLabel: "22 Apr 2026",
                    sessionTime: "07:56 PM",
                    governorate: "Cairo",
                    widget: "Commerce Layer",
                    category: "Marketplace",
                    offer: "Merchant Basic",
                    result: "Viewed Only",
                },
                {
                    customerName: "Karim Emad",
                    customerNote: "Request completed in same session",
                    userId: "#USR-103121",
                    sessionDate: "2026-04-22",
                    sessionDateLabel: "22 Apr 2026",
                    sessionTime: "04:25 PM",
                    governorate: "Giza",
                    widget: "Discovery Module",
                    category: "Onboarding",
                    offer: "Launch Kit",
                    result: "Requested",
                },
                {
                    customerName: "Salma Hany",
                    customerNote: "Explored premium services",
                    userId: "#USR-103177",
                    sessionDate: "2026-04-21",
                    sessionDateLabel: "21 Apr 2026",
                    sessionTime: "11:34 AM",
                    governorate: "Cairo",
                    widget: "Services Hub",
                    category: "Special Services",
                    offer: "Gold Access",
                    result: "Requested",
                },
            ];

            function renderLogs() {
                const userIdQuery = userIdSearchInput.value
                    .trim()
                    .toLowerCase();
                const dateQuery = sessionDateSearchInput.value;

                const filteredLogs = inquiryLogs.filter((log) => {
                    const matchesUserId =
                        !userIdQuery ||
                        log.userId.toLowerCase().includes(userIdQuery);
                    const matchesDate =
                        !dateQuery || log.sessionDate === dateQuery;

                    return matchesUserId && matchesDate;
                });

                logsTableBody.innerHTML = filteredLogs.length
                    ? filteredLogs
                        .map(
                            (log) => `
            <tr>
              <td>
                <div class="customer-cell">
                  <a class="customer-profile-link" href="./index.html?userId=${encodeURIComponent(log.userId)}">${log.customerName}</a>
                  <span>${log.customerNote}</span>
                </div>
              </td>
              <td>${log.userId}</td>
              <td>${log.sessionDateLabel}</td>
              <td>${log.sessionTime}</td>
              <td>${log.governorate}</td>
              <td>${log.widget}</td>
              <td>${log.category}</td>
              <td>${log.offer}</td>
              <td><span class="status-pill ${log.result === "Requested" ? "requested" : "viewed"}">${log.result}</span></td>
            </tr>
          `,
                        )
                        .join("")
                    : `
        <tr>
          <td colspan="9">
            <div class="customer-cell">
              <strong>No sessions found</strong>
              <span>Try another date or a different user ID for your campaign search.</span>
            </div>
          </td>
        </tr>
      `;
            }

            function openFunnel() {
                funnelOverlay.classList.remove("hidden");
                document.body.style.overflow = "hidden";
            }

            function closeFunnel() {
                funnelOverlay.classList.add("hidden");
                document.body.style.overflow = "";
            }

            openFunnelBtn.addEventListener("click", openFunnel);
            closeFunnelBtn.addEventListener("click", closeFunnel);

            funnelOverlay.addEventListener("click", (event) => {
                if (event.target === funnelOverlay) {
                    closeFunnel();
                }
            });

            document.addEventListener("keydown", (event) => {
                if (
                    event.key === "Escape" &&
                    !funnelOverlay.classList.contains("hidden")
                ) {
                    closeFunnel();
                }
            });

            userIdSearchInput.addEventListener("input", renderLogs);
            sessionDateSearchInput.addEventListener("change", renderLogs);

            clearSearchBtn.addEventListener("click", () => {
                userIdSearchInput.value = "";
                sessionDateSearchInput.value = "";
                renderLogs();
            });

            renderLogs();
        },
        maids: () => {
            const ordersDropdownBtn =
                document.getElementById("ordersDropdownBtn");
            const ordersDropdownContainer =
                ordersDropdownBtn?.closest(".dropdown-block");
            const maidsTableBody = document.getElementById("maidsTableBody");
            const maidSearchInput = document.getElementById("maidSearchInput");
            const statusFilter = document.getElementById("statusFilter");
            const operatorFilter = document.getElementById("operatorFilter");
            const exportMaidsBtn = document.getElementById("exportMaidsBtn");
            const maidModal = document.getElementById("maidModal");
            const maidModalTitle = document.getElementById("maidModalTitle");
            const maidModalSubtitle =
                document.getElementById("maidModalSubtitle");
            const maidModalContent =
                document.getElementById("maidModalContent");
            const closeMaidModalBtn =
                document.getElementById("closeMaidModalBtn");
            const closeMaidModalFooterBtn = document.getElementById(
                "closeMaidModalFooterBtn",
            );
            const maidToast = document.getElementById("maidToast");
            const maidToastText = document.getElementById("maidToastText");

            const operators = [
                {
                    id: "OP-1024",
                    name: "Mona Adel",
                    username: "ops.mona",
                    zone: "New Cairo",
                },
                {
                    id: "OP-1031",
                    name: "Karim Samir",
                    username: "ops.karim",
                    zone: "Nasr City",
                },
                {
                    id: "OP-1042",
                    name: "Nour Hassan",
                    username: "ops.nour",
                    zone: "Maadi",
                },
                {
                    id: "OP-1057",
                    name: "Ahmed Fathy",
                    username: "ops.ahmed",
                    zone: "October",
                },
                {
                    id: "OP-1073",
                    name: "Salma Youssef",
                    username: "ops.salma",
                    zone: "Heliopolis",
                },
            ];

            const maids = [
                {
                    id: "MD-1042",
                    name: "Amina Mostafa",
                    phone: "+20 100 445 2211",
                    status: "active",
                    startDate: "2024-01-14",
                    age: 29,
                    address: "Nasr City, Cairo",
                    offDay: "Friday",
                    operatorId: "OP-1031",
                    salary: 8500,
                    doneOrders: 248,
                    personalId: "29803121500412",
                    gender: "Female",
                    attachment: "Ready",
                    notes: "Top performer in recurring home cleaning bookings.",
                },
                {
                    id: "MD-1098",
                    name: "Hoda Ali",
                    phone: "+20 109 782 4451",
                    status: "active",
                    startDate: "2023-09-22",
                    age: 33,
                    address: "Dokki, Giza",
                    offDay: "Monday",
                    operatorId: "OP-1024",
                    salary: 9200,
                    doneOrders: 231,
                    personalId: "29311241500764",
                    gender: "Female",
                    attachment: "Ready",
                    notes: "Currently assigned to premium package orders.",
                },
                {
                    id: "MD-1121",
                    name: "Salwa Nabil",
                    phone: "+20 111 660 8842",
                    status: "paused",
                    startDate: "2024-03-03",
                    age: 27,
                    address: "Smouha, Alexandria",
                    offDay: "Sunday",
                    operatorId: "OP-1073",
                    salary: 7800,
                    doneOrders: 225,
                    personalId: "29707031500981",
                    gender: "Female",
                    attachment: "Pending",
                    notes: "Waiting for renewed police clearance attachment.",
                },
                {
                    id: "MD-1186",
                    name: "Amal Fathy",
                    phone: "+20 122 311 5560",
                    status: "active",
                    startDate: "2022-11-09",
                    age: 36,
                    address: "Mokattam, Cairo",
                    offDay: "Thursday",
                    operatorId: "OP-1042",
                    salary: 10500,
                    doneOrders: 214,
                    personalId: "29006081500193",
                    gender: "Female",
                    attachment: "Ready",
                    notes: "Excellent customer ratings and low cancellation rate.",
                },
                {
                    id: "MD-1214",
                    name: "Dina Kamal",
                    phone: "+20 128 740 0035",
                    status: "expired",
                    startDate: "2021-08-18",
                    age: 31,
                    address: "6th of October, Giza",
                    offDay: "Tuesday",
                    operatorId: "OP-1057",
                    salary: 8000,
                    doneOrders: 193,
                    personalId: "29512121500872",
                    gender: "Female",
                    attachment: "Ready",
                    notes: "Temporarily inactive pending reactivation interview.",
                },
            ];

            try {
                const legacyStatusMap = {
                    available: "active",
                    busy: "active",
                    off: "paused",
                    inactive: "expired",
                };
                const profileOverrides =
                    JSON.parse(localStorage.getItem("maidProfileOverrides")) ||
                    {};
                const createdMaids =
                    JSON.parse(localStorage.getItem("createdMaids")) || [];
                createdMaids.forEach((maid) => {
                    if (!maids.some((item) => item.id === maid.id))
                        maids.push(maid);
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
                return (
                    operators.find((operator) => operator.id === operatorId) ||
                    operators[0]
                );
            }

            function getPartnerLabel(operatorId) {
                const operator = getPartnerById(operatorId);
                return `${operator.name} / ${operator.zone}`;
            }

            function renderPartnerOptions(selectedId) {
                return operators
                    .map(
                        (operator) =>
                            `<option value="${operator.id}" ${selectedId === operator.id ? "selected" : ""}>${operator.name} - ${operator.zone}</option>`,
                    )
                    .join("");
            }

            function populatePartnerFilter() {
                operatorFilter.innerHTML = `<option value="all">All Partners</option>${renderPartnerOptions()}`;
            }

            function formatSalary(value) {
                return new Intl.NumberFormat("en-EG", {
                    style: "currency",
                    currency: "EGP",
                    maximumFractionDigits: 0,
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
                maidsTableBody.innerHTML = items
                    .map((maid) => {
                        const attachmentClass =
                            maid.attachment.toLowerCase() === "ready"
                                ? "ready"
                                : "pending";
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
                    })
                    .join("");
            }

            function getFilteredMaids() {
                const query = maidSearchInput.value.trim().toLowerCase();
                const selectedStatus = statusFilter.value;
                const selectedPartner = operatorFilter.value;
                return maids.filter((maid) => {
                    const operator = getPartnerById(maid.operatorId);
                    const searchableText =
                        `${maid.name} ${maid.id} ${maid.phone} ${operator.name} ${operator.username} ${operator.zone}`.toLowerCase();
                    const matchesQuery = searchableText.includes(query);
                    const matchesStatus =
                        selectedStatus === "all" ||
                        maid.status === selectedStatus;
                    const matchesPartner =
                        selectedPartner === "all" ||
                        maid.operatorId === selectedPartner;
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
    </form>`,
                );

                document
                    .getElementById("maidEditForm")
                    .addEventListener("submit", (event) => {
                        event.preventDefault();
                        maid.status =
                            document.getElementById("editMaidStatus").value;
                        maid.operatorId =
                            document.getElementById("editMaidPartner").value;
                        maid.salary = Math.max(
                            0,
                            Number(
                                document.getElementById("editMaidSalary").value,
                            ) || 0,
                        );
                        maid.offDay =
                            document.getElementById("editMaidOffDay").value;
                        maid.attachment =
                            document.getElementById("editMaidAttachment").value;
                        maid.notes = document
                            .getElementById("editMaidNotes")
                            .value.trim();
                        applyFilters();
                        closeModal();
                        showToast(
                            `${maid.name} assigned to ${getPartnerLabel(maid.operatorId)}.`,
                        );
                    });
            }

            function exportMaids() {
                const exportedAt = new Date().toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                });
                const filtered = getFilteredMaids();
                openModal(
                    "Maids Export Ready",
                    "The current workforce view is ready for export.",
                    `<p><strong>Records:</strong> ${filtered.length}</p>
    <p><strong>Exported At:</strong> ${exportedAt}</p>
    <p><strong>Included Fields:</strong> ID, name, phone, status, partner, salary, documents, orders, and notes.</p>
    <p><strong>Status:</strong> Export package generated successfully.</p>`,
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
        },
        "messages-inbox": () => {
            const messages = [
                {
                    id: "msg-1001",
                    customerName: "Mariam Kamal",
                    userId: "#USR-102938",
                    unreadCount: 3,
                    preview:
                        "I need an update about my delayed order and whether the technician will arrive today.",
                    box: "inbox",
                    status: "unread",
                    updatedAt: "23 Apr 2026, 10:14 AM",
                },
                {
                    id: "msg-1002",
                    customerName: "Youssef Adel",
                    userId: "#USR-102954",
                    unreadCount: 1,
                    preview:
                        "Thank you for the follow-up. Please confirm when the refund will reflect in my wallet.",
                    box: "starred",
                    status: "unread",
                    updatedAt: "23 Apr 2026, 09:42 AM",
                },
                {
                    id: "msg-1003",
                    customerName: "Nour Hassan",
                    userId: "#USR-103004",
                    unreadCount: 4,
                    preview:
                        "This is the second time I am reporting the same issue. I still need a clear resolution.",
                    box: "inbox",
                    status: "unread",
                    updatedAt: "23 Apr 2026, 08:18 AM",
                },
                {
                    id: "msg-1004",
                    customerName: "Karim Emad",
                    userId: "#USR-103121",
                    unreadCount: 0,
                    preview:
                        "Appreciate the support team response. The issue is solved now.",
                    box: "sent",
                    status: "read",
                    updatedAt: "22 Apr 2026, 06:10 PM",
                },
                {
                    id: "msg-1005",
                    customerName: "Salma Hany",
                    userId: "#USR-103177",
                    unreadCount: 2,
                    preview:
                        "I received multiple promotional messages that do not match my request.",
                    box: "junk",
                    status: "unread",
                    updatedAt: "22 Apr 2026, 03:25 PM",
                },
                {
                    id: "msg-1006",
                    customerName: "Hossam Fathy",
                    userId: "#USR-103220",
                    unreadCount: 0,
                    preview:
                        "Please send me the invoice copy to my email and confirm the payment details.",
                    box: "sent",
                    status: "read",
                    updatedAt: "22 Apr 2026, 01:55 PM",
                },
            ];

            const messagesTableBody =
                document.getElementById("messagesTableBody");
            const filterTabs = document.querySelectorAll(".filter-tab");
            const selectAllCheckbox =
                document.getElementById("selectAllCheckbox");
            const clearSelectionBtn =
                document.getElementById("clearSelectionBtn");
            const markReadBtn = document.getElementById("markReadBtn");
            const moveJunkBtn = document.getElementById("moveJunkBtn");
            const selectionSummary =
                document.getElementById("selectionSummary");
            const composeReplyBtn = document.getElementById("composeReplyBtn");
            const openRulesBtn = document.getElementById("openRulesBtn");
            const messageDetailsModal = document.getElementById(
                "messageDetailsModal",
            );
            const closeMessageModalBtn = document.getElementById(
                "closeMessageModalBtn",
            );
            const closeMessageFooterBtn = document.getElementById(
                "closeMessageFooterBtn",
            );
            const markSingleReadBtn =
                document.getElementById("markSingleReadBtn");
            const sendReplyBtn = document.getElementById("sendReplyBtn");
            const messageRulesModal =
                document.getElementById("messageRulesModal");
            const closeRulesModalBtn =
                document.getElementById("closeRulesModalBtn");
            const closeRulesFooterBtn = document.getElementById(
                "closeRulesFooterBtn",
            );
            const messageModalTitle =
                document.getElementById("messageModalTitle");
            const messageModalSubtitle = document.getElementById(
                "messageModalSubtitle",
            );
            const messageAvatar = document.getElementById("messageAvatar");
            const messageCustomerName = document.getElementById(
                "messageCustomerName",
            );
            const messageMetaLine = document.getElementById("messageMetaLine");
            const messageBoxValue = document.getElementById("messageBoxValue");
            const messageStatusValue =
                document.getElementById("messageStatusValue");
            const messageUnreadValue =
                document.getElementById("messageUnreadValue");
            const messageUpdatedValue = document.getElementById(
                "messageUpdatedValue",
            );
            const messagePreviewCopy =
                document.getElementById("messagePreviewCopy");
            const quickReplyInput = document.getElementById("quickReplyInput");
            const inboxToast = document.getElementById("inboxToast");
            const inboxToastMessage =
                document.getElementById("inboxToastMessage");

            let activeFilter = "inbox";
            let selectedMessages = [];
            let activeMessageId = null;
            let toastTimeoutId = null;

            function showToast(message) {
                if (!inboxToast || !inboxToastMessage) {
                    return;
                }

                inboxToastMessage.textContent = message;
                inboxToast.classList.remove("hidden");

                if (toastTimeoutId) {
                    window.clearTimeout(toastTimeoutId);
                }

                toastTimeoutId = window.setTimeout(() => {
                    inboxToast.classList.add("hidden");
                }, 2800);
            }

            const getInitials = __shared.getInitials_8;

            function openModal(modalElement) {
                modalElement?.classList.remove("hidden");
            }

            function closeModal(modalElement) {
                modalElement?.classList.add("hidden");
            }

            function populateMessageModal(message) {
                activeMessageId = message.id;
                messageModalTitle.textContent = `Message Details - ${message.customerName}`;
                messageModalSubtitle.textContent =
                    "Review the customer conversation, mark it as read, or send a quick reply.";
                messageAvatar.textContent = getInitials(message.customerName);
                messageCustomerName.textContent = message.customerName;
                messageMetaLine.textContent = `${message.userId} â€¢ ${message.updatedAt}`;
                messageBoxValue.textContent = message.box;
                messageStatusValue.textContent = message.status;
                messageUnreadValue.textContent = `${message.unreadCount} unread`;
                messageUpdatedValue.textContent = message.updatedAt;
                messagePreviewCopy.textContent = message.preview;
                quickReplyInput.value = "";
            }

            function openMessageDetails(messageId) {
                const targetMessage = messages.find(
                    (message) => message.id === messageId,
                );

                if (!targetMessage) {
                    return;
                }

                populateMessageModal(targetMessage);
                openModal(messageDetailsModal);
            }

            function getFilteredMessages() {
                if (activeFilter === "starred") {
                    return messages.filter(
                        (message) => message.box === "starred",
                    );
                }

                return messages.filter(
                    (message) => message.box === activeFilter,
                );
            }

            function renderMessages() {
                const filteredMessages = getFilteredMessages();

                messagesTableBody.innerHTML = filteredMessages
                    .map(
                        (message) => `
        <tr class="row-clickable ${selectedMessages.includes(message.id) ? "selected" : ""}" data-message-row="${message.id}">
          <td>
            <input class="row-checkbox" type="checkbox" data-message-id="${message.id}" ${selectedMessages.includes(message.id) ? "checked" : ""
                            } />
          </td>
          <td>
            <div class="customer-cell">
              <button class="customer-link" type="button" data-open-profile="${message.userId}">${message.customerName}</button>
              <span class="meta-sub">Customer conversation</span>
            </div>
          </td>
          <td>${message.userId}</td>
          <td><span class="count-pill">${message.unreadCount} unread</span></td>
          <td><div class="preview-text">${message.preview}</div></td>
          <td><span class="box-pill ${message.box}">${message.box}</span></td>
          <td><span class="status-pill ${message.status}">${message.status}</span></td>
          <td>${message.updatedAt}</td>
        </tr>
      `,
                    )
                    .join("");

                bindRowCheckboxes();
                bindRowClicks();
                bindProfileLinks();
            }

            function updateMoveButtonState() {
                const isJunkFilter = activeFilter === "junk";
                moveJunkBtn.textContent = isJunkFilter
                    ? "Move to Inbox All"
                    : "Move to Junk";
                moveJunkBtn.classList.toggle("restore", isJunkFilter);
                moveJunkBtn.classList.toggle("warning", !isJunkFilter);
            }

            function updateSelectionState() {
                const filteredMessages = getFilteredMessages();
                const count = selectedMessages.length;

                selectionSummary.textContent =
                    count > 0 ? `${count} selected` : "0 selected";
                clearSelectionBtn.disabled = count === 0;
                markReadBtn.disabled = count === 0;
                moveJunkBtn.disabled = count === 0;
                selectAllCheckbox.checked =
                    filteredMessages.length > 0 &&
                    count === filteredMessages.length;
                selectAllCheckbox.indeterminate =
                    count > 0 && count < filteredMessages.length;
                updateMoveButtonState();
            }

            function bindRowCheckboxes() {
                document
                    .querySelectorAll(".row-checkbox")
                    .forEach((checkbox) => {
                        checkbox.addEventListener("change", (event) => {
                            event.stopPropagation();
                            const { messageId } = event.target.dataset;

                            if (event.target.checked) {
                                selectedMessages = [
                                    ...new Set([
                                        ...selectedMessages,
                                        messageId,
                                    ]),
                                ];
                            } else {
                                selectedMessages = selectedMessages.filter(
                                    (id) => id !== messageId,
                                );
                            }

                            renderMessages();
                            updateSelectionState();
                        });
                    });
            }

            function bindRowClicks() {
                document
                    .querySelectorAll("[data-message-row]")
                    .forEach((row) => {
                        row.addEventListener("click", () => {
                            openMessageDetails(row.dataset.messageRow);
                        });
                    });
            }

            function bindProfileLinks() {
                document
                    .querySelectorAll("[data-open-profile]")
                    .forEach((button) => {
                        button.addEventListener("click", (event) => {
                            event.stopPropagation();
                            window.location.href = "./index.html";
                        });
                    });
            }

            filterTabs.forEach((tab) => {
                tab.addEventListener("click", () => {
                    activeFilter = tab.dataset.filter;
                    selectedMessages = [];

                    filterTabs.forEach((item) =>
                        item.classList.toggle("active", item === tab),
                    );
                    renderMessages();
                    updateSelectionState();
                });
            });

            selectAllCheckbox.addEventListener("change", (event) => {
                selectedMessages = event.target.checked
                    ? getFilteredMessages().map((message) => message.id)
                    : [];
                renderMessages();
                updateSelectionState();
            });

            clearSelectionBtn.addEventListener("click", () => {
                selectedMessages = [];
                renderMessages();
                updateSelectionState();
                showToast("Selection cleared.");
            });

            markReadBtn.addEventListener("click", () => {
                messages.forEach((message) => {
                    if (selectedMessages.includes(message.id)) {
                        message.status = "read";
                        message.unreadCount = 0;
                    }
                });

                selectedMessages = [];
                renderMessages();
                updateSelectionState();
                showToast("Selected messages marked as read.");
            });

            moveJunkBtn.addEventListener("click", () => {
                const destinationBox =
                    activeFilter === "junk" ? "inbox" : "junk";
                const destinationLabel =
                    destinationBox === "inbox" ? "Inbox All" : "Junk";

                messages.forEach((message) => {
                    if (selectedMessages.includes(message.id)) {
                        message.box = destinationBox;
                    }
                });

                selectedMessages = [];
                renderMessages();
                updateSelectionState();
                showToast(`Selected messages moved to ${destinationLabel}.`);
            });

            composeReplyBtn?.addEventListener("click", () => {
                const targetMessage = getFilteredMessages()[0] || messages[0];
                openMessageDetails(targetMessage.id);
            });

            openRulesBtn?.addEventListener("click", () => {
                openModal(messageRulesModal);
            });

            closeMessageModalBtn?.addEventListener("click", () =>
                closeModal(messageDetailsModal),
            );
            closeMessageFooterBtn?.addEventListener("click", () =>
                closeModal(messageDetailsModal),
            );
            closeRulesModalBtn?.addEventListener("click", () =>
                closeModal(messageRulesModal),
            );
            closeRulesFooterBtn?.addEventListener("click", () =>
                closeModal(messageRulesModal),
            );

            messageDetailsModal?.addEventListener("click", (event) => {
                if (event.target === messageDetailsModal) {
                    closeModal(messageDetailsModal);
                }
            });

            messageRulesModal?.addEventListener("click", (event) => {
                if (event.target === messageRulesModal) {
                    closeModal(messageRulesModal);
                }
            });

            markSingleReadBtn?.addEventListener("click", () => {
                const targetMessage = messages.find(
                    (message) => message.id === activeMessageId,
                );

                if (!targetMessage) {
                    return;
                }

                targetMessage.status = "read";
                targetMessage.unreadCount = 0;
                populateMessageModal(targetMessage);
                renderMessages();
                updateSelectionState();
                showToast(`${targetMessage.customerName} marked as read.`);
            });

            sendReplyBtn?.addEventListener("click", () => {
                const targetMessage = messages.find(
                    (message) => message.id === activeMessageId,
                );
                const replyText = quickReplyInput?.value.trim();

                if (!targetMessage || !replyText) {
                    showToast("Write a reply before sending.");
                    return;
                }

                targetMessage.box = "sent";
                targetMessage.status = "read";
                targetMessage.unreadCount = 0;
                targetMessage.preview = replyText;
                targetMessage.updatedAt = "24 Apr 2026, 10:20 AM";

                renderMessages();
                updateSelectionState();
                closeModal(messageDetailsModal);
                showToast(`Reply sent to ${targetMessage.customerName}.`);
            });

            renderMessages();
            updateSelectionState();
        },
        "operators-list": () => {
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
                    lastMessage:
                        "Please review the 4 PM assignments before confirmation.",
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
                    lastMessage:
                        "Waiting list has two urgent orders for tomorrow.",
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
                    lastMessage: "Shift is paused until the evening handover.",
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
                    lastMessage:
                        "Last handover completed yesterday at 8:15 PM.",
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
                    lastMessage: "All accepted orders have confirmed maids.",
                },
            ];

            function loadCreatedPartners() {
                try {
                    const created =
                        JSON.parse(localStorage.getItem("createdPartners")) ||
                        [];
                    return created.map((partner) => ({
                        ...partner,
                        zone:
                            partner.zone ||
                            partner.workZone ||
                            partner.workZones?.[0] ||
                            "Not assigned",
                        managedMaids: Number(
                            partner.managedMaids ??
                            partner.assignedMaidIds?.length ??
                            0,
                        ),
                        completedOrders: Number(partner.completedOrders || 0),
                        lastMessage:
                            partner.lastMessage ||
                            "New partner account created.",
                    }));
                } catch (error) {
                    return [];
                }
            }

            const operators = [
                ...seedOperators,
                ...loadCreatedPartners(),
            ].filter(
                (partner, index, all) =>
                    all.findIndex((item) => item.id === partner.id) === index,
            );

            const operatorsTableBody =
                document.getElementById("operatorsTableBody");
            const operatorSearch = document.getElementById("operatorSearch");
            const statusFilter = document.getElementById("statusFilter");
            const totalPartners = document.getElementById("totalPartners");
            const activePartners = document.getElementById("activePartners");
            const managedMaids = document.getElementById("managedMaids");
            const completedOrders = document.getElementById("completedOrders");
            const addPartnerBtn = document.getElementById("addPartnerBtn");
            const exportPartnersBtn =
                document.getElementById("exportPartnersBtn");
            const chatModal = document.getElementById("chatModal");
            const chatModalTitle = document.getElementById("chatModalTitle");
            const chatPartnerProfile =
                document.getElementById("chatPartnerProfile");
            const chatThread = document.getElementById("chatThread");
            const chatForm = document.getElementById("chatForm");
            const chatInput = document.getElementById("chatInput");
            const chatModalClose = document.getElementById("chatModalClose");
            const operatorsToast = document.getElementById("operatorsToast");
            const operatorDetailsModal = document.getElementById(
                "operatorDetailsModal",
            );
            const operatorDetailsTitle = document.getElementById(
                "operatorDetailsTitle",
            );
            const operatorDetailsContent = document.getElementById(
                "operatorDetailsContent",
            );
            const operatorDetailsClose = document.getElementById(
                "operatorDetailsClose",
            );

            let activeChatPartner = null;

            function getFilteredPartners() {
                const query = operatorSearch.value.trim().toLowerCase();
                const status = statusFilter.value;

                return operators.filter((operator) => {
                    const matchesStatus =
                        status === "all" || operator.status === status;
                    const matchesSearch = [
                        operator.name,
                        operator.username,
                        operator.status,
                        operator.governorate,
                        operator.zone,
                        operator.id,
                    ]
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
                activePartners.textContent = String(
                    operators.filter((operator) => operator.status === "Active")
                        .length,
                );
                managedMaids.textContent = String(
                    operators.reduce(
                        (sum, operator) => sum + operator.managedMaids,
                        0,
                    ),
                );
                completedOrders.textContent = String(
                    operators.reduce(
                        (sum, operator) => sum + operator.completedOrders,
                        0,
                    ),
                );
            }

            function renderPartners() {
                const rows = getFilteredPartners();

                if (!rows.length) {
                    operatorsTableBody.innerHTML =
                        '<tr><td class="empty-row" colspan="7">No partners match the current filters.</td></tr>';
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
      `,
                    )
                    .join("");

                document.querySelectorAll(".view-btn").forEach((button) => {
                    button.addEventListener("click", () =>
                        openPartnerDetails(button.dataset.viewPartner),
                    );
                });

                document.querySelectorAll(".chat-btn").forEach((button) => {
                    button.addEventListener("click", () =>
                        openChat(button.dataset.operatorId),
                    );
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
                activeChatPartner = operators.find(
                    (operator) => operator.id === operatorId,
                );

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
                    minute: "2-digit",
                });

                chatThread.insertAdjacentHTML(
                    "beforeend",
                    `
      <div class="chat-message me">
        <p>${message}</p>
        <small>Admin / ${sentAt}</small>
      </div>
    `,
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
                if (event.target === operatorDetailsModal)
                    closePartnerDetails();
            });
            chatModalClose.addEventListener("click", closeChat);
            chatModal.addEventListener("click", (event) => {
                if (event.target === chatModal) {
                    closeChat();
                }
            });
            document.addEventListener("keydown", (event) => {
                if (
                    event.key === "Escape" &&
                    !chatModal.classList.contains("hidden")
                ) {
                    closeChat();
                }
            });

            renderMetrics();
            renderPartners();
        },
        "operators-msgs": () => {
            const defaultMessages = [
                {
                    id: "OM-9001",
                    operator: "Mona Adel",
                    username: "ops.mona",
                    zone: "New Cairo",
                    subject: "Need approval for extra maid assignment",
                    body: "The 6 PM New Cairo order needs one extra maid because the apartment size was updated by the customer.",
                    sentAt: "Jun 23, 2026 09:15 AM",
                    unread: true,
                    requestStatus: "Open",
                },
                {
                    id: "OM-9002",
                    operator: "Karim Samir",
                    username: "ops.karim",
                    zone: "Nasr City",
                    subject: "Customer requested arrival hour change",
                    body: "Customer wants to move tomorrow booking from 10 AM to 12 PM. Please confirm if schedule window is open.",
                    sentAt: "Jun 23, 2026 08:42 AM",
                    unread: true,
                    requestStatus: "Open",
                },
                {
                    id: "OM-9003",
                    operator: "Nour Hassan",
                    username: "ops.nour",
                    zone: "Maadi",
                    subject: "Maid document pending",
                    body: "Salwa Nabil still has a pending document. I need approval before assigning her to premium bookings.",
                    sentAt: "Jun 22, 2026 07:20 PM",
                    unread: true,
                    requestStatus: "Open",
                },
                {
                    id: "OM-9004",
                    operator: "Salma Youssef",
                    username: "ops.salma",
                    zone: "Heliopolis",
                    subject: "Accepted orders are confirmed",
                    body: "All Heliopolis accepted orders for today are confirmed and assigned to available maids.",
                    sentAt: "Jun 22, 2026 05:10 PM",
                    unread: false,
                    requestStatus: "Closed",
                },
                {
                    id: "OM-9005",
                    operator: "Ahmed Fathy",
                    username: "ops.ahmed",
                    zone: "October",
                    subject: "Offline handover note",
                    body: "I completed the evening handover and left two waiting-list orders for morning review.",
                    sentAt: "Jun 22, 2026 02:35 PM",
                    unread: true,
                    requestStatus: "Open",
                },
            ];

            const storageKey = "operatorsMessages";
            const unreadStorageKey = "operatorsUnreadMessages";
            const messagesList = document.getElementById("messagesList");
            const messagePanel = document.getElementById("messagePanel");
            const messageSearch = document.getElementById("messageSearch");
            const messageStatusFilter = document.getElementById(
                "messageStatusFilter",
            );
            const totalMessagesCount =
                document.getElementById("totalMessagesCount");
            const unreadMessagesCount = document.getElementById(
                "unreadMessagesCount",
            );
            const openRequestsCount =
                document.getElementById("openRequestsCount");
            const operatorsCount = document.getElementById("operatorsCount");
            const markAllReadBtn = document.getElementById("markAllReadBtn");
            const exportMsgsBtn = document.getElementById("exportMsgsBtn");
            const msgsToast = document.getElementById("msgsToast");

            let messages = loadMessages();
            let activeMessageId = messages[0]?.id || null;

            function loadMessages() {
                try {
                    const stored = JSON.parse(localStorage.getItem(storageKey));
                    return Array.isArray(stored) ? stored : defaultMessages;
                } catch (error) {
                    return defaultMessages;
                }
            }

            function saveMessages() {
                localStorage.setItem(storageKey, JSON.stringify(messages));
                localStorage.setItem(
                    unreadStorageKey,
                    String(getUnreadCount()),
                );
            }

            function getUnreadCount() {
                return messages.filter((message) => message.unread).length;
            }

            function showToast(message) {
                msgsToast.textContent = message;
                msgsToast.classList.remove("hidden");
                window.clearTimeout(showToast.timer);
                showToast.timer = window.setTimeout(
                    () => msgsToast.classList.add("hidden"),
                    2600,
                );
            }

            function getFilteredMessages() {
                const query = messageSearch.value.trim().toLowerCase();
                const status = messageStatusFilter.value;

                return messages.filter((message) => {
                    const searchable =
                        `${message.operator} ${message.username} ${message.zone} ${message.subject} ${message.body}`.toLowerCase();
                    const matchesQuery = searchable.includes(query);
                    const matchesStatus =
                        status === "all" ||
                        (status === "unread"
                            ? message.unread
                            : !message.unread);
                    return matchesQuery && matchesStatus;
                });
            }

            function renderMetrics() {
                totalMessagesCount.textContent = String(messages.length);
                unreadMessagesCount.textContent = String(getUnreadCount());
                openRequestsCount.textContent = String(
                    messages.filter(
                        (message) => message.requestStatus === "Open",
                    ).length,
                );
                operatorsCount.textContent = String(
                    new Set(messages.map((message) => message.username)).size,
                );
            }

            function renderMessagesList() {
                const filtered = getFilteredMessages();

                if (!filtered.length) {
                    messagesList.innerHTML =
                        '<div class="message-item"><strong>No messages found</strong><p class="message-preview">Try another search or status filter.</p></div>';
                    return;
                }

                messagesList.innerHTML = filtered
                    .map(
                        (message) => `
    <button class="message-item ${message.unread ? "unread" : ""} ${message.id === activeMessageId ? "active" : ""}" type="button" data-message-id="${message.id}">
      <div class="message-top">
        <div>
          <strong>${message.operator}</strong>
          <span>${message.username} / ${message.zone}</span>
        </div>
        ${message.unread ? '<i class="unread-dot" aria-label="Unread"></i>' : ""}
      </div>
      <div class="message-meta"><span>${message.sentAt}</span><span>${message.requestStatus}</span></div>
      <p class="message-preview">${message.subject}</p>
    </button>
  `,
                    )
                    .join("");
            }

            function renderMessagePanel() {
                const message = messages.find(
                    (item) => item.id === activeMessageId,
                );

                if (!message) {
                    messagePanel.innerHTML =
                        '<div class="empty-panel"><strong>Select a message</strong><span>Message details and reply tools will appear here.</span></div>';
                    return;
                }

                messagePanel.innerHTML = `
    <div class="detail-head">
      <div>
        <p class="eyebrow">${message.id}</p>
        <h2>${message.subject}</h2>
      </div>
      <span class="status-pill ${message.unread ? "unread" : ""}">${message.unread ? "Unread" : "Read"}</span>
    </div>
    <div class="detail-grid">
      <div><span>Partner</span><strong>${message.operator}</strong></div>
      <div><span>Username</span><strong>${message.username}</strong></div>
      <div><span>Work Zone</span><strong>${message.zone}</strong></div>
      <div><span>Sent At</span><strong>${message.sentAt}</strong></div>
      <div><span>Request Status</span><strong>${message.requestStatus}</strong></div>
      <div><span>Read State</span><strong>${message.unread ? "Unread" : "Read"}</strong></div>
    </div>
    <div class="message-body">${message.body}</div>
    <form class="reply-box" id="replyForm">
      <label>
        Reply To ${message.operator}
        <textarea id="replyText" rows="4" placeholder="Write your reply"></textarea>
      </label>
      <div class="reply-actions">
        <button class="action-btn primary" type="submit">Send Reply</button>
        <button class="action-btn ghost" id="closeRequestBtn" type="button">Close Request</button>
      </div>
    </form>
  `;

                document
                    .getElementById("replyForm")
                    .addEventListener("submit", (event) => {
                        event.preventDefault();
                        const replyText = document
                            .getElementById("replyText")
                            .value.trim();
                        if (!replyText) {
                            showToast("Write a reply before sending.");
                            return;
                        }
                        showToast(`Reply sent to ${message.operator}.`);
                        document.getElementById("replyText").value = "";
                    });

                document
                    .getElementById("closeRequestBtn")
                    .addEventListener("click", () => {
                        message.requestStatus = "Closed";
                        saveMessages();
                        renderAll();
                        showToast(`${message.id} request closed.`);
                    });
            }

            function openMessage(messageId) {
                const message = messages.find((item) => item.id === messageId);
                if (!message) return;

                activeMessageId = messageId;
                if (message.unread) {
                    message.unread = false;
                    saveMessages();
                    showToast(`${message.id} marked as read.`);
                }
                renderAll();
            }

            function markAllRead() {
                messages.forEach((message) => {
                    message.unread = false;
                });
                saveMessages();
                renderAll();
                showToast("All partner messages marked as read.");
            }

            function exportMessages() {
                showToast(
                    `Prepared export for ${getFilteredMessages().length} partner messages.`,
                );
            }

            function renderAll() {
                renderMetrics();
                renderMessagesList();
                renderMessagePanel();
            }

            messagesList.addEventListener("click", (event) => {
                const item = event.target.closest("[data-message-id]");
                if (item) openMessage(item.dataset.messageId);
            });
            messageSearch.addEventListener("input", renderAll);
            messageStatusFilter.addEventListener("change", renderAll);
            markAllReadBtn.addEventListener("click", markAllRead);
            exportMsgsBtn.addEventListener("click", exportMessages);

            saveMessages();
            renderAll();
        },
        "order-reviews": () => {
            const openAnalyticsBtn =
                document.getElementById("openAnalyticsBtn");
            const closeAnalyticsBtn =
                document.getElementById("closeAnalyticsBtn");
            const analyticsOverlay =
                document.getElementById("analyticsOverlay");

            function openAnalytics() {
                analyticsOverlay.classList.remove("hidden");
                document.body.style.overflow = "hidden";
            }

            function closeAnalytics() {
                analyticsOverlay.classList.add("hidden");
                document.body.style.overflow = "";
            }

            openAnalyticsBtn.addEventListener("click", openAnalytics);
            closeAnalyticsBtn.addEventListener("click", closeAnalytics);

            analyticsOverlay.addEventListener("click", (event) => {
                if (event.target === analyticsOverlay) {
                    closeAnalytics();
                }
            });

            document.addEventListener("keydown", (event) => {
                if (
                    event.key === "Escape" &&
                    !analyticsOverlay.classList.contains("hidden")
                ) {
                    closeAnalytics();
                }
            });
        },
        "scheduled-orders": () => {
            const weekdays = [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
            ];
            const arrivalHours = [
                "8 AM",
                "9 AM",
                "10 AM",
                "11 AM",
                "12 PM",
                "1 PM",
                "2 PM",
                "3 PM",
                "4 PM",
                "5 PM",
                "6 PM",
                "7 PM",
                "8 PM",
            ];
            const calendarGrid = document.getElementById("calendarGrid");
            const hoursGrid = document.getElementById("hoursGrid");
            const calendarTitle = document.getElementById("calendarTitle");
            const openDatesMetric = document.getElementById("openDatesMetric");
            const closedDatesMetric =
                document.getElementById("closedDatesMetric");
            const todayMetric = document.getElementById("todayMetric");
            const tomorrowMetric = document.getElementById("tomorrowMetric");
            const openHoursMetric = document.getElementById("openHoursMetric");
            const closedHoursMetric =
                document.getElementById("closedHoursMetric");
            const todayToggle = document.getElementById("todayToggle");
            const tomorrowToggle = document.getElementById("tomorrowToggle");
            const todayLabel = document.getElementById("todayLabel");
            const tomorrowLabel = document.getElementById("tomorrowLabel");
            const prevMonthBtn = document.getElementById("prevMonthBtn");
            const nextMonthBtn = document.getElementById("nextMonthBtn");
            const resetScheduleBtn =
                document.getElementById("resetScheduleBtn");
            const saveScheduleBtn = document.getElementById("saveScheduleBtn");
            const hoursClosedUntilInput = document.getElementById(
                "hoursClosedUntilInput",
            );
            const saveClosedHoursBtn =
                document.getElementById("saveClosedHoursBtn");
            const closedHoursSelection = document.getElementById(
                "closedHoursSelection",
            );
            const hoursClosureStatus =
                document.getElementById("hoursClosureStatus");
            const scheduleToast = document.getElementById("scheduleToast");
            const scheduleToastText =
                document.getElementById("scheduleToastText");

            let visibleDate = new Date(2026, 5, 1);
            let toastTimeoutId = null;
            const hoursClosureStorageKey = "scheduledOrdersHourClosures";
            let hourAvailability = Object.fromEntries(
                arrivalHours.map((hour) => [hour, true]),
            );
            let hourClosedUntil = {};
            let pendingClosedHours = new Set();
            let dateOverrides = new Map();

            function dateKey(date) {
                return date.toISOString().slice(0, 10);
            }

            function localDateKey(date = new Date()) {
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const day = String(date.getDate()).padStart(2, "0");
                return `${year}-${month}-${day}`;
            }

            function formatClosureDate(value) {
                return new Date(`${value}T00:00:00`).toLocaleDateString(
                    undefined,
                    {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                    },
                );
            }

            function loadHourClosures() {
                try {
                    const stored = JSON.parse(
                        localStorage.getItem(hoursClosureStorageKey),
                    );
                    if (stored && typeof stored === "object") {
                        hourClosedUntil = stored;
                    }
                } catch (error) {
                    hourClosedUntil = {};
                }

                const today = localDateKey();
                Object.entries(hourClosedUntil).forEach(([hour, untilDate]) => {
                    if (!arrivalHours.includes(hour) || untilDate < today) {
                        delete hourClosedUntil[hour];
                        hourAvailability[hour] = true;
                        return;
                    }
                    hourAvailability[hour] = false;
                });
            }

            function persistHourClosures() {
                localStorage.setItem(
                    hoursClosureStorageKey,
                    JSON.stringify(hourClosedUntil),
                );
            }

            function renderHoursClosureControls() {
                const pendingHours = arrivalHours.filter((hour) =>
                    pendingClosedHours.has(hour),
                );
                const hasPendingHours = pendingHours.length > 0;
                hoursClosedUntilInput.disabled = !hasPendingHours;
                saveClosedHoursBtn.disabled = !hasPendingHours;
                hoursClosedUntilInput.min = localDateKey();
                closedHoursSelection.textContent = hasPendingHours
                    ? `${pendingHours.length} pending: ${pendingHours.join(", ")}`
                    : "Select new hours to close";

                const savedClosures = arrivalHours.filter(
                    (hour) => !hourAvailability[hour] && hourClosedUntil[hour],
                );
                if (!savedClosures.length) {
                    hoursClosureStatus.classList.add("hidden");
                    hoursClosureStatus.textContent = "";
                    return;
                }

                const groupedDates = [
                    ...new Set(
                        savedClosures.map((hour) => hourClosedUntil[hour]),
                    ),
                ];
                hoursClosureStatus.innerHTML = groupedDates
                    .map((untilDate) => {
                        const hours = savedClosures.filter(
                            (hour) => hourClosedUntil[hour] === untilDate,
                        );
                        return `<div><strong>${hours.join(", ")}</strong><span>Unavailable through ${formatClosureDate(untilDate)}</span></div>`;
                    })
                    .join("");
                hoursClosureStatus.classList.remove("hidden");
            }
            function showToast(message) {
                scheduleToastText.textContent = message;
                scheduleToast.classList.remove("hidden");

                if (toastTimeoutId) {
                    window.clearTimeout(toastTimeoutId);
                }

                toastTimeoutId = window.setTimeout(() => {
                    scheduleToast.classList.add("hidden");
                }, 3000);
            }

            function isDateOpen(date) {
                const key = dateKey(date);
                if (dateOverrides.has(key)) {
                    return dateOverrides.get(key);
                }

                return true;
            }

            function setToggleState(button, label, isOpen) {
                button.classList.toggle("open", isOpen);
                button.classList.toggle("closed", !isOpen);
                button.textContent = isOpen ? "Open" : "Closed";
                button.setAttribute("aria-pressed", String(isOpen));
                label.textContent = isOpen
                    ? "Open for booking"
                    : "Closed for booking";
            }

            function renderHours() {
                hoursGrid.innerHTML = arrivalHours
                    .map((hour) => {
                        const isOpen = hourAvailability[hour];
                        const closedUntil = hourClosedUntil[hour];
                        return `<button class="hour-slot ${isOpen ? "open" : "closed"} ${pendingClosedHours.has(hour) ? "pending" : ""}" type="button" data-hour="${hour}" aria-pressed="${isOpen}">
        <strong>${hour}</strong>
        <span>${isOpen ? "Allowed" : "Blocked"}</span>
        ${!isOpen && closedUntil ? `<small class="closure-date">Closed through ${formatClosureDate(closedUntil)}</small>` : ""}
      </button>`;
                    })
                    .join("");

                hoursGrid.querySelectorAll("[data-hour]").forEach((button) => {
                    button.addEventListener("click", () => {
                        const hour = button.dataset.hour;
                        hourAvailability[hour] = !hourAvailability[hour];
                        if (hourAvailability[hour]) {
                            pendingClosedHours.delete(hour);
                            delete hourClosedUntil[hour];
                            persistHourClosures();
                        } else {
                            pendingClosedHours.add(hour);
                        }
                        renderAll();
                        showToast(
                            `${hour} arrival slot is now ${hourAvailability[hour] ? "allowed" : "blocked"}.`,
                        );
                    });
                });
            }

            function renderCalendar() {
                const year = visibleDate.getFullYear();
                const month = visibleDate.getMonth();
                const firstDay = new Date(year, month, 1);
                const monthName = firstDay.toLocaleString(undefined, {
                    month: "long",
                    year: "numeric",
                });
                const startOffset = firstDay.getDay();
                const daysInMonth = new Date(year, month + 1, 0).getDate();
                const cells = [];

                weekdays.forEach((day) => {
                    cells.push(
                        `<div class="day-name">${day.slice(0, 3)}</div>`,
                    );
                });

                for (let i = 0; i < startOffset; i += 1) {
                    cells.push(
                        '<button class="calendar-day muted" type="button" disabled></button>',
                    );
                }

                for (let day = 1; day <= daysInMonth; day += 1) {
                    const current = new Date(year, month, day);
                    const key = dateKey(current);
                    const isOpen = isDateOpen(current);
                    const hasOverride = dateOverrides.has(key);

                    cells.push(`<button class="calendar-day ${isOpen ? "open" : "closed"} ${hasOverride ? "custom" : ""}" type="button" data-date="${key}">
      <strong>${day}</strong>
      <span>${weekdays[current.getDay()]}</span>
      <span class="day-status ${isOpen ? "open" : "closed"}">${isOpen ? "Open" : "Closed"}</span>
    </button>`);
                }

                calendarTitle.textContent = monthName;
                calendarGrid.innerHTML = cells.join("");

                calendarGrid
                    .querySelectorAll("[data-date]")
                    .forEach((button) => {
                        button.addEventListener("click", () => {
                            const key = button.dataset.date;
                            const date = new Date(`${key}T00:00:00`);
                            dateOverrides.set(key, !isDateOpen(date));
                            renderAll();
                            showToast(
                                `Booking on ${key} is now ${dateOverrides.get(key) ? "open" : "closed"}.`,
                            );
                        });
                    });
            }

            function updateMetrics() {
                const year = visibleDate.getFullYear();
                const month = visibleDate.getMonth();
                const daysInMonth = new Date(year, month + 1, 0).getDate();
                let openCount = 0;

                for (let day = 1; day <= daysInMonth; day += 1) {
                    if (isDateOpen(new Date(year, month, day))) {
                        openCount += 1;
                    }
                }

                const closedCount = daysInMonth - openCount;
                const openHours = arrivalHours.filter(
                    (hour) => hourAvailability[hour],
                ).length;
                const closedHours = arrivalHours.length - openHours;
                const today = new Date(2026, 5, 22);
                const tomorrow = new Date(2026, 5, 23);
                const todayOpen = isDateOpen(today);
                const tomorrowOpen = isDateOpen(tomorrow);

                openDatesMetric.textContent = String(openCount);
                closedDatesMetric.textContent = String(closedCount);
                openHoursMetric.textContent = String(openHours);
                closedHoursMetric.textContent = String(closedHours);
                todayMetric.textContent = todayOpen ? "Open" : "Closed";
                tomorrowMetric.textContent = tomorrowOpen ? "Open" : "Closed";
                setToggleState(todayToggle, todayLabel, todayOpen);
                setToggleState(tomorrowToggle, tomorrowLabel, tomorrowOpen);
            }

            function renderAll() {
                renderHours();
                renderCalendar();
                updateMetrics();
                renderHoursClosureControls();
            }

            function toggleSpecificDate(date) {
                dateOverrides.set(dateKey(date), !isDateOpen(date));
                renderAll();
            }

            todayToggle.addEventListener("click", () => {
                toggleSpecificDate(new Date(2026, 5, 22));
                showToast("Today booking status updated.");
            });

            tomorrowToggle.addEventListener("click", () => {
                toggleSpecificDate(new Date(2026, 5, 23));
                showToast("Tomorrow booking status updated.");
            });

            prevMonthBtn.addEventListener("click", () => {
                visibleDate = new Date(
                    visibleDate.getFullYear(),
                    visibleDate.getMonth() - 1,
                    1,
                );
                renderAll();
            });

            nextMonthBtn.addEventListener("click", () => {
                visibleDate = new Date(
                    visibleDate.getFullYear(),
                    visibleDate.getMonth() + 1,
                    1,
                );
                renderAll();
            });

            resetScheduleBtn.addEventListener("click", () => {
                hourAvailability = Object.fromEntries(
                    arrivalHours.map((hour) => [hour, true]),
                );
                dateOverrides = new Map();
                hourClosedUntil = {};
                localStorage.removeItem(hoursClosureStorageKey);
                hoursClosedUntilInput.value = "";
                visibleDate = new Date(2026, 5, 1);
                renderAll();
                showToast("Booking schedule reset to default rules.");
            });

            saveClosedHoursBtn.addEventListener("click", () => {
                const closedHours = arrivalHours.filter((hour) =>
                    pendingClosedHours.has(hour),
                );
                const untilDate = hoursClosedUntilInput.value;

                if (!closedHours.length) {
                    showToast("Select at least one arrival hour to close.");
                    return;
                }

                if (!untilDate) {
                    showToast(
                        "Choose the date until which these hours are unavailable.",
                    );
                    hoursClosedUntilInput.focus();
                    return;
                }

                if (untilDate < localDateKey()) {
                    showToast("Closed Until date cannot be in the past.");
                    hoursClosedUntilInput.focus();
                    return;
                }

                closedHours.forEach((hour) => {
                    hourClosedUntil[hour] = untilDate;
                });
                pendingClosedHours.clear();
                hoursClosedUntilInput.value = "";
                persistHourClosures();
                renderAll();
                showToast(
                    `${closedHours.length} arrival hours closed through ${formatClosureDate(untilDate)}.`,
                );
            });

            saveScheduleBtn.addEventListener("click", () => {
                if (pendingClosedHours.size) {
                    showToast(
                        "Save the newly closed hours with an end date first.",
                    );
                    return;
                }
                persistHourClosures();
                showToast(
                    "Booking dates and arrival hours saved successfully.",
                );
            });

            loadHourClosures();
            renderAll();
        },
        "send-message": () => {
            const customers = [
                {
                    id: "#USR-102938",
                    name: "mariam ashraf awad",
                    phone: "+20 109 555 0198",
                    email: "mariam.ashraf.awad@example.com",
                },
                {
                    id: "#USR-102954",
                    name: "Youssef Adel",
                    phone: "+20 101 444 2290",
                    email: "y.adel@example.com",
                },
                {
                    id: "#USR-103004",
                    name: "Nour Hassan",
                    phone: "+20 112 760 1903",
                    email: "n.hassan@example.com",
                },
                {
                    id: "#USR-103121",
                    name: "Karim Emad",
                    phone: "+20 115 903 7744",
                    email: "karim.emad@example.com",
                },
                {
                    id: "#USR-103177",
                    name: "Salma Hany",
                    phone: "+20 100 873 2190",
                    email: "salma.hany@example.com",
                },
            ];

            const customerAvatar = document.getElementById("customerAvatar");
            const customerName = document.getElementById("customerName");
            const customerId = document.getElementById("customerId");
            const customerPhone = document.getElementById("customerPhone");
            const customerEmail = document.getElementById("customerEmail");
            const messageChannel = document.getElementById("messageChannel");
            const channelPreview = document.getElementById("channelPreview");
            const recipientPreview =
                document.getElementById("recipientPreview");
            const sendTimePreview = document.getElementById("sendTimePreview");
            const sendMessageForm = document.getElementById("sendMessageForm");
            const messageSubject = document.getElementById("messageSubject");
            const messageBody = document.getElementById("messageBody");
            const messageToast = document.getElementById("messageToast");
            const messageToastText =
                document.getElementById("messageToastText");

            let toastTimeoutId = null;
            const params = new URLSearchParams(window.location.search);
            const selectedCustomerId = params.get("userId") || "";
            const customer =
                customers.find((item) => item.id === selectedCustomerId) ||
                customers[0];

            const getInitials = __shared.getInitials_8;

            function getChannelLabel(value) {
                const labels = {
                    push: "Push Notification",
                    sms: "SMS",
                    whatsapp: "WhatsApp",
                    email: "Email",
                };

                return labels[value] || labels.push;
            }

            function getRecipientDestination() {
                return messageChannel.value === "email"
                    ? customer.email
                    : customer.phone;
            }

            function showToast(message) {
                messageToastText.textContent = message;
                messageToast.classList.remove("hidden");

                if (toastTimeoutId) {
                    window.clearTimeout(toastTimeoutId);
                }

                toastTimeoutId = window.setTimeout(() => {
                    messageToast.classList.add("hidden");
                }, 3000);
            }

            function renderCustomer() {
                customerAvatar.textContent = getInitials(customer.name);
                customerName.textContent = customer.name;
                customerId.textContent = customer.id;
                customerPhone.textContent = customer.phone;
                customerEmail.textContent = customer.email;
                updateChannelPreview();
            }

            function updateChannelPreview() {
                channelPreview.textContent = getChannelLabel(
                    messageChannel.value,
                );
                recipientPreview.textContent = `${customer.name} - ${getRecipientDestination()}`;
            }

            messageChannel.addEventListener("change", updateChannelPreview);

            sendMessageForm.addEventListener("reset", () => {
                window.setTimeout(() => {
                    messageChannel.value = "push";
                    updateChannelPreview();
                    sendTimePreview.textContent =
                        "Generated automatically on send";
                }, 0);
            });

            sendMessageForm.addEventListener("submit", (event) => {
                event.preventDefault();

                const sentAt = new Date().toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                });
                sendTimePreview.textContent = sentAt;

                showToast(
                    `${getChannelLabel(messageChannel.value)} sent to ${customer.name} at ${sentAt}.`,
                );
                messageSubject.value = "";
                messageBody.value = "";
            });

            renderCustomer();
        },
        sidebar: () => {
            const sidebarGroups = {
                users: [
                    "user-list.html",
                    "add-user.html",
                    "send-message.html",
                    "index.html",
                ],
                maids: ["maids.html", "add-maid.html", "maid-details.html"],
                orders: [
                    "under-review-orders.html",
                    "waiting-list.html",
                    "scheduled-orders.html",
                    "accepted-orders.html",
                    "done-orders.html",
                    "cancelled-orders.html",
                ],
                ads: ["ads-spaces.html", "ads-history.html"],
                supporters: [
                    "supporters-list.html",
                    "supporter-profile.html",
                    "add-supporter.html",
                ],
                operators: [
                    "operators-list.html",
                    "partner-profile.html",
                    "operators-msgs.html",
                    "add-operators.html",
                ],
            };

            function getCurrentSidebarPage() {
                const explicitPage = new URLSearchParams(
                    window.location.search,
                ).get("page");
                if (explicitPage) {
                    return explicitPage;
                }

                const fileName = window.location.pathname.split("/").pop();
                return fileName && fileName !== "sidebar.html"
                    ? fileName
                    : "admin-dashboard.html";
            }

            function markActiveSidebar(root, currentPage) {
                root.querySelectorAll("[data-sidebar-page]").forEach((item) => {
                    const page = item.dataset.sidebarPage;
                    const isDirectMatch = page === currentPage;
                    const isAdsHistory =
                        page === "ads-spaces.html" &&
                        currentPage === "ads-history.html";
                    item.classList.toggle(
                        "active",
                        isDirectMatch || isAdsHistory,
                    );
                });

                root.querySelectorAll("[data-sidebar-group]").forEach(
                    (group) => {
                        const pages =
                            sidebarGroups[group.dataset.sidebarGroup] || [];
                        group.classList.toggle(
                            "open",
                            pages.includes(currentPage),
                        );
                    },
                );
            }

            function getPartnersUnreadCount() {
                const storedCount = Number(
                    localStorage.getItem("operatorsUnreadMessages"),
                );
                return Number.isFinite(storedCount) ? storedCount : 4;
            }

            function updatePartnersUnreadBadge(root) {
                const count = getPartnersUnreadCount();
                root.querySelectorAll("[data-operators-unread]").forEach(
                    (badge) => {
                        badge.textContent = String(count);
                        badge.classList.toggle("hidden", count === 0);
                    },
                );
            }

            function getApprovalsPendingCount() {
                const storedCount = Number(
                    localStorage.getItem("approvalPendingCount"),
                );
                return Number.isFinite(storedCount) &&
                    localStorage.getItem("approvalPendingCount") !== null
                    ? storedCount
                    : 4;
            }

            function updateApprovalsPendingBadge(root) {
                const count = getApprovalsPendingCount();
                root.querySelectorAll("[data-approvals-pending]").forEach(
                    (badge) => {
                        badge.textContent = String(count);
                        badge.classList.toggle("hidden", count === 0);
                    },
                );
            }
            function bindSidebarToggles(root) {
                root.querySelectorAll("[data-sidebar-toggle]").forEach(
                    (button) => {
                        button.addEventListener("click", () => {
                            button
                                .closest(".dropdown-block")
                                ?.classList.toggle("open");
                        });
                    },
                );
            }

            function initializeSidebar(
                root = document,
                page = getCurrentSidebarPage(),
            ) {
                markActiveSidebar(root, page);
                bindSidebarToggles(root);
                updatePartnersUnreadBadge(root);
                updateApprovalsPendingBadge(root);
            }

            async function loadSharedSidebar() {
                const mount = document.querySelector("[data-sidebar-mount]");
                if (!mount) {
                    initializeSidebar(document);
                    return;
                }

                const currentPage = getCurrentSidebarPage();

                try {
                    const response = await fetch("./sidebar.html", {
                        cache: "no-cache",
                    });
                    if (!response.ok) {
                        throw new Error("Sidebar request failed");
                    }

                    const sidebarDocument = new DOMParser().parseFromString(
                        await response.text(),
                        "text/html",
                    );
                    const sidebarContent =
                        sidebarDocument.querySelector(".sidebar-content");
                    if (!sidebarContent) {
                        throw new Error("Sidebar content missing");
                    }

                    mount.innerHTML = sidebarContent.innerHTML;
                    initializeSidebar(mount, currentPage);
                } catch (error) {
                    const frame = document.createElement("iframe");
                    frame.className = "sidebar-frame";
                    frame.title = "Dashboard navigation";
                    frame.src = `./sidebar.html?page=${encodeURIComponent(currentPage)}`;
                    mount.replaceChildren(frame);
                }
            }

            document.addEventListener("approval-count-updated", () =>
                updateApprovalsPendingBadge(document),
            );

            loadSharedSidebar();
        },
        "super-admin-login": () => {
            const superAdminCredentials = {
                email: "superadmin@tarwiqa.com",
                password: "Super@2026",
            };

            const loginForm = document.getElementById("superAdminLoginForm");
            const emailInput = document.getElementById("adminEmail");
            const passwordInput = document.getElementById("adminPassword");
            const rememberInput = document.getElementById("rememberAdmin");
            const togglePasswordBtn =
                document.getElementById("togglePasswordBtn");
            const loginSubmitBtn = document.getElementById("loginSubmitBtn");
            const loginMessage = document.getElementById("loginMessage");

            function setLoginMessage(message, type = "") {
                loginMessage.textContent = message;
                loginMessage.className = `form-message ${type}`.trim();
            }

            function setRememberedEmail() {
                const rememberedEmail = localStorage.getItem(
                    "tarwiqaRememberedSuperAdmin",
                );
                if (rememberedEmail) {
                    emailInput.value = rememberedEmail;
                    rememberInput.checked = true;
                }
            }

            function createSuperAdminSession(email) {
                const session = {
                    email,
                    role: "super-admin",
                    loginAt: new Date().toISOString(),
                };
                localStorage.setItem(
                    "tarwiqaSuperAdminSession",
                    JSON.stringify(session),
                );
            }

            togglePasswordBtn?.addEventListener("click", () => {
                const isPasswordVisible = passwordInput.type === "text";
                passwordInput.type = isPasswordVisible ? "password" : "text";
                togglePasswordBtn.textContent = isPasswordVisible
                    ? "Show"
                    : "Hide";
            });

            loginForm?.addEventListener("submit", (event) => {
                event.preventDefault();

                const email = emailInput.value.trim().toLowerCase();
                const password = passwordInput.value;

                if (!email || !password) {
                    setLoginMessage(
                        "Please enter email and password.",
                        "error",
                    );
                    return;
                }

                if (
                    email !== superAdminCredentials.email ||
                    password !== superAdminCredentials.password
                ) {
                    setLoginMessage(
                        "Invalid super admin credentials.",
                        "error",
                    );
                    return;
                }

                loginSubmitBtn.disabled = true;
                setLoginMessage(
                    "Access granted. Opening dashboard...",
                    "success",
                );
                createSuperAdminSession(email);

                if (rememberInput.checked) {
                    localStorage.setItem("tarwiqaRememberedSuperAdmin", email);
                } else {
                    localStorage.removeItem("tarwiqaRememberedSuperAdmin");
                }

                window.setTimeout(() => {
                    window.location.href = "./admin-dashboard.html";
                }, 450);
            });

            setRememberedEmail();
        },
        "supporters-list": () => {
            const governorates = [
                "Cairo",
                "Giza",
                "Alexandria",
                "Qalyubia",
                "Dakahlia",
                "Sharqia",
            ];
            const governorateData = {
                Cairo: { orders: 184, partners: 4 },
                Giza: { orders: 76, partners: 1 },
                Alexandria: { orders: 54, partners: 2 },
                Qalyubia: { orders: 31, partners: 1 },
                Dakahlia: { orders: 42, partners: 1 },
                Sharqia: { orders: 29, partners: 1 },
            };
            const defaultSupporters = [
                {
                    id: "SUP-0901",
                    name: "Hassan Mahmoud",
                    username: "support.hassan",
                    password: "Support@0901",
                    phone: "+20 100 440 1182",
                    email: "hassan@tarwiqa.app",
                    status: "Active",
                    role: "editor",
                    governorates: ["Cairo", "Giza"],
                    canViewOrders: true,
                    canViewPartners: true,
                    canExportReports: true,
                    notes: "Cairo and Giza website support lead.",
                    createdAt: "Jun 15, 2026",
                },
                {
                    id: "SUP-0902",
                    name: "Reem Ashraf",
                    username: "support.reem",
                    password: "Support@0902",
                    phone: "+20 109 221 5044",
                    email: "reem@tarwiqa.app",
                    status: "Active",
                    role: "viewer",
                    governorates: ["Alexandria"],
                    canViewOrders: true,
                    canViewPartners: true,
                    canExportReports: false,
                    notes: "Alexandria website requests and partner follow-up.",
                    createdAt: "Jun 18, 2026",
                },
                {
                    id: "SUP-0903",
                    name: "Omar Nabil",
                    username: "support.omar",
                    password: "Support@0903",
                    phone: "+20 111 703 9912",
                    email: "omar@tarwiqa.app",
                    status: "Paused",
                    role: "viewer",
                    governorates: ["Qalyubia", "Dakahlia", "Sharqia"],
                    canViewOrders: true,
                    canViewPartners: true,
                    canExportReports: false,
                    notes: "Delta region support coverage.",
                    createdAt: "Jun 21, 2026",
                },
            ];

            const q = (id) => document.getElementById(id);
            let supporters = [
                ...defaultSupporters,
                ...loadJson("createdSupporters", []),
            ];
            const supporterOverrides = loadJson("supporterOverrides", {});
            supporters = supporters.map((supporter) => ({
                ...supporter,
                ...(supporterOverrides[supporter.id] || {}),
            }));
            let activeEditSupporterId = null;
            let toastTimer;

            const loadJson = __shared.loadJson_5;

            function scopeTotals(supporter) {
                return supporter.governorates.reduce(
                    (total, governorate) => {
                        const data = governorateData[governorate] || {
                            orders: 0,
                            partners: 0,
                        };
                        total.orders += supporter.canViewOrders
                            ? data.orders
                            : 0;
                        total.partners += supporter.canViewPartners
                            ? data.partners
                            : 0;
                        return total;
                    },
                    { orders: 0, partners: 0 },
                );
            }

            function filteredSupporters() {
                const query = q("supporterSearch").value.trim().toLowerCase();
                const governorate = q("governorateFilter").value;
                const status = q("statusFilter").value;
                return supporters.filter((supporter) => {
                    const searchable =
                        `${supporter.name} ${supporter.username} ${supporter.governorates.join(" ")}`.toLowerCase();
                    return (
                        searchable.includes(query) &&
                        (governorate === "all" ||
                            supporter.governorates.includes(governorate)) &&
                        (status === "all" || supporter.status === status)
                    );
                });
            }

            function showToast(message) {
                q("supportersToast").textContent = message;
                q("supportersToast").classList.remove("hidden");
                clearTimeout(toastTimer);
                toastTimer = setTimeout(
                    () => q("supportersToast").classList.add("hidden"),
                    2800,
                );
            }

            function renderMetrics() {
                q("totalSupporters").textContent = supporters.length;
                q("activeSupporters").textContent = supporters.filter(
                    (supporter) => supporter.status === "Active",
                ).length;
                q("coveredGovernorates").textContent = new Set(
                    supporters.flatMap((supporter) => supporter.governorates),
                ).size;
                q("scopedOrders").textContent = supporters.reduce(
                    (sum, supporter) => sum + scopeTotals(supporter).orders,
                    0,
                );
            }

            function renderTable() {
                const rows = filteredSupporters();
                q("supportersTableBody").innerHTML = rows.length
                    ? rows
                        .map((supporter) => {
                            const totals = scopeTotals(supporter);
                            return `
      <tr>
        <td><div class="name-cell"><strong>${supporter.name}</strong><small>${supporter.username} / ${supporter.id}</small></div></td>
        <td><span class="status-pill ${supporter.status.toLowerCase()}">${supporter.status}</span></td>
        <td><div class="governorates">${supporter.governorates.map((item) => `<span class="scope-pill">${item}</span>`).join("")}</div></td>
        <td>${supporter.canViewOrders ? "Allowed" : "Blocked"}</td>
        <td>${supporter.canViewPartners ? "Allowed" : "Blocked"}</td>
        <td><strong>${totals.orders}</strong></td>
        <td><strong>${totals.partners}</strong></td>
        <td><div class="row-actions"><button class="row-btn view" type="button" data-view-supporter="${supporter.id}">View</button><button class="row-btn edit" type="button" data-edit-supporter="${supporter.id}">Edit</button><button class="row-btn edit" type="button" data-toggle-supporter="${supporter.id}">${supporter.status === "Active" ? "Pause" : "Activate"}</button></div></td>
      </tr>
    `;
                        })
                        .join("")
                    : '<tr><td colspan="9">No supporters match the selected filters.</td></tr>';
            }

            function openDetails(id) {
                window.location.href = `../supporter/supporter-profile.html?supporterId=${encodeURIComponent(id)}`;
            }
            function openEditSupporter(id) {
                const supporter = supporters.find((item) => item.id === id);
                if (!supporter) return;
                activeEditSupporterId = id;
                q("editSupporterTitle").textContent = `Edit ${supporter.name}`;
                q("editSupporterName").value = supporter.name;
                q("editSupporterUsername").value = supporter.username;
                q("editSupporterPassword").value = supporter.password || "";
                q("editSupporterPassword").type = "password";
                q("toggleEditSupporterPassword").textContent = "Show";
                q("toggleEditSupporterPassword").setAttribute(
                    "aria-pressed",
                    "false",
                );
                q("editSupporterStatus").value = supporter.status;
                q("editSupporterPhone").value = supporter.phone;
                q("editSupporterEmail").value = supporter.email;
                q("editSupporterNotes").value = supporter.notes || "";
                q("editSupporterModal").classList.remove("hidden");
                q("editSupporterModal").setAttribute("aria-hidden", "false");
            }

            function closeEditSupporter() {
                q("editSupporterModal").classList.add("hidden");
                q("editSupporterModal").setAttribute("aria-hidden", "true");
                activeEditSupporterId = null;
            }

            function toggleEditPassword() {
                const input = q("editSupporterPassword");
                const show = input.type === "password";
                input.type = show ? "text" : "password";
                q("toggleEditSupporterPassword").textContent = show
                    ? "Hide"
                    : "Show";
                q("toggleEditSupporterPassword").setAttribute(
                    "aria-pressed",
                    String(show),
                );
                input.focus();
            }

            function saveSupporterEdit() {
                if (
                    !q("editSupporterForm").reportValidity() ||
                    !activeEditSupporterId
                )
                    return;
                const supporter = supporters.find(
                    (item) => item.id === activeEditSupporterId,
                );
                if (!supporter) return;
                supporter.name = q("editSupporterName").value.trim();
                supporter.username = q("editSupporterUsername").value.trim();
                supporter.password = q("editSupporterPassword").value;
                supporter.status = q("editSupporterStatus").value;
                supporter.phone = q("editSupporterPhone").value.trim();
                supporter.email = q("editSupporterEmail").value.trim();
                supporter.notes = q("editSupporterNotes").value.trim();

                const overrides = loadJson("supporterOverrides", {});
                overrides[supporter.id] = supporter;
                localStorage.setItem(
                    "supporterOverrides",
                    JSON.stringify(overrides),
                );
                const created = loadJson("createdSupporters", []);
                const createdIndex = created.findIndex(
                    (item) => item.id === supporter.id,
                );
                if (createdIndex >= 0) {
                    created[createdIndex] = supporter;
                    localStorage.setItem(
                        "createdSupporters",
                        JSON.stringify(created),
                    );
                }
                closeEditSupporter();
                renderMetrics();
                renderTable();
                showToast(`${supporter.name} account and password saved.`);
            }

            function toggleStatus(id) {
                const supporter = supporters.find((item) => item.id === id);
                if (!supporter) return;
                supporter.status =
                    supporter.status === "Active" ? "Paused" : "Active";
                const createdIds = new Set(
                    loadJson("createdSupporters", []).map((item) => item.id),
                );
                localStorage.setItem(
                    "createdSupporters",
                    JSON.stringify(
                        supporters.filter((item) => createdIds.has(item.id)),
                    ),
                );
                renderMetrics();
                renderTable();
                showToast(`${supporter.name} is now ${supporter.status}.`);
            }

            q("governorateFilter").innerHTML += governorates
                .map((item) => `<option>${item}</option>`)
                .join("");
            q("supporterSearch").addEventListener("input", renderTable);
            q("governorateFilter").addEventListener("change", renderTable);
            q("statusFilter").addEventListener("change", renderTable);
            q("supportersTableBody").addEventListener("click", (event) => {
                const view = event.target.closest("[data-view-supporter]");
                if (view) return openDetails(view.dataset.viewSupporter);
                const edit = event.target.closest("[data-edit-supporter]");
                if (edit) return openEditSupporter(edit.dataset.editSupporter);
                const toggle = event.target.closest("[data-toggle-supporter]");
                if (toggle) toggleStatus(toggle.dataset.toggleSupporter);
            });
            q("toggleEditSupporterPassword").addEventListener(
                "click",
                toggleEditPassword,
            );
            q("saveEditSupporter").addEventListener("click", saveSupporterEdit);
            q("closeEditSupporterModal").addEventListener(
                "click",
                closeEditSupporter,
            );
            q("cancelEditSupporter").addEventListener(
                "click",
                closeEditSupporter,
            );
            q("editSupporterModal").addEventListener("click", (event) => {
                if (event.target === q("editSupporterModal"))
                    closeEditSupporter();
            });
            q("closeSupporterModal").addEventListener("click", () =>
                q("supporterModal").classList.add("hidden"),
            );
            q("supporterModal").addEventListener("click", (event) => {
                if (event.target === q("supporterModal"))
                    q("supporterModal").classList.add("hidden");
            });
            renderMetrics();
            renderTable();
        },
        "under-review-orders": () => {
            const ordersDropdownBtn =
                document.getElementById("ordersDropdownBtn");
            const ordersDropdownContainer =
                ordersDropdownBtn?.closest(".dropdown-block");
            const ordersTableBody = document.getElementById("ordersTableBody");
            const searchTypeSelect =
                document.getElementById("searchTypeSelect");
            const searchInput = document.getElementById("searchInput");
            const dateSearchInput = document.getElementById("dateSearchInput");
            const dateSearchField = document.getElementById("dateSearchField");
            const sortSelect = document.getElementById("sortSelect");
            const clearFiltersBtn = document.getElementById("clearFiltersBtn");
            const openAddOrderBtn = document.getElementById("openAddOrderBtn");
            const reviewCount = document.getElementById("reviewCount");
            const highestPriceMetric =
                document.getElementById("highestPriceMetric");
            const todayRequestsMetric = document.getElementById(
                "todayRequestsMetric",
            );
            const earliestArrivalMetric = document.getElementById(
                "earliestArrivalMetric",
            );

            const editOrderModal = document.getElementById("editOrderModal");
            const editOrderForm = document.getElementById("editOrderForm");
            const editOrderTitle = document.getElementById("editOrderTitle");
            const closeEditModalBtn =
                document.getElementById("closeEditModalBtn");
            const cancelEditBtn = document.getElementById("cancelEditBtn");
            const modalOrderId = document.getElementById("modalOrderId");
            const modalUserName = document.getElementById("modalUserName");
            const modalCity = document.getElementById("modalCity");
            const modalAddressSelect =
                document.getElementById("modalAddressSelect");
            const modalCreatedDate =
                document.getElementById("modalCreatedDate");
            const modalTotalPrice = document.getElementById("modalTotalPrice");
            const modalWallet = document.getElementById("modalWallet");
            const modalDeposit = document.getElementById("modalDeposit");
            const modalDiscount = document.getElementById("modalDiscount");
            const modalFinalPrice = document.getElementById("modalFinalPrice");
            const modalStatus = document.getElementById("modalStatus");
            const modalPaymentMethod =
                document.getElementById("modalPaymentMethod");
            const modalOrderDate = document.getElementById("modalOrderDate");
            const modalArrivalTime =
                document.getElementById("modalArrivalTime");
            const modalMaidSelect = document.getElementById("modalMaidSelect");
            const modalPartnerSelect =
                document.getElementById("modalPartnerSelect");
            const modalExtrasSelect =
                document.getElementById("modalExtrasSelect");
            const modalBreakdownValue = document.getElementById(
                "modalBreakdownValue",
            );
            const modalSelectedAddressValue = document.getElementById(
                "modalSelectedAddressValue",
            );
            const modalAssignedMaidValue = document.getElementById(
                "modalAssignedMaidValue",
            );
            const modalAssignedPartnerValue = document.getElementById(
                "modalAssignedPartnerValue",
            );
            const modalExtrasValue =
                document.getElementById("modalExtrasValue");

            const addOrderModal = document.getElementById("addOrderModal");
            const addOrderForm = document.getElementById("addOrderForm");
            const closeAddModalBtn =
                document.getElementById("closeAddModalBtn");
            const cancelAddBtn = document.getElementById("cancelAddBtn");
            const addOrderId = document.getElementById("addOrderId");
            const customerSearchType =
                document.getElementById("customerSearchType");
            const customerSearchInput = document.getElementById(
                "customerSearchInput",
            );
            const addUserName = document.getElementById("addUserName");
            const addCitySelect = document.getElementById("addCitySelect");
            const addWidgetSelect = document.getElementById("addWidgetSelect");
            const addCategorySelect =
                document.getElementById("addCategorySelect");
            const addPackageSelect =
                document.getElementById("addPackageSelect");
            const addAddressInput = document.getElementById("addAddressInput");
            const addCreatedDate = document.getElementById("addCreatedDate");
            const addTotalPrice = document.getElementById("addTotalPrice");
            const addWallet = document.getElementById("addWallet");
            const addDeposit = document.getElementById("addDeposit");
            const addDiscount = document.getElementById("addDiscount");
            const addFinalPrice = document.getElementById("addFinalPrice");
            const addStatus = document.getElementById("addStatus");
            const addPaymentMethod =
                document.getElementById("addPaymentMethod");
            const addOrderDate = document.getElementById("addOrderDate");
            const addArrivalTime = document.getElementById("addArrivalTime");
            const addMaidSelect = document.getElementById("addMaidSelect");
            const addPartnerSelect =
                document.getElementById("addPartnerSelect");
            const addExtrasSelect = document.getElementById("addExtrasSelect");
            const addBreakdownValue =
                document.getElementById("addBreakdownValue");
            const addAssignedMaidValue = document.getElementById(
                "addAssignedMaidValue",
            );
            const addAssignedPartnerValue = document.getElementById(
                "addAssignedPartnerValue",
            );
            const addExtrasValue = document.getElementById("addExtrasValue");

            const activeMaids = [
                "Amina Mostafa",
                "Hoda Ali",
                "Amal Fathy",
                "Eman Yasser",
                "Reham Ashraf",
                "Aya Tarek",
            ];
            const activePartners = [
                { name: "Mona Adel", governorate: "Cairo" },
                { name: "Karim Samir", governorate: "Cairo" },
                { name: "Nour Hassan", governorate: "Cairo" },
                { name: "Ahmed Fathy", governorate: "Giza" },
                { name: "Salma Youssef", governorate: "Cairo" },
            ];
            const defaultExtras = [
                "Deep Cleaning Kit",
                "Ironing",
                "Window Cleaning",
                "Kitchen Sanitizing",
                "Carpet Refresh",
                "Fridge Cleaning",
            ];
            const temporarilyDeletedExtras = (() => {
                try {
                    const stored = JSON.parse(
                        localStorage.getItem("temporarilyDeletedExtras"),
                    );
                    return Array.isArray(stored) ? stored : [];
                } catch (error) {
                    return [];
                }
            })();
            const customExtras = (() => {
                try {
                    const stored = JSON.parse(
                        localStorage.getItem("customExtrasCatalog"),
                    );
                    return Array.isArray(stored)
                        ? stored.map((extra) => extra.name).filter(Boolean)
                        : [];
                } catch (error) {
                    return [];
                }
            })();
            const activeExtras = [
                ...new Set([...defaultExtras, ...customExtras]),
            ].filter((extra) => !temporarilyDeletedExtras.includes(extra));

            const customers = [
                {
                    userId: "#USR-102938",
                    phone: "+201095550198",
                    name: "Mariam Kamal",
                },
                {
                    userId: "#USR-204511",
                    phone: "+201113450011",
                    name: "Youssef Adel",
                },
                {
                    userId: "#USR-318900",
                    phone: "+201225900144",
                    name: "Nour Hassan",
                },
                {
                    userId: "#USR-442300",
                    phone: "+201066120077",
                    name: "Salma Emad",
                },
                {
                    userId: "#USR-559910",
                    phone: "+201288700035",
                    name: "Omar Hany",
                },
                {
                    userId: "#USR-661104",
                    phone: "+201027700551",
                    name: "Aya Tarek",
                },
            ];

            const customerAddressBook = {
                "Mariam Kamal": [
                    "12 Nile Corniche, Maadi",
                    "34 Road 9, Maadi",
                    "15 New Cairo First Settlement",
                ],
                "Youssef Adel": [
                    "45 Tahrir St, Dokki",
                    "18 Lebanon Square, Mohandessin",
                    "7 Sheikh Zayed District 2",
                ],
                "Nour Hassan": [
                    "21 El-Horreya Rd, Roushdy",
                    "14 Smouha Square, Alexandria",
                    "8 Sidi Gaber Road",
                ],
                "Salma Emad": [
                    "88 Abbas El Akkad, Nasr City",
                    "22 Makram Ebeid, Nasr City",
                    "5 Heliopolis Square",
                ],
                "Omar Hany": [
                    "17 El Gomhoria St, Mansoura",
                    "40 El Mashaya, Mansoura",
                ],
                "Aya Tarek": [
                    "9 El Nozha St, Heliopolis",
                    "13 El Merghany St, Heliopolis",
                    "6 New Cairo Fifth Settlement",
                ],
            };
            const serviceCatalog = {
                Cairo: {
                    widgets: {
                        Cleaning: {
                            categories: {
                                "Home Cleaning": [
                                    { name: "Premium Deep Clean", price: 2400 },
                                    { name: "Express Plus", price: 860 },
                                ],
                                "Move In Service": [
                                    { name: "Gold Package", price: 2100 },
                                    { name: "Silver Package", price: 1650 },
                                ],
                                "Kitchen Cleaning": [
                                    { name: "Kitchen Pro", price: 990 },
                                    { name: "Express Plus", price: 860 },
                                ],
                            },
                        },
                        Maintenance: {
                            categories: {
                                "AC Service": [
                                    { name: "Summer Check", price: 980 },
                                    { name: "Premium AC Care", price: 1450 },
                                ],
                            },
                        },
                    },
                },
                Giza: {
                    widgets: {
                        Cleaning: {
                            categories: {
                                "Office Service": [
                                    { name: "Business Standard", price: 1750 },
                                    { name: "Business Premium", price: 2400 },
                                ],
                            },
                        },
                        Laundry: {
                            categories: {
                                "Wash & Fold": [
                                    { name: "Family Bundle", price: 620 },
                                    { name: "Large Bundle", price: 880 },
                                ],
                            },
                        },
                    },
                },
                Alexandria: {
                    widgets: {
                        Maintenance: {
                            categories: {
                                "AC Service": [
                                    { name: "Summer Check", price: 980 },
                                    { name: "Coastal Care", price: 1320 },
                                ],
                            },
                        },
                        Cleaning: {
                            categories: {
                                "Home Cleaning": [
                                    { name: "Sea Breeze Package", price: 1540 },
                                    { name: "Premium Deep Clean", price: 2290 },
                                ],
                            },
                        },
                    },
                },
                Mansoura: {
                    widgets: {
                        Laundry: {
                            categories: {
                                "Wash & Fold": [
                                    { name: "Family Bundle", price: 620 },
                                    { name: "Quick Laundry", price: 420 },
                                ],
                            },
                        },
                    },
                },
            };

            const orders = [
                {
                    id: "ORD-9102",
                    userName: "Mariam Kamal",
                    userLink: "./index.html",
                    city: "Cairo",
                    widget: "Cleaning",
                    category: "Home Cleaning",
                    packageName: "Premium Deep Clean",
                    totalPrice: 2400,
                    wallet: 250,
                    deposit: 300,
                    discount: 100,
                    address: "12 Nile Corniche, Maadi",
                    createdDate: "2026-04-23 09:10 AM",
                    orderDate: "2026-04-25",
                    arrivalTime: "08:00",
                    queueOrder: 1,
                    status: "Under Review",
                    paymentMethod: "Cash",
                    maid: "Amina Mostafa",
                    extras: ["Deep Cleaning Kit", "Ironing"],
                },
                {
                    id: "ORD-9105",
                    userName: "Youssef Adel",
                    userLink: "./index.html",
                    city: "Giza",
                    widget: "Cleaning",
                    category: "Office Service",
                    packageName: "Business Standard",
                    totalPrice: 1750,
                    wallet: 0,
                    deposit: 400,
                    discount: 50,
                    address: "45 Tahrir St, Dokki",
                    createdDate: "2026-04-23 09:35 AM",
                    orderDate: "2026-04-24",
                    arrivalTime: "13:00",
                    queueOrder: 2,
                    status: "Under Review",
                    paymentMethod: "Bank Transfer",
                    maid: "Hoda Ali",
                    extras: ["Window Cleaning"],
                },
                {
                    id: "ORD-9108",
                    userName: "Nour Hassan",
                    userLink: "./index.html",
                    city: "Alexandria",
                    widget: "Maintenance",
                    category: "AC Service",
                    packageName: "Summer Check",
                    totalPrice: 980,
                    wallet: 80,
                    deposit: 100,
                    discount: 0,
                    address: "21 El-Horreya Rd, Roushdy",
                    createdDate: "2026-04-23 10:05 AM",
                    orderDate: "2026-04-26",
                    arrivalTime: "11:00",
                    queueOrder: 3,
                    status: "Under Review",
                    paymentMethod: "E-Wallet",
                    maid: "Amal Fathy",
                    extras: ["Fridge Cleaning"],
                },
                {
                    id: "ORD-9111",
                    userName: "Salma Emad",
                    userLink: "./index.html",
                    city: "Cairo",
                    widget: "Cleaning",
                    category: "Move In Service",
                    packageName: "Gold Package",
                    totalPrice: 2100,
                    wallet: 100,
                    deposit: 250,
                    discount: 75,
                    address: "88 Abbas El Akkad, Nasr City",
                    createdDate: "2026-04-23 10:48 AM",
                    orderDate: "2026-04-24",
                    arrivalTime: "09:30",
                    queueOrder: 4,
                    status: "Under Review",
                    paymentMethod: "Cash",
                    maid: "Eman Yasser",
                    extras: ["Kitchen Sanitizing", "Carpet Refresh"],
                },
                {
                    id: "ORD-9114",
                    userName: "Omar Hany",
                    userLink: "./index.html",
                    city: "Mansoura",
                    widget: "Laundry",
                    category: "Wash & Fold",
                    packageName: "Family Bundle",
                    totalPrice: 620,
                    wallet: 0,
                    deposit: 120,
                    discount: 20,
                    address: "17 El Gomhoria St, Mansoura",
                    createdDate: "2026-04-23 11:22 AM",
                    orderDate: "2026-04-27",
                    arrivalTime: "15:00",
                    queueOrder: 5,
                    status: "Under Review",
                    paymentMethod: "Cash",
                    maid: "Reham Ashraf",
                    extras: [],
                },
                {
                    id: "ORD-9117",
                    userName: "Aya Tarek",
                    userLink: "./index.html",
                    city: "Cairo",
                    widget: "Cleaning",
                    category: "Kitchen Cleaning",
                    packageName: "Express Plus",
                    totalPrice: 860,
                    wallet: 60,
                    deposit: 120,
                    discount: 30,
                    address: "9 El Nozha St, Heliopolis",
                    createdDate: "2026-04-23 12:02 PM",
                    orderDate: "2026-04-25",
                    arrivalTime: "18:00",
                    queueOrder: 6,
                    status: "Under Review",
                    paymentMethod: "E-Wallet",
                    maid: "Aya Tarek",
                    extras: ["Ironing"],
                },
            ];
            orders.forEach((order, index) => {
                if (!order.partner)
                    order.partner =
                        activePartners[index % activePartners.length].name;
                if (!Array.isArray(order.maids))
                    order.maids = order.maid ? [order.maid] : [];
            });

            let activeOrderId = null;
            let activeOrderMode = "edit";

            const formatCurrency = __shared.formatCurrency_1;

            const formatTimeLabel = __shared.formatTimeLabel_2;

            const getStatusClass = __shared.getStatusClass_3;

            const nowLabel = __shared.nowLabel_4;

            function nextOrderId() {
                const max = orders.reduce(
                    (acc, order) =>
                        Math.max(acc, Number(order.id.replace("ORD-", ""))),
                    9100,
                );
                return `ORD-${max + 1}`;
            }

            function populateReferenceLists() {
                const maidOptions =
                    '<option value="">Not Assigned</option>' +
                    activeMaids
                        .map(
                            (maid) =>
                                `<option value="${maid}">${maid}</option>`,
                        )
                        .join("");
                const extrasOptions = activeExtras
                    .map(
                        (extra) => `<option value="${extra}">${extra}</option>`,
                    )
                    .join("");
                const partnerOptions =
                    '<option value="">Not Assigned</option>' +
                    activePartners
                        .map(
                            (partner) =>
                                `<option value="${partner.name}">${partner.name} - ${partner.governorate}</option>`,
                        )
                        .join("");
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
                addCitySelect.innerHTML = Object.keys(serviceCatalog)
                    .map((city) => `<option value="${city}">${city}</option>`)
                    .join("");
            }

            function syncServiceSelectors() {
                const city = addCitySelect.value;
                const widgets = Object.keys(serviceCatalog[city].widgets);
                addWidgetSelect.innerHTML = widgets
                    .map(
                        (widget) =>
                            `<option value="${widget}">${widget}</option>`,
                    )
                    .join("");
                syncCategoryOptions();
            }

            function syncCategoryOptions() {
                const city = addCitySelect.value;
                const widget = addWidgetSelect.value;
                const categories = Object.keys(
                    serviceCatalog[city].widgets[widget].categories,
                );
                addCategorySelect.innerHTML = categories
                    .map(
                        (category) =>
                            `<option value="${category}">${category}</option>`,
                    )
                    .join("");
                syncPackageOptions();
            }

            function syncPackageOptions() {
                const city = addCitySelect.value;
                const widget = addWidgetSelect.value;
                const category = addCategorySelect.value;
                const packages =
                    serviceCatalog[city].widgets[widget].categories[category];
                addPackageSelect.innerHTML = packages
                    .map(
                        (item) =>
                            `<option value="${item.name}" data-price="${item.price}">${item.name}</option>`,
                    )
                    .join("");
                const selected = addPackageSelect.selectedOptions[0];
                if (selected) addTotalPrice.value = selected.dataset.price;
                updateAddModalComputedValues();
            }

            function findCustomer() {
                const query = customerSearchInput.value.trim().toLowerCase();
                const byPhone = customerSearchType.value === "phone";
                const customer = customers.find((item) =>
                    byPhone
                        ? item.phone.toLowerCase() === query
                        : item.userId.toLowerCase() === query,
                );
                addUserName.value = customer
                    ? customer.name
                    : "No matching customer";
            }

            function updateSummaryMetrics() {
                reviewCount.textContent = String(orders.length);
                highestPriceMetric.textContent = formatCurrency(
                    Math.max(...orders.map((order) => order.totalPrice)),
                );
                todayRequestsMetric.textContent = String(
                    orders.filter((order) =>
                        order.createdDate.startsWith("2026-04-23"),
                    ).length,
                );
                earliestArrivalMetric.textContent = formatTimeLabel(
                    [...orders].sort((a, b) =>
                        a.arrivalTime.localeCompare(b.arrivalTime),
                    )[0].arrivalTime,
                );
            }

            function renderRows(items) {
                updateSummaryMetrics();
                if (!items.length) {
                    ordersTableBody.innerHTML =
                        '<tr><td colspan="13" class="empty-state">No orders match the current filters.</td></tr>';
                    return;
                }
                ordersTableBody.innerHTML = items
                    .map(
                        (order) => `
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
  `,
                    )
                    .join("");
            }

            function getFilteredOrders() {
                const searchType = searchTypeSelect.value;
                const textQuery = searchInput.value.trim().toLowerCase();
                const dateQuery = dateSearchInput.value;
                let filtered = orders.filter((order) => {
                    if (searchType === "orderDate")
                        return !dateQuery || order.orderDate === dateQuery;
                    if (!textQuery) return true;
                    if (searchType === "orderId")
                        return order.id.toLowerCase().includes(textQuery);
                    if (searchType === "userName")
                        return order.userName.toLowerCase().includes(textQuery);
                    return true;
                });
                const sortType = sortSelect.value;
                filtered = [...filtered].sort((a, b) => {
                    if (sortType === "priceDesc")
                        return b.totalPrice - a.totalPrice;
                    if (sortType === "queueAsc")
                        return a.queueOrder - b.queueOrder;
                    if (sortType === "dateAsc")
                        return new Date(a.orderDate) - new Date(b.orderDate);
                    if (sortType === "dateDesc")
                        return new Date(b.orderDate) - new Date(a.orderDate);
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
                const finalPrice = Math.max(
                    0,
                    totalPrice - wallet - deposit - discount,
                );
                modalFinalPrice.value = formatCurrency(finalPrice);
                modalBreakdownValue.textContent = `${formatCurrency(totalPrice)} - ${formatCurrency(wallet + deposit + discount)}`;
                modalSelectedAddressValue.textContent =
                    modalAddressSelect.value || "No Address";
                const selectedMaids = Array.from(
                    modalMaidSelect.selectedOptions,
                ).map((option) => option.value);
                modalAssignedMaidValue.textContent = selectedMaids.length
                    ? selectedMaids.join(", ")
                    : "Not Assigned";
                modalAssignedPartnerValue.textContent =
                    modalPartnerSelect.value || "Not Assigned";
                const selectedExtras = Array.from(
                    modalExtrasSelect.selectedOptions,
                ).map((option) => option.value);
                modalExtrasValue.textContent = selectedExtras.length
                    ? selectedExtras.join(", ")
                    : "No Extras";
            }

            function updateAddModalComputedValues() {
                const totalPrice = Number(addTotalPrice.value) || 0;
                const wallet = Number(addWallet.value) || 0;
                const deposit = Number(addDeposit.value) || 0;
                const discount = Number(addDiscount.value) || 0;
                const finalPrice = Math.max(
                    0,
                    totalPrice - wallet - deposit - discount,
                );
                addFinalPrice.value = formatCurrency(finalPrice);
                addBreakdownValue.textContent = `${formatCurrency(totalPrice)} - ${formatCurrency(wallet + deposit + discount)}`;
                const selectedMaids = Array.from(
                    addMaidSelect.selectedOptions,
                ).map((option) => option.value);
                addAssignedMaidValue.textContent = selectedMaids.length
                    ? selectedMaids.join(", ")
                    : "Not Assigned";
                addAssignedPartnerValue.textContent =
                    addPartnerSelect.value || "Not Assigned";
                const selectedExtras = Array.from(
                    addExtrasSelect.selectedOptions,
                ).map((option) => option.value);
                addExtrasValue.textContent = selectedExtras.length
                    ? selectedExtras.join(", ")
                    : "No Extras";
            }

            function setOrderModalMode(mode) {
                const isView = mode === "view";
                editOrderTitle.textContent = isView
                    ? "View Order"
                    : "Edit Order";
                const subtitle =
                    editOrderModal.querySelector(".modal-subtitle");
                if (subtitle)
                    subtitle.textContent = isView
                        ? "Read-only order details. No content can be changed in View mode."
                        : "Update booking details, customer address, pricing, assignment, and operational status.";
                editOrderForm.classList.toggle("view-only", isView);
                editOrderForm
                    .querySelectorAll("input, select")
                    .forEach((field) => {
                        field.disabled = isView;
                    });
                const saveButton = editOrderForm.querySelector(
                    'button[type="submit"]',
                );
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
                const savedAddresses =
                    customerAddressBook[order.userName] || [];
                const availableAddresses = [
                    ...new Set(
                        [order.address, ...savedAddresses].filter(Boolean),
                    ),
                ];
                modalAddressSelect.innerHTML = availableAddresses
                    .map(
                        (address) =>
                            `<option value="${address}">${address}</option>`,
                    )
                    .join("");
                modalAddressSelect.value =
                    order.address || availableAddresses[0] || "";
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
                    option.selected = (order.maids || []).includes(
                        option.value,
                    );
                });
                modalPartnerSelect.value = order.partner || "";
                Array.from(modalExtrasSelect.options).forEach((option) => {
                    option.selected = order.extras.includes(option.value);
                });
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
                addStatus.value = "Under Review";
                addPaymentMethod.value = "Cash";
                Array.from(addMaidSelect.options).forEach((option) => {
                    option.selected = false;
                });
                addPartnerSelect.value = "";
                Array.from(addExtrasSelect.options).forEach((option) => {
                    option.selected = false;
                });
                addTotalPrice.value =
                    addPackageSelect.selectedOptions[0]?.dataset.price || "0";
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
                order.maids = Array.from(modalMaidSelect.selectedOptions).map(
                    (option) => option.value,
                );
                order.maid = order.maids[0] || "";
                order.partner = modalPartnerSelect.value;
                order.extras = Array.from(
                    modalExtrasSelect.selectedOptions,
                ).map((option) => option.value);
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
                    maids: Array.from(addMaidSelect.selectedOptions).map(
                        (option) => option.value,
                    ),
                    maid: addMaidSelect.selectedOptions[0]?.value || "",
                    partner: addPartnerSelect.value,
                    extras: Array.from(addExtrasSelect.selectedOptions).map(
                        (option) => option.value,
                    ),
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

            [
                modalTotalPrice,
                modalWallet,
                modalDeposit,
                modalDiscount,
                modalAddressSelect,
                modalMaidSelect,
                modalPartnerSelect,
                modalExtrasSelect,
            ].forEach((field) => {
                field.addEventListener("input", updateModalComputedValues);
                field.addEventListener("change", updateModalComputedValues);
            });

            [
                addTotalPrice,
                addWallet,
                addDeposit,
                addDiscount,
                addMaidSelect,
                addPartnerSelect,
                addExtrasSelect,
            ].forEach((field) => {
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
                    const index = orders.findIndex(
                        (order) => order.id === orderId,
                    );
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
                    if (!editOrderModal.classList.contains("hidden"))
                        closeEditModal();
                    if (!addOrderModal.classList.contains("hidden"))
                        closeAddModal();
                }
            });

            populateReferenceLists();
            populateCityOptions();
            syncServiceSelectors();
            syncSearchMode();
        },
        "user-list": () => {
            const usersPage = document.querySelector(".users-page");
            const profileUrl = usersPage?.dataset.profileUrl || "./index.html";
            const messageUrl =
                usersPage?.dataset.messageUrl || "./send-message.html";
            const users = [
                {
                    id: "#USR-102938",
                    name: "mariam ashraf awad",
                    phone: "+20 109 555 0198",
                    additionalNumber: "+20 122 800 4410",
                    email: "mariam.ashraf.awad@example.com",
                    city: "Cairo",
                    address: "12 Nile Corniche, Maadi, Cairo",
                    wallet: "EGP 24,380",
                    type: "User",
                    active: "Active",
                    ban: "Not Banned",
                    restricted: "Open Access",
                    createdDate: "2024-01-18 10:42 AM",
                },
                {
                    id: "#USR-102954",
                    name: "Youssef Adel",
                    phone: "+20 101 444 2290",
                    additionalNumber: "+20 114 901 3321",
                    email: "y.adel@example.com",
                    city: "Alexandria",
                    address: "28 Fouad Street, Alexandria",
                    wallet: "EGP 8,940",
                    type: "User",
                    active: "Inactive",
                    ban: "Not Banned",
                    restricted: "Orders Only",
                    createdDate: "2024-03-02 01:20 PM",
                },
                {
                    id: "#USR-103004",
                    name: "Nour Hassan",
                    phone: "+20 112 760 1903",
                    additionalNumber: "+20 127 665 1700",
                    email: "n.hassan@example.com",
                    city: "Giza",
                    address: "7 El Tahrir Street, Dokki, Giza",
                    wallet: "EGP 17,120",
                    type: "User",
                    active: "Active",
                    ban: "Temporary Ban",
                    restricted: "Wallet Blocked",
                    createdDate: "2024-05-14 09:05 AM",
                },
                {
                    id: "#USR-103121",
                    name: "Karim Emad",
                    phone: "+20 115 903 7744",
                    additionalNumber: "+20 120 333 4112",
                    email: "karim.emad@example.com",
                    city: "Mansoura",
                    address: "34 El Gomhoria Road, Mansoura",
                    wallet: "EGP 2,150",
                    type: "User",
                    active: "Active",
                    ban: "Not Banned",
                    restricted: "Open Access",
                    createdDate: "2024-06-09 04:47 PM",
                },
                {
                    id: "#USR-103177",
                    name: "Salma Hany",
                    phone: "+20 100 873 2190",
                    additionalNumber: "+20 123 885 0091",
                    email: "salma.hany@example.com",
                    city: "Tanta",
                    address: "16 El Bahr Street, Tanta",
                    wallet: "EGP 13,500",
                    type: "User",
                    active: "Inactive",
                    ban: "Permanent Ban",
                    restricted: "Messaging Blocked",
                    createdDate: "2024-07-21 11:15 AM",
                },
            ];

            const userTableBody = document.getElementById("userTableBody");
            const selectAllCheckbox =
                document.getElementById("selectAllCheckbox");
            const clearSelectionBtn =
                document.getElementById("clearSelectionBtn");
            const selectionSummary =
                document.getElementById("selectionSummary");
            const bulkButtons = document.querySelectorAll("[data-bulk-action]");
            const userListModal = document.getElementById("userListModal");
            const userListModalTitle =
                document.getElementById("userListModalTitle");
            const userListModalSubtitle = document.getElementById(
                "userListModalSubtitle",
            );
            const userListModalContent = document.getElementById(
                "userListModalContent",
            );
            const closeUserListModalBtn = document.getElementById(
                "closeUserListModalBtn",
            );
            const closeUserListModalFooterBtn = document.getElementById(
                "closeUserListModalFooterBtn",
            );
            const userListToast = document.getElementById("userListToast");
            const userListToastMessage = document.getElementById(
                "userListToastMessage",
            );

            let selectedUsers = [];
            let pendingCommunication = null;
            let toastTimeoutId = null;

            const escapeHtml = __shared.escapeHtml_6;

            function showToast(message) {
                if (!userListToast || !userListToastMessage) {
                    return;
                }

                userListToastMessage.textContent = message;
                userListToast.classList.remove("hidden");

                if (toastTimeoutId) {
                    window.clearTimeout(toastTimeoutId);
                }

                toastTimeoutId = window.setTimeout(() => {
                    userListToast.classList.add("hidden");
                }, 2800);
            }

            function openModal(title, subtitle, content) {
                if (
                    !userListModal ||
                    !userListModalTitle ||
                    !userListModalSubtitle ||
                    !userListModalContent
                ) {
                    return;
                }

                userListModalTitle.textContent = title;
                userListModalSubtitle.textContent = subtitle;
                userListModalContent.innerHTML = content;
                userListModal.classList.remove("hidden");
            }

            function resetModalFooter() {
                if (!closeUserListModalFooterBtn) {
                    return;
                }

                closeUserListModalFooterBtn.textContent = "Close";
                closeUserListModalFooterBtn.classList.remove("primary-action");
            }

            function closeModal() {
                userListModal?.classList.add("hidden");
                pendingCommunication = null;
                resetModalFooter();
            }

            function getActiveClass(value) {
                return value === "Active" ? "active" : "inactive";
            }

            function getBanClass(value) {
                return value === "Not Banned" ? "open" : "banned";
            }

            function getRestrictedClass(value) {
                return value === "Open Access" ? "open" : "restricted";
            }

            function getUserById(userId) {
                return users.find((user) => user.id === userId);
            }

            function getSelectedUserRecords() {
                return users.filter((user) => selectedUsers.includes(user.id));
            }

            function getCommunicationConfig(action) {
                const configs = {
                    push: {
                        title: "Send Push Notification",
                        channel: "Push Notification",
                        subtitle:
                            "Write and send an in-app push notification to the selected customers.",
                        subjectLabel: "Notification Title",
                        bodyLabel: "Notification Message",
                        subjectPlaceholder:
                            "Example: Your booking update is ready",
                        bodyPlaceholder:
                            "Example: Hi, we have an update about your latest request.",
                        confirmLabel: "Send Push",
                        toastLabel: "Push notification sent",
                    },
                    email: {
                        title: "Send Email Campaign",
                        channel: "Email",
                        subtitle:
                            "Write and send an email to the selected customer email addresses.",
                        subjectLabel: "Email Subject",
                        bodyLabel: "Email Body",
                        subjectPlaceholder:
                            "Example: Important update from Tarwiqa",
                        bodyPlaceholder:
                            "Example: Hello, here are the details we wanted to share with you.",
                        confirmLabel: "Send Email",
                        toastLabel: "Email sent",
                    },
                    whatsapp: {
                        title: "Send WhatsApp Message",
                        channel: "WhatsApp",
                        subtitle:
                            "Write and send a WhatsApp message to the selected customer phone numbers.",
                        subjectLabel: "Message Label",
                        bodyLabel: "WhatsApp Message",
                        subjectPlaceholder: "Example: Order Update",
                        bodyPlaceholder:
                            "Example: Hello, your request has been updated. Reply here if you need support.",
                        confirmLabel: "Send WhatsApp",
                        toastLabel: "WhatsApp message sent",
                    },
                };

                return configs[action] || configs.push;
            }

            function buildRecipientList(records, action) {
                return records
                    .map((user) => {
                        const destination =
                            action === "email" ? user.email : user.phone;
                        return `<li><strong>${escapeHtml(user.name)}</strong><span>${escapeHtml(destination)}</span></li>`;
                    })
                    .join("");
            }

            function renderUsers() {
                userTableBody.innerHTML = users
                    .map(
                        (user) => `
        <tr data-user-id="${escapeHtml(user.id)}" class="${selectedUsers.includes(user.id) ? "selected" : ""}">
          <td>
            <input class="row-checkbox" type="checkbox" data-user-id="${escapeHtml(user.id)}" ${selectedUsers.includes(user.id) ? "checked" : ""
                            } />
          </td>
          <td>${escapeHtml(user.id)}</td>
          <td>
            <div class="user-name">
              <button class="user-profile-link" type="button" data-open-profile="${escapeHtml(user.id)}">${escapeHtml(user.name)}</button>
              <small>${escapeHtml(user.type)} Profile</small>
            </div>
          </td>
          <td>${escapeHtml(user.phone)}</td>
          <td>${escapeHtml(user.city)}</td>
          <td><span class="status-pill ${getActiveClass(user.active)}">${escapeHtml(user.active)}</span></td>
          <td><span class="status-pill ${getBanClass(user.ban)}">${escapeHtml(user.ban)}</span></td>
          <td><span class="status-pill ${getRestrictedClass(user.restricted)}">${escapeHtml(user.restricted)}</span></td>
          <td>${escapeHtml(user.createdDate)}</td>
          <td class="actions-cell">
            <div class="row-actions">
              <button class="row-action view" type="button" data-row-action="view" data-user-id="${escapeHtml(user.id)}">View</button>
              <button class="row-action ban" type="button" data-row-action="ban" data-user-id="${escapeHtml(user.id)}">Ban</button>
              <button class="row-action restrict" type="button" data-row-action="restrict" data-user-id="${escapeHtml(user.id)}">Restrict</button>
              <button class="row-action message" type="button" data-row-action="message" data-user-id="${escapeHtml(user.id)}">Message</button>
              <button class="row-action edit" type="button" data-row-action="edit" data-user-id="${escapeHtml(user.id)}">Edit</button>
            </div>
          </td>
        </tr>
      `,
                    )
                    .join("");
            }

            function updateBulkActions() {
                const count = selectedUsers.length;
                const hasSelection = count > 0;

                selectionSummary.textContent = hasSelection
                    ? `${count} users selected`
                    : "0 users selected";
                clearSelectionBtn.disabled = !hasSelection;

                bulkButtons.forEach((button) => {
                    const labelMap = {
                        push: "Send Push",
                        email: "Send Email",
                        whatsapp: "WhatsApp",
                    };

                    button.disabled = !hasSelection;
                    button.textContent = `${labelMap[button.dataset.bulkAction]} (${count})`;
                });

                selectAllCheckbox.checked =
                    count === users.length && users.length > 0;
                selectAllCheckbox.indeterminate =
                    count > 0 && count < users.length;
            }

            function bindTableInteractions() {
                document
                    .querySelectorAll(".row-checkbox")
                    .forEach((checkbox) => {
                        checkbox.addEventListener("change", (event) => {
                            const userId = event.target.dataset.userId;

                            if (event.target.checked) {
                                selectedUsers = [
                                    ...new Set([...selectedUsers, userId]),
                                ];
                            } else {
                                selectedUsers = selectedUsers.filter(
                                    (id) => id !== userId,
                                );
                            }

                            renderUsers();
                            updateBulkActions();
                            bindTableInteractions();
                        });
                    });

                document
                    .querySelectorAll("[data-row-action]")
                    .forEach((button) => {
                        button.addEventListener("click", (event) => {
                            const action =
                                event.currentTarget.dataset.rowAction;
                            const userId = event.currentTarget.dataset.userId;
                            const user = getUserById(userId);

                            if (!user) {
                                return;
                            }

                            if (action === "view") {
                                window.location.href = `${profileUrl}?userId=${encodeURIComponent(user.id)}`;
                                return;
                            }

                            if (action === "message") {
                                window.location.href = `${messageUrl}?userId=${encodeURIComponent(user.id)}`;
                                return;
                            }

                            if (action === "ban") {
                                user.ban =
                                    user.ban === "Not Banned"
                                        ? "Temporary Ban"
                                        : "Not Banned";
                                renderUsers();
                                updateBulkActions();
                                bindTableInteractions();
                                showToast(
                                    `${user.name} ban status changed to ${user.ban}.`,
                                );
                                return;
                            }

                            if (action === "restrict") {
                                user.restricted =
                                    user.restricted === "Open Access"
                                        ? "Messaging Blocked"
                                        : "Open Access";
                                renderUsers();
                                updateBulkActions();
                                bindTableInteractions();
                                showToast(
                                    `${user.name} restriction changed to ${user.restricted}.`,
                                );
                                return;
                            }

                            if (action === "edit") {
                                openModal(
                                    `Edit ${user.name}`,
                                    "Review this user profile data before editing.",
                                    `<p><strong>ID:</strong> ${escapeHtml(user.id)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(user.phone)}</p>
          <p><strong>Additional Number:</strong> ${escapeHtml(user.additionalNumber)}</p>
          <p><strong>Email:</strong> ${escapeHtml(user.email)}</p>
          <p><strong>City:</strong> ${escapeHtml(user.city)}</p>
          <p><strong>Address:</strong> ${escapeHtml(user.address)}</p>
          <p><strong>Wallet:</strong> ${escapeHtml(user.wallet)}</p>
          <p><strong>Status:</strong> ${escapeHtml(user.active)} / ${escapeHtml(user.ban)} / ${escapeHtml(user.restricted)}</p>`,
                                );
                            }
                        });
                    });

                document
                    .querySelectorAll("[data-open-profile]")
                    .forEach((button) => {
                        button.addEventListener("click", () => {
                            window.location.href = `${profileUrl}?userId=${encodeURIComponent(button.dataset.openProfile)}`;
                        });
                    });
            }

            function openCommunicationModal(action) {
                const recipients = getSelectedUserRecords();

                if (!recipients.length) {
                    showToast("Select at least one customer first.");
                    return;
                }

                const config = getCommunicationConfig(action);
                pendingCommunication = { action, recipients };

                openModal(
                    config.title,
                    config.subtitle,
                    `<div class="communication-form">
      <div class="recipient-summary">
        <p><strong>Channel:</strong> ${escapeHtml(config.channel)}</p>
        <p><strong>Recipients:</strong> ${recipients.length} customer${recipients.length === 1 ? "" : "s"}</p>
        <ul class="recipient-list">${buildRecipientList(recipients, action)}</ul>
      </div>

      <label class="communication-field">
        <span>${escapeHtml(config.subjectLabel)}</span>
        <input id="communicationSubject" type="text" placeholder="${escapeHtml(config.subjectPlaceholder)}" />
      </label>

      <label class="communication-field wide">
        <span>${escapeHtml(config.bodyLabel)}</span>
        <textarea id="communicationBody" rows="5" placeholder="${escapeHtml(config.bodyPlaceholder)}"></textarea>
      </label>
    </div>`,
                );

                closeUserListModalFooterBtn.textContent = config.confirmLabel;
                closeUserListModalFooterBtn.classList.add("primary-action");
            }

            function sendPendingCommunication() {
                if (!pendingCommunication) {
                    closeModal();
                    return;
                }

                const config = getCommunicationConfig(
                    pendingCommunication.action,
                );
                const subject = document
                    .getElementById("communicationSubject")
                    ?.value.trim();
                const body = document
                    .getElementById("communicationBody")
                    ?.value.trim();

                if (!subject || !body) {
                    showToast("Add a title and message before sending.");
                    return;
                }

                const count = pendingCommunication.recipients.length;
                const destinationLabel =
                    pendingCommunication.action === "email"
                        ? "email addresses"
                        : "phone numbers";
                const sentDate = new Date();
                const sentAt = sentDate.toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                });

                userListModalTitle.textContent = `${config.channel} Sent`;
                userListModalSubtitle.textContent = `Sent to ${count} customer${count === 1 ? "" : "s"} on ${sentAt}.`;
                userListModalContent.innerHTML = `<p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
    <p><strong>Message:</strong> ${escapeHtml(body)}</p>
    <p><strong>Recipients:</strong> ${count} ${escapeHtml(destinationLabel)}</p>
    <p><strong>Send Date & Time:</strong> ${escapeHtml(sentAt)}</p>
    <p><strong>Status:</strong> Delivery request created successfully.</p>`;

                pendingCommunication = null;
                resetModalFooter();
                showToast(
                    `${config.toastLabel} to ${count} customer${count === 1 ? "" : "s"}.`,
                );
            }

            selectAllCheckbox.addEventListener("change", (event) => {
                selectedUsers = event.target.checked
                    ? users.map((user) => user.id)
                    : [];
                renderUsers();
                updateBulkActions();
                bindTableInteractions();
            });

            clearSelectionBtn.addEventListener("click", () => {
                selectedUsers = [];
                renderUsers();
                updateBulkActions();
                bindTableInteractions();
                showToast("Selection cleared.");
            });

            bulkButtons.forEach((button) => {
                button.addEventListener("click", () => {
                    openCommunicationModal(button.dataset.bulkAction);
                });
            });

            closeUserListModalBtn?.addEventListener("click", closeModal);
            closeUserListModalFooterBtn?.addEventListener("click", () => {
                if (pendingCommunication) {
                    sendPendingCommunication();
                    return;
                }

                closeModal();
            });

            userListModal?.addEventListener("click", (event) => {
                if (event.target === userListModal) {
                    closeModal();
                }
            });

            renderUsers();
            updateBulkActions();
            bindTableInteractions();
        },
        "waiting-list": () => {
            const ordersDropdownBtn =
                document.getElementById("ordersDropdownBtn");
            const ordersDropdownContainer =
                ordersDropdownBtn?.closest(".dropdown-block");
            const ordersTableBody = document.getElementById("ordersTableBody");
            const searchTypeSelect =
                document.getElementById("searchTypeSelect");
            const searchInput = document.getElementById("searchInput");
            const dateSearchInput = document.getElementById("dateSearchInput");
            const dateSearchField = document.getElementById("dateSearchField");
            const sortSelect = document.getElementById("sortSelect");
            const clearFiltersBtn = document.getElementById("clearFiltersBtn");
            const openAddOrderBtn = document.getElementById("openAddOrderBtn");
            const reviewCount = document.getElementById("reviewCount");
            const highestPriceMetric =
                document.getElementById("highestPriceMetric");
            const todayRequestsMetric = document.getElementById(
                "todayRequestsMetric",
            );
            const earliestArrivalMetric = document.getElementById(
                "earliestArrivalMetric",
            );

            const editOrderModal = document.getElementById("editOrderModal");
            const editOrderForm = document.getElementById("editOrderForm");
            const editOrderTitle = document.getElementById("editOrderTitle");
            const closeEditModalBtn =
                document.getElementById("closeEditModalBtn");
            const cancelEditBtn = document.getElementById("cancelEditBtn");
            const modalOrderId = document.getElementById("modalOrderId");
            const modalUserName = document.getElementById("modalUserName");
            const modalCity = document.getElementById("modalCity");
            const modalAddressSelect =
                document.getElementById("modalAddressSelect");
            const modalCreatedDate =
                document.getElementById("modalCreatedDate");
            const modalTotalPrice = document.getElementById("modalTotalPrice");
            const modalWallet = document.getElementById("modalWallet");
            const modalDeposit = document.getElementById("modalDeposit");
            const modalDiscount = document.getElementById("modalDiscount");
            const modalFinalPrice = document.getElementById("modalFinalPrice");
            const modalStatus = document.getElementById("modalStatus");
            const modalPaymentMethod =
                document.getElementById("modalPaymentMethod");
            const modalOrderDate = document.getElementById("modalOrderDate");
            const modalArrivalTime =
                document.getElementById("modalArrivalTime");
            const modalMaidSelect = document.getElementById("modalMaidSelect");
            const modalPartnerSelect =
                document.getElementById("modalPartnerSelect");
            const modalExtrasSelect =
                document.getElementById("modalExtrasSelect");
            const modalBreakdownValue = document.getElementById(
                "modalBreakdownValue",
            );
            const modalSelectedAddressValue = document.getElementById(
                "modalSelectedAddressValue",
            );
            const modalAssignedMaidValue = document.getElementById(
                "modalAssignedMaidValue",
            );
            const modalAssignedPartnerValue = document.getElementById(
                "modalAssignedPartnerValue",
            );
            const modalExtrasValue =
                document.getElementById("modalExtrasValue");

            const addOrderModal = document.getElementById("addOrderModal");
            const addOrderForm = document.getElementById("addOrderForm");
            const closeAddModalBtn =
                document.getElementById("closeAddModalBtn");
            const cancelAddBtn = document.getElementById("cancelAddBtn");
            const addOrderId = document.getElementById("addOrderId");
            const customerSearchType =
                document.getElementById("customerSearchType");
            const customerSearchInput = document.getElementById(
                "customerSearchInput",
            );
            const addUserName = document.getElementById("addUserName");
            const addCitySelect = document.getElementById("addCitySelect");
            const addWidgetSelect = document.getElementById("addWidgetSelect");
            const addCategorySelect =
                document.getElementById("addCategorySelect");
            const addPackageSelect =
                document.getElementById("addPackageSelect");
            const addAddressInput = document.getElementById("addAddressInput");
            const addCreatedDate = document.getElementById("addCreatedDate");
            const addTotalPrice = document.getElementById("addTotalPrice");
            const addWallet = document.getElementById("addWallet");
            const addDeposit = document.getElementById("addDeposit");
            const addDiscount = document.getElementById("addDiscount");
            const addFinalPrice = document.getElementById("addFinalPrice");
            const addStatus = document.getElementById("addStatus");
            const addPaymentMethod =
                document.getElementById("addPaymentMethod");
            const addOrderDate = document.getElementById("addOrderDate");
            const addArrivalTime = document.getElementById("addArrivalTime");
            const addMaidSelect = document.getElementById("addMaidSelect");
            const addPartnerSelect =
                document.getElementById("addPartnerSelect");
            const addExtrasSelect = document.getElementById("addExtrasSelect");
            const addBreakdownValue =
                document.getElementById("addBreakdownValue");
            const addAssignedMaidValue = document.getElementById(
                "addAssignedMaidValue",
            );
            const addAssignedPartnerValue = document.getElementById(
                "addAssignedPartnerValue",
            );
            const addExtrasValue = document.getElementById("addExtrasValue");

            const activeMaids = [
                "Amina Mostafa",
                "Hoda Ali",
                "Amal Fathy",
                "Eman Yasser",
                "Reham Ashraf",
                "Aya Tarek",
            ];
            const activePartners = [
                { name: "Mona Adel", governorate: "Cairo" },
                { name: "Karim Samir", governorate: "Cairo" },
                { name: "Nour Hassan", governorate: "Cairo" },
                { name: "Ahmed Fathy", governorate: "Giza" },
                { name: "Salma Youssef", governorate: "Cairo" },
            ];
            const defaultExtras = [
                "Deep Cleaning Kit",
                "Ironing",
                "Window Cleaning",
                "Kitchen Sanitizing",
                "Carpet Refresh",
                "Fridge Cleaning",
            ];
            const temporarilyDeletedExtras = (() => {
                try {
                    const stored = JSON.parse(
                        localStorage.getItem("temporarilyDeletedExtras"),
                    );
                    return Array.isArray(stored) ? stored : [];
                } catch (error) {
                    return [];
                }
            })();
            const customExtras = (() => {
                try {
                    const stored = JSON.parse(
                        localStorage.getItem("customExtrasCatalog"),
                    );
                    return Array.isArray(stored)
                        ? stored.map((extra) => extra.name).filter(Boolean)
                        : [];
                } catch (error) {
                    return [];
                }
            })();
            const activeExtras = [
                ...new Set([...defaultExtras, ...customExtras]),
            ].filter((extra) => !temporarilyDeletedExtras.includes(extra));

            const customers = [
                {
                    userId: "#USR-102938",
                    phone: "+201095550198",
                    name: "Mariam Kamal",
                },
                {
                    userId: "#USR-204511",
                    phone: "+201113450011",
                    name: "Youssef Adel",
                },
                {
                    userId: "#USR-318900",
                    phone: "+201225900144",
                    name: "Nour Hassan",
                },
                {
                    userId: "#USR-442300",
                    phone: "+201066120077",
                    name: "Salma Emad",
                },
                {
                    userId: "#USR-559910",
                    phone: "+201288700035",
                    name: "Omar Hany",
                },
                {
                    userId: "#USR-661104",
                    phone: "+201027700551",
                    name: "Aya Tarek",
                },
            ];

            const customerAddressBook = {
                "Mariam Kamal": [
                    "12 Nile Corniche, Maadi",
                    "34 Road 9, Maadi",
                    "15 New Cairo First Settlement",
                ],
                "Youssef Adel": [
                    "45 Tahrir St, Dokki",
                    "18 Lebanon Square, Mohandessin",
                    "7 Sheikh Zayed District 2",
                ],
                "Nour Hassan": [
                    "21 El-Horreya Rd, Roushdy",
                    "14 Smouha Square, Alexandria",
                    "8 Sidi Gaber Road",
                ],
                "Salma Emad": [
                    "88 Abbas El Akkad, Nasr City",
                    "22 Makram Ebeid, Nasr City",
                    "5 Heliopolis Square",
                ],
                "Omar Hany": [
                    "17 El Gomhoria St, Mansoura",
                    "40 El Mashaya, Mansoura",
                ],
                "Aya Tarek": [
                    "9 El Nozha St, Heliopolis",
                    "13 El Merghany St, Heliopolis",
                    "6 New Cairo Fifth Settlement",
                ],
            };
            const serviceCatalog = {
                Cairo: {
                    widgets: {
                        Cleaning: {
                            categories: {
                                "Home Cleaning": [
                                    { name: "Premium Deep Clean", price: 2400 },
                                    { name: "Express Plus", price: 860 },
                                ],
                                "Move In Service": [
                                    { name: "Gold Package", price: 2100 },
                                    { name: "Silver Package", price: 1650 },
                                ],
                                "Kitchen Cleaning": [
                                    { name: "Kitchen Pro", price: 990 },
                                    { name: "Express Plus", price: 860 },
                                ],
                            },
                        },
                        Maintenance: {
                            categories: {
                                "AC Service": [
                                    { name: "Summer Check", price: 980 },
                                    { name: "Premium AC Care", price: 1450 },
                                ],
                            },
                        },
                    },
                },
                Giza: {
                    widgets: {
                        Cleaning: {
                            categories: {
                                "Office Service": [
                                    { name: "Business Standard", price: 1750 },
                                    { name: "Business Premium", price: 2400 },
                                ],
                            },
                        },
                        Laundry: {
                            categories: {
                                "Wash & Fold": [
                                    { name: "Family Bundle", price: 620 },
                                    { name: "Large Bundle", price: 880 },
                                ],
                            },
                        },
                    },
                },
                Alexandria: {
                    widgets: {
                        Maintenance: {
                            categories: {
                                "AC Service": [
                                    { name: "Summer Check", price: 980 },
                                    { name: "Coastal Care", price: 1320 },
                                ],
                            },
                        },
                        Cleaning: {
                            categories: {
                                "Home Cleaning": [
                                    { name: "Sea Breeze Package", price: 1540 },
                                    { name: "Premium Deep Clean", price: 2290 },
                                ],
                            },
                        },
                    },
                },
                Mansoura: {
                    widgets: {
                        Laundry: {
                            categories: {
                                "Wash & Fold": [
                                    { name: "Family Bundle", price: 620 },
                                    { name: "Quick Laundry", price: 420 },
                                ],
                            },
                        },
                    },
                },
            };

            const orders = [
                {
                    id: "ORD-9102",
                    userName: "Mariam Kamal",
                    userLink: "./index.html",
                    city: "Cairo",
                    widget: "Cleaning",
                    category: "Home Cleaning",
                    packageName: "Premium Deep Clean",
                    totalPrice: 2400,
                    wallet: 250,
                    deposit: 300,
                    discount: 100,
                    address: "12 Nile Corniche, Maadi",
                    createdDate: "2026-04-23 09:10 AM",
                    orderDate: "2026-04-25",
                    arrivalTime: "08:00",
                    queueOrder: 1,
                    status: "Waiting List",
                    paymentMethod: "Cash",
                    maid: "Amina Mostafa",
                    extras: ["Deep Cleaning Kit", "Ironing"],
                },
                {
                    id: "ORD-9105",
                    userName: "Youssef Adel",
                    userLink: "./index.html",
                    city: "Giza",
                    widget: "Cleaning",
                    category: "Office Service",
                    packageName: "Business Standard",
                    totalPrice: 1750,
                    wallet: 0,
                    deposit: 400,
                    discount: 50,
                    address: "45 Tahrir St, Dokki",
                    createdDate: "2026-04-23 09:35 AM",
                    orderDate: "2026-04-24",
                    arrivalTime: "13:00",
                    queueOrder: 2,
                    status: "Waiting List",
                    paymentMethod: "Bank Transfer",
                    maid: "Hoda Ali",
                    extras: ["Window Cleaning"],
                },
                {
                    id: "ORD-9108",
                    userName: "Nour Hassan",
                    userLink: "./index.html",
                    city: "Alexandria",
                    widget: "Maintenance",
                    category: "AC Service",
                    packageName: "Summer Check",
                    totalPrice: 980,
                    wallet: 80,
                    deposit: 100,
                    discount: 0,
                    address: "21 El-Horreya Rd, Roushdy",
                    createdDate: "2026-04-23 10:05 AM",
                    orderDate: "2026-04-26",
                    arrivalTime: "11:00",
                    queueOrder: 3,
                    status: "Waiting List",
                    paymentMethod: "E-Wallet",
                    maid: "Amal Fathy",
                    extras: ["Fridge Cleaning"],
                },
                {
                    id: "ORD-9111",
                    userName: "Salma Emad",
                    userLink: "./index.html",
                    city: "Cairo",
                    widget: "Cleaning",
                    category: "Move In Service",
                    packageName: "Gold Package",
                    totalPrice: 2100,
                    wallet: 100,
                    deposit: 250,
                    discount: 75,
                    address: "88 Abbas El Akkad, Nasr City",
                    createdDate: "2026-04-23 10:48 AM",
                    orderDate: "2026-04-24",
                    arrivalTime: "09:30",
                    queueOrder: 4,
                    status: "Waiting List",
                    paymentMethod: "Cash",
                    maid: "Eman Yasser",
                    extras: ["Kitchen Sanitizing", "Carpet Refresh"],
                },
                {
                    id: "ORD-9114",
                    userName: "Omar Hany",
                    userLink: "./index.html",
                    city: "Mansoura",
                    widget: "Laundry",
                    category: "Wash & Fold",
                    packageName: "Family Bundle",
                    totalPrice: 620,
                    wallet: 0,
                    deposit: 120,
                    discount: 20,
                    address: "17 El Gomhoria St, Mansoura",
                    createdDate: "2026-04-23 11:22 AM",
                    orderDate: "2026-04-27",
                    arrivalTime: "15:00",
                    queueOrder: 5,
                    status: "Waiting List",
                    paymentMethod: "Cash",
                    maid: "Reham Ashraf",
                    extras: [],
                },
                {
                    id: "ORD-9117",
                    userName: "Aya Tarek",
                    userLink: "./index.html",
                    city: "Cairo",
                    widget: "Cleaning",
                    category: "Kitchen Cleaning",
                    packageName: "Express Plus",
                    totalPrice: 860,
                    wallet: 60,
                    deposit: 120,
                    discount: 30,
                    address: "9 El Nozha St, Heliopolis",
                    createdDate: "2026-04-23 12:02 PM",
                    orderDate: "2026-04-25",
                    arrivalTime: "18:00",
                    queueOrder: 6,
                    status: "Waiting List",
                    paymentMethod: "E-Wallet",
                    maid: "Aya Tarek",
                    extras: ["Ironing"],
                },
            ];
            orders.forEach((order, index) => {
                if (!order.partner)
                    order.partner =
                        activePartners[index % activePartners.length].name;
                if (!Array.isArray(order.maids))
                    order.maids = order.maid ? [order.maid] : [];
            });

            let activeOrderId = null;
            let activeOrderMode = "edit";

            const formatCurrency = __shared.formatCurrency_1;

            const formatTimeLabel = __shared.formatTimeLabel_2;

            const getStatusClass = __shared.getStatusClass_3;

            const nowLabel = __shared.nowLabel_4;

            function nextOrderId() {
                const max = orders.reduce(
                    (acc, order) =>
                        Math.max(acc, Number(order.id.replace("ORD-", ""))),
                    9100,
                );
                return `ORD-${max + 1}`;
            }

            function populateReferenceLists() {
                const maidOptions =
                    '<option value="">Not Assigned</option>' +
                    activeMaids
                        .map(
                            (maid) =>
                                `<option value="${maid}">${maid}</option>`,
                        )
                        .join("");
                const extrasOptions = activeExtras
                    .map(
                        (extra) => `<option value="${extra}">${extra}</option>`,
                    )
                    .join("");
                const partnerOptions =
                    '<option value="">Not Assigned</option>' +
                    activePartners
                        .map(
                            (partner) =>
                                `<option value="${partner.name}">${partner.name} - ${partner.governorate}</option>`,
                        )
                        .join("");
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
                addCitySelect.innerHTML = Object.keys(serviceCatalog)
                    .map((city) => `<option value="${city}">${city}</option>`)
                    .join("");
            }

            function syncServiceSelectors() {
                const city = addCitySelect.value;
                const widgets = Object.keys(serviceCatalog[city].widgets);
                addWidgetSelect.innerHTML = widgets
                    .map(
                        (widget) =>
                            `<option value="${widget}">${widget}</option>`,
                    )
                    .join("");
                syncCategoryOptions();
            }

            function syncCategoryOptions() {
                const city = addCitySelect.value;
                const widget = addWidgetSelect.value;
                const categories = Object.keys(
                    serviceCatalog[city].widgets[widget].categories,
                );
                addCategorySelect.innerHTML = categories
                    .map(
                        (category) =>
                            `<option value="${category}">${category}</option>`,
                    )
                    .join("");
                syncPackageOptions();
            }

            function syncPackageOptions() {
                const city = addCitySelect.value;
                const widget = addWidgetSelect.value;
                const category = addCategorySelect.value;
                const packages =
                    serviceCatalog[city].widgets[widget].categories[category];
                addPackageSelect.innerHTML = packages
                    .map(
                        (item) =>
                            `<option value="${item.name}" data-price="${item.price}">${item.name}</option>`,
                    )
                    .join("");
                const selected = addPackageSelect.selectedOptions[0];
                if (selected) addTotalPrice.value = selected.dataset.price;
                updateAddModalComputedValues();
            }

            function findCustomer() {
                const query = customerSearchInput.value.trim().toLowerCase();
                const byPhone = customerSearchType.value === "phone";
                const customer = customers.find((item) =>
                    byPhone
                        ? item.phone.toLowerCase() === query
                        : item.userId.toLowerCase() === query,
                );
                addUserName.value = customer
                    ? customer.name
                    : "No matching customer";
            }

            function updateSummaryMetrics() {
                reviewCount.textContent = String(orders.length);
                highestPriceMetric.textContent = formatCurrency(
                    Math.max(...orders.map((order) => order.totalPrice)),
                );
                todayRequestsMetric.textContent = String(
                    orders.filter((order) =>
                        order.createdDate.startsWith("2026-04-23"),
                    ).length,
                );
                earliestArrivalMetric.textContent = formatTimeLabel(
                    [...orders].sort((a, b) =>
                        a.arrivalTime.localeCompare(b.arrivalTime),
                    )[0].arrivalTime,
                );
            }

            function renderRows(items) {
                updateSummaryMetrics();
                if (!items.length) {
                    ordersTableBody.innerHTML =
                        '<tr><td colspan="13" class="empty-state">No orders match the current filters.</td></tr>';
                    return;
                }
                ordersTableBody.innerHTML = items
                    .map(
                        (order) => `
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
  `,
                    )
                    .join("");
            }

            function getFilteredOrders() {
                const searchType = searchTypeSelect.value;
                const textQuery = searchInput.value.trim().toLowerCase();
                const dateQuery = dateSearchInput.value;
                let filtered = orders.filter((order) => {
                    if (searchType === "orderDate")
                        return !dateQuery || order.orderDate === dateQuery;
                    if (!textQuery) return true;
                    if (searchType === "orderId")
                        return order.id.toLowerCase().includes(textQuery);
                    if (searchType === "userName")
                        return order.userName.toLowerCase().includes(textQuery);
                    return true;
                });
                const sortType = sortSelect.value;
                filtered = [...filtered].sort((a, b) => {
                    if (sortType === "priceDesc")
                        return b.totalPrice - a.totalPrice;
                    if (sortType === "queueAsc")
                        return a.queueOrder - b.queueOrder;
                    if (sortType === "dateAsc")
                        return new Date(a.orderDate) - new Date(b.orderDate);
                    if (sortType === "dateDesc")
                        return new Date(b.orderDate) - new Date(a.orderDate);
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
                const finalPrice = Math.max(
                    0,
                    totalPrice - wallet - deposit - discount,
                );
                modalFinalPrice.value = formatCurrency(finalPrice);
                modalBreakdownValue.textContent = `${formatCurrency(totalPrice)} - ${formatCurrency(wallet + deposit + discount)}`;
                modalSelectedAddressValue.textContent =
                    modalAddressSelect.value || "No Address";
                const selectedMaids = Array.from(
                    modalMaidSelect.selectedOptions,
                ).map((option) => option.value);
                modalAssignedMaidValue.textContent = selectedMaids.length
                    ? selectedMaids.join(", ")
                    : "Not Assigned";
                modalAssignedPartnerValue.textContent =
                    modalPartnerSelect.value || "Not Assigned";
                const selectedExtras = Array.from(
                    modalExtrasSelect.selectedOptions,
                ).map((option) => option.value);
                modalExtrasValue.textContent = selectedExtras.length
                    ? selectedExtras.join(", ")
                    : "No Extras";
            }

            function updateAddModalComputedValues() {
                const totalPrice = Number(addTotalPrice.value) || 0;
                const wallet = Number(addWallet.value) || 0;
                const deposit = Number(addDeposit.value) || 0;
                const discount = Number(addDiscount.value) || 0;
                const finalPrice = Math.max(
                    0,
                    totalPrice - wallet - deposit - discount,
                );
                addFinalPrice.value = formatCurrency(finalPrice);
                addBreakdownValue.textContent = `${formatCurrency(totalPrice)} - ${formatCurrency(wallet + deposit + discount)}`;
                const selectedMaids = Array.from(
                    addMaidSelect.selectedOptions,
                ).map((option) => option.value);
                addAssignedMaidValue.textContent = selectedMaids.length
                    ? selectedMaids.join(", ")
                    : "Not Assigned";
                addAssignedPartnerValue.textContent =
                    addPartnerSelect.value || "Not Assigned";
                const selectedExtras = Array.from(
                    addExtrasSelect.selectedOptions,
                ).map((option) => option.value);
                addExtrasValue.textContent = selectedExtras.length
                    ? selectedExtras.join(", ")
                    : "No Extras";
            }

            function setOrderModalMode(mode) {
                const isView = mode === "view";
                editOrderTitle.textContent = isView
                    ? "View Order"
                    : "Edit Order";
                const subtitle =
                    editOrderModal.querySelector(".modal-subtitle");
                if (subtitle)
                    subtitle.textContent = isView
                        ? "Read-only order details. No content can be changed in View mode."
                        : "Update booking details, customer address, pricing, assignment, and operational status.";
                editOrderForm.classList.toggle("view-only", isView);
                editOrderForm
                    .querySelectorAll("input, select")
                    .forEach((field) => {
                        field.disabled = isView;
                    });
                const saveButton = editOrderForm.querySelector(
                    'button[type="submit"]',
                );
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
                const savedAddresses =
                    customerAddressBook[order.userName] || [];
                const availableAddresses = [
                    ...new Set(
                        [order.address, ...savedAddresses].filter(Boolean),
                    ),
                ];
                modalAddressSelect.innerHTML = availableAddresses
                    .map(
                        (address) =>
                            `<option value="${address}">${address}</option>`,
                    )
                    .join("");
                modalAddressSelect.value =
                    order.address || availableAddresses[0] || "";
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
                    option.selected = (order.maids || []).includes(
                        option.value,
                    );
                });
                modalPartnerSelect.value = order.partner || "";
                Array.from(modalExtrasSelect.options).forEach((option) => {
                    option.selected = order.extras.includes(option.value);
                });
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
                addStatus.value = "Waiting List";
                addPaymentMethod.value = "Cash";
                Array.from(addMaidSelect.options).forEach((option) => {
                    option.selected = false;
                });
                addPartnerSelect.value = "";
                Array.from(addExtrasSelect.options).forEach((option) => {
                    option.selected = false;
                });
                addTotalPrice.value =
                    addPackageSelect.selectedOptions[0]?.dataset.price || "0";
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
                order.maids = Array.from(modalMaidSelect.selectedOptions).map(
                    (option) => option.value,
                );
                order.maid = order.maids[0] || "";
                order.partner = modalPartnerSelect.value;
                order.extras = Array.from(
                    modalExtrasSelect.selectedOptions,
                ).map((option) => option.value);
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
                    maids: Array.from(addMaidSelect.selectedOptions).map(
                        (option) => option.value,
                    ),
                    maid: addMaidSelect.selectedOptions[0]?.value || "",
                    partner: addPartnerSelect.value,
                    extras: Array.from(addExtrasSelect.selectedOptions).map(
                        (option) => option.value,
                    ),
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

            [
                modalTotalPrice,
                modalWallet,
                modalDeposit,
                modalDiscount,
                modalAddressSelect,
                modalMaidSelect,
                modalPartnerSelect,
                modalExtrasSelect,
            ].forEach((field) => {
                field.addEventListener("input", updateModalComputedValues);
                field.addEventListener("change", updateModalComputedValues);
            });

            [
                addTotalPrice,
                addWallet,
                addDeposit,
                addDiscount,
                addMaidSelect,
                addPartnerSelect,
                addExtrasSelect,
            ].forEach((field) => {
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
                    const index = orders.findIndex(
                        (order) => order.id === orderId,
                    );
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
                    if (!editOrderModal.classList.contains("hidden"))
                        closeEditModal();
                    if (!addOrderModal.classList.contains("hidden"))
                        closeAddModal();
                }
            });

            populateReferenceLists();
            populateCityOptions();
            syncServiceSelectors();
            syncSearchMode();
        },
        "wallet-ledger": () => {
            const ledgerTableBody = document.getElementById("ledgerTableBody");
            const filterTabs = document.querySelectorAll(".filter-tab");
            const ledgerSearchInput =
                document.getElementById("ledgerSearchInput");
            const openAddBalanceBtn =
                document.getElementById("openAddBalanceBtn");
            const addBalanceModal = document.getElementById("addBalanceModal");
            const closeAddBalanceBtn =
                document.getElementById("closeAddBalanceBtn");
            const cancelAddBalanceBtn = document.getElementById(
                "cancelAddBalanceBtn",
            );
            const addBalanceForm = document.getElementById("addBalanceForm");
            const balanceSourceType =
                document.getElementById("balanceSourceType");
            const balanceAmountInput =
                document.getElementById("balanceAmountInput");
            const balanceReferenceInput = document.getElementById(
                "balanceReferenceInput",
            );
            const balanceReasonCode =
                document.getElementById("balanceReasonCode");
            const balanceApprovedByInput = document.getElementById(
                "balanceApprovedByInput",
            );
            const balanceNoteInput =
                document.getElementById("balanceNoteInput");
            const currentWalletBalance = document.getElementById(
                "currentWalletBalance",
            );
            const previewCurrentBalance = document.getElementById(
                "previewCurrentBalance",
            );
            const previewAddedAmount =
                document.getElementById("previewAddedAmount");
            const previewNextBalance =
                document.getElementById("previewNextBalance");
            const totalBankTransferValue = document.getElementById(
                "totalBankTransferValue",
            );
            const totalEwalletValue =
                document.getElementById("totalEwalletValue");
            const totalRefundsValue =
                document.getElementById("totalRefundsValue");
            const ledgerEntriesCount =
                document.getElementById("ledgerEntriesCount");
            const successToast = document.getElementById("successToast");
            const successToastMessage = document.getElementById(
                "successToastMessage",
            );

            const ledgerEntries = [
                {
                    id: "#WL-90411",
                    date: "23 Apr 2026, 09:15 AM",
                    type: "deposit",
                    label: "BANK TANSFER",
                    source: "BANK TANSFER",
                    reference: "Card ending 4551",
                    amount: "+ EGP 5,000",
                    balanceAfter: "EGP 24,380",
                    status: "completed",
                    notes: "Customer BANK TANSFER completed successfully.",
                },
                {
                    id: "#WL-90407",
                    date: "23 Apr 2026, 08:42 AM",
                    type: "withdrawal",
                    label: "E-wallet",
                    source: "E-wallet",
                    reference: "Order #ORD-7841",
                    amount: "- EGP 1,260",
                    balanceAfter: "EGP 19,380",
                    status: "completed",
                    notes: "E-wallet deduction completed after service confirmation.",
                },
                {
                    id: "#WL-90388",
                    date: "20 Apr 2026, 04:55 PM",
                    type: "deposit",
                    label: "Refund",
                    source: "Order Refund",
                    reference: "Cancelled order #ORD-7784",
                    amount: "+ EGP 740",
                    balanceAfter: "EGP 20,640",
                    status: "completed",
                    notes: "Refund approved by operations.",
                },
                {
                    id: "#WL-90344",
                    date: "19 Apr 2026, 11:10 AM",
                    type: "deposit",
                    label: "BANK TANSFER",
                    source: "BANK TANSFER Adjustment",
                    reference: "admin.nada",
                    amount: "+ EGP 350",
                    balanceAfter: "EGP 19,900",
                    status: "completed",
                    notes: "Loyalty campaign reward.",
                },
                {
                    id: "#WL-90296",
                    date: "18 Apr 2026, 06:30 PM",
                    type: "withdrawal",
                    label: "E-wallet",
                    source: "E-wallet",
                    reference: "Order #ORD-7794",
                    amount: "- EGP 2,340",
                    balanceAfter: "EGP 19,550",
                    status: "pending",
                    notes: "Pending final settlement with provider.",
                },
                {
                    id: "#WL-90240",
                    date: "16 Apr 2026, 01:25 PM",
                    type: "deposit",
                    label: "BANK TANSFER",
                    source: "BANK TANSFER",
                    reference: "Transfer batch #BN-2281",
                    amount: "+ EGP 8,000",
                    balanceAfter: "EGP 21,890",
                    status: "completed",
                    notes: "Verified by finance team.",
                },
            ];

            let activeFilter = "all";
            let walletBalanceAmount = 24380;
            let totalBankTransferAmount = 61220;
            let totalEwalletAmount = 36840;
            let totalRefundAmount = 4740;
            let toastTimeoutId = null;

            const formatCurrency = __shared.formatCurrency_7;

            function formatAmount(value, type = "deposit") {
                const prefix = ["withdrawal", "purchase"].includes(type) ? "-" : "+";
                return `${prefix} EGP ${value.toLocaleString("en-US")}`;
            }

            function syncSummaryValues() {
                currentWalletBalance.textContent =
                    formatCurrency(walletBalanceAmount);
                previewCurrentBalance.textContent =
                    formatCurrency(walletBalanceAmount);
                totalBankTransferValue.textContent = formatCurrency(
                    totalBankTransferAmount,
                );
                totalEwalletValue.textContent =
                    formatCurrency(totalEwalletAmount);
                totalRefundsValue.textContent =
                    formatCurrency(totalRefundAmount);
                ledgerEntriesCount.textContent = String(ledgerEntries.length);
            }

            function getNextLedgerId() {
                const maxValue = ledgerEntries.reduce((maxId, entry) => {
                    const numericPart = Number(entry.id.replace(/\D/g, ""));
                    return Math.max(maxId, numericPart);
                }, 90411);

                return `#WL-${maxValue + 1}`;
            }

            function getTimestampLabel() {
                return "23 Apr 2026, 10:05 AM";
            }

            function updateBalancePreview() {
                const amount = Number(balanceAmountInput?.value || 0);
                previewAddedAmount.textContent = `+ EGP ${amount.toLocaleString("en-US")}`;
                previewNextBalance.textContent = formatCurrency(
                    walletBalanceAmount + amount,
                );
            }

            function openBalanceModal() {
                addBalanceModal?.classList.remove("hidden");
                updateBalancePreview();
            }

            function closeBalanceModal() {
                addBalanceModal?.classList.add("hidden");
            }

            function showSuccessToast(message) {
                if (!successToast || !successToastMessage) {
                    return;
                }

                successToastMessage.textContent = message;
                successToast.classList.remove("hidden");

                if (toastTimeoutId) {
                    window.clearTimeout(toastTimeoutId);
                }

                toastTimeoutId = window.setTimeout(() => {
                    successToast.classList.add("hidden");
                }, 3200);
            }

            function getFilteredEntries() {
                const searchValue = (ledgerSearchInput?.value || "")
                    .trim()
                    .toLowerCase();

                return ledgerEntries.filter((entry) => {
                    const matchesFilter =
                        activeFilter === "all" || entry.type === activeFilter;
                    const matchesSearch =
                        !searchValue ||
                        entry.id.toLowerCase().includes(searchValue) ||
                        entry.source.toLowerCase().includes(searchValue) ||
                        entry.reference.toLowerCase().includes(searchValue) ||
                        entry.notes.toLowerCase().includes(searchValue);

                    return matchesFilter && matchesSearch;
                });
            }

            function renderLedgerTable() {
                const entries = getFilteredEntries();

                ledgerTableBody.innerHTML = entries
                    .map(
                        (entry) => `
        <tr>
          <td>${entry.id}</td>
          <td>${entry.date}</td>
          <td><span class="type-chip ${entry.type}">${entry.label || entry.type}</span></td>
          <td>${entry.source}</td>
          <td>${entry.reference}</td>
          <td><span class="amount ${["withdrawal", "purchase"].includes(entry.type) ? "negative" : "positive"}">${entry.amount}</span></td>
          <td>${entry.balanceAfter}</td>
          <td><span class="status-chip ${entry.status}">${entry.status}</span></td>
          <td>${entry.notes}</td>
        </tr>
      `,
                    )
                    .join("");
            }

            filterTabs.forEach((button) => {
                button.addEventListener("click", () => {
                    activeFilter = button.dataset.filter || "all";

                    filterTabs.forEach((tabButton) => {
                        tabButton.classList.toggle(
                            "active",
                            tabButton === button,
                        );
                    });

                    renderLedgerTable();
                });
            });

            ledgerSearchInput?.addEventListener("input", renderLedgerTable);

            openAddBalanceBtn?.addEventListener("click", () => {
                openBalanceModal();
            });

            closeAddBalanceBtn?.addEventListener("click", closeBalanceModal);
            cancelAddBalanceBtn?.addEventListener("click", closeBalanceModal);

            addBalanceModal?.addEventListener("click", (event) => {
                if (event.target === addBalanceModal) {
                    closeBalanceModal();
                }
            });

            balanceAmountInput?.addEventListener("input", updateBalancePreview);

            addBalanceForm?.addEventListener("submit", (event) => {
                event.preventDefault();

                const amount = Number(balanceAmountInput.value || 0);

                if (!amount) {
                    return;
                }

                const sourceType = balanceSourceType.value;
                const isRefund = sourceType === "Refund";
                const entryType = "deposit";
                const reasonCode = balanceReasonCode.value;
                const approvedBy = balanceApprovedByInput.value.trim();
                const adminNote = balanceNoteInput.value.trim();

                walletBalanceAmount += amount;

                if (isRefund) {
                    totalRefundAmount += amount;
                } else {
                    totalBankTransferAmount += amount;
                }

                ledgerEntries.unshift({
                    id: getNextLedgerId(),
                    date: getTimestampLabel(),
                    type: entryType,
                    label: sourceType,
                    source: sourceType,
                    reference: balanceReferenceInput.value.trim(),
                    amount: formatAmount(amount, "deposit"),
                    balanceAfter: formatCurrency(walletBalanceAmount),
                    status: "completed",
                    notes: `${reasonCode} | Approved by ${approvedBy} | ${adminNote}`,
                });

                syncSummaryValues();
                renderLedgerTable();
                addBalanceForm.reset();
                balanceSourceType.value = "BANK TANSFER";
                balanceReasonCode.value = "Manual Top-Up";
                updateBalancePreview();
                closeBalanceModal();
                showSuccessToast(
                    `Added ${formatAmount(amount, "deposit")} to mariam ashraf awad via ${sourceType}.`,
                );
            });

            syncSummaryValues();
            renderLedgerTable();
        },
        profile: () => {
            const tabButtons = document.querySelectorAll(".tab-btn");
            const tabPanels = document.querySelectorAll(".tab-panel");
            const quickLinks = document.querySelectorAll(".mini-link");
            const nameInput = document.getElementById("nameInput");
            const userDisplayName = document.getElementById("userDisplayName");
            const userTierPill = document.getElementById("userTierPill");
            const userTierSelect = document.getElementById("userTierSelect");
            const screenshotPermissionToggle = document.getElementById(
                "screenshotPermissionToggle",
            );
            const addressesTableBody =
                document.getElementById("addressesTableBody");
            const addressCountValue =
                document.getElementById("addressCountValue");
            const defaultGovernorateValue = document.getElementById(
                "defaultGovernorateValue",
            );
            const addNewAddressBtn =
                document.getElementById("addNewAddressBtn");
            const resetAddressFormBtn = document.getElementById(
                "resetAddressFormBtn",
            );
            const cancelEditAddressBtn = document.getElementById(
                "cancelEditAddressBtn",
            );
            const addressForm = document.getElementById("addressForm");
            const addressFormTitle =
                document.getElementById("addressFormTitle");
            const addressEditId = document.getElementById("addressEditId");
            const addressIdPreview =
                document.getElementById("addressIdPreview");
            const governorateSelect =
                document.getElementById("governorateSelect");
            const locationSelect = document.getElementById("locationSelect");
            const streetInput = document.getElementById("streetInput");
            const houseNumberInput =
                document.getElementById("houseNumberInput");
            const houseNameInput = document.getElementById("houseNameInput");
            const floorNumberInput =
                document.getElementById("floorNumberInput");
            const apartmentNumberInput = document.getElementById(
                "apartmentNumberInput",
            );
            const notesInput = document.getElementById("notesInput");
            const banUserBtn = document.getElementById("banUserBtn");
            const restrictUserBtn = document.getElementById("restrictUserBtn");
            const sendMessageTopBtn =
                document.getElementById("sendMessageTopBtn");
            const saveProfileBtn = document.getElementById("saveProfileBtn");
            const viewAllOrdersBtn =
                document.getElementById("viewAllOrdersBtn");
            const exportLogsBtn = document.getElementById("exportLogsBtn");
            const activeStatusSelect =
                document.getElementById("activeStatusSelect");
            const banStatusSelect = document.getElementById("banStatusSelect");
            const restrictedStatusSelect = document.getElementById(
                "restrictedStatusSelect",
            );
            const profileModal = document.getElementById("profileModal");
            const profileModalTitle =
                document.getElementById("profileModalTitle");
            const profileModalSubtitle = document.getElementById(
                "profileModalSubtitle",
            );
            const profileModalContent = document.getElementById(
                "profileModalContent",
            );
            const closeProfileModalBtn = document.getElementById(
                "closeProfileModalBtn",
            );
            const closeProfileModalFooterBtn = document.getElementById(
                "closeProfileModalFooterBtn",
            );
            const profileToast = document.getElementById("profileToast");
            const profileToastMessage = document.getElementById(
                "profileToastMessage",
            );
            const profileInfoRowTemplate = document.getElementById(
                "profileInfoRowTemplate",
            );
            const profileAddressRowTemplate = document.getElementById(
                "profileAddressRowTemplate",
            );

            const locationOptionsByGovernorate = {
                Alexandria: ["Smouha", "Stanley", "Gleem", "Miami"],
                "North Coast": [
                    "Marina",
                    "Sidi Abdelrahman",
                    "Hacienda Bay",
                    "El Alamein",
                ],
                Beheira: ["Damanhour", "Kafr El Dawwar", "Rashid", "Edku"],
                Cairo: ["Maadi", "Nasr City", "Heliopolis", "Zamalek"],
                "New Cairo": [
                    "Fifth Settlement",
                    "Lotus",
                    "South Academy",
                    "El Narges",
                ],
                Giza: ["Dokki", "Mohandessin", "Haram", "Sheikh Zayed"],
            };

            let addresses = [
                {
                    id: "#ADDR-2001",
                    governorate: "Cairo",
                    location: "Maadi",
                    streetName: "Nile Corniche",
                    houseNumber: "12",
                    houseName: "Al Yasmin Tower",
                    floorNumber: "6",
                    apartmentNumber: "17B",
                    notes: "Call before arrival and use the side entrance.",
                },
                {
                    id: "#ADDR-2002",
                    governorate: "New Cairo",
                    location: "Fifth Settlement",
                    streetName: "Street 90",
                    houseNumber: "44",
                    houseName: "Palm Residence",
                    floorNumber: "3",
                    apartmentNumber: "11",
                    notes: "Security gate requires the order number.",
                },
                {
                    id: "#ADDR-2003",
                    governorate: "Alexandria",
                    location: "Smouha",
                    streetName: "Fawzy Moaz",
                    houseNumber: "8",
                    houseName: "Blue Pearl",
                    floorNumber: "2",
                    apartmentNumber: "5A",
                    notes: "Preferred morning visits only.",
                },
            ];
            let toastTimeoutId = null;

            const userProfileDirectory = {
                "#USR-102938": {
                    name: "Mariam Kamal",
                    phone: "+20 109 555 0198",
                    email: "mariam.kamal@example.com",
                    city: "Cairo",
                    address: "12 Nile Corniche, Maadi, Cairo, Egypt",
                },
                "#USR-102954": {
                    name: "Youssef Adel",
                    phone: "+20 100 284 7712",
                    email: "youssef.adel@example.com",
                    city: "Alexandria",
                    address: "18 Fawzy Moaz Street, Smouha, Alexandria",
                },
                "#USR-103004": {
                    name: "Nour Hassan",
                    phone: "+20 111 792 4035",
                    email: "nour.hassan@example.com",
                    city: "Cairo",
                    address: "44 Street 90, Fifth Settlement, New Cairo",
                },
                "#USR-103121": {
                    name: "Karim Emad",
                    phone: "+20 122 608 1944",
                    email: "karim.emad@example.com",
                    city: "Giza",
                    address: "9 Tahrir Street, Dokki, Giza",
                },
                "#USR-103177": {
                    name: "Salma Hany",
                    phone: "+20 115 330 8621",
                    email: "salma.hany@example.com",
                    city: "Cairo",
                    address: "27 El Nozha Street, Heliopolis, Cairo",
                },
                "#USR-442300": {
                    name: "Salma Emad",
                    phone: "+20 106 612 0077",
                    email: "salma.emad@example.com",
                    city: "Cairo",
                    address: "88 Abbas El Akkad, Nasr City, Cairo",
                },
            };

            function loadSelectedUserProfile() {
                const requestedUserId = new URLSearchParams(
                    window.location.search,
                ).get("userId");
                const profile = userProfileDirectory[requestedUserId];
                if (!requestedUserId || !profile) return;

                const initials = profile.name
                    .split(/\s+/)
                    .map((part) => part[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase();
                const values = {
                    profileUserId: requestedUserId,
                    profilePhone: profile.phone,
                    profileEmail: profile.email,
                    profileCity: profile.city,
                    profileAddress: profile.address,
                };

                Object.entries(values).forEach(([id, value]) => {
                    const field = document.getElementById(id);
                    if (field) field.value = value;
                });

                nameInput.value = profile.name;
                userDisplayName.textContent = profile.name;
                document.getElementById("userAvatarInitials").textContent =
                    initials;
                document.getElementById("userHeroMeta").firstChild.textContent =
                    `${profile.city}, Egypt `;
                document.title = `${profile.name} - User Profile`;
            }

            loadSelectedUserProfile();

            function showToast(message) {
                if (!profileToast || !profileToastMessage) {
                    return;
                }

                profileToastMessage.textContent = message;
                profileToast.classList.remove("hidden");

                if (toastTimeoutId) {
                    window.clearTimeout(toastTimeoutId);
                }

                toastTimeoutId = window.setTimeout(() => {
                    profileToast.classList.add("hidden");
                }, 2800);
            }

            function buildInfoRows(rows) {
                const fragment = document.createDocumentFragment();

                rows.forEach(([label, value]) => {
                    const row = profileInfoRowTemplate.content.cloneNode(true);
                    row.querySelector('[data-field="label"]').textContent =
                        `${label}:`;
                    row.querySelector('[data-field="value"]').textContent =
                        value;
                    fragment.append(row);
                });

                return fragment;
            }

            function openModal(title, subtitle, rows) {
                if (
                    !profileModal ||
                    !profileModalTitle ||
                    !profileModalSubtitle ||
                    !profileModalContent
                ) {
                    return;
                }

                profileModalTitle.textContent = title;
                profileModalSubtitle.textContent = subtitle;
                profileModalContent.replaceChildren(buildInfoRows(rows));
                profileModal.classList.remove("hidden");
            }

            function closeModal() {
                profileModal?.classList.add("hidden");
            }

            function setActiveTab(targetId) {
                tabButtons.forEach((button) => {
                    button.classList.toggle(
                        "active",
                        button.dataset.tab === targetId,
                    );
                });

                quickLinks.forEach((button) => {
                    button.classList.toggle(
                        "active",
                        button.dataset.tabTarget === targetId,
                    );
                });

                tabPanels.forEach((panel) => {
                    panel.classList.toggle("active", panel.id === targetId);
                });
            }

            tabButtons.forEach((button) => {
                button.addEventListener("click", () =>
                    setActiveTab(button.dataset.tab),
                );
            });

            quickLinks.forEach((button) => {
                button.addEventListener("click", () =>
                    setActiveTab(button.dataset.tabTarget),
                );
            });

            nameInput.addEventListener("input", (event) => {
                userDisplayName.textContent = event.target.value || "User Name";
            });

            if (screenshotPermissionToggle) {
                screenshotPermissionToggle.addEventListener("click", () => {
                    const isAllowed =
                        screenshotPermissionToggle.classList.contains(
                            "allowed",
                        );

                    screenshotPermissionToggle.classList.toggle(
                        "allowed",
                        !isAllowed,
                    );
                    screenshotPermissionToggle.classList.toggle(
                        "blocked",
                        isAllowed,
                    );
                    screenshotPermissionToggle.setAttribute(
                        "aria-pressed",
                        String(!isAllowed),
                    );
                    screenshotPermissionToggle.textContent = isAllowed
                        ? "Screenshot Blocked"
                        : "Screenshot Allowed";
                    showToast(
                        isAllowed
                            ? "Screenshot permission blocked for this customer."
                            : "Screenshot permission enabled for this customer.",
                    );
                });
            }

            function getNextAddressId() {
                const maxNumber = addresses.reduce((maxValue, address) => {
                    const numericValue = Number(address.id.replace(/\D/g, ""));
                    return Math.max(maxValue, numericValue);
                }, 2000);

                return `#ADDR-${maxNumber + 1}`;
            }

            function populateLocations(
                selectedGovernorate,
                selectedLocation = "",
            ) {
                const locations =
                    locationOptionsByGovernorate[selectedGovernorate] || [];

                locationSelect.innerHTML = locations
                    .map(
                        (locationName) =>
                            `<option value="${locationName}"${locationName === selectedLocation ? " selected" : ""}>${locationName}</option>`,
                    )
                    .join("");
            }

            function setAddressFormMode(mode, address = null) {
                const isEditMode = mode === "edit" && address;
                addressFormTitle.textContent = isEditMode
                    ? `Edit Address ${address.id}`
                    : "Add New Address";
                addressEditId.value = isEditMode ? address.id : "";
                addressIdPreview.value = isEditMode
                    ? address.id
                    : "Auto Generated";
                governorateSelect.value = isEditMode
                    ? address.governorate
                    : "Cairo";
                populateLocations(
                    governorateSelect.value,
                    isEditMode ? address.location : "Maadi",
                );
                streetInput.value = isEditMode ? address.streetName : "";
                houseNumberInput.value = isEditMode ? address.houseNumber : "";
                houseNameInput.value = isEditMode ? address.houseName : "";
                floorNumberInput.value = isEditMode ? address.floorNumber : "";
                apartmentNumberInput.value = isEditMode
                    ? address.apartmentNumber
                    : "";
                notesInput.value = isEditMode ? address.notes : "";
            }

            function getGovernorateCountMap() {
                return addresses.reduce((accumulator, address) => {
                    accumulator[address.governorate] =
                        (accumulator[address.governorate] || 0) + 1;
                    return accumulator;
                }, {});
            }

            function renderAddressSummary() {
                addressCountValue.textContent = String(addresses.length);
                const governorateCountMap = getGovernorateCountMap();
                const topGovernorate =
                    Object.entries(governorateCountMap).sort(
                        (left, right) => right[1] - left[1],
                    )[0]?.[0] || "N/A";
                defaultGovernorateValue.textContent = topGovernorate;
            }

            function buildAddressDetails(address) {
                return [
                    `Location: ${address.location}`,
                    `Street: ${address.streetName}`,
                    `House Number: ${address.houseNumber}`,
                    `House Name: ${address.houseName || "-"}`,
                    `Floor: ${address.floorNumber || "-"}`,
                    `Apartment: ${address.apartmentNumber || "-"}`,
                    `Notes: ${address.notes || "-"}`,
                ].join("\n");
            }

            function renderAddressesTable() {
                if (!addressesTableBody) {
                    return;
                }

                const rows = addresses.map((address) => {
                    const row =
                        profileAddressRowTemplate.content.cloneNode(true);
                    const values = {
                        id: address.id,
                        governorate: address.governorate,
                        location: address.location,
                        streetName: address.streetName,
                        building: `${address.houseNumber}${address.houseName ? `, ${address.houseName}` : ""}`,
                        unit: `${address.floorNumber || "-"} / ${address.apartmentNumber || "-"}`,
                        notes: address.notes || "-",
                    };

                    Object.entries(values).forEach(([field, value]) => {
                        row.querySelector(
                            `[data-field="${field}"]`,
                        ).textContent = value;
                    });
                    row.querySelectorAll("[data-address-action]").forEach(
                        (button) => {
                            button.dataset.addressId = address.id;
                        },
                    );

                    return row;
                });

                addressesTableBody.replaceChildren(...rows);

                renderAddressSummary();
            }

            function getAddressFormData() {
                return {
                    governorate: governorateSelect.value,
                    location: locationSelect.value,
                    streetName: streetInput.value.trim(),
                    houseNumber: houseNumberInput.value.trim(),
                    houseName: houseNameInput.value.trim(),
                    floorNumber: floorNumberInput.value.trim(),
                    apartmentNumber: apartmentNumberInput.value.trim(),
                    notes: notesInput.value.trim(),
                };
            }

            governorateSelect?.addEventListener("change", () => {
                populateLocations(governorateSelect.value);
            });

            addressForm?.addEventListener("submit", (event) => {
                event.preventDefault();

                const formData = getAddressFormData();
                const editingId = addressEditId.value;

                if (editingId) {
                    addresses = addresses.map((address) =>
                        address.id === editingId
                            ? {
                                ...address,
                                ...formData,
                            }
                            : address,
                    );
                } else {
                    addresses.unshift({
                        id: getNextAddressId(),
                        ...formData,
                    });
                }

                renderAddressesTable();
                setAddressFormMode("create");
                setActiveTab("addresses-tab");
                showToast(
                    editingId
                        ? "Address updated successfully."
                        : "New address added successfully.",
                );
            });

            addressesTableBody?.addEventListener("click", (event) => {
                const target = event.target.closest("[data-address-action]");

                if (!target) {
                    return;
                }

                const addressId = target.dataset.addressId;
                const action = target.dataset.addressAction;
                const selectedAddress = addresses.find(
                    (address) => address.id === addressId,
                );

                if (!selectedAddress) {
                    return;
                }

                if (action === "view") {
                    openModal(
                        `Address ${selectedAddress.id}`,
                        "Full customer address details from the dashboard.",
                        [
                            ["Governorate", selectedAddress.governorate],
                            ["Location", selectedAddress.location],
                            ["Street", selectedAddress.streetName],
                            ["House Number", selectedAddress.houseNumber],
                            ["House Name", selectedAddress.houseName || "-"],
                            ["Floor", selectedAddress.floorNumber || "-"],
                            [
                                "Apartment",
                                selectedAddress.apartmentNumber || "-",
                            ],
                            ["Notes", selectedAddress.notes || "-"],
                        ],
                    );
                    return;
                }

                if (action === "edit") {
                    setAddressFormMode("edit", selectedAddress);
                    setActiveTab("addresses-tab");
                    addressForm.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                    return;
                }

                if (action === "delete") {
                    addresses = addresses.filter(
                        (address) => address.id !== addressId,
                    );
                    renderAddressesTable();
                    if (addressEditId.value === addressId) {
                        setAddressFormMode("create");
                    }
                    showToast("Address deleted successfully.");
                }
            });

            addNewAddressBtn?.addEventListener("click", () => {
                setAddressFormMode("create");
                setActiveTab("addresses-tab");
                addressForm.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            });

            resetAddressFormBtn?.addEventListener("click", () => {
                setAddressFormMode(
                    addressEditId.value ? "edit" : "create",
                    addresses.find(
                        (address) => address.id === addressEditId.value,
                    ) || null,
                );
            });

            cancelEditAddressBtn?.addEventListener("click", () => {
                setAddressFormMode("create");
                showToast("Address edit canceled.");
            });

            banUserBtn?.addEventListener("click", () => {
                banStatusSelect.value = "Permanent Ban";
                openModal(
                    "Ban Applied",
                    "The dashboard updated the customer ban status.",
                    [
                        ["Customer", userDisplayName.textContent],
                        ["Ban Status", banStatusSelect.value],
                        [
                            "Impact",
                            "The customer will be prevented from using the account until the status is reviewed.",
                        ],
                    ],
                );
                showToast("Customer ban status updated to Permanent Ban.");
            });

            restrictUserBtn?.addEventListener("click", () => {
                restrictedStatusSelect.value = "Messaging Blocked";
                openModal(
                    "Restriction Applied",
                    "A customer restriction was applied from the profile top bar.",
                    [
                        ["Customer", userDisplayName.textContent],
                        ["Restriction", restrictedStatusSelect.value],
                        [
                            "Note",
                            "Messaging access is now blocked until the admin changes the restriction level.",
                        ],
                    ],
                );
                showToast("Customer restriction updated to Messaging Blocked.");
            });

            sendMessageTopBtn?.addEventListener("click", () => {
                window.location.href = "./messages-inbox.html";
            });

            saveProfileBtn?.addEventListener("click", () => {
                const tierUserId =
                    document.getElementById("profileUserId")?.value ||
                    "#USR-102938";
                const tierOverrides = (() => {
                    try {
                        return (
                            JSON.parse(
                                localStorage.getItem(
                                    "userProfileTierOverrides",
                                ),
                            ) || {}
                        );
                    } catch (error) {
                        return {};
                    }
                })();
                tierOverrides[tierUserId] = userTierSelect?.value || "VIP";
                localStorage.setItem(
                    "userProfileTierOverrides",
                    JSON.stringify(tierOverrides),
                );
                openModal(
                    "Profile Saved",
                    "The visible customer profile values were captured from the dashboard.",
                    [
                        ["Name", nameInput.value || "-"],
                        ["Account Status", activeStatusSelect.value],
                        [
                            "Customer Tier",
                            `${userTierSelect?.value || "VIP"} Tier`,
                        ],
                        ["Ban", banStatusSelect.value],
                        ["Restricted", restrictedStatusSelect.value],
                        [
                            "Summary",
                            "Profile changes are ready and the live state shown on the dashboard has been updated.",
                        ],
                    ],
                );
                showToast("Profile changes saved successfully.");
            });

            viewAllOrdersBtn?.addEventListener("click", () => {
                openModal(
                    "All Orders",
                    "A quick extended order snapshot for this customer.",
                    [
                        [
                            "#ORD-7841",
                            "22 Apr 2026 • Processing • Mobile App • EGP 1,260",
                        ],
                        [
                            "#ORD-7829",
                            "20 Apr 2026 • Delivered • Website • EGP 980",
                        ],
                        [
                            "#ORD-7794",
                            "18 Apr 2026 • Pending • Call Center • EGP 2,340",
                        ],
                        [
                            "Insight",
                            "12 orders are still pending fulfillment based on the user summary.",
                        ],
                    ],
                );
            });

            exportLogsBtn?.addEventListener("click", () => {
                openModal(
                    "Logs Export",
                    "Audit log export preview from the customer profile.",
                    [
                        ["Exported By", "admin.sara"],
                        ["Customer", userDisplayName.textContent],
                        [
                            "Included Events",
                            "Address updates, device logins, and compliance reviews.",
                        ],
                        [
                            "Status",
                            "Export package prepared successfully for download or compliance review.",
                        ],
                    ],
                );
                showToast("User activity logs prepared for export.");
            });

            closeProfileModalBtn?.addEventListener("click", closeModal);
            closeProfileModalFooterBtn?.addEventListener("click", closeModal);

            profileModal?.addEventListener("click", (event) => {
                if (event.target === profileModal) {
                    closeModal();
                }
            });

            populateLocations(governorateSelect?.value || "Cairo", "Maadi");
            setAddressFormMode("create");
            renderAddressesTable();

            const linkedUserProfiles = {
                "#USR-102938": {
                    name: "Mariam Kamal",
                    phone: "+20 109 555 0198",
                    email: "mariam.kamal@example.com",
                    city: "Cairo",
                    address: "12 Nile Corniche, Maadi, Cairo, Egypt",
                },
                "#USR-102954": {
                    name: "Youssef Adel",
                    phone: "+20 111 428 0954",
                    email: "youssef.adel@example.com",
                    city: "Alexandria",
                    address: "18 El-Gaish Road, Roushdy, Alexandria, Egypt",
                },
                "#USR-103004": {
                    name: "Nour Hassan",
                    phone: "+20 100 773 3004",
                    email: "nour.hassan@example.com",
                    city: "Cairo",
                    address: "44 Makram Ebeid Street, Nasr City, Cairo, Egypt",
                },
                "#USR-103121": {
                    name: "Karim Emad",
                    phone: "+20 122 581 3121",
                    email: "karim.emad@example.com",
                    city: "Giza",
                    address: "9 Tahrir Street, Dokki, Giza, Egypt",
                },
                "#USR-103177": {
                    name: "Salma Hany",
                    phone: "+20 115 902 3177",
                    email: "salma.hany@example.com",
                    city: "Cairo",
                    address: "27 El-Nozha Street, Heliopolis, Cairo, Egypt",
                },
            };

            function loadLinkedUserProfile() {
                const requestedUserId = new URLSearchParams(
                    window.location.search,
                ).get("userId");
                if (!requestedUserId) return;

                const userId = requestedUserId.startsWith("#")
                    ? requestedUserId
                    : `#${requestedUserId}`;
                const profile = linkedUserProfiles[userId];
                if (!profile) return;

                const initials = profile.name
                    .split(" ")
                    .map((part) => part[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase();
                document.getElementById("userDisplayName").textContent =
                    profile.name;
                document.getElementById("nameInput").value = profile.name;
                document.getElementById("userAvatarInitials").textContent =
                    initials;
                document.getElementById("profileUserId").value = userId;
                document.getElementById("profilePhone").value = profile.phone;
                document.getElementById("profileEmail").value = profile.email;
                document.getElementById("profileCity").value = profile.city;
                document.getElementById("profileAddress").value =
                    profile.address;
                document.getElementById(
                    "userHeroMeta",
                ).childNodes[0].textContent = `${profile.city}, Egypt `;
                document.title = `${profile.name} - User Profile`;
            }

            loadLinkedUserProfile();

            const userTierDefaults = {
                "#USR-102938": "VIP",
                "#USR-102954": "Gold",
                "#USR-103004": "Gold",
                "#USR-103121": "Standard",
                "#USR-103177": "Standard",
            };
            function applySelectedUserTier() {
                const userId =
                    document.getElementById("profileUserId")?.value ||
                    "#USR-102938";
                let overrides = {};
                try {
                    overrides =
                        JSON.parse(
                            localStorage.getItem("userProfileTierOverrides"),
                        ) || {};
                } catch (error) {
                    overrides = {};
                }
                const tier =
                    overrides[userId] || userTierDefaults[userId] || "VIP";
                if (userTierSelect) userTierSelect.value = tier;
                if (userTierPill) userTierPill.textContent = `${tier} Tier`;
            }
            userTierSelect?.addEventListener("change", () => {
                userTierPill.textContent = `${userTierSelect.value} Tier`;
            });
            applySelectedUserTier();
        },
    };

    const run = (name) => {
        if (!modules[name]) return;
        try {
            modules[name]();
        } catch (error) {
            console.error(`[TARWIQA:${name}]`, error);
        }
    };

    const pathPage = location.pathname
        .split("/")
        .pop()
        .replace(/\.html$/, "");
    const declaredPage = document.body.dataset.page;
    let page = declaredPage || pathPage;
    if (document.getElementById("userDisplayName")) page = "profile";
    if (document.getElementById("refreshKpisBtn")) page = "admin-dashboard";
    if (page === "add-maid" && modules["add-maid-v2"]) page = "add-maid-v2";
    if (page === "add-supporter" && modules["add-supporter-v2"])
        page = "add-supporter-v2";

    if (document.querySelector("[data-sidebar-mount]")) run("sidebar");
    run(page);

    const toggle = document.querySelector(".menu-toggle");
    const sidebar = document.querySelector(".sidebar");
    const closeSidebar = () => {
        sidebar?.classList.remove("open");
        document.body.classList.remove("sidebar-open");
        toggle?.setAttribute("aria-expanded", "false");
        toggle?.setAttribute("aria-label", "Open navigation");
    };
    const openSidebar = () => {
        sidebar?.classList.add("open");
        document.body.classList.add("sidebar-open");
        toggle?.setAttribute("aria-expanded", "true");
        toggle?.setAttribute("aria-label", "Close navigation");
    };
    toggle?.addEventListener("click", () => {
        sidebar?.classList.contains("open") ? closeSidebar() : openSidebar();
    });
    document.querySelectorAll("[data-sidebar-close]").forEach((control) => {
        control.addEventListener("click", closeSidebar);
    });
    sidebar?.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeSidebar);
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && sidebar?.classList.contains("open")) {
            closeSidebar();
            toggle?.focus();
        }
    });

    document.addEventListener("click", (event) => {
        const trigger = event.target.closest("[data-confirm]");
        if (trigger && !window.confirm(trigger.dataset.confirm)) {
            event.preventDefault();
        }
    });
    window.addEventListener("resize", () => {
        if (window.innerWidth > 980) closeSidebar();
    });

    const accountMenu = document.querySelector(".account-menu");
    document.addEventListener("click", (event) => {
        if (accountMenu?.open && !accountMenu.contains(event.target)) {
            accountMenu.removeAttribute("open");
        }
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && accountMenu?.open) {
            accountMenu.removeAttribute("open");
            accountMenu.querySelector("summary")?.focus();
        }
    });

    window.TarwiqaAssets = Object.freeze({
        run,
        modules: Object.keys(modules),
    });
})();
document.addEventListener("click", (event) => {
    const passwordToggle = event.target.closest("[data-password-toggle]");
    if (passwordToggle) {
        const input = document.getElementById(passwordToggle.getAttribute("aria-controls"));
        if (input) {
            const reveal = input.type === "password";
            input.type = reveal ? "text" : "password";
            passwordToggle.textContent = reveal ? "Hide" : "Show";
            passwordToggle.setAttribute("aria-pressed", String(reveal));
        }
    }

    const demoAccount = event.target.closest("[data-demo-email]");
    if (demoAccount) {
        const email = document.getElementById("email");
        const password = document.getElementById("password");
        if (email && password) {
            email.value = demoAccount.dataset.demoEmail;
            password.value = "password";
            password.focus();
        }
    }
});
