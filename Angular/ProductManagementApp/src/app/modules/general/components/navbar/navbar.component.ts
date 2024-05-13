import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false;
  userRole: any;

  constructor(private route: Router, private tostr: ToastrService) {}

  ngOnInit(): void {
    // if (localStorage.getItem('access_token')) this.isLogin = true;
  }
}
