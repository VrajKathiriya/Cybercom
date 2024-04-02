import { Component, Input, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private route: Router) {}

  ngOnInit(): void {
    this.loadUsernameFromLocalStorage();
  }

  username: any;
  loadUsernameFromLocalStorage(): void {
    const storedUsername: string | null = localStorage.getItem('username');
    if (storedUsername) {
      this.username = JSON.parse(storedUsername);
    }
  }

  logoutUser() {
    localStorage.clear();
    this.route.navigate(['/login']);
  }
}
