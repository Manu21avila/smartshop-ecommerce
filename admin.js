let cart = JSON.parse(localStorage.getItem("cart")) || [];

function calculateMetrics() {
  let totalRevenue = 0;
  let totalSales = 0;
  let productCount = {};

  cart.forEach(item => {
    totalRevenue += item.price * item.quantity;
    totalSales += item.quantity;

    if (productCount[item.name]) {
      productCount[item.name] += item.quantity;
    } else {
      productCount[item.name] = item.quantity;
    }
  });

  let topProduct = "-";
  let max = 0;

  for (let product in productCount) {
    if (productCount[product] > max) {
      max = productCount[product];
      topProduct = product;
    }
  }

  document.getElementById("totalRevenue").textContent =
    `R$ ${totalRevenue.toFixed(2)}`;

  document.getElementById("totalSales").textContent = totalSales;

  document.getElementById("topProduct").textContent = topProduct;

  createChart(productCount);
}

function createChart(productCount) {
  const ctx = document.getElementById("salesChart");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: Object.keys(productCount),
      datasets: [{
        label: "Quantidade Vendida",
        data: Object.values(productCount),
        borderWidth: 1
      }]
    },
    options: {
      responsive: true
    }
  });
}

calculateMetrics();