import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productList: string = environment.baseUrl + environment.product;

  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get(this.productList);
  }

  getProductByName() {
    return this.http.get(
      this.productList + '&filters[product_name][$containsi][0]=man'
    );
  }
}
