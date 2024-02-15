const getAllBtn = document.getElementById("getAllBtn");
const getSpecificBtn = document.getElementById("getSpecificBtn");
const postBtn = document.getElementById("postBtn");
const putBtn = document.getElementById("putBtn");
const deleteBtn = document.getElementById("deleteBtn");

getAllBtn.addEventListener("click", getAllData);
getSpecificBtn.addEventListener("click", getSpecificData);
postBtn.addEventListener("click", postData);
putBtn.addEventListener("click", updateData);
deleteBtn.addEventListener("click", deleteData);

function getAllData() {
  fetch("https://reqres.in/api/users?page=2")
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
}

function getSpecificData() {
  fetch("https://reqres.in/api/users/2")
    .then((response) => response.json())
    .then((data) => console.log(data));
}

function postData() {
  fetch("https://reqres.in/api/users", {
    method: "POST",
    body: JSON.stringify({
      name: "vraj",
      age: 20,
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
}

function updateData() {
  cfetch("https://reqres.in/api/users/2", {
    method: "PUT",
    body: JSON.stringify({
      name: "vraj",
      age: 20,
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
}

function deleteData() {
  fetch("https://reqres.in/api/users", {
    method: "DELETE",
  }).then((res) => console.log(res));
}
