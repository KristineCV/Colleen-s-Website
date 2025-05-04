document.addEventListener("DOMContentLoaded", () => {
  const cartItems = document.querySelector(".cart-items");
  const totalItemsElem = document.querySelector(".total-items");
  const totalPriceElem = document.querySelector(".total-price");
  const cartBadge = document.querySelector(".cart-badge");
  const popupModal = document.getElementById("popupModal");
  const popupButton = document.querySelector(".add-cart-btn");
  const closePopupButton = document.getElementById("closePopup");

  // User and home icons
  const userIcon = document.querySelector(".bi-person");
  const homeIcon = document.querySelector(".bi-house");

  
  function updateEmptyCartMessage() {
    const emptyCartMessage = document.querySelector(".empty-cart-message");
    const dragProductsPrompt = document.querySelector(".drag-products-prompt");
    const cartItemCount = cartItems.querySelectorAll(".cart-item").length;
    if (cartItemCount === 0) {
      emptyCartMessage.classList.remove("hidden");
      dragProductsPrompt.classList.remove("hidden");
    } else {
      emptyCartMessage.classList.add("hidden");
      dragProductsPrompt.classList.add("hidden");
    }
  }
  
  // Update cart summary
  function updateCartSummary() {
    const cartItemRows = cartItems.querySelectorAll(".cart-item");
    let totalItems = 0;
    let totalPrice = 0;
    cartItemRows.forEach((row) => {
      const quantity = parseInt(row.querySelector(".item-quantity").textContent, 10);
      const price = parseFloat(row.dataset.price);
      totalItems += quantity;
      totalPrice += quantity * price;
    });
    totalItemsElem.textContent = totalItems;
    totalPriceElem.textContent = `₱ ${totalPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
    if (totalItems > 0) {
      cartBadge.textContent = totalItems;
      cartBadge.classList.remove("hidden");
    } else {
      cartBadge.classList.add("hidden");
    }
    updateEmptyCartMessage();
  }

  // Add product to cart
  function addToCart(name, price, image) {
    const existingCartItem = Array.from(cartItems.children).find(
      (item) => item.querySelector(".item-name")?.textContent === name
    );
    if (existingCartItem) {
      const quantityElem = existingCartItem.querySelector(".item-quantity");
      quantityElem.textContent = parseInt(quantityElem.textContent, 10) + 1;
    } else {
      const cartRow = document.createElement("tr");
      cartRow.className = "cart-item";
      cartRow.dataset.price = price;
      cartRow.innerHTML = `
        <td>
          <div class="cart-item-details">
            <img src="${image}" alt="${name}" style="width: 78px; height: 78px;">
            <span class="item-name">${name}</span>
          </div>
        </td>
        <td>
          <button class="decrease-btn">-</button>
          <span class="item-quantity">1</span>
          <button class="increase-btn">+</button>
        </td>
        <td>₱${price.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
        <td><button class="remove-btn">x</button></td>
      `;
      cartItems.appendChild(cartRow);

      // "-" button
      cartRow.querySelector(".decrease-btn").addEventListener("click", () => {
        const quantityElem = cartRow.querySelector(".item-quantity");
        const currentQuantity = parseInt(quantityElem.textContent, 10);
        if (currentQuantity > 1) {
          quantityElem.textContent = currentQuantity - 1;
        } else {
          cartRow.remove();
        }
        updateCartSummary();
      });

      // "+" button
      cartRow.querySelector(".increase-btn").addEventListener("click", () => {
        const quantityElem = cartRow.querySelector(".item-quantity");
        quantityElem.textContent = parseInt(quantityElem.textContent, 10) + 1;
        updateCartSummary();
      });

      // (x) button
      cartRow.querySelector(".remove-btn").addEventListener("click", () => {
        cartRow.remove();
        updateCartSummary();
      });
    }
    updateCartSummary();
  }
  // Drag-and-drop products to cart
  document.querySelectorAll(".product-card").forEach((product) => {
    product.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("name", product.dataset.name);
      e.dataTransfer.setData("price", product.dataset.price);
      e.dataTransfer.setData("image", product.dataset.image);
    });
  });
  cartItems.addEventListener("dragover", (e) => e.preventDefault());
  cartItems.addEventListener("drop", (e) => {
    e.preventDefault();
    const name = e.dataTransfer.getData("name");
    const price = parseFloat(e.dataTransfer.getData("price"));
    const image = e.dataTransfer.getData("image");
    addToCart(name, price, image);
  });

  // Popup modal open/close
  popupButton.addEventListener("click", () => popupModal.classList.remove("hidden"));
  closePopupButton.addEventListener("click", () => popupModal.classList.add("hidden"));

  // Add products to cart from the popup
  document.querySelectorAll(".popup-product-card").forEach((product) => {
    product.addEventListener("click", () => {
      const name = product.dataset.name;
      const price = parseFloat(product.dataset.price);
      const image = product.dataset.image;
      addToCart(name, price, image);
      popupModal.classList.add("hidden");
    });
  });

  // USER ICON & HOME ICON FUNCTIONALITY 
  userIcon.addEventListener("click", () => {
    const name = localStorage.getItem("name") || "User";
    const email = localStorage.getItem("email") || "";
    if (email) {
      const confirmLogout = confirm(
        `Account Logged In:\n\nName: ${name}\nEmail: ${email}\n\nDo you want to log out?`
      );
      if (confirmLogout) {
        alert(
          `You have successfully logged out.\n\nName: ${name}\nEmail: ${email}`
        );
        localStorage.clear();
        window.location.href = "index.html";
      }
    } else {
      alert("Please log in to access your user account.");
      window.location.href = "login.html";
    }
  });
  homeIcon.addEventListener("click", () => {
    const isLoggedIn = localStorage.getItem("email");
    if (isLoggedIn) {
      const goHome = confirm("Do you want to go back to the homepage?");
      if (goHome) {
        window.location.href = "index.html";
      }
    } else {
      alert("You need to log in to go to the homepage.");
      window.location.href = "login.html";
    }
  });
  
  updateEmptyCartMessage();
});