const addUserBtn = document.getElementById("add-user-btn");
let users = [];

loadUsersList();

function loadUsersList() {
  document.addEventListener("DOMContentLoaded", function () {
    let users = localStorage.getItem("users");

    if (!users) {
      const temp = [];
      localStorage.setItem("users", JSON.stringify(temp));
    } else {
      displayUsersList(JSON.parse(users));
    }
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
addUserBtn.addEventListener("click", addUser);

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
function editUser(id) {}

// delete user function
function deleteUser(id) {
  let users = localStorage.getItem("users");
  users = JSON.parse(users);

  users = users.filter((user) => user.id != id);
  localStorage.setItem("users", JSON.stringify(users));
  location.reload();
}
