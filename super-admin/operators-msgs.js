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
    requestStatus: "Open"
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
    requestStatus: "Open"
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
    requestStatus: "Open"
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
    requestStatus: "Closed"
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
    requestStatus: "Open"
  }
];

const storageKey = "operatorsMessages";
const unreadStorageKey = "operatorsUnreadMessages";
const messagesList = document.getElementById("messagesList");
const messagePanel = document.getElementById("messagePanel");
const messageSearch = document.getElementById("messageSearch");
const messageStatusFilter = document.getElementById("messageStatusFilter");
const totalMessagesCount = document.getElementById("totalMessagesCount");
const unreadMessagesCount = document.getElementById("unreadMessagesCount");
const openRequestsCount = document.getElementById("openRequestsCount");
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
  localStorage.setItem(unreadStorageKey, String(getUnreadCount()));
}

function getUnreadCount() {
  return messages.filter((message) => message.unread).length;
}

function showToast(message) {
  msgsToast.textContent = message;
  msgsToast.classList.remove("hidden");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => msgsToast.classList.add("hidden"), 2600);
}

function getFilteredMessages() {
  const query = messageSearch.value.trim().toLowerCase();
  const status = messageStatusFilter.value;

  return messages.filter((message) => {
    const searchable = `${message.operator} ${message.username} ${message.zone} ${message.subject} ${message.body}`.toLowerCase();
    const matchesQuery = searchable.includes(query);
    const matchesStatus = status === "all" || (status === "unread" ? message.unread : !message.unread);
    return matchesQuery && matchesStatus;
  });
}

function renderMetrics() {
  totalMessagesCount.textContent = String(messages.length);
  unreadMessagesCount.textContent = String(getUnreadCount());
  openRequestsCount.textContent = String(messages.filter((message) => message.requestStatus === "Open").length);
  operatorsCount.textContent = String(new Set(messages.map((message) => message.username)).size);
}

function renderMessagesList() {
  const filtered = getFilteredMessages();

  if (!filtered.length) {
    messagesList.innerHTML = '<div class="message-item"><strong>No messages found</strong><p class="message-preview">Try another search or status filter.</p></div>';
    return;
  }

  messagesList.innerHTML = filtered.map((message) => `
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
  `).join("");
}

function renderMessagePanel() {
  const message = messages.find((item) => item.id === activeMessageId);

  if (!message) {
    messagePanel.innerHTML = '<div class="empty-panel"><strong>Select a message</strong><span>Message details and reply tools will appear here.</span></div>';
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

  document.getElementById("replyForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const replyText = document.getElementById("replyText").value.trim();
    if (!replyText) {
      showToast("Write a reply before sending.");
      return;
    }
    showToast(`Reply sent to ${message.operator}.`);
    document.getElementById("replyText").value = "";
  });

  document.getElementById("closeRequestBtn").addEventListener("click", () => {
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
  messages.forEach((message) => { message.unread = false; });
  saveMessages();
  renderAll();
  showToast("All partner messages marked as read.");
}

function exportMessages() {
  showToast(`Prepared export for ${getFilteredMessages().length} partner messages.`);
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


