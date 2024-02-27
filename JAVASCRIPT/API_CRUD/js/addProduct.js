const productTitleEl = document.getElementById("product-title");
const productPriceEl = document.getElementById("product-price");
const productDescriptionEl = document.getElementById("product-description");
const productCategoryIdEl = document.getElementById("product-categoryId");
const productImageEl = document.getElementById("product-image");
const addProductBtn = document.getElementById("add-product-btn");
const addNewProductForm = document.querySelector(".add-new-product-form");

document.addEventListener("DOMContentLoaded", async function () {
  let res = await fetch(`https://api.escuelajs.co/api/v1/categories`);
  let data = await res.json();
  console.log(data);

  data.forEach((category) => {
    productCategoryIdEl.innerHTML += `
    <option value=${category.id}>${category.name}</option>
    `;
  });
});

addProductBtn.addEventListener("click", function (e) {
  e.preventDefault();
  addProduct();
});

async function addProduct() {
  const productTitle = productTitleEl.value;
  const productPrice = productPriceEl.value;
  const productDescription = productDescriptionEl.value;
  const productCategoryId = productCategoryIdEl.value;
  const productImage = productImageEl.value;

  const newProduct = {
    title: productTitle,
    price: productPrice,
    description: productDescription,
    categoryId: productCategoryId,
    images: [productImage],
  };

  try {
    const res = await fetch(`https://api.escuelajs.co/api/v1/products/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    const data = await res.json();
    console.log(data.id);
    if (data.statusCode == 400) {
      alert(data.message[0]);
      return;
    }
    alert(`your data is added successfully and your id is ${data.id}`);
  } catch (err) {
    console.log(err);
  }

  clearForm();
}

function clearForm() {
  productTitleEl.value = "";
  productPriceEl.value = "";
  productDescriptionEl.value = "";
  productCategoryIdEl.value = "";
  productImageEl.value = "";
}
