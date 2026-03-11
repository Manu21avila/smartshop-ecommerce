let cart = JSON.parse(localStorage.getItem("cart")) || []

function updateCartCount(){
document.getElementById("cart-count").innerText = cart.length
}

fetch("data/products.json")
.then(res => res.json())
.then(products => {

displayProducts(products)

document.getElementById("search").addEventListener("input", e=>{
const value = e.target.value.toLowerCase()

const filtered = products.filter(p =>
p.name.toLowerCase().includes(value)
)

displayProducts(filtered)

})

})

function displayProducts(products){

const container = document.getElementById("products")

container.innerHTML = ""

products.forEach(product =>{

const div = document.createElement("div")

div.className="product-card"

div.innerHTML=`

<img src="${product.image}">

<h3>${product.name}</h3>

<p>R$ ${product.price}</p>

<button onclick="addToCart(${product.id})">
Adicionar ao Carrinho
</button>

`

container.appendChild(div)

})

}

function addToCart(id){

fetch("data/products.json")
.then(res=>res.json())
.then(products=>{

const product = products.find(p=>p.id===id)

cart.push(product)

localStorage.setItem("cart",JSON.stringify(cart))

updateCartCount()

})

}

updateCartCount()