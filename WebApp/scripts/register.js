const registerBtn = document.getElementById("register-btn");

registerBtn.addEventListener("click", registerAdmin);

document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("admin")) {
    registerBtn.classList.add("hidden");
    document.querySelector(".register").innerHTML = `Admin already registerd`;
  }
});

function registerAdmin(e) {
  e.preventDefault();
  // get values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const conPassword = document.getElementById("con-password").value;
  const city = document.getElementById("city").value;
  const state = document.getElementById("state").value;

  const admin = { name, email, password, city, state };
  // console.log(admin);

  localStorage.setItem("admin", JSON.stringify(admin));

  window.location.href = "login.html";
}
