const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));

fetch("data/products.json")
  .then(res => res.json())
  .then(products => {
    const product = products.find(p => p.id === id);
    document.getElementById("productDetail").innerHTML = `
      <div class="product-detail">
        <img src="${product.image}">
        <h2>${product.name}</h2>
        <p>R$ ${product.price}</p>
        <button onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
      </div>
    `;
  });