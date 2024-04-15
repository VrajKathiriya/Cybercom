import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { MyTaskComponent } from './components/my-task/my-task.component';
import { PendingTaskComponent } from './components/pending-task/pending-task.component';
import { CompletedTaskComponent } from './components/completed-task/completed-task.component';

const routes: Routes = [
  {
    path: 'task-list',
    component: TaskListComponent,
  },
  {
    path: 'my-task',
    component: MyTaskComponent,
  },
  {
    path: 'pending',
    component: PendingTaskComponent,
  },
  {
    path: 'completed',
    component: CompletedTaskComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskRoutingModule {}
