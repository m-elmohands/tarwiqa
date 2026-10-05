const ordersDropdownBtn = document.getElementById("ordersDropdownBtn");
const ordersDropdownContainer = ordersDropdownBtn?.closest(".dropdown-block");

if (ordersDropdownBtn && ordersDropdownContainer) {
  ordersDropdownBtn.addEventListener("click", () => {
    ordersDropdownContainer.classList.toggle("open");
  });
}

const refreshKpisBtn = document.getElementById("refreshKpisBtn");
const activePartnersMetric = document.getElementById("activePartnersMetric");
const activePartnersNote = document.getElementById("activePartnersNote");
const partnerProfitMetric = document.getElementById("partnerProfitMetric");
const maidProfitMetric = document.getElementById("maidProfitMetric");

const dashboardFinancialDefaults = {
  activePartners: 26,
  partnerProfit: 612000,
  maidProfit: 1020000
};

function readFinancialSnapshot() {
  try {
    const stored = JSON.parse(localStorage.getItem("dashboardFinancialSnapshot"));
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
  activePartnersMetric.textContent = Intl.NumberFormat("en").format(Number(snapshot.activePartners) || 0);
  partnerProfitMetric.textContent = formatCompactCurrency(snapshot.partnerProfit);
  maidProfitMetric.textContent = formatCompactCurrency(snapshot.maidProfit);
  activePartnersNote.textContent = `Currently active across all work zones - updated ${new Date().toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit" })}`;
}

refreshKpisBtn?.addEventListener("click", renderFinancialSnapshot);
renderFinancialSnapshot();