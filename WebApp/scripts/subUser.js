document.addEventListener("DOMContentLoaded", function () {
  let username = sessionStorage.getItem("username");

  document.getElementById("user-name").innerText = JSON.parse(username);
});
