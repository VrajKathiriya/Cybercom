const obj = {
  name: "Vraj",
  age: 21,
  address: "Amreli",
};

// original object
console.log("original object\n", obj);

// function call that remove address property
changeObject(obj);

function changeObject(obj) {
  delete obj.address;
}

// object after remove address property
console.log("new object\n", obj);
