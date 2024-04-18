import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { UserProfileService } from 'src/app/core/services/shared/user-profile.service';
import { TaskService } from 'src/app/core/services/task/task.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-my-task',
  templateUrl: './my-task.component.html',
  styleUrls: ['./my-task.component.css'],
})
export class MyTaskComponent {
  tasks: any[] = [];
  users: any[] = [];

  myTaskColumns = [
    'id',
    'title',
    'description',
    'assigned_to',
    'due_date',
    'status',
    'actions',
  ];
  statusOptions = ['pending', 'completed'];
  taskFormArray: any;
  dataSource: any;

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private userProfileService: UserProfileService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (res: any) => {
        this.users = res;
      },
    });

    this.taskFormArray = this.fb.array([]);

    this.taskService.getAllTasks().subscribe({
      next: (res: any) => {
        this.tasks = res;
        this.tasks.forEach((task) => {
          this.taskFormArray.push(this.createTaskFormGroup(task));
        });
        this.dataSource = new MatTableDataSource(this.taskFormArray.controls);
      },
    });
    // Populate the form array with initial data
  }

  addRow() {
    const newEntry = {
      id: Date.now(),
      title: '',
      description: '',
      assigned_to: '',
      due_date: '',
      status: '',
    };
    this.taskFormArray.push(this.createTaskFormGroup(newEntry));
    this.dataSource = new MatTableDataSource(this.taskFormArray.controls);
  }

  createTaskFormGroup(task: any): FormGroup {
    return this.fb.group({
      id: [task.id],
      title: [task.title],
      description: [task.description],
      assigned_to: [task.assigned_to],
      due_date: [task.due_date],
      status: [task.status],
    });
  }

  addValidators(column: string, i: number) {
    const control = this.taskFormArray.controls[i].get(column);

    if (control) {
      control.setValidators(Validators.required);
      control.updateValueAndValidity();
    }
  }

  onSave(taskIndex: number) {
    console.log('onsave called');
    let isAvailable = false;
    const taskForm = this.taskFormArray.at(taskIndex) as FormGroup;
    if (taskForm.valid) {
      const newTask = taskForm.value;

      for (let t of this.tasks) {
        if (t.id == newTask.id) {
          isAvailable = true;
        }
      }
      if (!isAvailable) {
        this.taskService.addTask(newTask);
        this.toastr.success('Task added successfully', 'Success');
        this.tasks = [...this.tasks, newTask];
      } else {
        this.taskService.editTask(newTask.id, newTask);
        this.toastr.success('Task updated successfully', 'Success');
      }
    } else {
      this.toastr.error('Please fill the form properly', 'ERROR💥');
    }
  }

  onDelete(taskIndex: number) {
    const confirmed = confirm('Are you sure?');
    if (!confirmed) return;

    const taskForm = this.taskFormArray.at(taskIndex) as FormGroup;
    const taskId = taskForm.value.id;

    this.taskService.deleteTask(taskId).subscribe(() => {
      this.tasks = this.tasks.filter((task) => task.id !== taskId);

      this.taskFormArray.clear();

      this.tasks.forEach((task) => {
        this.taskFormArray.push(this.createTaskFormGroup(task));
      });

      this.dataSource = new MatTableDataSource(this.taskFormArray.controls);

      this.toastr.success('Task deleted successfully', 'Success');
    });
  }

  // onSubmit(array: any) {
  //   for (let [i, group] of array.controls.entries()) {
  //     if (group.touched && group.status == 'VALID') {
  //       console.log(i);
  //       this.onSave(i);
  //     }
  //   }
  // }
}
