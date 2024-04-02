import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  loginUrl: string = environment.baseUrl + environment.login;

  userDetails: string = environment.baseUrl + environment.user_details;

  constructor(private http: HttpClient) {}

  getUserDetails() {
    return this.http.get(this.userDetails);
  }
}
