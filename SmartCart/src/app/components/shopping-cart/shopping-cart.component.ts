import { Component } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent {
  cartItems = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Description of Product 1.',
      price: 19.99,
      image: 'https://via.placeholder.com/150',
      quantity: 1,
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Description of Product 2.',
      price: 19.99,
      image: 'https://via.placeholder.com/150',
      quantity: 1,
    },
  ];

  incrementQuantity(item: any) {
    item.quantity++;
  }

  decrementQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  removeItem(item: any) {
    var index = this.cartItems.indexOf(item);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
    }
  }

  getTotal() {
    var total = 0;
    this.cartItems.forEach(function (item) {
      total += item.price * item.quantity;
    });
    return total;
  }
}
