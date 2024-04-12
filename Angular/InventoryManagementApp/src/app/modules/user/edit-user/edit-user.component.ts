import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent {
  @Output() editUserChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() userId: any;

  editUserForm: FormGroup = new FormGroup({
    userName: new FormControl(''),
    userEmail: new FormControl(''),
    userPassword: new FormControl(''),
    userAvatar: new FormControl(''),
  });

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getEditUser();
    const openModelDiv = document.getElementById('exampleModal');
    if (openModelDiv) {
      openModelDiv.style.display = 'block';
    }
  }

  getEditUser() {
    this.userService.getUser(this.userId).subscribe({
      next: (res: any) => {
        this.editUserForm.patchValue({
          userName: res.name,
          userEmail: res.email,
          userPassword: res.password,
          userAvatar: res.avatar,
        });
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  closeEditModal() {
    this.editUserChange.emit(false);
    const closeModelDiv = document.getElementById('exampleModal');
    if (closeModelDiv) {
      closeModelDiv.style.display = 'none';
    }
  }

  updateUser() {
    const user = {
      name: this.editUserForm.value.userName,
      email: this.editUserForm.value.userEmail,
      password: this.editUserForm.value.userPassword,
      avatar: this.editUserForm.value.userAvatar,
    };

    this.userService.updateUser(this.userId, user).subscribe({
      next: (res: any) => {
        console.log(res);
        this.closeEditModal();
        this.editUserChange.emit(res);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
