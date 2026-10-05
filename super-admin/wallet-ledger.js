const ledgerTableBody = document.getElementById("ledgerTableBody");
const filterTabs = document.querySelectorAll(".filter-tab");
const ledgerSearchInput = document.getElementById("ledgerSearchInput");
const openAddBalanceBtn = document.getElementById("openAddBalanceBtn");
const addBalanceModal = document.getElementById("addBalanceModal");
const closeAddBalanceBtn = document.getElementById("closeAddBalanceBtn");
const cancelAddBalanceBtn = document.getElementById("cancelAddBalanceBtn");
const addBalanceForm = document.getElementById("addBalanceForm");
const balanceSourceType = document.getElementById("balanceSourceType");
const balanceAmountInput = document.getElementById("balanceAmountInput");
const balanceReferenceInput = document.getElementById("balanceReferenceInput");
const balanceReasonCode = document.getElementById("balanceReasonCode");
const balanceApprovedByInput = document.getElementById("balanceApprovedByInput");
const balanceNoteInput = document.getElementById("balanceNoteInput");
const currentWalletBalance = document.getElementById("currentWalletBalance");
const previewCurrentBalance = document.getElementById("previewCurrentBalance");
const previewAddedAmount = document.getElementById("previewAddedAmount");
const previewNextBalance = document.getElementById("previewNextBalance");
const totalBankTransferValue = document.getElementById("totalBankTransferValue");
const totalEwalletValue = document.getElementById("totalEwalletValue");
const totalRefundsValue = document.getElementById("totalRefundsValue");
const ledgerEntriesCount = document.getElementById("ledgerEntriesCount");
const successToast = document.getElementById("successToast");
const successToastMessage = document.getElementById("successToastMessage");

const ledgerEntries = [
  {
    id: "#WL-90411",
    date: "23 Apr 2026, 09:15 AM",
    type: "credit",
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
    type: "debit",
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
    type: "refund",
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
    type: "credit",
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
    type: "debit",
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
    type: "credit",
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

function formatCurrency(value) {
  return `EGP ${value.toLocaleString("en-US")}`;
}

function formatAmount(value, type = "credit") {
  const prefix = type === "debit" ? "-" : "+";
  return `${prefix} EGP ${value.toLocaleString("en-US")}`;
}

function syncSummaryValues() {
  currentWalletBalance.textContent = formatCurrency(walletBalanceAmount);
  previewCurrentBalance.textContent = formatCurrency(walletBalanceAmount);
  totalBankTransferValue.textContent = formatCurrency(totalBankTransferAmount);
  totalEwalletValue.textContent = formatCurrency(totalEwalletAmount);
  totalRefundsValue.textContent = formatCurrency(totalRefundAmount);
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
  previewNextBalance.textContent = formatCurrency(walletBalanceAmount + amount);
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
  const searchValue = (ledgerSearchInput?.value || "").trim().toLowerCase();

  return ledgerEntries.filter((entry) => {
    const matchesFilter = activeFilter === "all" || entry.type === activeFilter;
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
          <td><span class="amount ${entry.type === "debit" ? "negative" : "positive"}">${entry.amount}</span></td>
          <td>${entry.balanceAfter}</td>
          <td><span class="status-chip ${entry.status}">${entry.status}</span></td>
          <td>${entry.notes}</td>
        </tr>
      `
    )
    .join("");
}

filterTabs.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter || "all";

    filterTabs.forEach((tabButton) => {
      tabButton.classList.toggle("active", tabButton === button);
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
  const entryType = isRefund ? "refund" : "credit";
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
    amount: formatAmount(amount, "credit"),
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
  showSuccessToast(`Added ${formatAmount(amount, "credit")} to mariam ashraf awad via ${sourceType}.`);
});

syncSummaryValues();
renderLedgerTable();
