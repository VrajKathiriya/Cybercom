import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskListComponent } from './components/task-list/task-list.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FormsModule } from '@angular/forms';
import { PendingTaskComponent } from './components/pending-task/pending-task.component';
import { MyTaskComponent } from './components/my-task/my-task.component';
import { CompletedTaskComponent } from './components/completed-task/completed-task.component';

@NgModule({
  declarations: [TaskListComponent, PendingTaskComponent, MyTaskComponent, CompletedTaskComponent],
  imports: [CommonModule, TaskRoutingModule, MaterialModule, FormsModule],
})
export class TaskModule {}
