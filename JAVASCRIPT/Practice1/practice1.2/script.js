const addBtn = document.getElementById("addBtn");
const removeBtn = document.getElementById("removeBtn");
const list = document.getElementById("list");

addBtn.addEventListener("click", addItem);
removeBtn.addEventListener("click", removeItem);

let num = 1;
function addItem() {
  const listItem = document.createElement("p");
  const node = document.createTextNode("this is list item " + num);

  listItem.appendChild(node);
  list.appendChild(listItem);
  num++;
}

function removeItem() {
  list.removeChild(list.lastElementChild);
  num--;
}
