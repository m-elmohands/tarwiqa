const supporterMessages = [
    {
        id: "SM-1001",
        supporter: "Hassan Mahmoud",
        supporterId: "SUP-0901",
        governorate: "Cairo",
        subject: "Partner issue follow-up",
        body: "OP-1024 reported that ORD-9402 needs customer address confirmation before assignment.",
        status: "unread",
        type: "Partner Escalation",
        at: "Aug 11, 2026 10:12 AM",
    },
    {
        id: "SM-1002",
        supporter: "Reem Ashraf",
        supporterId: "SUP-0902",
        governorate: "Alexandria",
        subject: "Customer inquiry response",
        body: "Customer asked about rescheduling an Alexandria order for tomorrow morning.",
        status: "read",
        type: "Customer Support",
        at: "Aug 11, 2026 09:34 AM",
    },
    {
        id: "SM-1003",
        supporter: "Omar Nabil",
        supporterId: "SUP-0903",
        governorate: "Dakahlia",
        subject: "Export permission blocked",
        body: "Supporter needs admin confirmation for a scoped report export attempt.",
        status: "unread",
        type: "Access Request",
        at: "Aug 10, 2026 06:20 PM",
    },
];

const q = (id) => document.getElementById(id);
let activeMessageId = null;
let toastTimer;

function showToast(message) {
    q("supporterMessagesToast").textContent = message;
    q("supporterMessagesToast").classList.remove("hidden");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(
        () => q("supporterMessagesToast").classList.add("hidden"),
        2600,
    );
}

function filteredMessages() {
    const query = q("supporterMessageSearch").value.trim().toLowerCase();
    const supporter = q("supporterFilter").value;
    const status = q("statusFilter").value;
    return supporterMessages.filter((message) => {
        const searchable =
            `${message.id} ${message.supporter} ${message.governorate} ${message.subject} ${message.body} ${message.type}`.toLowerCase();
        return (
            searchable.includes(query) &&
            (supporter === "all" || message.supporterId === supporter) &&
            (status === "all" || message.status === status)
        );
    });
}

function renderMetrics() {
    q("unreadMetric").textContent = supporterMessages.filter(
        (message) => message.status === "unread",
    ).length;
    q("escalationMetric").textContent = supporterMessages.filter(
        (message) => message.type === "Partner Escalation",
    ).length;
}

function renderSupporterOptions() {
    const unique = [
        ...new Map(
            supporterMessages.map((message) => [message.supporterId, message]),
        ).values(),
    ];
    q("supporterFilter").innerHTML =
        '<option value="all">All Supporters</option>' +
        unique
            .map(
                (message) =>
                    `<option value="${message.supporterId}">${message.supporter}</option>`,
            )
            .join("");
}

function renderMessages() {
    const rows = filteredMessages();
    q("supporterMessageList").innerHTML = rows.length
        ? rows
              .map(
                  (message) => `
    <article class="message-item ${message.status}" data-message-id="${message.id}">
      <div>
        <strong>${message.subject}</strong>
        <p>${message.body}</p>
        <div class="message-meta"><span>${message.supporter}</span><span>${message.governorate}</span><span>${message.type}</span><span>${message.at}</span></div>
      </div>
      <div class="message-actions"><button class="row-btn" type="button" data-view-message="${message.id}">View</button><button class="row-btn secondary" type="button" data-read-message="${message.id}">Mark Read</button></div>
    </article>
  `,
              )
              .join("")
        : '<article class="message-item"><strong>No supporter messages match the selected filters.</strong></article>';
}

function openMessage(id) {
    const message = supporterMessages.find((item) => item.id === id);
    if (!message) return;
    activeMessageId = id;
    message.status = "read";
    q("messageModalTitle").textContent = message.subject;
    q("messageModalEyebrow").textContent =
        `${message.supporter} / ${message.governorate}`;
    q("messageDetails").innerHTML = [
        ["Message ID", message.id],
        ["Supporter", `${message.supporter} / ${message.supporterId}`],
        ["Governorate", message.governorate],
        ["Type", message.type],
        ["Date", message.at],
        ["Message", message.body],
    ]
        .map(
            ([label, value]) =>
                `<article class="detail-field"><span>${label}</span><strong>${value}</strong></article>`,
        )
        .join("");
    q("messageModal").classList.remove("hidden");
    q("messageModal").setAttribute("aria-hidden", "false");
    renderMetrics();
    renderMessages();
}

function closeMessage() {
    q("messageModal").classList.add("hidden");
    q("messageModal").setAttribute("aria-hidden", "true");
    q("replyInput").value = "";
    activeMessageId = null;
}

q("supporterMessageSearch").addEventListener("input", renderMessages);
q("supporterFilter").addEventListener("change", renderMessages);
q("statusFilter").addEventListener("change", renderMessages);
q("supporterMessageList").addEventListener("click", (event) => {
    const view = event.target.closest("[data-view-message]");
    const read = event.target.closest("[data-read-message]");
    if (view) openMessage(view.dataset.viewMessage);
    if (read) {
        const message = supporterMessages.find(
            (item) => item.id === read.dataset.readMessage,
        );
        if (message) message.status = "read";
        renderMetrics();
        renderMessages();
        showToast("Supporter message marked as read.");
    }
});
q("markAllReadBtn").addEventListener("click", () => {
    supporterMessages.forEach((message) => (message.status = "read"));
    renderMetrics();
    renderMessages();
    showToast("All supporter messages marked as read.");
});
q("composeSupporterBtn").addEventListener("click", () =>
    showToast("Compose supporter message opened."),
);
q("closeMessageModal").addEventListener("click", closeMessage);
q("messageModal").addEventListener("click", (event) => {
    if (event.target === q("messageModal")) closeMessage();
});
q("supporterReplyForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const reply = q("replyInput").value.trim();
    if (!reply || !activeMessageId) return;
    closeMessage();
    showToast("Reply sent to supporter.");
});

renderSupporterOptions();
renderMetrics();
renderMessages();
