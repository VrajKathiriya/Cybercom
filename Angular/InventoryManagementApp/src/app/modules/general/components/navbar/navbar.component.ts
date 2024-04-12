import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CheckLoginService } from 'src/app/core/services/shared/check-login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false;
  userRole: any;

  constructor(
    private route: Router,
    private checkLoginService: CheckLoginService
  ) {}

  ngOnInit(): void {
    // if (localStorage.getItem('access_token')) this.isLogin = true;
    this.checkLoginService.userRole$.subscribe((d) => (this.userRole = d));
  }

  logout() {
    localStorage.clear();
    this.checkLoginService.isLoggedIn();
    this.route.navigate(['auth/login']);
  }
}
