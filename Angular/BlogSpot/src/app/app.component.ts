import { Component, OnInit } from '@angular/core';
import { UserProfileService } from './core/services/shared/user-profile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'BlogSpot';
  constructor(private userProfileService: UserProfileService) {}
  ngOnInit(): void {
    this.userProfileService.isLoggedIn();
  }
}
