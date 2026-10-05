const productForm = document.getElementById("productForm");
const productName = document.getElementById("productName");
const productCategory = document.getElementById("productCategory");
const productPrice = document.getElementById("productPrice");
const productStock = document.getElementById("productStock");
const productStatus = document.getElementById("productStatus");
const productSku = document.getElementById("productSku");
const productDescription = document.getElementById("productDescription");
const productImage = document.getElementById("productImage");
const productImageName = document.getElementById("productImageName");
const productPreviewImage = document.getElementById("productPreviewImage");
const previewStatus = document.getElementById("previewStatus");
const previewName = document.getElementById("previewName");
const previewDescription = document.getElementById("previewDescription");
const previewCategory = document.getElementById("previewCategory");
const previewPrice = document.getElementById("previewPrice");
const previewStock = document.getElementById("previewStock");
const productsTableBody = document.getElementById("productsTableBody");
const productsCount = document.getElementById("productsCount");
const resetProductBtn = document.getElementById("resetProductBtn");
const saveProductTopBtn = document.getElementById("saveProductTopBtn");
const productToast = document.getElementById("productToast");
const productToastText = document.getElementById("productToastText");

let products = [];
let toastTimeoutId = null;
let selectedImageName = "No image";

function showToast(message) {
  productToastText.textContent = message;
  productToast.classList.remove("hidden");

  if (toastTimeoutId) {
    window.clearTimeout(toastTimeoutId);
  }

  toastTimeoutId = window.setTimeout(() => {
    productToast.classList.add("hidden");
  }, 3000);
}

function formatPrice(value) {
  return `EGP ${(Number(value) || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function getStatusClass(status) {
  return status.toLowerCase().replaceAll(" ", "-");
}

function generateSku() {
  return `PRD-${String(products.length + 1).padStart(4, "0")}`;
}

function updatePreview() {
  const status = productStatus.value;
  previewStatus.textContent = status;
  previewStatus.className = `status-pill ${getStatusClass(status)}`;
  previewName.textContent = productName.value.trim() || "Product Name";
  previewDescription.textContent = productDescription.value.trim() || "Product description will appear here.";
  previewCategory.textContent = productCategory.value;
  previewPrice.textContent = formatPrice(productPrice.value);
  previewStock.textContent = `${Number(productStock.value || 0)} items in stock`;
}

function renderProducts() {
  productsCount.textContent = `${products.length} product${products.length === 1 ? "" : "s"}`;
  productsTableBody.innerHTML = products
    .map((product) => `<tr>
      <td>${product.sku}</td>
      <td><strong>${product.name}</strong><br><small>${product.imageName}</small></td>
      <td>${product.category}</td>
      <td>${formatPrice(product.price)}</td>
      <td>${product.stock}</td>
      <td><span class="status-pill ${getStatusClass(product.status)}">${product.status}</span></td>
    </tr>`)
    .join("");
}

function resetPreviewImage() {
  selectedImageName = "No image";
  productImageName.textContent = "No image selected";
  productPreviewImage.innerHTML = "<span>Product image preview</span>";
}

[productName, productCategory, productPrice, productStock, productStatus, productDescription].forEach((field) => {
  field.addEventListener("input", updatePreview);
  field.addEventListener("change", updatePreview);
});

productImage.addEventListener("change", () => {
  const file = productImage.files?.[0];

  if (!file) {
    resetPreviewImage();
    return;
  }

  selectedImageName = file.name;
  productImageName.textContent = file.name;
  productPreviewImage.innerHTML = `<img src="${URL.createObjectURL(file)}" alt="Selected product preview" />`;
});

productForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const product = {
    sku: productSku.value.trim() || generateSku(),
    name: productName.value.trim(),
    category: productCategory.value,
    price: Number(productPrice.value) || 0,
    stock: Number(productStock.value) || 0,
    status: productStatus.value,
    description: productDescription.value.trim(),
    imageName: selectedImageName,
  };

  products.unshift(product);
  renderProducts();
  showToast(`${product.name} added to products.`);
  productForm.reset();
  resetPreviewImage();
  updatePreview();
});

productForm.addEventListener("reset", () => {
  window.setTimeout(() => {
    resetPreviewImage();
    updatePreview();
  }, 0);
});

resetProductBtn.addEventListener("click", () => {
  productForm.reset();
  resetPreviewImage();
  updatePreview();
  showToast("Product form reset.");
});

saveProductTopBtn.addEventListener("click", () => {
  productForm.requestSubmit();
});

updatePreview();
renderProducts();
