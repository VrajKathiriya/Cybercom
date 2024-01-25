let obj1 = {
  name: "Vraj",
  age: 21,
};

let obj2 = {
  address: "Amreli",
};

// function that combines 2 objects and create a new object
function combineObject(obj1, obj2) {
  return { ...obj1, ...obj2 };
}

const obj3 = combineObject(obj1, obj2);

console.log(obj3);
