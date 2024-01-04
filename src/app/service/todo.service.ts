import { Injectable } from '@angular/core';
import { Task } from '../model/task.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  tasks: Task[] = [
    { id: '1', task: 'task 1' },
    { id: '2', task: 'task 2' },
    { id: '3', task: 'task 3' },
  ];

  updatedTaskList$ = new BehaviorSubject<Task[]>([]);
  selectedTask$ = new BehaviorSubject<Task | null>(null);
  constructor() {
    this.getTask();
  }

  getTask() {
    this.updatedTaskList$.next(this.tasks.slice());
    return this.tasks.slice();
  }

  addTask(task: Task) {
    task.id = String(this.tasks.length + 1);
    this.tasks.push(task);
    this.updatedTaskList$.next(this.tasks.slice());
  }

  delete(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.updatedTaskList$.next(this.tasks.slice());
  }

  selectedTask(id: string) {
    const task = this.tasks.find((task) => task.id === id);
    task ? this.selectedTask$.next(task) : this.selectedTask$.next(null);
  }

  editTask(updatedTask: Task) {
    this.tasks = this.tasks.map((taskItem: Task) => {
      return taskItem.id === updatedTask.id
        ? { ...taskItem, ...updatedTask }
        : taskItem;
    });
    this.updatedTaskList$.next(this.tasks.slice());
    return;
  }
}
