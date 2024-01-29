// select elements with id
const idElement = document.getElementById("idElement");

console.log("id element", idElement);

// select elements by class Name
const classElements = document.getElementsByClassName("classElement");
console.log("classs element", classElements);

// select elements by tag name
const tagElements = document.getElementsByTagName("div");
console.log("div tag elements", tagElements);

// select element by query selector
const queryElement = document.querySelector(".queryElement");
console.log("query elemet", queryElement);

// select elements by querySelectorAll
const queryElements = document.querySelectorAll("div");
console.log("div tag querySelectorAll", queryElements);
