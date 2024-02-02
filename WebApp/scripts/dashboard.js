const lessThan18 = document.getElementById("less-18");
const from18To50 = document.getElementById("18-to-50");
const greaterThan50 = document.getElementById("greater-50");

document.addEventListener("DOMContentLoaded", function () {
  let admin = localStorage.getItem("admin");
  let users = localStorage.getItem("users");
  let currentUser = sessionStorage.getItem("username");

  admin = JSON.parse(admin);
  users = JSON.parse(users);
  currentUser = JSON.parse(currentUser);

  let lessThan18Users = 0;
  let from18To50Users = 0;
  let greaterThan50Users = 0;

  users.forEach((user) => {
    if (user.age < 18) lessThan18Users++;
    else if (user.age >= 18 && user.age <= 50) from18To50Users++;
    else greaterThan50Users++;
  });

  lessThan18.innerText = `${lessThan18Users} Users`;
  from18To50.innerText = `${from18To50Users} Users`;
  greaterThan50.innerText = `${greaterThan50Users} Users`;

  if (currentUser) {
    document.getElementById("admin-name").innerText = currentUser;
    document.getElementById("user-link").classList.add("hidden");
    document.getElementById("user-session-link").classList.add("hidden");
  } else {
    document.getElementById("admin-name").innerText = admin.name;
  }
});
