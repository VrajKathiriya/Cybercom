let products = [];

$(document).ready(function () {
  let error = true;

  (categoryError = true), (priceError = true);

  // product title validation
  $("#title").focus(function () {
    let titleError = true;
  });
  $("#title").blur(function () {
    let sameTitle = false;
    products.forEach((product) => {
      if (product.title == $("#title").val()) sameTitle = true;
    });
    if (!$("#title").val()) {
      $("#titleError").text("**Please enter the title");
    } else if (sameTitle) {
      $("#titleError").text("**This title already exist");
    } else {
      titleError = false;
      $("#titleError").text("");
    }
  });

  // price validation
  $("#price").focus(function () {
    let priceError = true;
  });
  $("#price").blur(function () {
    if (!$("#price").val()) {
      $("#priceError").text("**Please enter the price");
    } else if (!isNumber($("#price").val())) {
      $("#priceError").text("**Please enter only digits");
    } else {
      priceError = false;
      $("#priceError").text("");
    }
  });

  // category validation
  $("#title").focus(function () {
    let categoryError = true;
  });
  $("#category").blur(function () {
    if (!$("#category").val()) {
      $("#categoryError").text("**Please choose the category");
    } else {
      categoryError = false;
      $("#categoryError").text("");
    }
  });

  // action when form submitted
  $("form").submit(function (e) {
    e.preventDefault();

    const title = $("#title").val();
    const price = $("#price").val();
    const category = $("#category").val();

    const newProduct = { title, price, category };
    if (!titleError && !priceError && !categoryError) {
      error = false;
    }
    if (!error) {
      products.push(newProduct);
      localStorage.setItem("products", JSON.stringify(products));
      location.reload();
    } else {
      alert("please fill the appropriate detail first");
    }
  });
});

function isNumber(val) {
  return val == +val;
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

  $("#title").val(product.title);
  $("#price").val(product.price);
  $("#category").val(product.category);
});
