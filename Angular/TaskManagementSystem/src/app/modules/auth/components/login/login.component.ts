import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserProfileService } from 'src/app/core/services/shared/user-profile.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private userProfileService: UserProfileService,
    private router: Router
  ) {}

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

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

          this.userProfileService.isLoggedIn();

          this.router.navigate(['']);
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
