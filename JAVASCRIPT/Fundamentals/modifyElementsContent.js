// innerHTML example
document.getElementById("innerHTML").addEventListener("click", function () {
  this.innerHTML = "<h4>this is new innerHTML text</h4>";
});

// textContent example
document.getElementById("textContent").addEventListener("click", function () {
  this.textContent = "this is new textContnet text";
});

// insertAdjacentHTML example
document.getElementById("adjacentHTML").addEventListener("click", function () {
  this.insertAdjacentHTML("beforebegin", "<p>before begin text</p>");
  this.insertAdjacentHTML("afterbegin", "<p>after begin text</p>");
  this.insertAdjacentHTML("beforeend", "<p>before end text</p>");
  this.insertAdjacentHTML("afterend", "<p>after end text</p>");
});
