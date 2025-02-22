document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.getElementById("menuBtn");
  const sidebarMenu = document.getElementById("sidebarMenu");
  const productMenuBtn = document.getElementById("productMenuBtn");
  const productSubMenu = document.getElementById("productSubMenu");

  // Ẩn submenu lúc đầu
  productSubMenu.style.display = "none";

  // Toggle menu chính (dấu 3 gạch)
  menuBtn.addEventListener("click", function (e) {
    sidebarMenu.classList.toggle("active");
    e.stopPropagation();
  });

  // Toggle submenu khi bấm vào Sản phẩm
  productMenuBtn.addEventListener("click", function (e) {
    if (productSubMenu.style.display === "none") {
      productSubMenu.style.display = "block";
    } else {
      productSubMenu.style.display = "none";
    }
    e.stopPropagation(); // Ngăn sự kiện lan ra ngoài
  });

  // Ẩn menu và submenu khi bấm ra ngoài
  document.addEventListener("click", function (e) {
    if (!sidebarMenu.contains(e.target) && !menuBtn.contains(e.target)) {
      sidebarMenu.classList.remove("active");
      productSubMenu.style.display = "none"; // Ẩn submenu
    }
  });
});

document.getElementById("searchBtn").addEventListener("click", function () {
  let keyword = document.getElementById("searchInput").value.toLowerCase();
  alert("Bạn đang tìm kiếm: " + keyword);
});
