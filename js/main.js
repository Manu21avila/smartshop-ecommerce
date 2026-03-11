let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
  document.getElementById("cart-count").innerText = cart.length;
}

fetch("data/products.json")
  .then((res) => res.json())
  .then((products) => {
    displayProducts(products);

    document.getElementById("search").addEventListener("input", (e) => {
      const value = e.target.value.toLowerCase();

      const filtered = products.filter((p) =>
        p.name.toLowerCase().includes(value),
      );

      displayProducts(filtered);
    });
  });

function displayProducts(products) {
  const container = document.getElementById("products");

  container.innerHTML = "";

  products.forEach((product) => {
    div.innerHTML = `

<div class="product-card">

<img src="${product.image}" alt="${product.name}">

<h3>${product.name}</h3>

<p>R$ ${product.price.toFixed(2)}</p>

<button onclick="addToCart(${product.id})">
Adicionar ao Carrinho
</button>

</div>

`;
  });
}

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

toggle.onclick = () => {
  document.body.classList.toggle("dark");

  localStorage.setItem("theme", document.body.classList.contains("dark"));
};

if (localStorage.getItem("theme") === "true") {
  document.body.classList.add("dark");
}

document.getElementById("products").innerHTML = `
<div class="skeleton"></div>
<div class="skeleton"></div>
<div class="skeleton"></div>
<div class="skeleton"></div>
`;
