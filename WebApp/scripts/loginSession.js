document.addEventListener("DOMContentLoaded", function () {
  let admin = localStorage.getItem("admin");
  admin = JSON.parse(admin);
  document.getElementById("admin-name").innerText = admin.name;
});
