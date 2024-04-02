import { Component } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthService, private route: Router) {}

  loginUser() {
    console.log(this.loginForm.value);
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    if (this.loginForm.valid) {
      const cred = {
        identifier: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };

      this.authService.login(cred).subscribe({
        next: (res: any) => {
          localStorage.setItem('token', JSON.stringify(res.jwt));
          localStorage.setItem('user_id', JSON.stringify(res.user.id));
          localStorage.setItem('username', JSON.stringify(res.user.username));

          this.route.navigate(['']);

          console.log(res);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
