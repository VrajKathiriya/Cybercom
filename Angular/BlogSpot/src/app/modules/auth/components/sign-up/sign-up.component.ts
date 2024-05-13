import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserProfileService } from 'src/app/core/services/shared/user-profile.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  constructor(
    private authService: AuthService,
    private userProfileService: UserProfileService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  register() {
    if (this.registerForm.valid) {
      const user = {
        name: this.registerForm.value.username,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        avatar: 'https://picsum.photos/800',
      };
      this.authService.registerUser(user).subscribe({
        next: (res: any) => {
          console.log(res);
          this.toastr.success('user register successfully', 'Success');
          this.router.navigate(['/auth/login']);
        },
      });
    }
  }
}
