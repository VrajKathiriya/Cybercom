// const productIdEl = document.getElementById("product-id");
const productTitleEl = document.getElementById("product-title");
const productPriceEl = document.getElementById("product-price");
const productDescriptionEl = document.getElementById("product-description");
const productImageEl = document.getElementById("product-image");
const updateProductBtn = document.getElementById("update-product-btn");

let productId;
document.addEventListener("DOMContentLoaded", function () {
  let currentProduct = localStorage.getItem("currentProduct");
  currentProduct = JSON.parse(currentProduct) || [];

  console.log(currentProduct);
  if (!Object.keys(currentProduct).length) return;

  productId = currentProduct.id;
  productTitleEl.value = currentProduct.title;
  productPriceEl.value = currentProduct.price;
  productDescriptionEl.value = currentProduct.description;
  productImageEl.value = currentProduct.images[0].slice(2).slice(0, -2);
});

updateProductBtn.addEventListener("click", function (e) {
  e.preventDefault();
  updateProduct();
});

async function updateProduct() {
  const productTitle = productTitleEl.value;
  const productPrice = productPriceEl.value;
  const productDescription = productDescriptionEl.value;
  const productImage = productImageEl.value;

  const newProduct = {
    title: productTitle,
    price: productPrice,
    description: productDescription,
    images: [productImage],
  };

  try {
    const res = await fetch(
      `https://api.escuelajs.co/api/v1/products/${productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      }
    );

    const data = await res.json();
    if (data.statusCode == 400) {
      alert(data.message[0]);
      return;
    }
    console.log(data);
  } catch (err) {
    console.log(err);
    return;
  }

  alert("data updated successfully");
  localStorage.removeItem("currentProduct");
  clearForm();
}

function clearForm() {
  productTitleEl.value = "";
  productPriceEl.value = "";
  productDescriptionEl.value = "";
  productImageEl.value = "";
}
