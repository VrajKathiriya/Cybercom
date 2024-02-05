// define productsData array for stores prodcuts
let productsData = [
  {
    id: 1,
    name: "Apple",
    price: 70.34,
    address: "assets/img/apple.png",
    count: 0,
  },
  {
    id: 2,
    name: "Mango",
    price: 30.4,
    address: "assets/img/mango.png",
    count: 0,
  },
  {
    id: 3,
    name: "Orange",
    price: 20.3,
    address: "assets/img/orange.png",
    count: 0,
  },
];

const productListEl = document.querySelector(".product-list");
const totalPriceEl = document.querySelector("#total-price");
const checkoutBtn = document.querySelector("#checkout-btn");

// when dom content loaded
document.addEventListener("DOMContentLoaded", function () {
  if (location.href.split("/")[5] == "productsList.html") {
    productsData.forEach((product) => {
      const productNode = `<div class="product">
      <div class="product-img">
      <img src=${product.address} alt="" />
      </div>
      <div class="product-details">
      <h3>${product.name}</h3>
      <p>$${product.price}</p>
</div>
<div class="counter">
<button id="decrement" onclick=doDecrement(${product.id})>-</button>
  <span id=${product.id} class="count">${product.count}</span>
  <button id="increment" onclick=doIncrement(${product.id})>+</button>
  </div>
  </div>`;

      productListEl.insertAdjacentHTML("beforeend", productNode);
    });
  } else {
    let ordersList = localStorage.getItem("orders");
    if (!ordersList) {
      document.querySelector(".orders-list").innerHTML = "no order";
      return;
    }
    ordersList = JSON.parse(ordersList);
    displayOrdersList(ordersList);
  }
});

// function which increment counter by 1
function doIncrement(id) {
  productsData.forEach((product) => {
    if (product.id == id) {
      product.count++;
      document.getElementById(product.id).innerText = product.count;
    }
  });
  calculateTotalPrice();
}

// function which decrement counter by 1
function doDecrement(id) {
  productsData.forEach((product) => {
    if (product.id == id) {
      if (product.count > 0) {
        product.count--;
        document.getElementById(product.id).innerText = product.count;
      }
    }
  });
  calculateTotalPrice();
}

// function for calculate total price
function calculateTotalPrice() {
  let sum = 0;
  productsData.forEach((product) => {
    sum += product.price * product.count;
  });
  totalPriceEl.innerText = `$ ${sum.toFixed(2)}`;
  return Number(sum.toFixed(2));
}
// ******************************************

const ordersListEl = document.querySelector(".orders-list");

checkoutBtn &&
  checkoutBtn.addEventListener("click", function () {
    let oredersList = localStorage.getItem("orders");
    if (!oredersList) {
      const temp = [];
      localStorage.setItem("orders", JSON.stringify(temp));
    }

    oredersList = localStorage.getItem("orders");
    oredersList = JSON.parse(oredersList);

    let newOrder = {};
    newOrder.id = Date.now();
    newOrder.list = [];

    productsData.forEach((product) => {
      newOrder.list.push({
        name: product.name,
        count: product.count,
        price: product.price * product.count,
      });
    });

    newOrder.total = calculateTotalPrice();

    oredersList.push(newOrder);

    localStorage.setItem("orders", JSON.stringify(oredersList));

    displayOrdersList(oredersList);
  });

function displayOrdersList(ordersList) {
  console.log("ij");
  ordersList.forEach((order) => {
    const orderNode = `<div class="order">
    <div class="order-id">
      <h5>Order #${order.id}</h5>
      <p>12 february,2021</p>
    </div>
    <div class="order-details">
      <span id="order-name">orange</span>
      <span id="order-count">2 pcs</span>
      <span id="order-price">$30</span>
    </div>
    <div class="order-total-price">
      <h4>Total</h4>
      <span id="order-total-price">$ ${order.total}</span>
    </div>
  </div>`;

    ordersListEl.insertAdjacentHTML("beforeend", orderNode);
  });
}
