import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  addressUrl = environment.baseUrl + environment.address;

  constructor(private http: HttpClient) {}

  getAddress(userId: any) {
    return this.http.get(
      this.addressUrl +
        `?populate=user_details&filters[user_details][id]=${userId}`
    );
  }

  postAddress(address: any) {
    return this.http.post(this.addressUrl, address);
  }

  updateAddress(address: any, addressId: any) {
    return this.http.put(this.addressUrl + `/${addressId}`, address);
  }
}
