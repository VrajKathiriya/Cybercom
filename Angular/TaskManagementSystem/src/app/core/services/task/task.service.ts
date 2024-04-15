import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor() {}

  getAllTasks(): Observable<any> {
    let tasks: any = localStorage.getItem('tasks');
    tasks = JSON.parse(tasks) || [];

    return of(tasks);
  }

  addTask(task: any) {
    let tasks: any = localStorage.getItem('tasks');
    tasks = JSON.parse(tasks) || [];
    tasks = [...tasks, task];

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  editTask(taskId: number, updatedTask: any) {
    let tasks: any = localStorage.getItem('tasks');
    tasks = JSON.parse(tasks) || [];

    tasks = tasks.map((task: any) => {
      if (task.id == taskId) {
        return updatedTask;
      } else return task;
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  deleteTask(taskId: number) {
    let tasks: any = localStorage.getItem('tasks');
    tasks = JSON.parse(tasks) || [];

    tasks = tasks.filter((task: any) => task.id != taskId);

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}
