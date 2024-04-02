import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  baseUrl: string = 'http://localhost:1337';
  cartItems: any[] = [];
  cartEmpty: boolean = false;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.getCartItems();
  }

  incrementQuantity(cartId: any) {
    const item = this.cartItems.find((i) => i.id === cartId);
    const newQuantity = {
      data: {
        quantity: ++item.attributes.quantity,
      },
    };

    this.cartService.updateQuantity(cartId, newQuantity).subscribe({
      next: (res: any) => {
        console.log(res);
      },
    });
  }

  decrementQuantity(cartId: any) {
    const item = this.cartItems.find((i) => i.id === cartId);
    if (item.attributes.quantity == 1) return;
    const newQuantity = {
      data: {
        quantity: --item.attributes.quantity,
      },
    };

    this.cartService.updateQuantity(cartId, newQuantity).subscribe({
      next: (res: any) => {
        console.log(res);
      },
    });
  }

  removeItem(cartId: any) {
    this.cartService.deleteItem(cartId).subscribe({
      next: (res: any) => {
        this.cartItems = this.cartItems.filter((item) => item.id !== cartId);
        if (this.cartItems.length == 0) this.cartEmpty = true;
      },
    });
  }

  getTotal() {
    var total = 0;
    this.cartItems.forEach(function (item) {
      total +=
        item.attributes.product.data.attributes.price *
        item.attributes.quantity;
    });
    return total;
  }

  getCartItems() {
    let user_id = localStorage.getItem('user_id');
    this.cartService.getCartItems(user_id).subscribe({
      next: (res: any) => {
        this.cartItems = res.data;
        if (res.data.length == 0) this.cartEmpty = true;
      },
    });
  }
}
