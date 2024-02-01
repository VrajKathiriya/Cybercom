const registerBtn = document.getElementById("register-btn");
const loginBtn = document.getElementById("login-btn");

registerBtn.addEventListener("click", function (e) {
  e.preventDefault();
  window.location.href = "registration.html";
});

loginBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let admin = localStorage.getItem("admin");
  admin = JSON.parse(admin);

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (admin.email == email && admin.password == password) {
    window.location.href = "dashboard.html";
  } else {
    alert("enter correct details");
  }
});
