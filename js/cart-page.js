let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartItemsContainer = document.getElementById("cartItems");

function renderCart() {
  cartItemsContainer.innerHTML = "";

  let subtotal = 0;

  cart.forEach((item, index) => {
    subtotal += item.price * item.quantity;

    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div>
        <h4>${item.name}</h4>
        <p>R$ ${item.price.toFixed(2)}</p>
        <p>Qtd: ${item.quantity}</p>
      </div>
      <button onclick="removeItem(${index})">Remover</button>
    `;

    cartItemsContainer.appendChild(div);
  });

  updateSummary(subtotal);
}

function updateSummary(subtotal) {
  const shipping = 15;
  const total = subtotal + shipping;

  document.getElementById("subtotal").textContent = `R$ ${subtotal.toFixed(2)}`;
  document.getElementById("total").textContent = `R$ ${total.toFixed(2)}`;
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function applyCoupon() {
  const coupon = document.getElementById("couponInput").value;

  if (coupon === "DESCONTO10") {
    alert("Cupom aplicado! 10% de desconto.");
    let subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    subtotal *= 0.9;
    updateSummary(subtotal);
  } else {
    alert("Cupom inválido.");
  }
}

renderCart();
