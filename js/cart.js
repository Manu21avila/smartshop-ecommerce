let cart = JSON.parse(localStorage.getItem("cart")) || [];

const container = document.getElementById("cart-items");

let subtotal = 0;

cart.forEach((item, index) => {
  subtotal += item.price;

  const div = document.createElement("div");

  div.className = "cart-item";

  div.innerHTML = `

<img src="../${item.image}">

<p>${item.name}</p>

<p>R$ ${item.price}</p>

<button onclick="removeItem(${index})">
Remover
</button>

`;

  container.appendChild(div);
});

document.getElementById("subtotal").innerText = subtotal;

let shipping = 15;

document.getElementById("total").innerText = subtotal + shipping;

function removeItem(index) {
  cart.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(cart));

  location.reload();
}

function applyCoupon() {
  const coupon = document.getElementById("coupon").value;

  if (coupon === "SMART10") {
    let discount = subtotal * 0.1;

    document.getElementById("total").innerText = subtotal + shipping - discount;

    alert("Cupom aplicado!");
  }
}
