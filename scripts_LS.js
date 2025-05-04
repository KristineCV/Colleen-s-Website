document.addEventListener("DOMContentLoaded", function () {
  // Toggle password visibility
  const togglePassword = document.getElementById("togglePassword");
  if (togglePassword) {
    togglePassword.addEventListener("click", function () {
      const passwordInput = document.getElementById("passwordInput");
      if (passwordInput.type === "password") {
        passwordInput.type = "text"; // Show password
        this.classList.remove("glyphicon-eye-open");
        this.classList.add("glyphicon-eye-close");
      } else {
        passwordInput.type = "password"; // Hide password
        this.classList.remove("glyphicon-eye-close");
        this.classList.add("glyphicon-eye-open");
      }
    });
  }

  // Log In functionality
  const loginBtn = document.getElementById("loginBtn");
  if (loginBtn) {
    loginBtn.addEventListener("click", function (event) {
      event.preventDefault(); 
      const email = document.querySelector("#emailInput").value.trim();
      const password = document.querySelector("#passwordInput").value.trim();

      if (!email || !password) {
        alert("Please fill in the email and password fields.");
        return;
      }

      const storedEmail = localStorage.getItem("email");
      const storedPassword = localStorage.getItem("password");

      if (storedEmail === email && storedPassword === password) {
        
        window.location.href = `index.html?email=${encodeURIComponent(email)}`;
      } else {
        alert("Invalid email or password. Please try again.");
      }
    });
  }

  // Sign-Up functionality
  const signupBtn = document.getElementById("signupBtn");
  if (signupBtn) {
    signupBtn.addEventListener("click", function (event) {
      event.preventDefault(); 
      const name = document.querySelector("#nameInput").value.trim();
      const email = document.querySelector("#emailInput").value.trim();
      const password = document.querySelector("#passwordInput").value.trim();

      if (!name || !email || !password) {
        alert("Please fill in all the fields: Name, Email, and Password.");
        return;
      }

      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);

      window.location.href = `index.html?name=${encodeURIComponent(name)}`;
    });
  }
});