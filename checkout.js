let cart = JSON.parse(localStorage.getItem("cart")) || [];
let orders = JSON.parse(localStorage.getItem("orders")) || [];

document
  .getElementById("checkoutForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const newOrder = {
      id: Date.now(),
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      date: new Date().toLocaleString(),
    };

    orders.push(newOrder);

    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.removeItem("cart");

    alert("Pedido realizado com sucesso!");
    window.location.href = "admin.html";
  });
