// Xử lý giỏ hàng:
let cartCount = parseInt(localStorage.getItem("cartCount")) || 0;
updateCartDisplay();

// Lắng nghe sự kiện click cho tất cả các nút "add-to-cart" (nếu có ở trang khác)
const orderButtons = document.querySelectorAll(".add-to-cart");
orderButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    cartCount++;
    localStorage.setItem("cartCount", cartCount);
    updateCartDisplay();
    alert("Sản phẩm đã được thêm vào giỏ hàng!");
  });
});

function updateCartDisplay() {
  const cartCountElement = document.getElementById("cartCount");
  if (cartCountElement) {
    cartCountElement.textContent = cartCount;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Đọc giỏ hàng từ localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.getElementById("cartContainer");

  // Nếu giỏ hàng trống
  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Giỏ hàng của bạn đang trống!</p>";
    return;
  }

  cart.forEach((item, index) => {
    // Tạo div card
    const cartItemDiv = document.createElement("div");
    cartItemDiv.classList.add("cart-item");

    cartItemDiv.innerHTML = `
      <div class="cart-item-image">
        <img src="${item.imageURL}" alt="${item.name}" />
      </div>
      <div class="cart-item-info">
        <h2>${item.name}</h2>
        <p>Giá gốc: ${item.basePrice} đ</p>
        <p>Size: ${item.sizeName} (+${item.sizePrice} đ)</p>
        <p>Topping: ${item.toppingList.join(", ")} (+${
      item.toppingPriceTotal
    } đ)</p>
        <p>Thành tiền: ${item.finalPrice} đ</p>

        <div class="quantity-control">
          <button class="decrease-btn">-</button>
          <span class="quantity">${item.quantity}</span>
          <button class="increase-btn">+</button>
        </div>

        <div class="action-buttons">
          <button class="order-btn">Đặt hàng</button>
          <button class="remove-btn">Xóa</button>
        </div>
      </div>
    `;

    // Lấy các nút
    const decreaseBtn = cartItemDiv.querySelector(".decrease-btn");
    const increaseBtn = cartItemDiv.querySelector(".increase-btn");
    const quantitySpan = cartItemDiv.querySelector(".quantity");
    const removeBtn = cartItemDiv.querySelector(".remove-btn");
    const orderBtn = cartItemDiv.querySelector(".order-btn");

    // Giảm số lượng
    decreaseBtn.addEventListener("click", () => {
      if (item.quantity > 1) {
        item.quantity--;
        quantitySpan.innerText = item.quantity;
        localStorage.setItem("cart", JSON.stringify(cart));
        // Nếu muốn cập nhật cartCount theo thay đổi số lượng, bạn có thể làm:
        cartCount--;
        localStorage.setItem("cartCount", cartCount);
        updateCartDisplay();
      }
    });

    // Tăng số lượng
    increaseBtn.addEventListener("click", () => {
      item.quantity++;
      quantitySpan.innerText = item.quantity;
      localStorage.setItem("cart", JSON.stringify(cart));
      // Cập nhật cartCount nếu tăng số lượng:
      cartCount++;
      localStorage.setItem("cartCount", cartCount);
      updateCartDisplay();
    });

    // Xoá sản phẩm
    removeBtn.addEventListener("click", () => {
      // Giảm cartCount theo số lượng của sản phẩm bị xoá
      cartCount -= item.quantity;
      if (cartCount < 0) cartCount = 0;
      localStorage.setItem("cartCount", cartCount);
      updateCartDisplay();

      // Xoá sản phẩm khỏi mảng giỏ hàng và cập nhật localStorage
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      cartItemDiv.remove();
    });

    // Đặt hàng
    orderBtn.addEventListener("click", () => {
      alert("Bạn đã đặt hàng sản phẩm: " + item.name);
      // Tùy bạn muốn xử lý gì tiếp theo
    });

    // Thêm card vào container
    cartContainer.appendChild(cartItemDiv);
  });
});
