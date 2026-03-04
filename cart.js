let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Atualiza contador no header
function updateCartCount() {
  const cartCount = document.getElementById("cartCount");
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cartCount) {
    cartCount.textContent = totalItems;
  }
}

// Adicionar produto ao carrinho
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);

  if (!product) return;

  const existingProduct = cart.find((item) => item.id === productId);

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();

  alert("Produto adicionado ao carrinho!");
}

// Inicializa contador ao carregar página
updateCartCount();
