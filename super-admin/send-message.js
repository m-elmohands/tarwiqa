const customers = [
  { id: "#USR-102938", name: "mariam ashraf awad", phone: "+20 109 555 0198", email: "mariam.ashraf.awad@example.com" },
  { id: "#USR-102954", name: "Youssef Adel", phone: "+20 101 444 2290", email: "y.adel@example.com" },
  { id: "#USR-103004", name: "Nour Hassan", phone: "+20 112 760 1903", email: "n.hassan@example.com" },
  { id: "#USR-103121", name: "Karim Emad", phone: "+20 115 903 7744", email: "karim.emad@example.com" },
  { id: "#USR-103177", name: "Salma Hany", phone: "+20 100 873 2190", email: "salma.hany@example.com" }
];

const customerAvatar = document.getElementById("customerAvatar");
const customerName = document.getElementById("customerName");
const customerId = document.getElementById("customerId");
const customerPhone = document.getElementById("customerPhone");
const customerEmail = document.getElementById("customerEmail");
const messageChannel = document.getElementById("messageChannel");
const channelPreview = document.getElementById("channelPreview");
const recipientPreview = document.getElementById("recipientPreview");
const sendTimePreview = document.getElementById("sendTimePreview");
const sendMessageForm = document.getElementById("sendMessageForm");
const messageSubject = document.getElementById("messageSubject");
const messageBody = document.getElementById("messageBody");
const messageToast = document.getElementById("messageToast");
const messageToastText = document.getElementById("messageToastText");

let toastTimeoutId = null;
const params = new URLSearchParams(window.location.search);
const selectedCustomerId = params.get("userId") || "";
const customer = customers.find((item) => item.id === selectedCustomerId) || customers[0];

function getInitials(name) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
}

function getChannelLabel(value) {
  const labels = {
    push: "Push Notification",
    sms: "SMS",
    whatsapp: "WhatsApp",
    email: "Email"
  };

  return labels[value] || labels.push;
}

function getRecipientDestination() {
  return messageChannel.value === "email" ? customer.email : customer.phone;
}

function showToast(message) {
  messageToastText.textContent = message;
  messageToast.classList.remove("hidden");

  if (toastTimeoutId) {
    window.clearTimeout(toastTimeoutId);
  }

  toastTimeoutId = window.setTimeout(() => {
    messageToast.classList.add("hidden");
  }, 3000);
}

function renderCustomer() {
  customerAvatar.textContent = getInitials(customer.name);
  customerName.textContent = customer.name;
  customerId.textContent = customer.id;
  customerPhone.textContent = customer.phone;
  customerEmail.textContent = customer.email;
  updateChannelPreview();
}

function updateChannelPreview() {
  channelPreview.textContent = getChannelLabel(messageChannel.value);
  recipientPreview.textContent = `${customer.name} - ${getRecipientDestination()}`;
}

messageChannel.addEventListener("change", updateChannelPreview);

sendMessageForm.addEventListener("reset", () => {
  window.setTimeout(() => {
    messageChannel.value = "push";
    updateChannelPreview();
    sendTimePreview.textContent = "Generated automatically on send";
  }, 0);
});

sendMessageForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const sentAt = new Date().toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
  sendTimePreview.textContent = sentAt;

  showToast(`${getChannelLabel(messageChannel.value)} sent to ${customer.name} at ${sentAt}.`);
  messageSubject.value = "";
  messageBody.value = "";
});

renderCustomer();
