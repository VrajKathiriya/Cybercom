let products = [];

$(document).ready(function () {
  let error = {};
  // product title validation
  $("#title").blur(function () {
    error.titleError = true;
    let sameTitle = false;
    products.forEach((product) => {
      if (product.title == $("#title").val()) sameTitle = true;
    });
    if (!$("#title").val()) {
      $("#titleError").text("**Please enter the title");
    } else if (sameTitle) {
      $("#titleError").text("**This title already exist");
    } else {
      error.titleError = false;
      $("#titleError").text("");
    }
  });

  $("#price").blur(function () {
    error.priceError = true;
    if (!$("#price").val()) {
      $("#priceError").text("**Please enter the price");
    } else if (!isNumber($("#price").val())) {
      $("#priceError").text("**Please enter only digits");
    } else {
      error.priceError = false;
      $("#priceError").text("");
    }
  });

  $("#category").blur(function () {
    error.categoryError = true;
    if (!$("#category").val()) {
      $("#categoryError").text("**Please choose the category");
    } else {
      error.categoryError = false;
      $("#categoryError").text("");
    }
  });

  // action when form submitted
  $("form").submit(function (e) {
    e.preventDefault();

    // let formData = new FormData(e.target);
    // console.log(formData);

    const title = $("#title").val();
    const price = $("#price").val();
    const category = $("#category").val();

    const newProduct = { title, price, category };

    if (!title || !price || !category) {
      alert("Please fill all the detail first");
    } else if (error.titleError || error.priceError || error.categoryError) {
      alert("Please fill detail properly");
    } else {
      if ($("#submit").text() == "Add") {
        insertEntry(newProduct);
        location.reload();
      } else {
        editEntry(newProduct, $("#submit").attr("index"));
        location.reload();
      }
    }
  });
});

function isNumber(val) {
  return val == +val;
}

// function for entry of product
function insertEntry(product) {
  products = localStorage.getItem("products");

  if (products == null) {
    const temp = [];
    localStorage.setItem("products", JSON.stringify(temp));
  }
  products = localStorage.getItem("products");
  products = JSON.parse(products);
  let index = Date.now();
  product.index = index;
  products.push(product);
  localStorage.setItem("products", JSON.stringify(products));
}

// function for edit entry
function editEntry(product, index) {
  product.index = Number(index);
  let products = localStorage.getItem("products");
  products = JSON.parse(products);

  let tempIndex;
  products.forEach((p, i) => {
    if (p.index == index) {
      tempIndex = i;
    }
  });

  products[tempIndex] = product;
  localStorage.setItem("products", JSON.stringify(products));
}

products = JSON.parse(localStorage.getItem("products")) || products;
products.forEach((product) => {
  const title = document.createElement("td");
  title.innerText = product.title;
  const category = document.createElement("td");
  category.innerText = product.category;
  const price = document.createElement("td");
  price.innerText = product.price;
  const action = document.createElement("td");
  action.innerHTML = `<span id="${product.title}e" class="edit">edit</span>  <span id="${product.title}d" class="delete">delete</span>`;

  const row = document.createElement("tr");

  row.appendChild(title);
  row.appendChild(category);
  row.appendChild(price);
  row.appendChild(action);

  document.querySelector("tbody").appendChild(row);
});

$(".delete").click(function () {
  const id = this.id.slice(0, -1);
  products = products.filter((product) => product.title != id);
  localStorage.setItem("products", JSON.stringify(products));
  location.reload();
});

$(".edit").click(function () {
  const id = this.id.slice(0, -1);
  let product;
  products.forEach((p) => {
    if (p.title == id) product = p;
  });

  // editEntry(product, this.index);

  $("#title").val(product.title);
  $("#price").val(product.price);
  $("#category").val(product.category);
  $("#submit").text("Edit");
  $("#submit").attr("index", product.index);
});
