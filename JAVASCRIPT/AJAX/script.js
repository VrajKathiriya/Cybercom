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
  // create an object xhr
  const xhr = new XMLHttpRequest();

  xhr.open("GET", "https://reqres.in/api/users?page=2", true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status == 200) {
        console.log(JSON.parse(xhr.responseText));
      } else {
        console.log("error");
      }
    }
  };
  xhr.send();
}

function getSpecificData() {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", "https://reqres.in/api/users/2", true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status == 200) {
        console.log(JSON.parse(xhr.responseText));
      } else {
        console.log("error");
      }
    }
  };
  xhr.send();
}

function postData() {
  const xhr = new XMLHttpRequest();

  xhr.open("POST", "https://reqres.in/api/users", true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status == 201) {
        console.log(JSON.parse(xhr.responseText));
      } else {
        console.log("error");
      }
    }
  };

  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.send(
    JSON.stringify({
      name: "vraj",
      age: 21,
    })
  );
}

function updateData() {
  const xhr = new XMLHttpRequest();

  xhr.open("PUT", "https://reqres.in/api/users/2", true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status == 200) {
        console.log(JSON.parse(xhr.responseText));
      } else {
        console.log("error");
      }
    }
  };

  xhr.send(
    JSON.stringify({
      name: "vraj",
      age: 21,
    })
  );
}

function deleteData() {
  const xhr = new XMLHttpRequest();

  xhr.open("DELETE", "https://reqres.in/api/users/2", true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status == 204) {
        console.log("deleted");
      } else {
        console.log("error");
      }
    }
  };

  xhr.send();
}
