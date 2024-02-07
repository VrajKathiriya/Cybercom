const toDoTitleEl = document.getElementById("todo-title");
const toDoDescriptionEl = document.getElementById("todo-description");
const toDoDueDateEl = document.getElementById("todo-due-date");
const addToDoBtn = document.getElementById("add-todo-btn");
const toDoListEl = document.querySelector(".todo-list");

let currentIndex;

document.addEventListener("DOMContentLoaded", function () {
  let todos = localStorage.getItem("todos");
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

  const id = Date.now();
  const title = toDoTitleEl.value;
  const description = toDoDescriptionEl.value;
  const dueDate = toDoDueDateEl.value;

  let date = new Date();
  console.log(date.getFullYear());

  if (!title || !description || !dueDate) {
    alert("Please fill all the details first");
    return;
  }

  let newToDo = {};

  newToDo = { id, title, description, dueDate };

  todos = [...todos, newToDo];

  localStorage.setItem("todos", JSON.stringify(todos));

  clearForm();
  bindData(todos);
}

// function for binding data
function bindData(todos) {
  let todosHTML = "";
  todos.reverse().forEach((todo) => {
    let todoNode = `
    <div class="todo">
      <div class="todo-details">
        <h3>${todo.title}</h3>
        <p id="description">
          ${todo.description}
        </p>
        <div class="date-container">
          <div class="due-date-box">
            <h4>Due Date</h4>
            <p>${todo.dueDate}</p>
          </div>
        </div>
      </div>
      <div class="todo-actions">
        <button class="edit-todo-btn" onclick=editToDo(${todo.id})><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="delete-todo-btn" onclick=deleteToDo(${todo.id})><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>`;

    todosHTML += todoNode;
  });
  toDoListEl.innerHTML = todosHTML;
}

// function for delete todo
function deleteToDo(id) {
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

  console.log(todo.title);

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

  const id = Date.now();
  const title = toDoTitleEl.value;
  const description = toDoDescriptionEl.value;
  const dueDate = toDoDueDateEl.value;

  let newToDo = {};

  newToDo = { id, title, description, dueDate };

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
