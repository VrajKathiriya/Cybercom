const toDoTitleEl = document.getElementById("todo-title");
const toDoDescriptionEl = document.getElementById("todo-description");
const toDoDueDateEl = document.getElementById("todo-due-date");
const addToDoBtn = document.getElementById("add-todo-btn");
const toDoListEl = document.querySelector(".todo-list");

let currentIndex;

document.addEventListener("DOMContentLoaded", function () {
  let todos = localStorage.getItem("todos");
  todos = JSON.parse(todos) || [];

  todos.forEach((todo) => {
    todo.remainingDays = calculateRemainigDays(todo.dueDate);
  });

  localStorage.setItem("todos", JSON.stringify(todos));

  todos = localStorage.getItem("todos");
  todos = JSON.parse(todos) || [];
  bindData(todos);
});

addToDoBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (addToDoBtn.innerText == "Add ToDo") addToDo();
  else updateToDo(currentIndex);
});

// function for add todo
function addToDo() {
  let todos = localStorage.getItem("todos");

  todos = JSON.parse(todos) || [];

  let date = new Date();

  const id = Date.now();
  const title = toDoTitleEl.value;
  const description = toDoDescriptionEl.value;
  const dueDate = toDoDueDateEl.value;
  const createDate = `${date.getFullYear()}-${
    date.getMonth() < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`
  }-${date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`}`;
  const remainingDays = calculateRemainigDays(dueDate);

  console.log(document.querySelector(".rem-day-box p"));

  if (!title) {
    alert("Please enter the title");
    return;
  } else if (!description) {
    alert("Please enter the description");
    return;
  } else if (!dueDate) {
    alert("Please enter due Date");
    return;
  } else if (remainingDays < 0) {
    alert("Please enter valid due date");
    return;
  }

  let newToDo = {};

  newToDo = { id, title, description, dueDate, createDate, remainingDays };

  todos = [newToDo, ...todos];

  localStorage.setItem("todos", JSON.stringify(todos));

  clearForm();
  bindData(todos);
}

// function for binding data
function bindData(todos) {
  console.log(todos);
  if (todos.length <= 0) {
    console.log("hi");
    toDoListEl.innerHTML = `No Todos to show 🥲`;
    return;
  }
  let todosHTML = "";
  todos.forEach((todo) => {
    let todoNode = `
    <div class="todo ${
      todo.remainingDays <= 10
        ? "todo-red-border"
        : todo.remainingDays <= 20
        ? "todo-yellow-border"
        : "todo-green-border"
    }">
      <div class="todo-details">
        <h3>${todo.title}</h3>
        <p id="description">
          ${todo.description}
        </p>
        <div class="date-container">
          <div class="create-date-box">
            <h4>Create Date</h4>
            <p>${todo.createDate}</p>
          </div>
          <div class="due-date-box">
            <h4>Due Date</h4>
            <p>${todo.dueDate}</p>
          </div>
          <div class="rem-day-box">
            <h4>Remaining Days</h4>
            <p class=${
              todo.remainingDays <= 10
                ? "red"
                : todo.remainingDays <= 20
                ? "yellow"
                : "green"
            }>${todo.remainingDays}</p>
          </div>
        </div>
      </div>
      <div class="todo-actions">
        <button class="edit-todo-btn" onclick=editToDo(${
          todo.id
        })><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="delete-todo-btn" onclick=deleteToDo(${
          todo.id
        })><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>`;
    todosHTML += todoNode;
  });
  toDoListEl.innerHTML = todosHTML;
}

// function for delete todo
function deleteToDo(id) {
  let confirmed = confirm("Are you sure you want to delete this todo?");

  if (!confirmed) return;
  let todos = localStorage.getItem("todos");
  todos = JSON.parse(todos) || [];

  todos = todos.filter((todo) => todo.id != id);

  localStorage.setItem("todos", JSON.stringify(todos));

  clearForm();
  bindData(todos);
}

// function that edit todo
function editToDo(id) {
  let todos = localStorage.getItem("todos");
  todos = JSON.parse(todos) || [];

  let todo = todos.find((todo) => todo.id == id);
  currentIndex = todos.findIndex((todo) => todo.id == id);

  toDoTitleEl.value = todo.title;
  toDoDescriptionEl.value = todo.description;
  toDoDueDateEl.value = todo.dueDate;

  addToDoBtn.innerText = "Update ToDo";
  addToDoBtn.style.backgroundColor = "var(--blue)";
}

// function that update todo
function updateToDo(index) {
  let todos = localStorage.getItem("todos");
  todos = JSON.parse(todos) || [];

  let date = new Date();

  const id = Date.now();
  const title = toDoTitleEl.value;
  const description = toDoDescriptionEl.value;
  const dueDate = toDoDueDateEl.value;
  const createDate = `${date.getFullYear()}-${
    date.getMonth() < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`
  }-${date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`}`;
  const remainingDays = calculateRemainigDays(dueDate);

  let newToDo = {};

  newToDo = { id, title, description, dueDate, createDate, remainingDays };

  todos[index] = newToDo;

  localStorage.setItem("todos", JSON.stringify(todos));

  clearForm();
  bindData(todos);
}

// function that will clear the form
function clearForm() {
  toDoTitleEl.value = "";
  toDoDescriptionEl.value = "";
  toDoDueDateEl.value = "";

  addToDoBtn.innerText = "Add ToDo";
  addToDoBtn.style.backgroundColor = "var(--green)";
}

// function that will calculate remaining days
function calculateRemainigDays(dueDate) {
  let currentDate = new Date(Date.now());
  dueDate = new Date(dueDate);

  let millis = dueDate.getTime() - currentDate.getTime();

  let remDays = Math.ceil(millis / (1000 * 60 * 60 * 24));

  return remDays;
}
