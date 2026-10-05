const ads = {
  "hero-cleaning": {
    title: "Hero Cleaning Campaign",
    headline: "Refresh Your Home With TARWIQA",
    slot: "Home Hero Banner",
    status: "Live",
    link: "tarwiqa.app/offers/cleaning-gold",
    description: "Primary homepage banner promoting premium cleaning packages and direct request conversion.",
    imageName: "Built-in hero creative",
    impressions: 12400,
    clicks: 1840,
    createdAt: "2026-04-01 10:30 AM",
    endsAt: "2026-07-30 11:59 PM"
  },
  "referral-push": {
    title: "Referral Push Banner",
    headline: "Invite Friends & Save More",
    slot: "Sidebar Slot",
    status: "Scheduled",
    link: "tarwiqa.app/referrals/spring",
    description: "Promotes customer referral activity and opens the shares campaign landing page.",
    imageName: "Built-in referral creative",
    impressions: 4100,
    clicks: 520,
    createdAt: "2026-04-08 01:15 PM",
    endsAt: "2026-08-15 11:59 PM"
  },
  "gold-access": {
    title: "Gold Access Promo",
    headline: "North Star Offer",
    slot: "Offer Card",
    status: "Live",
    link: "tarwiqa.app/offers/gold-access",
    description: "Highlights the most requested premium offer inside offers and widget discovery sections.",
    imageName: "Built-in offer creative",
    impressions: 1900,
    clicks: 310,
    createdAt: "2026-05-02 09:00 AM",
    endsAt: "2026-09-01 11:59 PM"
  }
};

const createAdSlotBtn = document.getElementById("createAdSlotBtn");
const showHistoryBtn = document.getElementById("showHistoryBtn");
const adsGrid = document.getElementById("adsGrid");
const adsModal = document.getElementById("adsModal");
const adsModalTitle = document.getElementById("adsModalTitle");
const adsModalSubtitle = document.getElementById("adsModalSubtitle");
const adsModalContent = document.getElementById("adsModalContent");
const closeAdsModalBtn = document.getElementById("closeAdsModalBtn");
const closeAdsModalFooterBtn = document.getElementById("closeAdsModalFooterBtn");
const adsToast = document.getElementById("adsToast");
const adsToastText = document.getElementById("adsToastText");

let toastTimeoutId = null;
let editingAdId = null;

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

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
  const pauseButton = card.querySelector('[data-ad-action="pause"]');

  if (statusPill) {
    statusPill.textContent = status;
    statusPill.className = `status-pill ${status.toLowerCase()}`;
  }

  if (pauseButton) {
    pauseButton.textContent = status === "Live" ? "Pause" : "Active";
  }
}

function updateAdCard(adId) {
  const ad = getAd(adId);
  const card = getAdCardFromId(adId);

  if (!ad || !card) {
    return;
  }

  const cardTitle = card.querySelector(".ad-head h3");
  const visualTitle = card.querySelector(".ad-visual h2, .ad-visual h3");
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
  const imageFileName = document.getElementById("adImageFileName");

  if (!imageInput || !imagePreview || !imageFileName) {
    return;
  }

  imageInput.addEventListener("change", () => {
    const file = imageInput.files?.[0];

    if (!file) {
      imageFileName.textContent = editingAdId ? `Current: ${ads[editingAdId].imageName}` : "No image selected";
      imagePreview.innerHTML = "<span>Image preview will appear here</span>";
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

    ad.title = document.getElementById("editAdTitle").value.trim() || ad.title;
    ad.headline = document.getElementById("editAdHeadline").value.trim() || ad.headline;
    ad.link = document.getElementById("editAdLink").value.trim() || ad.link;
    ad.description = document.getElementById("editAdDescription").value.trim() || ad.description;

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
    </div>`
  );
  bindAdImageUpload();
  showToast("New ad slot form opened.");
}

function showHistory() {
  window.location.href = './ads-history.html';
}

function buildPreview(ad) {
  const ctr = ad.impressions ? ((ad.clicks / ad.impressions) * 100).toFixed(1) : "0.0";
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
  const printButton = document.getElementById("printAdPreviewBtn");
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
    openModal("Edit Ad", "Update image, link, text, and main headline.", buildEditForm(adId, ad));
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
    openModal("Ad Preview", "Full campaign data, performance metrics, and dates.", buildPreview(ad));
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

