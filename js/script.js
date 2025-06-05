const products = [
  { id: 1, name: "Ghế sofa", price: 2000000, description: "Sofa thoải mái cho phòng khách" },
  { id: 2, name: "Bàn ăn", price: 1500000, description: "Bàn ăn gỗ tự nhiên" },
  { id: 3, name: "Kệ sách", price: 800000, description: "Kệ sách hiện đại tiết kiệm không gian" }
];

let cart = [];
let isLoggedIn = false;
let userEmail = "";

document.getElementById("loginLink").addEventListener("click", () => {
  showSection("authSection");
});

document.getElementById("logoutLink").addEventListener("click", () => {
  isLoggedIn = false;
  userEmail = "";
  cart = [];
  document.getElementById("userEmail").style.display = "none";
  document.getElementById("loginLink").style.display = "inline";
  document.getElementById("logoutLink").style.display = "none";
  document.getElementById("cartCount").textContent = "0";
  alert("Đã đăng xuất!");
  showSection("productsSection");
});

document.getElementById("homeLink").addEventListener("click", () => {
  showSection("productsSection");
});

document.getElementById("cartLink").addEventListener("click", () => {
  if (isLoggedIn) {
    showSection("cartSection");
  } else {
    showSection("authSection");
  }
});

document.getElementById("login").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  if (email === "test@gmail.com" && password === "123456") {
    isLoggedIn = true;
    userEmail = email;
    document.getElementById("userEmail").textContent = email;
    document.getElementById("userEmail").style.display = "inline";
    document.getElementById("loginLink").style.display = "none";
    document.getElementById("logoutLink").style.display = "inline";
    alert("Đăng nhập thành công!");
    showSection("productsSection");
  } else {
    alert("Sai email hoặc mật khẩu!");
  }
});

function showSection(sectionId) {
  document.querySelectorAll("main > div").forEach((div) => {
    div.style.display = "none";
  });
  document.getElementById(sectionId).style.display = "block";

  if (sectionId === "productsSection") {
    displayProducts();
  } else if (sectionId === "cartSection") {
    displayCart();
  }
}

function displayProducts() {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";
  products.forEach((product) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <h3>${product.name}</h3>
      <p>Giá: ${product.price.toLocaleString()} VND</p>
      <button onclick="viewProduct(${product.id})">Xem chi tiết</button>
      <button class="add-to-cart" onclick="addToCart(${product.id})">Thêm vào giỏ</button>
    `;
    productList.appendChild(div);
  });
}

function viewProduct(id) {
  const product = products.find((p) => p.id === id);
  const detail = document.getElementById("productDetail");
  detail.innerHTML = `
    <h3>${product.name}</h3>
    <p>Giá: ${product.price.toLocaleString()} VND</p>
    <p>${product.description}</p>
    <button class="back-button" onclick="showSection('productsSection')">Quay lại</button>
  `;
  showSection("productDetail");
}

function addToCart(id) {
  if (!isLoggedIn) {
    showSection("authSection");
    return;
  }
  if (cart.length >= 5) {
    alert("Giỏ hàng đã đầy (tối đa 5 sản phẩm)!");
    return;
  }
  const product = products.find((p) => p.id === id);
  cart.push(product);
  document.getElementById("cartCount").textContent = cart.length;
  alert("Đã thêm vào giỏ hàng!");
}

function displayCart() {
  const cartItems = document.getElementById("cartItems");
  cartItems.innerHTML = "";
  let totalPrice = 0;

  cart.forEach((item, index) => {
    totalPrice += item.price;
    const div = document.createElement("div");
    div.innerHTML = `
      <p>${item.name} - ${item.price.toLocaleString()} VND
      <button class="remove-from-cart" onclick="removeFromCart(${index})">Xóa</button></p>
    `;
    cartItems.appendChild(div);
  });

  const totalDiv = document.createElement("div");
  totalDiv.innerHTML = `<h3>Tổng tiền: ${totalPrice.toLocaleString()} VND</h3>`;
  cartItems.appendChild(totalDiv);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  document.getElementById("cartCount").textContent = cart.length;
  displayCart();
}

window.onload = () => {
  showSection("productsSection");
};