import { Component, Input } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private route: Router) {}

  logoutUser() {
    localStorage.clear();
    this.route.navigate(['/login']);
  }
}
