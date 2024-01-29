// create element
document.getElementById("createElement").addEventListener("click", function () {
  const div = document.createElement("div");
  console.log("this is div element", div);
});

// append child
document.getElementById("appendChild").addEventListener("click", function () {
  const appendEl = document.createElement("div");
  appendEl.innerHTML = "<b>appended child</b>";
  this.appendChild(appendEl);
});

// remove child
document.getElementById("removeChild").addEventListener("click", function () {
  const child = document.getElementById("child");
  this.removeChild(child);
});

// replace child
document.getElementById("replaceChild").addEventListener("click", function () {
  const oldChild = document.getElementById("replace");
  const newChild = document.createElement("div");
  newChild.innerHTML = "<b>replaced child</b>";

  this.replaceChild(newChild, oldChild);
});

// remove node
document.getElementById("remove").addEventListener("click", function () {
  this.remove();
});

// create text node
document
  .getElementById("createTextNode")
  .addEventListener("click", function () {
    const newTextNode = document.createTextNode(" this is text node");
    this.appendChild(newTextNode);
  });
