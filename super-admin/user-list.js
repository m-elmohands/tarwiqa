const users = [
  {
    id: "#USR-102938",
    name: "mariam ashraf awad",
    phone: "+20 109 555 0198",
    additionalNumber: "+20 122 800 4410",
    email: "mariam.ashraf.awad@example.com",
    city: "Cairo",
    address: "12 Nile Corniche, Maadi, Cairo",
    platform: "Mobile App",
    wallet: "EGP 24,380",
    type: "User",
    active: "Active",
    ban: "Not Banned",
    restricted: "Open Access",
    createdDate: "2024-01-18 10:42 AM"
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
    wallet: "EGP 8,940",
    type: "User",
    active: "Inactive",
    ban: "Not Banned",
    restricted: "Orders Only",
    createdDate: "2024-03-02 01:20 PM"
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
    wallet: "EGP 17,120",
    type: "User",
    active: "Active",
    ban: "Temporary Ban",
    restricted: "Wallet Blocked",
    createdDate: "2024-05-14 09:05 AM"
  },
  {
    id: "#USR-103121",
    name: "Karim Emad",
    phone: "+20 115 903 7744",
    additionalNumber: "+20 120 333 4112",
    email: "karim.emad@example.com",
    city: "Mansoura",
    address: "34 El Gomhoria Road, Mansoura",
    platform: "Call Center",
    wallet: "EGP 2,150",
    type: "User",
    active: "Active",
    ban: "Not Banned",
    restricted: "Open Access",
    createdDate: "2024-06-09 04:47 PM"
  },
  {
    id: "#USR-103177",
    name: "Salma Hany",
    phone: "+20 100 873 2190",
    additionalNumber: "+20 123 885 0091",
    email: "salma.hany@example.com",
    city: "Tanta",
    address: "16 El Bahr Street, Tanta",
    platform: "Website",
    wallet: "EGP 13,500",
    type: "User",
    active: "Inactive",
    ban: "Permanent Ban",
    restricted: "Messaging Blocked",
    createdDate: "2024-07-21 11:15 AM"
  }
];

const userTableBody = document.getElementById("userTableBody");
const selectAllCheckbox = document.getElementById("selectAllCheckbox");
const clearSelectionBtn = document.getElementById("clearSelectionBtn");
const selectionSummary = document.getElementById("selectionSummary");
const bulkButtons = document.querySelectorAll("[data-bulk-action]");
const userListModal = document.getElementById("userListModal");
const userListModalTitle = document.getElementById("userListModalTitle");
const userListModalSubtitle = document.getElementById("userListModalSubtitle");
const userListModalContent = document.getElementById("userListModalContent");
const closeUserListModalBtn = document.getElementById("closeUserListModalBtn");
const closeUserListModalFooterBtn = document.getElementById("closeUserListModalFooterBtn");
const userListToast = document.getElementById("userListToast");
const userListToastMessage = document.getElementById("userListToastMessage");

let selectedUsers = [];
let pendingCommunication = null;
let toastTimeoutId = null;

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

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
  if (!userListModal || !userListModalTitle || !userListModalSubtitle || !userListModalContent) {
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
      subtitle: "Write and send an in-app push notification to the selected customers.",
      subjectLabel: "Notification Title",
      bodyLabel: "Notification Message",
      subjectPlaceholder: "Example: Your booking update is ready",
      bodyPlaceholder: "Example: Hi, we have an update about your latest request.",
      confirmLabel: "Send Push",
      toastLabel: "Push notification sent"
    },
    email: {
      title: "Send Email Campaign",
      channel: "Email",
      subtitle: "Write and send an email to the selected customer email addresses.",
      subjectLabel: "Email Subject",
      bodyLabel: "Email Body",
      subjectPlaceholder: "Example: Important update from Tarwiqa",
      bodyPlaceholder: "Example: Hello, here are the details we wanted to share with you.",
      confirmLabel: "Send Email",
      toastLabel: "Email sent"
    },
    whatsapp: {
      title: "Send WhatsApp Message",
      channel: "WhatsApp",
      subtitle: "Write and send a WhatsApp message to the selected customer phone numbers.",
      subjectLabel: "Message Label",
      bodyLabel: "WhatsApp Message",
      subjectPlaceholder: "Example: Order Update",
      bodyPlaceholder: "Example: Hello, your request has been updated. Reply here if you need support.",
      confirmLabel: "Send WhatsApp",
      toastLabel: "WhatsApp message sent"
    }
  };

  return configs[action] || configs.push;
}

function buildRecipientList(records, action) {
  return records
    .map((user) => {
      const destination = action === "email" ? user.email : user.phone;
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
            <input class="row-checkbox" type="checkbox" data-user-id="${escapeHtml(user.id)}" ${
              selectedUsers.includes(user.id) ? "checked" : ""
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
          <td>${escapeHtml(user.platform)}</td>
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
      `
    )
    .join("");
}

function updateBulkActions() {
  const count = selectedUsers.length;
  const hasSelection = count > 0;

  selectionSummary.textContent = hasSelection ? `${count} users selected` : "0 users selected";
  clearSelectionBtn.disabled = !hasSelection;

  bulkButtons.forEach((button) => {
    const labelMap = {
      push: "Send Push",
      email: "Send Email",
      whatsapp: "WhatsApp"
    };

    button.disabled = !hasSelection;
    button.textContent = `${labelMap[button.dataset.bulkAction]} (${count})`;
  });

  selectAllCheckbox.checked = count === users.length && users.length > 0;
  selectAllCheckbox.indeterminate = count > 0 && count < users.length;
}

function bindTableInteractions() {
  document.querySelectorAll(".row-checkbox").forEach((checkbox) => {
    checkbox.addEventListener("change", (event) => {
      const userId = event.target.dataset.userId;

      if (event.target.checked) {
        selectedUsers = [...new Set([...selectedUsers, userId])];
      } else {
        selectedUsers = selectedUsers.filter((id) => id !== userId);
      }

      renderUsers();
      updateBulkActions();
      bindTableInteractions();
    });
  });

  document.querySelectorAll("[data-row-action]").forEach((button) => {
    button.addEventListener("click", (event) => {
      const action = event.currentTarget.dataset.rowAction;
      const userId = event.currentTarget.dataset.userId;
      const user = getUserById(userId);

      if (!user) {
        return;
      }

      if (action === "view") {
        window.location.href = "./index.html";
        return;
      }

      if (action === "message") {
        window.location.href = `./send-message.html?userId=${encodeURIComponent(user.id)}`;
        return;
      }

      if (action === "ban") {
        user.ban = user.ban === "Not Banned" ? "Temporary Ban" : "Not Banned";
        renderUsers();
        updateBulkActions();
        bindTableInteractions();
        showToast(`${user.name} ban status changed to ${user.ban}.`);
        return;
      }

      if (action === "restrict") {
        user.restricted = user.restricted === "Open Access" ? "Messaging Blocked" : "Open Access";
        renderUsers();
        updateBulkActions();
        bindTableInteractions();
        showToast(`${user.name} restriction changed to ${user.restricted}.`);
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
          <p><strong>Status:</strong> ${escapeHtml(user.active)} / ${escapeHtml(user.ban)} / ${escapeHtml(user.restricted)}</p>`
        );
      }
    });
  });

  document.querySelectorAll("[data-open-profile]").forEach((button) => {
    button.addEventListener("click", () => {
      window.location.href = "./index.html";
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
    </div>`
  );

  closeUserListModalFooterBtn.textContent = config.confirmLabel;
  closeUserListModalFooterBtn.classList.add("primary-action");
}

function sendPendingCommunication() {
  if (!pendingCommunication) {
    closeModal();
    return;
  }

  const config = getCommunicationConfig(pendingCommunication.action);
  const subject = document.getElementById("communicationSubject")?.value.trim();
  const body = document.getElementById("communicationBody")?.value.trim();

  if (!subject || !body) {
    showToast("Add a title and message before sending.");
    return;
  }

  const count = pendingCommunication.recipients.length;
  const destinationLabel = pendingCommunication.action === "email" ? "email addresses" : "phone numbers";
  const sentDate = new Date();
  const sentAt = sentDate.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });

  userListModalTitle.textContent = `${config.channel} Sent`;
  userListModalSubtitle.textContent = `Sent to ${count} customer${count === 1 ? "" : "s"} on ${sentAt}.`;
  userListModalContent.innerHTML = `<p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
    <p><strong>Message:</strong> ${escapeHtml(body)}</p>
    <p><strong>Recipients:</strong> ${count} ${escapeHtml(destinationLabel)}</p>
    <p><strong>Send Date & Time:</strong> ${escapeHtml(sentAt)}</p>
    <p><strong>Status:</strong> Delivery request created successfully.</p>`;

  pendingCommunication = null;
  resetModalFooter();
  showToast(`${config.toastLabel} to ${count} customer${count === 1 ? "" : "s"}.`);
}

selectAllCheckbox.addEventListener("change", (event) => {
  selectedUsers = event.target.checked ? users.map((user) => user.id) : [];
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


