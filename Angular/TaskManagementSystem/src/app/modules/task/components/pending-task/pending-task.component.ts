import { Component } from '@angular/core';
import { concatMap, map, switchMap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserProfileService } from 'src/app/core/services/shared/user-profile.service';
import { TaskService } from 'src/app/core/services/task/task.service';

@Component({
  selector: 'app-pending-task',
  templateUrl: './pending-task.component.html',
  styleUrls: ['./pending-task.component.css'],
})
export class PendingTaskComponent {
  tasks: any[] = [];
  users: any[] = [];
  current_user: any;

  displayedColumns: string[] = [
    'id',
    'created_by',
    'title',
    'description',
    'status',
  ];
  statusOptions: string[] = ['completed', 'pending'];

  constructor(
    private taskService: TaskService,
    private userProfileService: UserProfileService
  ) {}

  ngOnInit(): void {
    this.userProfileService.userProfile$
      .pipe(
        switchMap((userProfile) => {
          this.current_user = userProfile;
          console.log('this is data', userProfile);
          // Return the observable for getAllTasks() after filtering based on the current user id
          return this.taskService
            .getAllTasks()
            .pipe(
              map((tasks: any) =>
                tasks.filter(
                  (task: any) =>
                    task.assigned_to === userProfile.id &&
                    task.status == 'pending'
                )
              )
            );
        })
      )
      .subscribe((filteredTasks) => {
        this.tasks = filteredTasks;
      });
    // console.log(this.taskService.getAllTasks());
  }

  onEdit(task: any): void {
    // Handle edit operation, e.g., update task data
    this.taskService.editTask(task.id, task);
    console.log('Edited task:', task);
  }
}
