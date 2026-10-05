const openFunnelBtn = document.getElementById("openFunnelBtn");
const closeFunnelBtn = document.getElementById("closeFunnelBtn");
const funnelOverlay = document.getElementById("funnelOverlay");
const logsTableBody = document.getElementById("logsTableBody");
const userIdSearchInput = document.getElementById("userIdSearchInput");
const sessionDateSearchInput = document.getElementById("sessionDateSearchInput");
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
    result: "Requested"
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
    result: "Viewed Only"
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
    result: "Viewed Only"
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
    result: "Requested"
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
    result: "Requested"
  }
];

function renderLogs() {
  const userIdQuery = userIdSearchInput.value.trim().toLowerCase();
  const dateQuery = sessionDateSearchInput.value;

  const filteredLogs = inquiryLogs.filter((log) => {
    const matchesUserId = !userIdQuery || log.userId.toLowerCase().includes(userIdQuery);
    const matchesDate = !dateQuery || log.sessionDate === dateQuery;

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
          `
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
  if (event.key === "Escape" && !funnelOverlay.classList.contains("hidden")) {
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
