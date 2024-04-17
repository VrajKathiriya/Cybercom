import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'password',
    'role',
    'actions',
  ];

  roles = ['admin', 'customer'];

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (res: any) => {
        this.users = res;
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  addUser() {
    const user = {
      id: '',
      name: '',
      password: '',
      role: '',
      avatar: 'https://picsum.photos/800',
    };

    this.users = [...this.users, user];
  }

  onSave(user: any) {
    let isAvailable = false;

    for (let u of this.users) {
      if (u.id != '' && u.id == user.id) isAvailable = true;
    }

    if (!isAvailable) {
      this.userService.addUser(user).subscribe({
        next: (res: any) => {
          this.toastr.success('User added successfully', 'Success');
          this.users.pop();
          this.users = [...this.users, res];
        },
        error: (err: any) => {
          this.toastr.error(err.error.message, 'ERROR💥');
        },
      });
    } else {
      this.userService.updateUser(user.id, user).subscribe({
        next: (res: any) => {
          console.log(res);
          this.toastr.success('User edited successfully', 'Success');
        },
        error: (err: any) => {
          console.log(err);
          this.toastr.error(err.error.message, 'ERROR💥');
        },
      });
    }
  }

  onDelete(userId: number) {
    const confirmed = confirm('Are you sure?');
    if (!confirmed) return;

    this.userService.deleteUser(userId).subscribe({
      next: (res: any) => {
        this.toastr.success('User deleted successfully', 'Success');
        this.users = this.users.filter((user) => user.id != userId);
      },
      error: (err: any) => {
        this.toastr.error(err.error.message, 'ERROR💥');
      },
    });
  }
}
