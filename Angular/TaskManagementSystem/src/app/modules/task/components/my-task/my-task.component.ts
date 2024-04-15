import { Component } from '@angular/core';
import { concatMap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
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
  current_user: any;

  displayedColumns: string[] = [
    'id',
    'title',
    'description',
    'assigned_to',
    'status',
  ];
  statusOptions: string[] = ['completed', 'pending'];

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (res: any) => {
        this.users = res;
      },
    });

    this.authService
      .getUserProfile()
      .pipe(
        concatMap((res: any) => {
          this.current_user = res;
          return this.taskService.getAllTasks();
        })
      )
      .subscribe((tasks: any) => {
        this.tasks = tasks.filter(
          (task: any) => task.assigned_to == this.current_user.id
        );
      });
    // console.log(this.taskService.getAllTasks());
  }

  editableColumn(column: string): boolean {
    return column !== 'id'; // Make all columns editable except 'id'
  }

  addTask(): void {
    const newTask = {
      id: this.tasks.length + 1,
      title: '',
      description: '',
      created_by: '',
      assigned_to: '',
      status: '',
    };
    // this.tasks.push(newTask);
    this.tasks = [...this.tasks, newTask];
    this.taskService.addTask(newTask);
  }

  onEdit(task: any): void {
    // Handle edit operation, e.g., update task data
    task.created_by = this.current_user?.id;
    task.created_by = this.taskService.editTask(task.id, task);
    console.log('Edited task:', task);
  }
}
