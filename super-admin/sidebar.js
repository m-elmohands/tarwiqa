const sidebarGroups = {
  users: ["user-list.html", "add-user.html", "send-message.html", "index.html"],
  maids: ["maids.html", "add-maid.html", "maid-details.html"],
  orders: ["under-review-orders.html", "waiting-list.html", "scheduled-orders.html", "accepted-orders.html", "done-orders.html", "cancelled-orders.html"],  ads: ["ads-spaces.html", "ads-history.html"],
  supporters: ["supporters-list.html", "supporter-profile.html", "add-supporter.html"],
  operators: ["operators-list.html", "partner-profile.html", "operators-msgs.html", "add-operators.html"],
};

function getCurrentSidebarPage() {
  const explicitPage = new URLSearchParams(window.location.search).get("page");
  if (explicitPage) {
    return explicitPage;
  }

  const fileName = window.location.pathname.split("/").pop();
  return fileName && fileName !== "sidebar.html" ? fileName : "admin-dashboard.html";
}

function markActiveSidebar(root, currentPage) {
  root.querySelectorAll("[data-sidebar-page]").forEach((item) => {
    const page = item.dataset.sidebarPage;
    const isDirectMatch = page === currentPage;
    const isAdsHistory = page === "ads-spaces.html" && currentPage === "ads-history.html";
    item.classList.toggle("active", isDirectMatch || isAdsHistory);
  });

  root.querySelectorAll("[data-sidebar-group]").forEach((group) => {
    const pages = sidebarGroups[group.dataset.sidebarGroup] || [];
    group.classList.toggle("open", pages.includes(currentPage));
  });
}

function getPartnersUnreadCount() {
  const storedCount = Number(localStorage.getItem("operatorsUnreadMessages"));
  return Number.isFinite(storedCount) ? storedCount : 4;
}

function updatePartnersUnreadBadge(root) {
  const count = getPartnersUnreadCount();
  root.querySelectorAll("[data-operators-unread]").forEach((badge) => {
    badge.textContent = String(count);
    badge.classList.toggle("hidden", count === 0);
  });
}

function getApprovalsPendingCount() {
  const storedCount = Number(localStorage.getItem("approvalPendingCount"));
  return Number.isFinite(storedCount) && localStorage.getItem("approvalPendingCount") !== null ? storedCount : 4;
}

function updateApprovalsPendingBadge(root) {
  const count = getApprovalsPendingCount();
  root.querySelectorAll("[data-approvals-pending]").forEach((badge) => {
    badge.textContent = String(count);
    badge.classList.toggle("hidden", count === 0);
  });
}
function bindSidebarToggles(root) {
  root.querySelectorAll("[data-sidebar-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      button.closest(".dropdown-block")?.classList.toggle("open");
    });
  });
}

function initializeSidebar(root = document, page = getCurrentSidebarPage()) {
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
    const response = await fetch("./sidebar.html", { cache: "no-cache" });
    if (!response.ok) {
      throw new Error("Sidebar request failed");
    }

    const sidebarDocument = new DOMParser().parseFromString(await response.text(), "text/html");
    const sidebarContent = sidebarDocument.querySelector(".sidebar-content");
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

document.addEventListener("approval-count-updated", () => updateApprovalsPendingBadge(document));

loadSharedSidebar();












