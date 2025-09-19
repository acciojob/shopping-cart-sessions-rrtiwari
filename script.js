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

const getCart = () => {
  try {
    const s = sessionStorage.getItem("cart");
    return s ? JSON.parse(s) : [];
  } catch {
    return [];
  }
};
const saveCart = (cart) => sessionStorage.setItem("cart", JSON.stringify(cart));

function renderProducts() {
  productList.innerHTML = products
    .map(
      (p) =>
        `<li>${p.name} - $${p.price} <button class="add-to-cart-btn" data-id="${p.id}">Add to Cart</button></li>`
    )
    .join("");
}

function renderCart() {
  const cart = getCart();
  cartList.innerHTML = cart
    .map(
      (item, i) =>
        `<li>${item.name} - $${item.price} <button class="remove-from-cart-btn" data-index="${i}">❌</button></li>`
    )
    .join("");
}

function addToCart(productId) {
  const cart = getCart();
  const product = products.find((p) => p.id === productId);
  if (!product) return;
  cart.push(product);
  saveCart(cart);
  renderCart();
}

function removeFromCart(index) {
  const cart = getCart();
  if (index < 0 || index >= cart.length) return;
  cart.splice(index, 1);
  saveCart(cart);
  renderCart();
}

function clearCart() {
  sessionStorage.removeItem("cart");
  renderCart();
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  renderCart();
  productList.addEventListener("click", (e) => {
    const btn = e.target.closest(".add-to-cart-btn");
    if (!btn) return;
    addToCart(+btn.dataset.id);
  });
  cartList.addEventListener("click", (e) => {
    const btn = e.target.closest(".remove-from-cart-btn");
    if (!btn) return;
    removeFromCart(+btn.dataset.index);
  });
  clearCartBtn.addEventListener("click", clearCart);
});



