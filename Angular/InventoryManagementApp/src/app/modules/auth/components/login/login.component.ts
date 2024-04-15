import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CheckLoginService } from 'src/app/core/services/shared/check-login.service';

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

  constructor(
    private authService: AuthService,
    private checkLoginService: CheckLoginService,
    private route: Router,
    private toastr: ToastrService
  ) {}

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    if (this.loginForm.valid) {
      const cred = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };

      this.authService.loginUser(cred).subscribe({
        next: (res: any) => {
          localStorage.setItem(
            'access_token',
            JSON.stringify(res.access_token)
          );
          localStorage.setItem(
            'refresh_token',
            JSON.stringify(res.refresh_token)
          );

          this.toastr.success('You are logged in', 'Success');
          this.route.navigate(['']);

          this.checkLoginService.isLoggedIn();

          // console.log(res);
        },
        error: (err: any) => {
          this.toastr.info('Please enter valid details');
          console.log(err);
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
