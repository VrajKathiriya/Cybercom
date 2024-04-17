import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { map, switchMap } from 'rxjs';
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
  assignmentTasks: any[] = [];
  myTasks: any[] = [];
  users: any[] = [];
  current_user: any;

  myTaskColumns: string[] = [
    'id',
    'created_by',
    'title',
    'description',
    'due_date',
    'status',
    'actions',
  ];

  assignedTaskColumns: string[] = [
    'id',
    'title',
    'description',
    'assigned_to',
    'due_date',
    'status',
    'actions',
  ];
  statusOptions: string[] = ['completed', 'pending'];

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private userProfileService: UserProfileService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (res: any) => {
        this.users = res;
      },
    });

    this.userProfileService.userProfile$
      .pipe(
        switchMap((userProfile) => {
          this.current_user = userProfile;
          console.log('this is data', userProfile);
          // Return the observable for getAllTasks() after filtering based on the current user id
          return this.taskService.getAllTasks().pipe(
            map((tasks: any) => ({
              tasks: tasks,
              myTasks: tasks.filter(
                (task: any) => task.assigned_to === userProfile.id
              ),
              assignmentTasks: tasks.filter(
                (task: any) => task.created_by === userProfile.id
              ),
            }))
          );
        })
      )
      .subscribe(({ tasks, myTasks, assignmentTasks }) => {
        this.tasks = tasks;
        this.myTasks = myTasks;
        this.assignmentTasks = assignmentTasks;
      });
  }

  editableColumn(column: string): boolean {
    return column !== 'id'; // Make all columns editable except 'id'
  }

  addTask(): void {
    const newTask = {
      id: '',
      title: '',
      description: '',
      created_by: '',
      assigned_to: '',
      due_date: '',
      status: 'pending',
    };
    // this.tasks.push(newTask);
    this.assignmentTasks = [...this.assignmentTasks, newTask];
  }

  validate(task: any): boolean {
    if (task.title == '') {
      this.toastr.error('Please enter title');
      return false;
    } else if (task.description == '') {
      this.toastr.error('Please enter description');
      return false;
    } else if (task.assigned_to == '') {
      this.toastr.error('Please assigned task to someone');
      return false;
    } else {
      return true;
    }
  }

  onSave(task: any): void {
    // Handle edit operation, e.g., update task data

    let isAvailable = false;
    let isValidated = this.validate(task);

    for (let t of this.tasks) {
      if (t.id != '' && t.id == task.id) isAvailable = true;
    }

    if (!isAvailable && isValidated) {
      task.id = Date.now();
      task.created_by = this.current_user?.id;
      this.taskService.addTask(task);
      this.userProfileService.isLoggedIn();
      this.toastr.success('Your task is added successfully', 'Success');
    } else if (isValidated) {
      this.taskService.editTask(task.id, task);
      this.userProfileService.isLoggedIn();
      this.toastr.success('Your task is edited successfully', 'Success');
    }
  }

  onDelete(taskId: number) {
    let confirmed = confirm('Are you sure?');
    if (!confirmed) return;
    this.taskService.deleteTask(taskId);
    this.userProfileService.isLoggedIn();
    this.toastr.success('Your task is deleted successfully', 'Success');
  }
}
