const button = document.querySelector("button");
const paragraph = document.querySelector("p");

button.addEventListener("click", changeText);

function changeText() {
  paragraph.innerHTML = "new text";
}
