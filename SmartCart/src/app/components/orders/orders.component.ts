import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  userId: any = '';
  ordersEmpty: boolean = false;

  ngOnInit(): void {
    this.userId = localStorage.getItem('user_id');
    this.getOrdersOfUser();
  }

  constructor(private orderService: OrderService) {}

  formatTimestamp(timestamp: any): any {
    let date = new Date(timestamp);
    return `${date.getDate()} / ${date.getMonth()} / ${date.getFullYear()} `;
  }

  getOrdersOfUser() {
    this.orderService.getAllOrders(this.userId).subscribe({
      next: (res: any) => {
        console.log(res);
        this.orders = res.data;
        if (this.orders.length == 0) this.ordersEmpty = true;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  cancelOrder(orderId: any) {
    let confirmed = confirm('Are you sure? you want to cancel this order?');
    if (!confirmed) return;
    this.orderService.cancelOrder(orderId).subscribe({
      next: (res: any) => {
        this.orders = this.orders.filter((order) => order.id !== orderId);
        if (this.orders.length == 0) this.ordersEmpty = true;
      },
    });
  }
}
