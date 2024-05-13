import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user_url: string = environment.base_url + environment.user_url;

  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get(this.user_url);
  }

  getUser(userId: number) {
    return this.http.get(this.user_url + `/${userId}`);
  }

  addUser(user: any) {
    return this.http.post(this.user_url, user);
  }

  checkEmail(email: string) {
    return this.http.post(this.user_url + '/is-available', email);
  }

  updateUser(userId: number, user: any) {
    return this.http.put(this.user_url + `/${userId}`, user);
  }

  deleteUser(userId: number) {
    return this.http.delete(this.user_url + `/${userId}`);
  }
}
