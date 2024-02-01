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
    const node = document.createElement("tr");
    node.innerHTML = `<td>${user.name}</td>
    <td>${user.email}</td>
    <td>${user.password}</td>
    <td>${user.birthdate}</td>
    <td>23</td>
    <td><span class="edit" onclick=editUser(${user.id})>edit</span> <span class="delete" onclick=deleteUser(${user.id},)>delete</span></td>`;

    tbody.appendChild(node);
  });
}

// add user
addUserBtn.addEventListener("click", function (e) {
  if (addUserBtn.innerText == "Add user") {
    addUser(e);
  } else if (addUserBtn.innerText == "Update User") {
    updateUser(e);
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

  const newUser = { id, name, email, password, birthdate };

  let users = localStorage.getItem("users");
  users = JSON.parse(users);
  users = [...users, newUser];

  localStorage.setItem("users", JSON.stringify(users));
  location.reload();
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

  let newUser = { name, email, password, birthdate };

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
