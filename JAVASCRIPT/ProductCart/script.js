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
  {
    id: 4,
    name: "Grapes",
    price: 35.7,
    address: "assets/img/graps.png",
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
      const productNode = `
      <div class="product">
        <div class="product-img">
          <img src=${product.address} alt="" />
        </div>
        <div class="product-details">
          <h3 class="product-name">${product.name}</h3>
          <p class="product-price">$ ${product.price}</p>
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
      document.querySelector(".orders-list").innerHTML = "no order placed yet";
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

    let date = new Date();
    newOrder.id = `${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;

    newOrder.list = [];

    productsData.forEach((product) => {
      newOrder.list.push({
        name: product.name,
        count: product.count,
        price: product.price * product.count,
      });
    });

    newOrder.total = calculateTotalPrice();
    newOrder.date = `${getMonth(
      date.getMonth()
    )} ${date.getDate()}, ${date.getFullYear()}`;

    oredersList.push(newOrder);

    localStorage.setItem("orders", JSON.stringify(oredersList));

    location.href = "cart.html";
    displayOrdersList(oredersList);
  });

// function which return month according to number
function getMonth(month) {
  if (month == 0) return "January";
  else if (month == 1) return "February";
  else if (month == 2) return "March";
  else if (month == 3) return "April";
  else if (month == 4) return "May";
  else if (month == 5) return "June";
  else if (month == 6) return "July";
  else if (month == 7) return "August";
  else if (month == 8) return "September";
  else if (month == 9) return "October";
  else if (month == 10) return "November";
  else if (month == 11) return "December";
  else return;
}

// function which display order list
function displayOrdersList(ordersList) {
  ordersList.reverse().forEach((order) => {
    const orderNode = `
    <div class="order">
      <div class="order-id">
        <h5>Order #${order.id}</h5>
        <p class="date">${order.date}</p>
      </div>
   
      <div class="order-details" id="${order.id}">
      </div>

      <div class="order-total-price">
        <h4>Total</h4>
        <span id="order-total-price">$ ${order.total}</span>
      </div>
    </div>`;

    ordersListEl.insertAdjacentHTML("beforeend", orderNode);

    const orderDetails = document.getElementById(order.id);

    order.list.forEach((item) => {
      const listNode = `
      <div class="item-list">
        <span class="item-box">${item.name}</span>
        <span class="item-box">${item.count} pcs</span>
        <span class="item-box">$ ${item.price.toFixed(2)}</span>
      </div>`;

      if (item.count == 0) return;
      orderDetails.insertAdjacentHTML("beforeend", listNode);
    });
  });
}
