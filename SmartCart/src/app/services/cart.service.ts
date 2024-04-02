import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  userCartUrl: string = environment.baseUrl + environment.user_cart;

  constructor(private http: HttpClient) {
    console.log(this.userCartUrl);
  }

  getCartItems(userId: any) {
    let url = `?filters[user_detail][id][$eq][0]=${userId}&populate=product.product_image&filters[order][id][$notNull]`;
    return this.http.get(this.userCartUrl + url);
  }

  addCartItem(item: any) {
    return this.http.post(this.userCartUrl + '?populate=product', item);
  }

  updateQuantity(cartId: any, quantity: any) {
    return this.http.put(this.userCartUrl + `/${cartId}`, quantity);
  }

  deleteItem(cartId: any) {
    return this.http.delete(this.userCartUrl + `/${cartId}`);
  }
}
