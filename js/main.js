let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    cartCount.innerText = cart.length;
  }
}

fetch("data/products.json")
  .then((res) => res.json())
  .then((products) => {
    displayProducts(products);
  })
  .catch((err) => console.error("Erro ao carregar produtos:", err));

function displayProducts(products) {
  const container = document.getElementById("products");

  if (!container) return;

  container.innerHTML = "";

  products.forEach((product) => {
    const div = document.createElement("div");

    div.className = "product-card";

    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>R$ ${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id})">
        Adicionar ao Carrinho
      </button>
    `;

    container.appendChild(div);
  });
}

updateCartCount();

function addToCart(id) {
  fetch("data/products.json")
    .then((res) => res.json())
    .then((products) => {
      const product = products.find((p) => p.id === id);

      cart.push(product);

      localStorage.setItem("cart", JSON.stringify(cart));

      updateCartCount();
    });
}

updateCartCount();

function openModal(product) {
  const modal = document.getElementById("productModal");

  modal.style.display = "flex";

  document.getElementById("modalImage").src = product.image;
  document.getElementById("modalTitle").innerText = product.name;
  document.getElementById("modalPrice").innerText = "R$ " + product.price;

  document.getElementById("modalAdd").onclick = () => addToCart(product.id);
}

document.querySelector(".close").onclick = () => {
  document.getElementById("productModal").style.display = "none";
};

function toggleCart() {
  document.getElementById("sideCart").classList.toggle("open");
}

function showToast() {
  const toast = document.getElementById("toast");

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

const toggle = document.getElementById("darkToggle");

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    toggle.innerHTML = "☀️";
  } else {
    toggle.innerHTML = "🌙";
  }
});

if (localStorage.getItem("theme") === "true") {
  document.body.classList.add("dark");
}

document.getElementById("products").innerHTML = `
<div class="skeleton"></div>
<div class="skeleton"></div>
<div class="skeleton"></div>
<div class="skeleton"></div>
`;
