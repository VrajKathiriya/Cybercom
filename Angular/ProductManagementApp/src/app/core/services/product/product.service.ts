import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  product_url = environment.base_url + environment.product_url;

  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get(this.product_url);
  }

  getProduct(productId: number) {
    return this.http.get(this.product_url + `/${productId}`);
  }

  addProduct(product: any) {
    return this.http.post(this.product_url, product);
  }

  updateProduct(productId: number, product: any) {
    return this.http.put(this.product_url + `/${productId}`, product);
  }

  deleteProduct(productId: number) {
    return this.http.delete(this.product_url + `/${productId}`);
  }
}
