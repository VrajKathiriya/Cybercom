import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUserData();
  }

  user: any;
  getUserData() {
    this.userService.getUserDetails().subscribe({
      next: (res: any) => {
        console.log(res);
        this.user = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
