const imgBtn = document.getElementById("imgBtn");
const img = document.querySelector("img");

imgBtn.addEventListener("click", changeImage);

let num = 1;
function changeImage() {
  const imgArr = ["bus.jpg", "train.jpg", "train2.jpg"];

  img.src = `img/${imgArr[num]}`;
  num = (num + 1) % 3;
}
