import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login_url: string = environment.base_url + environment.auth_url + '/login';
  user_profile_url: string =
    environment.base_url + environment.auth_url + '/profile';

  constructor(private http: HttpClient) {}

  loginUser(cred: any) {
    return this.http.post(this.login_url, cred);
  }

  getUserProfile() {
    const token = localStorage.getItem('access_token');
    if (!token) {
      // Handle token absence
      console.error('Access token not available');
    }

    return this.http.get(this.user_profile_url);
  }
}
