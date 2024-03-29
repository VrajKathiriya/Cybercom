const addUserBtn = document.getElementById("add-user-btn");
let users = [];
let currentIndex;

loadUsersList();

function loadUsersList() {
  document.addEventListener("DOMContentLoaded", function () {
    let users = localStorage.getItem("users");
    let admin = localStorage.getItem("admin");
    admin = JSON.parse(admin);

    if (!users) {
      const temp = [];
      localStorage.setItem("users", JSON.stringify(temp));
    } else {
      displayUsersList(JSON.parse(users));
    }

    document.getElementById("admin-name").innerText = admin.name;
  });
}

// display user list function
function displayUsersList(users) {
  const tbody = document.getElementById("content");

  users.forEach((user) => {
    let date = new Date(user.birthdate);
    console.log(date);
    let birthdate = `${date.getDate()} / ${
      date.getMonth() + 1
    } / ${date.getFullYear()}`;

    const node = document.createElement("tr");

    node.innerHTML = `<td>${user.name}</td>
    <td>${user.email}</td>
    <td>${user.password}</td>
    <td>${birthdate}</td>
    <td>${user.age}</td>
    <td><span class="edit" onclick=editUser(${user.id})>edit</span> <span class="delete" onclick=deleteUser(${user.id},)>delete</span></td>`;

    tbody.appendChild(node);
  });
}

// add user
addUserBtn.addEventListener("click", function (e) {
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const birthdate = document.getElementById("birthdate");

  if (!name.value) {
    alert("Please enter name");
  } else if (!email.value) {
    alert("Please enter email");
  } else if (!password.value) {
    alert("Please enter password");
  } else if (!birthdate.value) {
    alert("Please enter birthdate");
  } else {
    if (addUserBtn.innerText == "Add user") {
      addUser(e);
    } else if (addUserBtn.innerText == "Update User") {
      updateUser(e);
    }
  }
});

// add user function
function addUser(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const birthdate = document.getElementById("birthdate").value;
  const id = Date.now();
  const age = getAge(birthdate);

  if (age <= 0) {
    alert("Please enter proper birthdate");
    return;
  }

  const newUser = { id, name, email, password, birthdate, age };

  let users = localStorage.getItem("users");
  users = JSON.parse(users);
  users = [...users, newUser];

  localStorage.setItem("users", JSON.stringify(users));
  location.reload();
}

// get age of user
function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

// edit user function
function editUser(id) {
  let users = localStorage.getItem("users");
  users = JSON.parse(users);
  let currentUser;

  users.forEach((user, i) => {
    if (user.id == id) {
      currentUser = user;
      currentIndex = i;
      return;
    }
  });

  fillForm(currentUser);
  // deleteUser(currentUser);
}

function updateUser(e) {
  e.preventDefault();
  let users = localStorage.getItem("users");
  users = JSON.parse(users);

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const birthdate = document.getElementById("birthdate").value;
  const id = Date.now();
  const age = getAge(birthdate);

  let newUser = { id, name, email, password, birthdate, age };

  console.log(currentIndex);
  users[currentIndex] = newUser;
  localStorage.setItem("users", JSON.stringify(users));
  location.reload();
}

// fill entry for updating user
function fillForm(user) {
  let name = document.getElementById("name");
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  let birthdate = document.getElementById("birthdate");

  name.value = user.name;
  email.value = user.email;
  password.value = user.password;
  birthdate.value = user.birthdate;

  document.getElementById("add-user-heading").innerHTML = "Update User";
  addUserBtn.innerText = "Update User";
}

// delete user function
function deleteUser(id) {
  let users = localStorage.getItem("users");
  users = JSON.parse(users);

  users = users.filter((user) => user.id != id);
  localStorage.setItem("users", JSON.stringify(users));
  location.reload();
}
