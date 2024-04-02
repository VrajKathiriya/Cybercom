import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  ordersUrl: string = environment.baseUrl + environment.order;
  constructor(private http: HttpClient) {}

  getAllOrders(userId: any) {
    let url = `?populate=carts.product,user_details&filters[user_details][id]=${userId}`;
    return this.http.get(this.ordersUrl + url);
  }

  placeOrder(newOrder: any) {
    return this.http.post(this.ordersUrl, newOrder);
  }

  cancelOrder(orderId: any) {
    return this.http.delete(this.ordersUrl + `/${orderId}`);
  }
}
