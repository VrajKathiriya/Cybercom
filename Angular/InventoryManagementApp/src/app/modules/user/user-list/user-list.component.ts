import { Component } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent {
  users: any[] = [];
  editUserId: any;
  addUserForm: boolean = false;
  editUserForm: boolean = false;
  noUsers: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (res: any) => {
        console.log(res);
        this.users = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  openAddModal() {
    this.addUserForm = true;
  }

  onAddUser(event: any) {
    if (typeof event == 'boolean') {
      this.addUserForm = event;
    } else {
      this.users.push(event);
    }
  }

  openEditModal(categoryId: number) {
    this.editUserId = categoryId;
    this.editUserForm = true;
  }

  onEditUser(event: any) {
    if (typeof event == 'boolean') {
      this.editUserForm = event;
    } else {
      this.users = this.users.map((user: any) => {
        if (user.id == event.id) return event;
        else return user;
      });
    }
  }
}
