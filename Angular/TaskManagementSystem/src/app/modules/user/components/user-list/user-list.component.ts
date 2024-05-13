import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ngxCsv } from 'ngx-csv';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services/user/user.service';

import * as XLSX from 'xlsx';
import { FileSaverService } from 'ngx-filesaver';
import * as moment from 'moment';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  userColumns: string[] = [
    'id',
    'name',
    'email',
    'password',
    'role',
    'actions',
  ];

  roles = ['admin', 'customer'];

  userFormArray: any;
  dataSource: any;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private fileSaverService: FileSaverService
  ) {}

  ngOnInit(): void {
    this.userFormArray = this.fb.array([]);

    this.userService.getAllUsers().subscribe({
      next: (res: any) => {
        this.users = res;
        this.users.forEach((user) =>
          this.userFormArray.push(this.createUserFormGroup(user))
        );
        console.log(this.userFormArray);
        this.dataSource = new MatTableDataSource(this.userFormArray.controls);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  addRow() {
    const newEntry = {
      id: '',
      name: '',
      email: '',
      password: '',
      role: '',
      avatar: '',
    };

    this.userFormArray.push(this.createUserFormGroup(newEntry));

    this.dataSource = new MatTableDataSource(this.userFormArray.controls);
  }

  removeRow(i: number) {
    console.log('removed row', i);
    this.userFormArray.removeAt(i);
    this.dataSource.data = this.userFormArray.controls;
  }

  createUserFormGroup(user: any): FormGroup {
    return this.fb.group({
      id: [user.id],
      name: [user.name],
      email: [user.email],
      password: [user.password],
      role: [user.role],
      avatar: 'https://picsum.photos/800',
    });
  }

  addValidators(column: string, i: number) {
    const control = this.userFormArray.controls[i].get(column);

    if (control) {
      control.setValidators(Validators.required);
      control.updateValueAndValidity();
    }
  }

  onSave(userIndex: number) {
    console.log('called for user index', userIndex);
    let isAvailable = false;

    const userForm = this.userFormArray.at(userIndex) as FormGroup;

    if (userForm.valid) {
      const newUser = userForm.value;
      for (let u of this.users) {
        if (u.id == newUser.id) isAvailable = true;
      }

      if (!isAvailable) {
        this.userService.addUser(newUser).subscribe({
          next: (res: any) => {
            this.toastr.success('User added successfully', 'Success');

            this.users = [...this.users, res];

            userForm.patchValue({ id: res.id });

            this.dataSource.data[userIndex] =
              this.userFormArray.controls[userIndex];
            this.dataSource._updateChangeSubscription();
          },
          error: (err: any) => {
            this.toastr.error(err.error.message, 'ERROR💥');
          },
        });
      } else {
        this.userService.updateUser(newUser.id, newUser).subscribe({
          next: (res: any) => {
            console.log('edited user', res);
            this.users = this.users.map((user) => {
              if (user.id == res.id) return res;
              else return user;
            });

            userForm.patchValue(res);

            this.dataSource.data[userIndex] =
              this.userFormArray.controls[userIndex];
            this.dataSource._updateChangeSubscription();

            this.toastr.success('User edited successfully', 'Success');
          },
          error: (err: any) => {
            console.log(err);
            this.toastr.error(err.error.message, 'ERROR💥');
          },
        });
      }
    }
  }

  onDelete(userIndex: number) {
    const confirmed = confirm('Are you sure?');
    if (!confirmed) return;

    const userForm = this.userFormArray.at(userIndex) as FormGroup;
    const userId = userForm.value.id;

    this.userService.deleteUser(userId).subscribe({
      next: (res: any) => {
        this.users = this.users.filter((user) => user.id != userId);

        this.userFormArray.clear();

        this.users.forEach((user) => {
          this.userFormArray.push(this.createUserFormGroup(user));
        });

        this.dataSource.data = this.userFormArray.controls;

        this.toastr.success('User deleted successfully', 'Success');
      },
      error: (err: any) => {
        this.toastr.error(err.error.message, 'ERROR💥');
      },
    });
  }

  onSubmit() {
    let removeRows: any[] = [];
    for (let [i, group] of this.userFormArray.controls.entries()) {
      console.log(i, group);
      if (group.touched && group.valid && !group.pristine) {
        // console.log(i);
        this.onSave(i);
        group.touched = false;
      } else if (!group.touched && group.value.id == '') {
        removeRows.push(i);
      }
    }

    // for (let r of removeRows.reverse()) {
    //   this.removeRow(r);
    // }
  }

  exportUserData() {
    // let options = {
    //   fieldSeparator: ',',
    //   quoteStrings: '"',
    //   decimalseparator: '.',
    //   showLabels: true,
    //   showTitle: true,
    //   title: 'UserData',
    //   useBom: true,
    //   headers: [
    //     'id',
    //     'email',
    //     'password',
    //     'name',
    //     'role',
    //     'avatar',
    //     'created_At',
    //     'updated_at',
    //   ],
    // };

    // new ngxCsv(this.users, 'userData', options);

    let exportUsers = this.users.map((user: any) => {
      const updatedUser: any = {};
      for (let key in user) {
        updatedUser[key.charAt(0).toUpperCase() + key.slice(1)] = user[key];
      }
      delete updatedUser['Password'];
      delete updatedUser['Avatar'];
      return updatedUser;
    });

    console.log(exportUsers);

    const columnOrder = ['Id', 'Name', 'Email', 'Role'];
    const reorderedData = exportUsers.map((row) => {
      const newRow: any = {};
      columnOrder.forEach((column) => {
        newRow[column] = row[column];
      });
      return newRow;
    });

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(reorderedData);

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');

    XLSX.writeFile(workbook, 'user data.xlsx');
  }
}
