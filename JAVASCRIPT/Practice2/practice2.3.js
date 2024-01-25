// create an array of objects
const objArr = [
  {
    name: "Ajay",
    age: 20,
  },
  {
    name: "Vijay",
    age: 23,
  },
  {
    name: "Rahul",
    age: 30,
  },
];

// display data of objects through forEach loop
objArr.forEach((obj) => {
  console.log(obj.name + "'s age = " + obj.age);
});
