import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { MyTaskComponent } from './components/my-task/my-task.component';
import { PendingTaskComponent } from './components/pending-task/pending-task.component';
import { CompletedTaskComponent } from './components/completed-task/completed-task.component';
import { authGuard } from 'src/app/core/guards/auth/auth.guard';

const routes: Routes = [
  {
    path: 'my-task',
    component: MyTaskComponent,
    canActivate: [authGuard],
  },
  {
    path: 'pending',
    component: PendingTaskComponent,
    canActivate: [authGuard],
  },
  {
    path: 'completed',
    component: CompletedTaskComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskRoutingModule {}
