document.addEventListener("DOMContentLoaded", function () {
  // Lấy phần tử hiển thị giá và đọc giá gốc từ data attribute
  const finalPriceEl = document.getElementById("finalPrice");
  let basePrice = parseInt(finalPriceEl.getAttribute("data-baseprice")) || 0;
  let finalPrice = basePrice;

  // Lấy tên sản phẩm từ phần tử có class "product-name"
  const productNameEl = document.querySelector(".product-name");
  let productName = productNameEl
    ? productNameEl.textContent.trim()
    : "Unnamed Product";

  // Lấy các input cho size và topping
  const sizeRadios = document.querySelectorAll('input[name="size"]');
  const toppingCheckboxes = document.querySelectorAll('input[name="topping"]');

  // Hàm tính toán giá cuối dựa trên size và topping được chọn
  function calculatePrice() {
    let sizePrice = 0;
    sizeRadios.forEach((radio) => {
      if (radio.checked) {
        sizePrice = parseInt(radio.getAttribute("data-price"));
      }
    });

    let toppingPrice = 0;
    toppingCheckboxes.forEach((chk) => {
      if (chk.checked) {
        toppingPrice += parseInt(chk.getAttribute("data-price"));
      }
    });

    finalPrice = basePrice + sizePrice + toppingPrice;
    finalPriceEl.textContent = finalPrice.toLocaleString("vi-VN") + " đ";
  }

  // Lắng nghe sự kiện thay đổi trên radio và checkbox để cập nhật giá
  sizeRadios.forEach((radio) => {
    radio.addEventListener("change", calculatePrice);
  });
  toppingCheckboxes.forEach((chk) => {
    chk.addEventListener("change", calculatePrice);
  });
  calculatePrice(); // Gọi tính toán ngay khi load trang

  // Xử lý nút "Thêm vào giỏ hàng"
  const addToCartBtn = document.getElementById("addToCartBtn");
  addToCartBtn.addEventListener("click", function (e) {
    e.preventDefault();

    // Lấy giá trị size đã chọn (radio)
    const selectedSize =
      Array.from(sizeRadios).find((radio) => radio.checked)?.value || "S";

    // Lấy danh sách topping đã chọn (checkbox)
    const selectedToppings = [];
    toppingCheckboxes.forEach((chk) => {
      if (chk.checked) {
        // Lấy text của label chứa input (giả sử label chứa thông tin hiển thị)
        let labelText = chk.parentElement.textContent.trim();
        selectedToppings.push(labelText);
      }
    });

    // Tạo đối tượng sản phẩm
    const product = {
      name: productName,
      basePrice: basePrice,
      finalPrice: finalPrice,
      size: selectedSize,
      toppings: selectedToppings,
      image: document.getElementById("mainProductImage").getAttribute("src"),
    };
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const addToCartBtn = document.getElementById("addToCartBtn");

  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", function (event) {
      event.preventDefault();

      // 1. Lấy thông tin sản phẩm
      const productName = document.querySelector(".product-name").innerText;
      const basePrice = parseInt(
        document.getElementById("finalPrice").getAttribute("data-baseprice")
      );

      // Lấy size
      const selectedSizeRadio = document.querySelector(
        'input[name="size"]:checked'
      );
      const sizeName = selectedSizeRadio.value;
      const sizePrice = parseInt(selectedSizeRadio.getAttribute("data-price"));

      // Lấy topping
      const toppingCheckboxes = document.querySelectorAll(
        'input[name="topping"]:checked'
      );
      let toppingList = [];
      let toppingPriceTotal = 0;
      toppingCheckboxes.forEach((checkbox) => {
        const price = parseInt(checkbox.getAttribute("data-price"));
        toppingList.push(checkbox.parentElement.innerText.trim());
        toppingPriceTotal += price;
      });

      // Tính giá cuối cùng
      const finalPrice = basePrice + sizePrice + toppingPriceTotal;

      // Lấy URL ảnh
      const productImageURL = document
        .getElementById("mainProductImage")
        .getAttribute("src");

      // 2. Tạo object
      const cartItem = {
        name: productName,
        basePrice: basePrice,
        sizeName: sizeName,
        sizePrice: sizePrice,
        toppingList: toppingList,
        toppingPriceTotal: toppingPriceTotal,
        finalPrice: finalPrice,
        quantity: 1,
        imageURL: productImageURL, // Thêm đường dẫn ảnh
      };

      // 3. Lưu vào localStorage
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(cartItem);
      localStorage.setItem("cart", JSON.stringify(cart));
    });
  }
});
