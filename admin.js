function calculateMetrics() {
  let totalRevenue = 0;
  let totalSales = 0;
  let productCount = {};

  orders.forEach((order) => {
    totalRevenue += order.total;

    order.items.forEach((item) => {
      totalSales += item.quantity;

      if (productCount[item.name]) {
        productCount[item.name] += item.quantity;
      } else {
        productCount[item.name] = item.quantity;
      }
    });
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
