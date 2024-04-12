import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth/auth.service';
import { CheckLoginService } from './core/services/shared/check-login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'InventoryManagementApp';
  constructor(
    private checkLoginService: CheckLoginService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('access_token')) {
      this.authService.getUserProfile().subscribe({
        next: (res: any) => {
          this.checkLoginService.isLoggedIn();
        },
        error: (err: any) => {
          this.checkLoginService.isLoggedIn();
        },
      });
    }
  }
}
