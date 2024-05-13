import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserProfileService } from 'src/app/core/services/shared/user-profile.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  userRole: any;
  loggedInUser: any;
  constructor(
    private userProfileService: UserProfileService,
    private router: Router,
    private tostr: ToastrService
  ) {}

  ngOnInit(): void {
    this.userProfileService.userProfile$.subscribe(
      (d) => ((this.loggedInUser = d), (this.userRole = d.role))
    );
    console.log(this.loggedInUser);
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.userProfileService.isLoggedIn();

    this.tostr.success('Logged out successfully');
    this.router.navigate(['auth/login']);
  }
}
