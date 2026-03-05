const productsContainer = document.getElementById("productsContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortFilter = document.getElementById("sortFilter");

let products = [];

const toggle = document.getElementById("themeToggle");

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark"));
});

if (localStorage.getItem("theme") === "true") {
  document.body.classList.add("dark");
}

// Carregar produtos do JSON
async function loadProducts() {
  const response = await fetch("data/products.json");
  products = await response.json();
  displayProducts(products);
}

function displayProducts(productsList) {
  productsContainer.innerHTML = "";

  productsList.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      ${product.promotion ? "<span class='badge'>Promoção</span>" : ""}
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>R$ ${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id})" ${product.stock === 0 ? "disabled" : ""}>
        ${product.stock === 0 ? "Indisponível" : "Adicionar ao Carrinho"}
      </button>
    `;

    productsContainer.appendChild(card);
  });
}

// Filtro por busca
searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();
  const filtered = products.filter((product) =>
    product.name.toLowerCase().includes(value),
  );
  displayProducts(filtered);
});

// Filtro por categoria
categoryFilter.addEventListener("change", () => {
  const value = categoryFilter.value;
  if (value === "all") {
    displayProducts(products);
  } else {
    const filtered = products.filter((product) => product.category === value);
    displayProducts(filtered);
  }
});

// Ordenação
sortFilter.addEventListener("change", () => {
  const value = sortFilter.value;
  let sortedProducts = [...products];

  if (value === "price-asc") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (value === "price-desc") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  displayProducts(sortedProducts);
});

// Inicializar
loadProducts();

function displayProducts(productsList) {
  productsContainer.innerHTML = "";

  productsList.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("product-card", "fade-in");

    card.innerHTML = `
      ${product.promotion ? "<span class='badge'>Promoção</span>" : ""}
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>R$ ${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id})" ${product.stock === 0 ? "disabled" : ""}>
        ${product.stock === 0 ? "Indisponível" : "Adicionar ao Carrinho"}
      </button>
    `;

    productsContainer.appendChild(card);
  });
}
