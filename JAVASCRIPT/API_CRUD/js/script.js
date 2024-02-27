const getAllProductsBtn = document.getElementById("get-all-products");
const getSingleProductBtn = document.getElementById("get-single-product");
const searchbarEl = document.getElementById("search-bar");
const productsContainer = document.querySelector(".products-container");
const previousBtn = document.getElementById("previous-btn");
const nextBtn = document.getElementById("next-btn");
const extraBtns = document.querySelector(".extra-buttons");
const filterSelectEl = document.getElementById("filter-select");
const filterSearchEl = document.getElementById("filter-search");
const itemsPerPageEl = document.getElementById("items-per-page");

let page = 1;
let itemsPerPage = 5;
let end = itemsPerPage;
let products;
let productId;

// DOM content loaded
document.addEventListener("DOMContentLoaded", async function () {
  let res = await fetch(`https://api.escuelajs.co/api/v1/categories`);
  let categories = await res.json();

  categories.forEach((category) => {
    filterSelectEl.innerHTML += `
    <option value=${category.id}>${category.name}</option>
    `;
  });
});

// event listner on itemsPerPage element
itemsPerPageEl.addEventListener("change", function () {
  itemsPerPage = this.value;
  end = page * +itemsPerPage;
  console.log(page, (page - 1) * itemsPerPage, end);
  bindProductsData(products.slice((page - 1) * itemsPerPage, end));
});

// evenet listner on getAllProducts button
getAllProductsBtn.addEventListener("click", async function (e) {
  e.preventDefault();
  extraBtns.classList.remove("hidden");
  const data = await fetchAllProductsData();
  products = data;

  bindProductsData(products.slice(0, itemsPerPage));
});

// event listner on search button
getSingleProductBtn.addEventListener("click", async function (e) {
  e.preventDefault();
  extraBtns.classList.add("hidden");

  if (filterSearchEl.value == "id") {
    const id = searchbarEl.value;
    const product = await fetchSingleProduct(id);
    if (!product.id) {
      productsContainer.innerHTML = "no products with this id";
      return;
    }
    bindProductsData([product]);
  } else if (filterSearchEl.value == "title") {
    const title = searchbarEl.value;
    const data = await fetchProductsByTitle(title);
    if (!data.length) {
      productsContainer.innerHTML = "no products with this title";
      return;
    }
    products = data.slice(0, itemsPerPage);
    bindProductsData(products);
  } else {
    const price = +searchbarEl.value;
    console.log(price);
    const data = await fetchProductsByPrice(price);
    console.log(data);
    if (!data.length) {
      productsContainer.innerHTML = "no products with this price";
      return;
    }
    products = data.slice(0, itemsPerPage);
    bindProductsData(products);
  }
});

// function which fetch all products data
async function fetchAllProductsData() {
  const res = await fetch(`https://api.escuelajs.co/api/v1/products/`);
  const data = await res.json();
  return data;
}

// function which fetch a single product data
async function fetchSingleProduct(id) {
  const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
  const data = await res.json();
  return data;
}

// function which fetch product's data by title
async function fetchProductsByTitle(title) {
  const res = await fetch(
    `https://api.escuelajs.co/api/v1/products/?title=${title}`
  );
  const data = await res.json();
  return data;
}

// function which fetch product data by price
async function fetchProductsByPrice(price) {
  const res = await fetch(
    `https://api.escuelajs.co/api/v1/products/?price=${price}`
  );
  const data = await res.json();
  return data;
}

// function which handle previous page in pagination
function handlePrevious() {
  if (page == 1) return;
  page--;
  let start = (page - 1) * itemsPerPage;
  end -= itemsPerPage;
  let data = products.slice(start, end);
  bindProductsData(data);
}

// function which handle next page in pagination
function handleNext() {
  if (page > products.length / itemsPerPage) return;
  page++;
  let start = (page - 1) * itemsPerPage;
  end += itemsPerPage;

  let data = products.slice(start, end);
  bindProductsData(data);
}

// function which bind the data
function bindProductsData(products) {
  let html = "";

  products.forEach((product) => {
    html += `
    <div class="card" style="width: 18rem">
      <img src=${product.images[0]
        .slice(2)
        .slice(0, -2)} class="card-img-top" alt="..." />
      <div class="card-body">
        <h3 class="card-title">${product.id}</h3>
        <h2 class="card-title">${product.title}</h2>
        <p> ${product.category.name} </p>
        <h6 class="card-title">Price: $ ${product.price}</h6>
        <p> ${product.description}</p>
        <span class="btn btn-primary" onclick="editProduct('${
          product.id
        }')">Edit</span>
        <span class="btn btn-danger" onclick="deleteProduct('${
          product.id
        }')">Delete</span>
      </div>
    </div>
    `;
  });

  productsContainer.innerHTML = html;
}

// function which allows user to edit product data
async function editProduct(id) {
  let data = await fetchSingleProduct(id);

  localStorage.setItem("currentProduct", JSON.stringify(data));
  location.href = "../API_CRUD/updateProductForm.html";
}

// function which will delete product data
async function deleteProduct(id) {
  console.log(id);
  let confirmed = confirm("Are you sure you want to delete this?");
  if (!confirmed) return;

  const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
    method: "DELETE",
  });

  alert("data deleted successfully");
  location.reload();
}

// function which will sort the product data according to category
function sortProducts(category) {
  products = products.sort((p1, p2) => (p1[category] > p2[category] ? 1 : -1));
  bindProductsData(products.slice(0, itemsPerPage));
  page = 1;
}

// function which will filter products
async function filterProducts(categoryId) {
  let res = await fetch(
    `https://api.escuelajs.co/api/v1/products/?categoryId=${categoryId}`
  );
  let data = await res.json();

  products = data;

  if (products.length == 0) {
    productsContainer.innerHTML = "no items with this category";
    return;
  }

  bindProductsData(products.slice(0, itemsPerPage));
  page = 1;
}
