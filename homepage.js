document.addEventListener("DOMContentLoaded", function () {
  
  const orderBtn = document.querySelector(".order-btn");
  const loginBtn = document.querySelector(".buttons button:nth-child(2)");
  const signupBtn = document.querySelector(".buttons button:nth-child(1)");
  
  const userEmail = localStorage.getItem("email");
  const userName = localStorage.getItem("name");
  if (userEmail && userName) {
    alert(`Welcome back, ${userName}!`);
  }
  // SIGN UP button navigates to signup page
  signupBtn.addEventListener("click", function () {
    window.location.href = "signup.html";
  });
  // LOGIN button navigates to login page
  loginBtn.addEventListener("click", function () {
    window.location.href = "login.html";
  });
  // ORDER button: checks login, then goes to cart
  orderBtn.addEventListener("click", function () {
    if (localStorage.getItem("email")) {
      // Go to cart (up two folders then into Add to cart_VILLANUEVA)
      window.location.href = "cart.html";
    } else {
      alert("Please log in to place an order.");
      window.location.href = "login.html";
    }
  });
});