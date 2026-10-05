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
const addressesTableBody = document.getElementById("addressesTableBody");
const addressCountValue = document.getElementById("addressCountValue");
const defaultGovernorateValue = document.getElementById(
    "defaultGovernorateValue",
);
const addNewAddressBtn = document.getElementById("addNewAddressBtn");
const resetAddressFormBtn = document.getElementById("resetAddressFormBtn");
const cancelEditAddressBtn = document.getElementById("cancelEditAddressBtn");
const addressForm = document.getElementById("addressForm");
const addressFormTitle = document.getElementById("addressFormTitle");
const addressEditId = document.getElementById("addressEditId");
const addressIdPreview = document.getElementById("addressIdPreview");
const governorateSelect = document.getElementById("governorateSelect");
const locationSelect = document.getElementById("locationSelect");
const streetInput = document.getElementById("streetInput");
const houseNumberInput = document.getElementById("houseNumberInput");
const houseNameInput = document.getElementById("houseNameInput");
const floorNumberInput = document.getElementById("floorNumberInput");
const apartmentNumberInput = document.getElementById("apartmentNumberInput");
const notesInput = document.getElementById("notesInput");
const banUserBtn = document.getElementById("banUserBtn");
const restrictUserBtn = document.getElementById("restrictUserBtn");
const sendMessageTopBtn = document.getElementById("sendMessageTopBtn");
const saveProfileBtn = document.getElementById("saveProfileBtn");
const viewAllOrdersBtn = document.getElementById("viewAllOrdersBtn");
const exportLogsBtn = document.getElementById("exportLogsBtn");
const activeStatusSelect = document.getElementById("activeStatusSelect");
const banStatusSelect = document.getElementById("banStatusSelect");
const restrictedStatusSelect = document.getElementById(
    "restrictedStatusSelect",
);
const profileModal = document.getElementById("profileModal");
const profileModalTitle = document.getElementById("profileModalTitle");
const profileModalSubtitle = document.getElementById("profileModalSubtitle");
const profileModalContent = document.getElementById("profileModalContent");
const closeProfileModalBtn = document.getElementById("closeProfileModalBtn");
const closeProfileModalFooterBtn = document.getElementById(
    "closeProfileModalFooterBtn",
);
const profileToast = document.getElementById("profileToast");
const profileToastMessage = document.getElementById("profileToastMessage");

const locationOptionsByGovernorate = {
    Alexandria: ["Smouha", "Stanley", "Gleem", "Miami"],
    "North Coast": ["Marina", "Sidi Abdelrahman", "Hacienda Bay", "El Alamein"],
    Beheira: ["Damanhour", "Kafr El Dawwar", "Rashid", "Edku"],
    Cairo: ["Maadi", "Nasr City", "Heliopolis", "Zamalek"],
    "New Cairo": ["Fifth Settlement", "Lotus", "South Academy", "El Narges"],
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
    const requestedUserId = new URLSearchParams(window.location.search).get(
        "userId",
    );
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
    document.getElementById("userAvatarInitials").textContent = initials;
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

function openModal(title, subtitle, content) {
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
    profileModalContent.innerHTML = content;
    profileModal.classList.remove("hidden");
}

function closeModal() {
    profileModal?.classList.add("hidden");
}

function setActiveTab(targetId) {
    tabButtons.forEach((button) => {
        button.classList.toggle("active", button.dataset.tab === targetId);
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
    button.addEventListener("click", () => setActiveTab(button.dataset.tab));
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
            screenshotPermissionToggle.classList.contains("allowed");

        screenshotPermissionToggle.classList.toggle("allowed", !isAllowed);
        screenshotPermissionToggle.classList.toggle("blocked", isAllowed);
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

function populateLocations(selectedGovernorate, selectedLocation = "") {
    const locations = locationOptionsByGovernorate[selectedGovernorate] || [];

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
    addressIdPreview.value = isEditMode ? address.id : "Auto Generated";
    governorateSelect.value = isEditMode ? address.governorate : "Cairo";
    populateLocations(
        governorateSelect.value,
        isEditMode ? address.location : "Maadi",
    );
    streetInput.value = isEditMode ? address.streetName : "";
    houseNumberInput.value = isEditMode ? address.houseNumber : "";
    houseNameInput.value = isEditMode ? address.houseName : "";
    floorNumberInput.value = isEditMode ? address.floorNumber : "";
    apartmentNumberInput.value = isEditMode ? address.apartmentNumber : "";
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

    addressesTableBody.innerHTML = addresses
        .map(
            (address) => `
        <tr>
          <td>${address.id}</td>
          <td>${address.governorate}</td>
          <td>${address.location}</td>
          <td>${address.streetName}</td>
          <td>${address.houseNumber}${address.houseName ? `, ${address.houseName}` : ""}</td>
          <td>${address.floorNumber || "-"} / ${address.apartmentNumber || "-"}</td>
          <td>${address.notes || "-"}</td>
          <td>
            <div class="table-actions">
              <button class="table-action-btn view" type="button" data-address-action="view" data-address-id="${address.id}">View</button>
              <button class="table-action-btn edit" type="button" data-address-action="edit" data-address-id="${address.id}">Edit</button>
              <button class="table-action-btn delete" type="button" data-address-action="delete" data-address-id="${address.id}">Delete</button>
            </div>
          </td>
        </tr>
      `,
        )
        .join("");

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
            `<p><strong>Governorate:</strong> ${selectedAddress.governorate}</p>
      <p><strong>Location:</strong> ${selectedAddress.location}</p>
      <p><strong>Street:</strong> ${selectedAddress.streetName}</p>
      <p><strong>House Number:</strong> ${selectedAddress.houseNumber}</p>
      <p><strong>House Name:</strong> ${selectedAddress.houseName || "-"}</p>
      <p><strong>Floor:</strong> ${selectedAddress.floorNumber || "-"}</p>
      <p><strong>Apartment:</strong> ${selectedAddress.apartmentNumber || "-"}</p>
      <p><strong>Notes:</strong> ${selectedAddress.notes || "-"}</p>`,
        );
        return;
    }

    if (action === "edit") {
        setAddressFormMode("edit", selectedAddress);
        setActiveTab("addresses-tab");
        addressForm.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
    }

    if (action === "delete") {
        addresses = addresses.filter((address) => address.id !== addressId);
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
    addressForm.scrollIntoView({ behavior: "smooth", block: "start" });
});

resetAddressFormBtn?.addEventListener("click", () => {
    setAddressFormMode(
        addressEditId.value ? "edit" : "create",
        addresses.find((address) => address.id === addressEditId.value) || null,
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
        `<p><strong>Customer:</strong> ${userDisplayName.textContent}</p>
    <p><strong>Ban Status:</strong> ${banStatusSelect.value}</p>
    <p><strong>Impact:</strong> The customer will be prevented from using the account until the status is reviewed.</p>`,
    );
    showToast("Customer ban status updated to Permanent Ban.");
});

restrictUserBtn?.addEventListener("click", () => {
    restrictedStatusSelect.value = "Messaging Blocked";
    openModal(
        "Restriction Applied",
        "A customer restriction was applied from the profile top bar.",
        `<p><strong>Customer:</strong> ${userDisplayName.textContent}</p>
    <p><strong>Restriction:</strong> ${restrictedStatusSelect.value}</p>
    <p><strong>Note:</strong> Messaging access is now blocked until the admin changes the restriction level.</p>`,
    );
    showToast("Customer restriction updated to Messaging Blocked.");
});

sendMessageTopBtn?.addEventListener("click", () => {
    window.location.href = `./supporter-customer-messages.html?userId=${encodeURIComponent(document.getElementById("profileUserId")?.value || "")}`;
});

saveProfileBtn?.addEventListener("click", () => {
    const tierUserId =
        document.getElementById("profileUserId")?.value || "#USR-102938";
    const tierOverrides = (() => {
        try {
            return (
                JSON.parse(localStorage.getItem("userProfileTierOverrides")) ||
                {}
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
        `<p><strong>Name:</strong> ${nameInput.value || "-"}</p>
    <p><strong>Account Status:</strong> ${activeStatusSelect.value}</p>
    <p><strong>Customer Tier:</strong> ${userTierSelect?.value || "VIP"} Tier</p>
    <p><strong>Ban:</strong> ${banStatusSelect.value}</p>
    <p><strong>Restricted:</strong> ${restrictedStatusSelect.value}</p>
    <p><strong>Summary:</strong> Profile changes are ready and the live state shown on the dashboard has been updated.</p>`,
    );
    showToast("Profile changes saved successfully.");
});

viewAllOrdersBtn?.addEventListener("click", () => {
    openModal(
        "All Orders",
        "A quick extended order snapshot for this customer.",
        `<p><strong>#ORD-7841</strong> • 22 Apr 2026 • Processing • Mobile App • EGP 1,260</p>
    <p><strong>#ORD-7829</strong> • 20 Apr 2026 • Delivered • Website • EGP 980</p>
    <p><strong>#ORD-7794</strong> • 18 Apr 2026 • Pending • Call Center • EGP 2,340</p>
    <p><strong>Insight:</strong> 12 orders are still pending fulfillment based on the user summary.</p>`,
    );
});

exportLogsBtn?.addEventListener("click", () => {
    openModal(
        "Logs Export",
        "Audit log export preview from the customer profile.",
        `<p><strong>Exported By:</strong> admin.sara</p>
    <p><strong>Customer:</strong> ${userDisplayName.textContent}</p>
    <p><strong>Included Events:</strong> Address updates, device logins, and compliance reviews.</p>
    <p><strong>Status:</strong> Export package prepared successfully for download or compliance review.</p>`,
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
    const requestedUserId = new URLSearchParams(window.location.search).get(
        "userId",
    );
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
    document.getElementById("userDisplayName").textContent = profile.name;
    document.getElementById("nameInput").value = profile.name;
    document.getElementById("userAvatarInitials").textContent = initials;
    document.getElementById("profileUserId").value = userId;
    document.getElementById("profilePhone").value = profile.phone;
    document.getElementById("profileEmail").value = profile.email;
    document.getElementById("profileCity").value = profile.city;
    document.getElementById("profileAddress").value = profile.address;
    document.getElementById("userHeroMeta").childNodes[0].textContent =
        `${profile.city}, Egypt `;
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
        document.getElementById("profileUserId")?.value || "#USR-102938";
    let overrides = {};
    try {
        overrides =
            JSON.parse(localStorage.getItem("userProfileTierOverrides")) || {};
    } catch (error) {
        overrides = {};
    }
    const tier = overrides[userId] || userTierDefaults[userId] || "VIP";
    if (userTierSelect) userTierSelect.value = tier;
    if (userTierPill) userTierPill.textContent = `${tier} Tier`;
}
userTierSelect?.addEventListener("change", () => {
    userTierPill.textContent = `${userTierSelect.value} Tier`;
});
applySelectedUserTier();

// Supporter access adapter: keeps the Super Admin profile UI as the source layout.
const supporterProfileSession = (() => {
    try {
        return (
            JSON.parse(localStorage.getItem("tarwiqaSupporterSession")) || {}
        );
    } catch (error) {
        return {};
    }
})();
const supporterProfileRole =
    supporterProfileSession.supporterRole ||
    supporterProfileSession.role ||
    "editor";
const supporterProfileScope = Array.isArray(
    supporterProfileSession.governorates,
)
    ? supporterProfileSession.governorates
    : ["Cairo", "Giza"];
const supporterProfileSeed = [
    {
        id: "#USR-102938",
        name: "Mariam Kamal",
        phone: "+20 109 555 0198",
        additionalNumber: "+20 122 800 4410",
        email: "mariam.ashraf@example.com",
        city: "Cairo",
        address: "12 Nile Corniche, Maadi, Cairo",
        platform: "Mobile App",
        wallet: 24380,
        type: "Retail Customer",
        active: "Active",
        ban: "Not Banned",
        restricted: "Open Access",
        createdDate: "2024-01-18 10:42 AM",
        totalOrders: 148,
        risk: "Low",
        tier: "VIP",
    },
    {
        id: "#USR-102954",
        name: "Youssef Adel",
        phone: "+20 101 444 2290",
        additionalNumber: "+20 114 901 3321",
        email: "y.adel@example.com",
        city: "Alexandria",
        address: "28 Fouad Street, Alexandria",
        platform: "Website",
        wallet: 8940,
        type: "Retail Customer",
        active: "Inactive",
        ban: "Not Banned",
        restricted: "Orders Only",
        createdDate: "2024-03-02 01:20 PM",
        totalOrders: 64,
        risk: "Medium",
        tier: "Gold",
    },
    {
        id: "#USR-103004",
        name: "Nour Hassan",
        phone: "+20 112 760 1903",
        additionalNumber: "+20 127 665 1700",
        email: "n.hassan@example.com",
        city: "Giza",
        address: "7 El Tahrir Street, Dokki, Giza",
        platform: "Mobile App",
        wallet: 17120,
        type: "Retail Customer",
        active: "Active",
        ban: "Temporary Ban",
        restricted: "Wallet Blocked",
        createdDate: "2024-05-14 09:05 AM",
        totalOrders: 92,
        risk: "Medium",
        tier: "Gold",
    },
    {
        id: "#USR-103121",
        name: "Karim Emad",
        phone: "+20 115 903 7744",
        additionalNumber: "+20 120 333 4112",
        email: "karim.emad@example.com",
        city: "Dakahlia",
        address: "34 El Gomhoria Road, Mansoura",
        platform: "Call Center",
        wallet: 2150,
        type: "Retail Customer",
        active: "Active",
        ban: "Not Banned",
        restricted: "Open Access",
        createdDate: "2024-06-09 04:47 PM",
        totalOrders: 31,
        risk: "Low",
        tier: "Standard",
    },
    {
        id: "#USR-103177",
        name: "Salma Hany",
        phone: "+20 100 873 2190",
        additionalNumber: "+20 123 885 0091",
        email: "salma.hany@example.com",
        city: "Gharbia",
        address: "16 El Bahr Street, Tanta",
        platform: "Website",
        wallet: 13500,
        type: "Retail Customer",
        active: "Inactive",
        ban: "Permanent Ban",
        restricted: "Messaging Blocked",
        createdDate: "2024-07-21 11:15 AM",
        totalOrders: 47,
        risk: "High",
        tier: "Standard",
    },
    {
        id: "#USR-103220",
        name: "Hossam Fathy",
        phone: "+20 111 234 6677",
        additionalNumber: "+20 122 991 7722",
        email: "hossam.fathy@example.com",
        city: "Cairo",
        address: "18 Beirut Street, Heliopolis",
        platform: "Mobile App",
        wallet: 6600,
        type: "Retail Customer",
        active: "Active",
        ban: "Not Banned",
        restricted: "Open Access",
        createdDate: "2025-02-11 08:30 AM",
        totalOrders: 22,
        risk: "Low",
        tier: "Standard",
    },
];
function supporterProfileRead(key, fallback) {
    try {
        return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch (error) {
        return fallback;
    }
}
function supporterProfileWrite(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
function supporterProfilePermission(name) {
    return (
        (Array.isArray(supporterProfileSession.permissions)
            ? supporterProfileSession.permissions
            : []
        )
            .flatMap((group) => group.items || [])
            .find((item) => item.name === name) || null
    );
}
function supporterProfileCanView(name, fallback = true) {
    const item = supporterProfilePermission(name);
    return item ? Boolean(item.canView || item.canEdit) : fallback;
}
function supporterProfileCanEdit(
    name,
    fallback = supporterProfileRole === "editor",
) {
    const item = supporterProfilePermission(name);
    return (
        supporterProfileRole === "editor" &&
        (item ? Boolean(item.canEdit) : fallback)
    );
}
function supporterProfileHistory(action, details) {
    const key = `supporterActionHistory:${supporterProfileSession.supporterId || "SUP-0901"}`;
    const rows = supporterProfileRead(key, []);
    supporterProfileWrite(
        key,
        [
            {
                at: new Date().toLocaleString("en", {
                    dateStyle: "medium",
                    timeStyle: "short",
                }),
                action,
                details,
            },
            ...rows,
        ].slice(0, 50),
    );
}
function supporterProfileUsers() {
    const overrides = supporterProfileRead("supporterUserOverrides", {});
    const created = supporterProfileRead("createdUsers", []);
    return [...supporterProfileSeed, ...created]
        .map((entry) => ({ ...entry, ...(overrides[entry.id] || {}) }))
        .filter(
            (entry, index, all) =>
                all.findIndex((item) => item.id === entry.id) === index,
        );
}
function supporterProfileMoney(value) {
    return new Intl.NumberFormat("en-EG", {
        style: "currency",
        currency: "EGP",
        maximumFractionDigits: 0,
    }).format(Number(value) || 0);
}
function supporterProfileSaveUser(user, changes) {
    const overrides = supporterProfileRead("supporterUserOverrides", {});
    overrides[user.id] = {
        ...(overrides[user.id] || {}),
        ...changes,
        updatedAt: new Date().toISOString(),
        updatedBy: supporterProfileSession.supporterId || "SUP-0901",
    };
    supporterProfileWrite("supporterUserOverrides", overrides);
    Object.assign(user, changes);
}
const supporterRequestedUserId =
    new URLSearchParams(location.search).get("userId") || "#USR-102938";
const supporterCurrentUser = supporterProfileUsers().find(
    (entry) => entry.id === supporterRequestedUserId,
);
const supporterProfileAllowed = Boolean(
    supporterCurrentUser &&
    supporterProfileScope.includes(supporterCurrentUser.city) &&
    supporterProfileCanView("Open full user profile", true),
);
if (!supporterProfileAllowed) {
    document.querySelector(".page-shell").innerHTML =
        `<section class="supporter-access-denied"><h2>User profile unavailable</h2><p>This customer is outside your assigned governorates or your account cannot open full user profiles.</p><a class="action-btn ghost" href="./supporter-users.html">Back To Users</a></section>`;
} else {
    const supporterEditable = supporterProfileCanEdit("Edit user profile data");
    const supporterCanBan = supporterProfileCanEdit("Ban or unban user");
    const supporterCanRestrict = supporterProfileCanEdit(
        "Restrict or restore user access",
    );
    const supporterCanMessage = supporterProfileCanView(
        "View customer inbox",
        true,
    );
    const supporterInitials = supporterCurrentUser.name
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase();
    userDisplayName.textContent = supporterCurrentUser.name;
    nameInput.value = supporterCurrentUser.name;
    document.getElementById("userAvatarInitials").textContent =
        supporterInitials;
    document.getElementById("profileUserId").value = supporterCurrentUser.id;
    document.getElementById("profilePhone").value = supporterCurrentUser.phone;
    document.getElementById("profileType").value =
        supporterCurrentUser.type || "Retail Customer";
    document.getElementById("profileCreatedDate").value =
        supporterCurrentUser.createdDate || "-";
    document.getElementById("profileAdditionalNumber").value =
        supporterCurrentUser.additionalNumber || "";
    document.getElementById("profileEmail").value =
        supporterCurrentUser.email || "";
    document.getElementById("profileCity").value =
        supporterCurrentUser.city || "";
    document.getElementById("profileAddress").value =
        supporterCurrentUser.address || "";
    document.getElementById("profilePlatform").value =
        supporterCurrentUser.platform || "Mobile App";
    document.getElementById("profileWallet").value = supporterProfileMoney(
        supporterCurrentUser.wallet,
    );
    document.getElementById("totalOrdersStat").textContent =
        supporterCurrentUser.totalOrders || 0;
    document.getElementById("walletBalanceStat").textContent =
        supporterProfileMoney(supporterCurrentUser.wallet);
    document.getElementById("riskScoreStat").textContent =
        supporterCurrentUser.risk || "Low";
    userTierSelect.value =
        supporterCurrentUser.tier || userTierSelect.value || "VIP";
    userTierPill.textContent = `${userTierSelect.value} Tier`;
    document.getElementById("userHeroMeta").childNodes[0].textContent =
        `${supporterCurrentUser.city}, Egypt `;
    activeStatusSelect.value =
        supporterCurrentUser.active === "Inactive" ? "Disabled" : "Enabled";
    banStatusSelect.value = supporterCurrentUser.ban || "Not Banned";
    restrictedStatusSelect.value =
        supporterCurrentUser.restricted || "Open Access";
    document.title = `${supporterCurrentUser.name} - User Profile`;

    const savedAddresses = supporterProfileRead(
        `supporterUserAddresses:${supporterCurrentUser.id}`,
        null,
    );
    if (Array.isArray(savedAddresses) && savedAddresses.length) {
        addresses = savedAddresses;
    } else if (supporterCurrentUser.id !== "#USR-102938") {
        addresses = [
            {
                id: "#ADDR-2001",
                governorate: supporterCurrentUser.city,
                location: supporterCurrentUser.city,
                streetName: supporterCurrentUser.address,
                houseNumber: "-",
                houseName: "",
                floorNumber: "",
                apartmentNumber: "",
                notes: "Primary customer address.",
            },
        ];
    }
    renderAddressesTable();

    const editableFields = [
        nameInput,
        document.getElementById("profileAdditionalNumber"),
        document.getElementById("profileEmail"),
        document.getElementById("profileCity"),
        document.getElementById("profileAddress"),
        document.getElementById("profilePlatform"),
        document.getElementById("profileWallet"),
    ];
    editableFields.forEach((field) => {
        field.disabled = !supporterEditable;
    });
    activeStatusSelect.disabled = !supporterEditable;
    userTierSelect.disabled = !supporterEditable;
    saveProfileBtn.hidden = !supporterEditable;
    screenshotPermissionToggle.disabled = !supporterEditable;
    banStatusSelect.disabled = !supporterCanBan;
    banUserBtn.hidden = !supporterCanBan;
    restrictedStatusSelect.disabled = !supporterCanRestrict;
    restrictUserBtn.hidden = !supporterCanRestrict;
    sendMessageTopBtn.hidden = !supporterCanMessage;
    const addressEditor = document.querySelector(".address-editor-card");
    if (!supporterEditable) {
        document
            .querySelector(".details-card")
            .insertAdjacentHTML(
                "afterbegin",
                '<p class="supporter-readonly-note">View-only access. Profile and address controls follow your Supporter permissions.</p>',
            );
        addNewAddressBtn.hidden = true;
        if (addressEditor) addressEditor.hidden = true;
        document
            .querySelectorAll(
                '[data-address-action="edit"], [data-address-action="delete"]',
            )
            .forEach((button) => (button.hidden = true));
    }

    saveProfileBtn.addEventListener("click", () => {
        const walletValue =
            Number(
                document
                    .getElementById("profileWallet")
                    .value.replace(/[^0-9.-]/g, ""),
            ) || 0;
        supporterProfileSaveUser(supporterCurrentUser, {
            name: nameInput.value.trim(),
            additionalNumber: document
                .getElementById("profileAdditionalNumber")
                .value.trim(),
            email: document.getElementById("profileEmail").value.trim(),
            city: document.getElementById("profileCity").value.trim(),
            address: document.getElementById("profileAddress").value.trim(),
            platform: document.getElementById("profilePlatform").value.trim(),
            wallet: walletValue,
            tier: userTierSelect.value,
            active:
                activeStatusSelect.value === "Enabled" ? "Active" : "Inactive",
            ban: banStatusSelect.value,
            restricted: restrictedStatusSelect.value,
        });
        supporterProfileHistory(
            `Edited user ${supporterCurrentUser.id}`,
            `Saved ${supporterCurrentUser.name} from the Super Admin-matched profile.`,
        );
    });
    banUserBtn.addEventListener("click", () => {
        supporterProfileSaveUser(supporterCurrentUser, {
            ban: banStatusSelect.value,
        });
        supporterProfileHistory(
            `Changed user ban ${supporterCurrentUser.id}`,
            `Ban status set to ${banStatusSelect.value}.`,
        );
    });
    restrictUserBtn.addEventListener("click", () => {
        supporterProfileSaveUser(supporterCurrentUser, {
            restricted: restrictedStatusSelect.value,
        });
        supporterProfileHistory(
            `Changed user restriction ${supporterCurrentUser.id}`,
            `Restriction set to ${restrictedStatusSelect.value}.`,
        );
    });
    screenshotPermissionToggle.addEventListener("click", () => {
        const allowed =
            screenshotPermissionToggle.getAttribute("aria-pressed") === "true";
        const overrides = supporterProfileRead(
            "supporterUserScreenshotPermission",
            {},
        );
        overrides[supporterCurrentUser.id] = allowed;
        supporterProfileWrite("supporterUserScreenshotPermission", overrides);
        supporterProfileHistory(
            `Changed screenshot permission ${supporterCurrentUser.id}`,
            `Screenshot permission is ${allowed ? "allowed" : "blocked"}.`,
        );
    });
    addressForm.addEventListener("submit", () =>
        setTimeout(
            () =>
                supporterProfileWrite(
                    `supporterUserAddresses:${supporterCurrentUser.id}`,
                    addresses,
                ),
            0,
        ),
    );
    addressesTableBody.addEventListener("click", () =>
        setTimeout(
            () =>
                supporterProfileWrite(
                    `supporterUserAddresses:${supporterCurrentUser.id}`,
                    addresses,
                ),
            0,
        ),
    );
    document
        .getElementById("openWalletLedgerBtn")
        ?.addEventListener("click", () =>
            openModal(
                "Wallet Ledger",
                "Customer wallet summary from the profile.",
                `<p><strong>Customer:</strong> ${supporterCurrentUser.name}</p><p><strong>Current Balance:</strong> ${supporterProfileMoney(supporterCurrentUser.wallet)}</p><p><strong>Access:</strong> Wallet details shown inside the Supporter workspace.</p>`,
            ),
        );
    document
        .getElementById("openMessagesHistoryBtn")
        ?.addEventListener("click", () => {
            location.href = `./supporter-customer-messages.html?userId=${encodeURIComponent(supporterCurrentUser.id)}`;
        });
    supporterProfileHistory(
        `Viewed user ${supporterCurrentUser.id}`,
        `Opened ${supporterCurrentUser.name} profile using the Super Admin base layout.`,
    );
}
