import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskListComponent } from './components/task-list/task-list.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyTaskComponent } from './components/my-task/my-task.component';

@NgModule({
  declarations: [TaskListComponent, MyTaskComponent],
  imports: [
    CommonModule,
    TaskRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class TaskModule {}
