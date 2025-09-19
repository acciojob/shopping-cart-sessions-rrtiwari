const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 }
];

let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

function saveCart() {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart() {
  cartList.innerHTML = "";
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "❌";
    removeBtn.onclick = () => {
      cart.splice(index, 1);
      saveCart();
      renderCart();
    };
    li.appendChild(removeBtn);
    cartList.appendChild(li);
  });
}

function renderProducts() {
  productList.innerHTML = "";
  products.forEach(product => {
    const li = document.createElement("li");
    li.textContent = `${product.name} - $${product.price}`;
    const addBtn = document.createElement("button");
    addBtn.textContent = "Add to Cart";
    addBtn.onclick = () => {
      cart.push(product);
      saveCart();
      renderCart();
    };
    li.appendChild(addBtn);
    productList.appendChild(li);
  });
}

clearCartBtn.onclick = () => {
  cart = [];
  saveCart();
  renderCart();
};

renderProducts();
renderCart();


