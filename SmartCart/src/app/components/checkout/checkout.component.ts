import { Component, OnInit } from '@angular/core';
import { AddressService } from 'src/app/services/address.service';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  orderPlaced: boolean = false;
  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private addressService: AddressService
  ) {}

  cartIds: any[] = [];
  products: any[] = [];

  total_amount: any = 0;
  discount_percentage: any = 20;
  gst_percentage: any = 18;
  delivery_charge: any = 5;

  discount_amount: any = 0;
  gross_amount: any = 0;
  gst_amount: any = 0;
  net_amount: any = 0;

  order_id: any;
  order_date: any;

  currentAddress: any = '';

  ngOnInit(): void {
    this.getTotalAmount();
    this.getAddress();
  }

  getTotalAmount() {
    let user_id = localStorage.getItem('user_id');
    this.cartService.getCartItems(user_id).subscribe({
      next: (res: any) => {
        res.data.forEach((cart: any) => {
          this.cartIds.push(cart.id);
          this.products.push(cart.attributes.product);
          this.total_amount +=
            cart.attributes.quantity *
            cart.attributes.product.data.attributes.price;

          this.discount_amount = (
            (this.total_amount * this.discount_percentage) /
            100
          ).toFixed(2);

          this.gross_amount = (
            this.total_amount - this.discount_amount
          ).toFixed(2);

          this.gst_amount = (
            (this.gross_amount * this.gst_percentage) /
            100
          ).toFixed(2);

          this.net_amount = (
            +this.gross_amount +
            +this.gst_amount +
            this.delivery_charge
          ).toFixed(2);
        });

        console.log(this.cartIds);
        console.log(this.products);
      },
    });
  }

  getAddress() {
    let userId = localStorage.getItem('user_id');
    this.addressService.getAddress(userId).subscribe({
      next: (res: any) => {
        console.log(res);
        this.currentAddress = res.data[0].attributes;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  makeOrder() {
    if (this.total_amount == 0) {
      alert('please add product in cart first');
      return;
    }
    let userId = localStorage.getItem('user_id');
    const newOrder = {
      data: {
        order_id: Date.now().toString(),
        order_date: new Date().toISOString(),
        order_status: 'Placed,',
        order_status_updated_at: new Date().toISOString(),
        tax_amount: this.gst_amount,
        total_amount: this.total_amount,
        payable_amount: this.net_amount,
        order_items: JSON.stringify(this.products),
        carts: this.cartIds,
        user_details: userId,
      },
    };
    let date = new Date(newOrder.data.order_date);
    this.order_date = `${date.getDate()} / ${date.getMonth()} / ${date.getFullYear()}
    `;
    this.order_id = newOrder.data.order_id;
    this.orderService.placeOrder(newOrder).subscribe({
      next: (res: any) => {
        console.log(res);
        this.orderPlaced = true;
      },
    });
  }
}
