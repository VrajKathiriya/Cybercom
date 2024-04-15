import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { TaskService } from 'src/app/core/services/task/task.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-completed-task',
  templateUrl: './completed-task.component.html',
  styleUrls: ['./completed-task.component.css'],
})
export class CompletedTaskComponent {
  tasks: any[] = [];
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
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // this.tasks = this.taskService.getAllTasks();

    this.tasks = this.tasks.filter((task) => task.status == 'completed');
    this.authService.getUserProfile().subscribe({
      next: (res: any) => {
        this.current_user = res;
      },
    });
  }
}
