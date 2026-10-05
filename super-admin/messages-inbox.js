const messages = [
  {
    id: "msg-1001",
    customerName: "Mariam Kamal",
    userId: "#USR-102938",
    unreadCount: 3,
    preview: "I need an update about my delayed order and whether the technician will arrive today.",
    box: "inbox",
    status: "unread",
    updatedAt: "23 Apr 2026, 10:14 AM"
  },
  {
    id: "msg-1002",
    customerName: "Youssef Adel",
    userId: "#USR-102954",
    unreadCount: 1,
    preview: "Thank you for the follow-up. Please confirm when the refund will reflect in my wallet.",
    box: "starred",
    status: "unread",
    updatedAt: "23 Apr 2026, 09:42 AM"
  },
  {
    id: "msg-1003",
    customerName: "Nour Hassan",
    userId: "#USR-103004",
    unreadCount: 4,
    preview: "This is the second time I am reporting the same issue. I still need a clear resolution.",
    box: "inbox",
    status: "unread",
    updatedAt: "23 Apr 2026, 08:18 AM"
  },
  {
    id: "msg-1004",
    customerName: "Karim Emad",
    userId: "#USR-103121",
    unreadCount: 0,
    preview: "Appreciate the support team response. The issue is solved now.",
    box: "sent",
    status: "read",
    updatedAt: "22 Apr 2026, 06:10 PM"
  },
  {
    id: "msg-1005",
    customerName: "Salma Hany",
    userId: "#USR-103177",
    unreadCount: 2,
    preview: "I received multiple promotional messages that do not match my request.",
    box: "junk",
    status: "unread",
    updatedAt: "22 Apr 2026, 03:25 PM"
  },
  {
    id: "msg-1006",
    customerName: "Hossam Fathy",
    userId: "#USR-103220",
    unreadCount: 0,
    preview: "Please send me the invoice copy to my email and confirm the payment details.",
    box: "sent",
    status: "read",
    updatedAt: "22 Apr 2026, 01:55 PM"
  }
];

const messagesTableBody = document.getElementById("messagesTableBody");
const filterTabs = document.querySelectorAll(".filter-tab");
const selectAllCheckbox = document.getElementById("selectAllCheckbox");
const clearSelectionBtn = document.getElementById("clearSelectionBtn");
const markReadBtn = document.getElementById("markReadBtn");
const moveJunkBtn = document.getElementById("moveJunkBtn");
const selectionSummary = document.getElementById("selectionSummary");
const composeReplyBtn = document.getElementById("composeReplyBtn");
const openRulesBtn = document.getElementById("openRulesBtn");
const messageDetailsModal = document.getElementById("messageDetailsModal");
const closeMessageModalBtn = document.getElementById("closeMessageModalBtn");
const closeMessageFooterBtn = document.getElementById("closeMessageFooterBtn");
const markSingleReadBtn = document.getElementById("markSingleReadBtn");
const sendReplyBtn = document.getElementById("sendReplyBtn");
const messageRulesModal = document.getElementById("messageRulesModal");
const closeRulesModalBtn = document.getElementById("closeRulesModalBtn");
const closeRulesFooterBtn = document.getElementById("closeRulesFooterBtn");
const messageModalTitle = document.getElementById("messageModalTitle");
const messageModalSubtitle = document.getElementById("messageModalSubtitle");
const messageAvatar = document.getElementById("messageAvatar");
const messageCustomerName = document.getElementById("messageCustomerName");
const messageMetaLine = document.getElementById("messageMetaLine");
const messageBoxValue = document.getElementById("messageBoxValue");
const messageStatusValue = document.getElementById("messageStatusValue");
const messageUnreadValue = document.getElementById("messageUnreadValue");
const messageUpdatedValue = document.getElementById("messageUpdatedValue");
const messagePreviewCopy = document.getElementById("messagePreviewCopy");
const quickReplyInput = document.getElementById("quickReplyInput");
const inboxToast = document.getElementById("inboxToast");
const inboxToastMessage = document.getElementById("inboxToastMessage");

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

function getInitials(name) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
}

function openModal(modalElement) {
  modalElement?.classList.remove("hidden");
}

function closeModal(modalElement) {
  modalElement?.classList.add("hidden");
}

function populateMessageModal(message) {
  activeMessageId = message.id;
  messageModalTitle.textContent = `Message Details - ${message.customerName}`;
  messageModalSubtitle.textContent = "Review the customer conversation, mark it as read, or send a quick reply.";
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
  const targetMessage = messages.find((message) => message.id === messageId);

  if (!targetMessage) {
    return;
  }

  populateMessageModal(targetMessage);
  openModal(messageDetailsModal);
}

function getFilteredMessages() {
  if (activeFilter === "starred") {
    return messages.filter((message) => message.box === "starred");
  }

  return messages.filter((message) => message.box === activeFilter);
}

function renderMessages() {
  const filteredMessages = getFilteredMessages();

  messagesTableBody.innerHTML = filteredMessages
    .map(
      (message) => `
        <tr class="row-clickable ${selectedMessages.includes(message.id) ? "selected" : ""}" data-message-row="${message.id}">
          <td>
            <input class="row-checkbox" type="checkbox" data-message-id="${message.id}" ${
              selectedMessages.includes(message.id) ? "checked" : ""
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
      `
    )
    .join("");

  bindRowCheckboxes();
  bindRowClicks();
  bindProfileLinks();
}

function updateMoveButtonState() {
  const isJunkFilter = activeFilter === "junk";
  moveJunkBtn.textContent = isJunkFilter ? "Move to Inbox All" : "Move to Junk";
  moveJunkBtn.classList.toggle("restore", isJunkFilter);
  moveJunkBtn.classList.toggle("warning", !isJunkFilter);
}

function updateSelectionState() {
  const filteredMessages = getFilteredMessages();
  const count = selectedMessages.length;

  selectionSummary.textContent = count > 0 ? `${count} selected` : "0 selected";
  clearSelectionBtn.disabled = count === 0;
  markReadBtn.disabled = count === 0;
  moveJunkBtn.disabled = count === 0;
  selectAllCheckbox.checked = filteredMessages.length > 0 && count === filteredMessages.length;
  selectAllCheckbox.indeterminate = count > 0 && count < filteredMessages.length;
  updateMoveButtonState();
}

function bindRowCheckboxes() {
  document.querySelectorAll(".row-checkbox").forEach((checkbox) => {
    checkbox.addEventListener("change", (event) => {
      event.stopPropagation();
      const { messageId } = event.target.dataset;

      if (event.target.checked) {
        selectedMessages = [...new Set([...selectedMessages, messageId])];
      } else {
        selectedMessages = selectedMessages.filter((id) => id !== messageId);
      }

      renderMessages();
      updateSelectionState();
    });
  });
}

function bindRowClicks() {
  document.querySelectorAll("[data-message-row]").forEach((row) => {
    row.addEventListener("click", () => {
      openMessageDetails(row.dataset.messageRow);
    });
  });
}

function bindProfileLinks() {
  document.querySelectorAll("[data-open-profile]").forEach((button) => {
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

    filterTabs.forEach((item) => item.classList.toggle("active", item === tab));
    renderMessages();
    updateSelectionState();
  });
});

selectAllCheckbox.addEventListener("change", (event) => {
  selectedMessages = event.target.checked ? getFilteredMessages().map((message) => message.id) : [];
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
  const destinationBox = activeFilter === "junk" ? "inbox" : "junk";
  const destinationLabel = destinationBox === "inbox" ? "Inbox All" : "Junk";

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

closeMessageModalBtn?.addEventListener("click", () => closeModal(messageDetailsModal));
closeMessageFooterBtn?.addEventListener("click", () => closeModal(messageDetailsModal));
closeRulesModalBtn?.addEventListener("click", () => closeModal(messageRulesModal));
closeRulesFooterBtn?.addEventListener("click", () => closeModal(messageRulesModal));

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
  const targetMessage = messages.find((message) => message.id === activeMessageId);

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
  const targetMessage = messages.find((message) => message.id === activeMessageId);
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


