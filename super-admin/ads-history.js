const publishedAds = [
  { title: "Hero Cleaning Campaign", slot: "Home Hero Banner", status: "Live", createdAt: "2026-04-01 10:30 AM", endsAt: "2026-07-30 11:59 PM", impressions: 12400, clicks: 1840, link: "tarwiqa.app/offers/cleaning-gold" },
  { title: "Referral Push Banner", slot: "Sidebar Slot", status: "Live", createdAt: "2026-03-14 12:00 PM", endsAt: "2026-04-30 11:59 PM", impressions: 9800, clicks: 1210, link: "tarwiqa.app/referrals/spring" },
  { title: "Gold Access Promo", slot: "Offer Card", status: "Live", createdAt: "2026-05-02 09:00 AM", endsAt: "2026-09-01 11:59 PM", impressions: 1900, clicks: 310, link: "tarwiqa.app/offers/gold-access" },
  { title: "Ramadan Deep Clean", slot: "Home Slider", status: "Ended", createdAt: "2026-02-10 08:45 AM", endsAt: "2026-03-20 11:59 PM", impressions: 22100, clicks: 2840, link: "tarwiqa.app/offers/ramadan-clean" },
  { title: "Weekend Maid Offer", slot: "Discovery Widget", status: "Ended", createdAt: "2026-01-05 11:20 AM", endsAt: "2026-02-05 11:59 PM", impressions: 15400, clicks: 1705, link: "tarwiqa.app/offers/weekend" }
];

const tableBody = document.getElementById("adsHistoryTableBody");
const publishedAdsMetric = document.getElementById("publishedAdsMetric");
const impressionsMetric = document.getElementById("impressionsMetric");
const clicksMetric = document.getElementById("clicksMetric");
const bestCtrMetric = document.getElementById("bestCtrMetric");

function formatNumber(value) {
  return value.toLocaleString();
}

function getCtr(ad) {
  return ad.impressions ? (ad.clicks / ad.impressions) * 100 : 0;
}

function renderSummary() {
  const totalImpressions = publishedAds.reduce((sum, ad) => sum + ad.impressions, 0);
  const totalClicks = publishedAds.reduce((sum, ad) => sum + ad.clicks, 0);
  const bestCtr = Math.max(...publishedAds.map(getCtr));

  publishedAdsMetric.textContent = String(publishedAds.length);
  impressionsMetric.textContent = formatNumber(totalImpressions);
  clicksMetric.textContent = formatNumber(totalClicks);
  bestCtrMetric.textContent = `${bestCtr.toFixed(1)}%`;
}

function renderTable() {
  tableBody.innerHTML = publishedAds
    .map((ad) => {
      const ctr = getCtr(ad).toFixed(1);
      return `<tr>
        <td><strong>${ad.title}</strong></td>
        <td>${ad.slot}</td>
        <td><span class="status-pill ${ad.status.toLowerCase()}">${ad.status}</span></td>
        <td>${ad.createdAt}</td>
        <td>${ad.endsAt}</td>
        <td>${formatNumber(ad.impressions)}</td>
        <td>${formatNumber(ad.clicks)}</td>
        <td>${ctr}%</td>
        <td class="link-cell">${ad.link}</td>
      </tr>`;
    })
    .join("");
}

renderSummary();
renderTable();
