import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent {
  @Output() addUserChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  addUserForm: FormGroup = new FormGroup({
    userName: new FormControl(''),
    userEmail: new FormControl(''),
    userPassword: new FormControl(''),
    userAvatar: new FormControl(''),
  });

  ngOnInit(): void {
    const openModelDiv = document.getElementById('exampleModal');
    if (openModelDiv) {
      openModelDiv.style.display = 'block';
    }
  }

  closeAddModal() {
    this.addUserChange.emit(false);
    const closeModelDiv = document.getElementById('exampleModal');
    if (closeModelDiv) {
      closeModelDiv.style.display = 'none';
    }
  }

  addUser() {
    const user = {
      name: this.addUserForm.value.userName,
      email: this.addUserForm.value.userEmail,
      password: this.addUserForm.value.userPassword,
      avatar: this.addUserForm.value.userAvatar,
    };

    this.userService.addUser(user).subscribe({
      next: (res: any) => {
        console.log(res);
        this.closeAddModal();
        this.addUserChange.emit(res);

        this.toastr.success('User is added successfully', 'Success!');
      },
      error: (err: any) => {
        console.log(err);
        this.toastr.error(err.error.message[0], 'Error💥');
      },
    });
  }
}
