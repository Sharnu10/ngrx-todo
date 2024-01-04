import { Injectable } from '@angular/core';
import { Task } from '../model/task.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  tasks: Task[] = [
    { id: 1, task: 'task 1' },
    { id: 2, task: 'task 2' },
    { id: 3, task: 'task 3' },
  ];
  updatedTaskList$ = new BehaviorSubject<Task[]>([]);
  constructor() {
    this.getTask();
  }

  getTask() {
    this.updatedTaskList$.next(this.tasks.slice());
    return this.tasks.slice();
  }

  addTask(task: Task) {
    this.tasks.push(task);
    this.updatedTaskList$.next(this.tasks.slice());
  }

  delete(id: number) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.updatedTaskList$.next(this.tasks.slice());
  }

  edit(task: Task) {
    this.tasks.map((taskItem: Task) => {
      taskItem.id === task.id ? { ...taskItem, ...task } : taskItem;
    });
    this.updatedTaskList$.next(this.tasks.slice());
    return;
  }
}
