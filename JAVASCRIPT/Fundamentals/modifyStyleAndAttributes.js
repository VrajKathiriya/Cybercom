// getAttribute example
document.getElementById("getAttribute").addEventListener("click", function () {
  console.log("id =", this.getAttribute("id"));
});

// setAttribute Example
document.getElementById("setAttribute").addEventListener("click", function () {
  console.log("before set attribute", this);
  setTimeout(() => {
    this.setAttribute("name", "setAttribute");
    console.log("after set attribute", this);
  }, 100);
});

// change style example
document.getElementById("changeStyle").addEventListener("click", function () {
  this.style.color = "blue";
});

// see element's classList
document.getElementById("classList").addEventListener("click", function () {
  console.log(this.classList);
});

// see class name of element
document.getElementById("className").addEventListener("click", function () {
  console.log(this.className);
});
