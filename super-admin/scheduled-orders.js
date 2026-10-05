const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const arrivalHours = ["8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM"];
const calendarGrid = document.getElementById("calendarGrid");
const hoursGrid = document.getElementById("hoursGrid");
const calendarTitle = document.getElementById("calendarTitle");
const openDatesMetric = document.getElementById("openDatesMetric");
const closedDatesMetric = document.getElementById("closedDatesMetric");
const todayMetric = document.getElementById("todayMetric");
const tomorrowMetric = document.getElementById("tomorrowMetric");
const openHoursMetric = document.getElementById("openHoursMetric");
const closedHoursMetric = document.getElementById("closedHoursMetric");
const todayToggle = document.getElementById("todayToggle");
const tomorrowToggle = document.getElementById("tomorrowToggle");
const todayLabel = document.getElementById("todayLabel");
const tomorrowLabel = document.getElementById("tomorrowLabel");
const prevMonthBtn = document.getElementById("prevMonthBtn");
const nextMonthBtn = document.getElementById("nextMonthBtn");
const resetScheduleBtn = document.getElementById("resetScheduleBtn");
const saveScheduleBtn = document.getElementById("saveScheduleBtn");
const hoursClosedUntilInput = document.getElementById("hoursClosedUntilInput");
const saveClosedHoursBtn = document.getElementById("saveClosedHoursBtn");
const closedHoursSelection = document.getElementById("closedHoursSelection");
const hoursClosureStatus = document.getElementById("hoursClosureStatus");
const scheduleToast = document.getElementById("scheduleToast");
const scheduleToastText = document.getElementById("scheduleToastText");

let visibleDate = new Date(2026, 5, 1);
let toastTimeoutId = null;
const hoursClosureStorageKey = "scheduledOrdersHourClosures";
let hourAvailability = Object.fromEntries(arrivalHours.map((hour) => [hour, true]));
let hourClosedUntil = {};
let pendingClosedHours = new Set();
let dateOverrides = new Map();

function dateKey(date) {
  return date.toISOString().slice(0, 10);
}

function localDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatClosureDate(value) {
  return new Date(`${value}T00:00:00`).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

function loadHourClosures() {
  try {
    const stored = JSON.parse(localStorage.getItem(hoursClosureStorageKey));
    if (stored && typeof stored === "object") {
      hourClosedUntil = stored;
    }
  } catch (error) {
    hourClosedUntil = {};
  }

  const today = localDateKey();
  Object.entries(hourClosedUntil).forEach(([hour, untilDate]) => {
    if (!arrivalHours.includes(hour) || untilDate < today) {
      delete hourClosedUntil[hour];
      hourAvailability[hour] = true;
      return;
    }
    hourAvailability[hour] = false;
  });
}

function persistHourClosures() {
  localStorage.setItem(hoursClosureStorageKey, JSON.stringify(hourClosedUntil));
}

function renderHoursClosureControls() {
  const pendingHours = arrivalHours.filter((hour) => pendingClosedHours.has(hour));
  const hasPendingHours = pendingHours.length > 0;
  hoursClosedUntilInput.disabled = !hasPendingHours;
  saveClosedHoursBtn.disabled = !hasPendingHours;
  hoursClosedUntilInput.min = localDateKey();
  closedHoursSelection.textContent = hasPendingHours
    ? `${pendingHours.length} pending: ${pendingHours.join(", ")}`
    : "Select new hours to close";

  const savedClosures = arrivalHours.filter((hour) => !hourAvailability[hour] && hourClosedUntil[hour]);
  if (!savedClosures.length) {
    hoursClosureStatus.classList.add("hidden");
    hoursClosureStatus.textContent = "";
    return;
  }

  const groupedDates = [...new Set(savedClosures.map((hour) => hourClosedUntil[hour]))];
  hoursClosureStatus.innerHTML = groupedDates
    .map((untilDate) => {
      const hours = savedClosures.filter((hour) => hourClosedUntil[hour] === untilDate);
      return `<div><strong>${hours.join(", ")}</strong><span>Unavailable through ${formatClosureDate(untilDate)}</span></div>`;
    })
    .join("");
  hoursClosureStatus.classList.remove("hidden");
}
function showToast(message) {
  scheduleToastText.textContent = message;
  scheduleToast.classList.remove("hidden");

  if (toastTimeoutId) {
    window.clearTimeout(toastTimeoutId);
  }

  toastTimeoutId = window.setTimeout(() => {
    scheduleToast.classList.add("hidden");
  }, 3000);
}

function isDateOpen(date) {
  const key = dateKey(date);
  if (dateOverrides.has(key)) {
    return dateOverrides.get(key);
  }

  return true;
}

function setToggleState(button, label, isOpen) {
  button.classList.toggle("open", isOpen);
  button.classList.toggle("closed", !isOpen);
  button.textContent = isOpen ? "Open" : "Closed";
  button.setAttribute("aria-pressed", String(isOpen));
  label.textContent = isOpen ? "Open for booking" : "Closed for booking";
}

function renderHours() {
  hoursGrid.innerHTML = arrivalHours
    .map((hour) => {
      const isOpen = hourAvailability[hour];
      const closedUntil = hourClosedUntil[hour];
      return `<button class="hour-slot ${isOpen ? "open" : "closed"} ${pendingClosedHours.has(hour) ? "pending" : ""}" type="button" data-hour="${hour}" aria-pressed="${isOpen}">
        <strong>${hour}</strong>
        <span>${isOpen ? "Allowed" : "Blocked"}</span>
        ${!isOpen && closedUntil ? `<small class="closure-date">Closed through ${formatClosureDate(closedUntil)}</small>` : ""}
      </button>`;
    })
    .join("");

  hoursGrid.querySelectorAll("[data-hour]").forEach((button) => {
    button.addEventListener("click", () => {
      const hour = button.dataset.hour;
      hourAvailability[hour] = !hourAvailability[hour];
      if (hourAvailability[hour]) {
        pendingClosedHours.delete(hour);
        delete hourClosedUntil[hour];
        persistHourClosures();
      } else {
        pendingClosedHours.add(hour);
      }
      renderAll();
      showToast(`${hour} arrival slot is now ${hourAvailability[hour] ? "allowed" : "blocked"}.`);
    });
  });
}

function renderCalendar() {
  const year = visibleDate.getFullYear();
  const month = visibleDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const monthName = firstDay.toLocaleString(undefined, { month: "long", year: "numeric" });
  const startOffset = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];

  weekdays.forEach((day) => {
    cells.push(`<div class="day-name">${day.slice(0, 3)}</div>`);
  });

  for (let i = 0; i < startOffset; i += 1) {
    cells.push('<button class="calendar-day muted" type="button" disabled></button>');
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const current = new Date(year, month, day);
    const key = dateKey(current);
    const isOpen = isDateOpen(current);
    const hasOverride = dateOverrides.has(key);

    cells.push(`<button class="calendar-day ${isOpen ? "open" : "closed"} ${hasOverride ? "custom" : ""}" type="button" data-date="${key}">
      <strong>${day}</strong>
      <span>${weekdays[current.getDay()]}</span>
      <span class="day-status ${isOpen ? "open" : "closed"}">${isOpen ? "Open" : "Closed"}</span>
    </button>`);
  }

  calendarTitle.textContent = monthName;
  calendarGrid.innerHTML = cells.join("");

  calendarGrid.querySelectorAll("[data-date]").forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.dataset.date;
      const date = new Date(`${key}T00:00:00`);
      dateOverrides.set(key, !isDateOpen(date));
      renderAll();
      showToast(`Booking on ${key} is now ${dateOverrides.get(key) ? "open" : "closed"}.`);
    });
  });
}

function updateMetrics() {
  const year = visibleDate.getFullYear();
  const month = visibleDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  let openCount = 0;

  for (let day = 1; day <= daysInMonth; day += 1) {
    if (isDateOpen(new Date(year, month, day))) {
      openCount += 1;
    }
  }

  const closedCount = daysInMonth - openCount;
  const openHours = arrivalHours.filter((hour) => hourAvailability[hour]).length;
  const closedHours = arrivalHours.length - openHours;
  const today = new Date(2026, 5, 22);
  const tomorrow = new Date(2026, 5, 23);
  const todayOpen = isDateOpen(today);
  const tomorrowOpen = isDateOpen(tomorrow);

  openDatesMetric.textContent = String(openCount);
  closedDatesMetric.textContent = String(closedCount);
  openHoursMetric.textContent = String(openHours);
  closedHoursMetric.textContent = String(closedHours);
  todayMetric.textContent = todayOpen ? "Open" : "Closed";
  tomorrowMetric.textContent = tomorrowOpen ? "Open" : "Closed";
  setToggleState(todayToggle, todayLabel, todayOpen);
  setToggleState(tomorrowToggle, tomorrowLabel, tomorrowOpen);
}

function renderAll() {
  renderHours();
  renderCalendar();
  updateMetrics();
  renderHoursClosureControls();
}

function toggleSpecificDate(date) {
  dateOverrides.set(dateKey(date), !isDateOpen(date));
  renderAll();
}

todayToggle.addEventListener("click", () => {
  toggleSpecificDate(new Date(2026, 5, 22));
  showToast("Today booking status updated.");
});

tomorrowToggle.addEventListener("click", () => {
  toggleSpecificDate(new Date(2026, 5, 23));
  showToast("Tomorrow booking status updated.");
});

prevMonthBtn.addEventListener("click", () => {
  visibleDate = new Date(visibleDate.getFullYear(), visibleDate.getMonth() - 1, 1);
  renderAll();
});

nextMonthBtn.addEventListener("click", () => {
  visibleDate = new Date(visibleDate.getFullYear(), visibleDate.getMonth() + 1, 1);
  renderAll();
});

resetScheduleBtn.addEventListener("click", () => {
  hourAvailability = Object.fromEntries(arrivalHours.map((hour) => [hour, true]));
  dateOverrides = new Map();
  hourClosedUntil = {};
  localStorage.removeItem(hoursClosureStorageKey);
  hoursClosedUntilInput.value = "";
  visibleDate = new Date(2026, 5, 1);
  renderAll();
  showToast("Booking schedule reset to default rules.");
});

saveClosedHoursBtn.addEventListener("click", () => {
  const closedHours = arrivalHours.filter((hour) => pendingClosedHours.has(hour));
  const untilDate = hoursClosedUntilInput.value;

  if (!closedHours.length) {
    showToast("Select at least one arrival hour to close.");
    return;
  }

  if (!untilDate) {
    showToast("Choose the date until which these hours are unavailable.");
    hoursClosedUntilInput.focus();
    return;
  }

  if (untilDate < localDateKey()) {
    showToast("Closed Until date cannot be in the past.");
    hoursClosedUntilInput.focus();
    return;
  }

  closedHours.forEach((hour) => {
    hourClosedUntil[hour] = untilDate;
  });
  pendingClosedHours.clear();
  hoursClosedUntilInput.value = "";
  persistHourClosures();
  renderAll();
  showToast(`${closedHours.length} arrival hours closed through ${formatClosureDate(untilDate)}.`);
});

saveScheduleBtn.addEventListener("click", () => {
  if (pendingClosedHours.size) {
    showToast("Save the newly closed hours with an end date first.");
    return;
  }
  persistHourClosures();
  showToast("Booking dates and arrival hours saved successfully.");
});

loadHourClosures();
renderAll();






