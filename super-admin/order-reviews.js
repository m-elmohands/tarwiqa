const openAnalyticsBtn = document.getElementById("openAnalyticsBtn");
const closeAnalyticsBtn = document.getElementById("closeAnalyticsBtn");
const analyticsOverlay = document.getElementById("analyticsOverlay");

function openAnalytics() {
  analyticsOverlay.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeAnalytics() {
  analyticsOverlay.classList.add("hidden");
  document.body.style.overflow = "";
}

openAnalyticsBtn.addEventListener("click", openAnalytics);
closeAnalyticsBtn.addEventListener("click", closeAnalytics);

analyticsOverlay.addEventListener("click", (event) => {
  if (event.target === analyticsOverlay) {
    closeAnalytics();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !analyticsOverlay.classList.contains("hidden")) {
    closeAnalytics();
  }
});
