const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

const getCart = () => JSON.parse(sessionStorage.getItem("cart")) || [];
const saveCart = (cart) => sessionStorage.setItem("cart", JSON.stringify(cart));

function renderProducts() {
  productList.innerHTML = "";
  products.forEach((p) => {
    const li = document.createElement("li");
    li.innerHTML = `${p.name} - $${p.price} 
      <button class="add-to-cart-btn" data-id="${p.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
  document.querySelectorAll(".add-to-cart-btn").forEach((btn) =>
    btn.addEventListener("click", (e) => addToCart(+e.target.dataset.id))
  );
}

function renderCart() {
  cartList.innerHTML = "";
  getCart().forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - $${item.price} 
      <button class="remove-from-cart-btn" data-index="${index}">❌</button>`;
    cartList.appendChild(li);
  });

  document.querySelectorAll(".remove-from-cart-btn").forEach((btn) =>
    btn.addEventListener("click", (e) => removeFromCart(+e.target.dataset.index))
  );
}

function addToCart(productId) {
  const cart = getCart();
  const product = products.find((p) => p.id === productId);
  if (product) {
    cart.push(product);
    saveCart(cart);
    renderCart();
  }
}

function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCart();
}

function clearCart() {
  sessionStorage.removeItem("cart");
  renderCart();
}

clearCartBtn.addEventListener("click", clearCart);

renderProducts();
renderCart();


