// create an object
const person = {
  name: "Vraj",
  age: 21,
  address: "Amreli",
};

// access by . operator
console.log("name => " + person.name);

// access by []
console.log("age => " + person["age"]);

// access by object distructuring
let { address } = { ...person };
console.log("address => " + address);

// modify property of object
person.age = 12;

console.log("new age => " + person.age);
