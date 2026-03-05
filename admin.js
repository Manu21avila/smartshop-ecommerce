let orders = JSON.parse(localStorage.getItem("orders")) || [];

function calculateMetrics() {
  let totalRevenue = 0;
  let totalSales = 0;
  let productCount = {};

  cart.forEach((item) => {
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
    type: "line",
    data: {
      labels: Object.keys(productCount),
      datasets: [
        {
          label: "Quantidade Vendida",
          data: Object.values(productCount),
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
    },
  });
}

calculateMetrics();

const toggle = document.getElementById("themeToggle");

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark"));
});

if (localStorage.getItem("theme") === "true") {
  document.body.classList.add("dark");
}

document.getElementById("menuToggle").addEventListener("click", () => {
  document.querySelector(".search-cart").classList.toggle("active");
});
