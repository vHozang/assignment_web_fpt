// Đếm số lượng sản phẩm trong giỏ
let cartCount = parseInt(localStorage.getItem("cartCount")) || 0;
updateCartDisplay();

// Nếu có các nút "add-to-cart" ở trang khác
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

// Hàm cập nhật hiển thị số lượng trên góc giỏ hàng
function updateCartDisplay() {
  const cartCountElement = document.getElementById("cartCount");
  if (cartCountElement) {
    cartCountElement.textContent = cartCount;
  }
}

// Khi DOM sẵn sàng, hiển thị danh sách sản phẩm
document.addEventListener("DOMContentLoaded", function () {
  // Lấy dữ liệu giỏ hàng từ localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.getElementById("cartContainer");

  // Nếu giỏ hàng trống
  if (cart.length === 0) {
    cartContainer.innerHTML = `<p style="text-align: center;">Giỏ hàng của bạn đang trống!</p>`;
    return;
  }

  cart.forEach((item, index) => {
    // item.finalPrice ở đây là giá cho 1 sản phẩm (chưa nhân quantity).
    // Chúng ta sẽ hiển thị "Tổng giá" = item.finalPrice * item.quantity.

    // Tạo div cha cho mỗi sản phẩm
    const cartItemDiv = document.createElement("div");
    cartItemDiv.classList.add("cart-item");

    // Tính tổng giá hiện tại (dựa trên số lượng)
    const currentTotal = item.finalPrice * item.quantity;

    // Tạo HTML hiển thị:
    cartItemDiv.innerHTML = `
      <!-- Ảnh nằm bên trái, to hơn một chút -->
      <div class="cart-item-left">
        <img src="${item.imageURL}" alt="${item.name}" />
      </div>

      <!-- Ở giữa hiển thị brand, tên, các thông tin khác -->
      <div class="cart-item-center">
        <h4 class="cart-item-brand">V Max series</h4>
        <h2 class="cart-item-name">${item.name}</h2>
        <p>Giá gốc: ${item.basePrice} đ</p>
        <p>Size: ${item.sizeName} (+${item.sizePrice} đ)</p>
        <p>Topping: ${item.toppingList.join(", ")} (+${
      item.toppingPriceTotal
    } đ)</p>

        <!-- Khu vực bottom-row: số lượng + nút Đặt hàng, Xóa cùng hàng -->
        <div class="bottom-row">
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
      </div>

      <!-- Góc phải: giá to hơn, màu đỏ -->
      <div class="cart-item-right">
        <p class="item-price" id="priceIndex_${index}">
          ${currentTotal.toLocaleString("vi-VN")} đ
        </p>
      </div>
    `;

    // Tìm các nút
    const decreaseBtn = cartItemDiv.querySelector(".decrease-btn");
    const increaseBtn = cartItemDiv.querySelector(".increase-btn");
    const quantitySpan = cartItemDiv.querySelector(".quantity");
    const removeBtn = cartItemDiv.querySelector(".remove-btn");
    const orderBtn = cartItemDiv.querySelector(".order-btn");
    // Phần tử hiển thị giá
    const priceElement = cartItemDiv.querySelector("#priceIndex_" + index);

    // Giảm số lượng
    decreaseBtn.addEventListener("click", () => {
      if (item.quantity > 1) {
        item.quantity--;
        quantitySpan.innerText = item.quantity;
        localStorage.setItem("cart", JSON.stringify(cart));

        // Cập nhật cartCount
        cartCount--;
        if (cartCount < 0) cartCount = 0;
        localStorage.setItem("cartCount", cartCount);
        updateCartDisplay();

        // Cập nhật giá hiển thị
        const newTotal = item.finalPrice * item.quantity;
        priceElement.textContent = newTotal.toLocaleString("vi-VN") + " đ";
      }
    });

    // Tăng số lượng
    increaseBtn.addEventListener("click", () => {
      item.quantity++;
      quantitySpan.innerText = item.quantity;
      localStorage.setItem("cart", JSON.stringify(cart));

      // Cập nhật cartCount
      cartCount++;
      localStorage.setItem("cartCount", cartCount);
      updateCartDisplay();

      // Cập nhật giá hiển thị
      const newTotal = item.finalPrice * item.quantity;
      priceElement.textContent = newTotal.toLocaleString("vi-VN") + " đ";
    });

    // Xoá sản phẩm
    removeBtn.addEventListener("click", () => {
      // Giảm cartCount theo số lượng
      cartCount -= item.quantity;
      if (cartCount < 0) cartCount = 0;
      localStorage.setItem("cartCount", cartCount);
      updateCartDisplay();

      // Xoá khỏi mảng và localStorage
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      cartItemDiv.remove();
    });

    // Đặt hàng
    orderBtn.addEventListener("click", () => {
      alert("Bạn đã đặt hàng sản phẩm: " + item.name);
      // Tuỳ chọn muốn xử lý gì tiếp theo
    });

    // Thêm item vào container
    cartContainer.appendChild(cartItemDiv);
  });
});
