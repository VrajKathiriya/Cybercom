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
  let users = localStorage.getItem("users");
  users = JSON.parse(users);

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  let currentUser;

  users.forEach((user) => {
    if (user.email == email) {
      currentUser = user;
    }
  });

  if (admin.email == email && admin.password == password) {
    window.location.href = "dashboard.html";
  } else if (!currentUser) {
    alert("please enter correct details");
    return;
  } else if (currentUser.email == email && currentUser.password == password) {
    sessionStorage.setItem("username", JSON.stringify(currentUser.name));

    window.location.href = "subUser.html";
  } else {
    alert("please enter correct details");
  }
});
