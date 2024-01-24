const p1Btn = document.getElementById("p1Btn");
const p2Btn = document.getElementById("p2Btn");
const p3Btn = document.getElementById("p3Btn");

const paragraph1 = document.getElementById("paragraph1");
const paragraph2 = document.getElementById("paragraph2");
const paragraph3 = document.getElementById("paragraph3");

p1Btn.addEventListener("click", function () {
  changeText(paragraph1);
});
p2Btn.addEventListener("click", function () {
  changeText(paragraph2);
});
p3Btn.addEventListener("click", function () {
  changeText(paragraph3);
});

function changeText(element) {
  element.innerHTML = "new text";
}
