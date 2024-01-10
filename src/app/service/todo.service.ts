import { Injectable } from '@angular/core';
import { Task } from '../model/task.model';
import { BehaviorSubject, of } from 'rxjs';
import { TaskData } from '../model/initialTaskList.data';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  tasks: Task[] = TaskData;
  updatedTaskList$ = new BehaviorSubject<Task[]>([]);
  selectedTask$ = new BehaviorSubject<Task | null>(null);
  tasksLength = 0;

  constructor() {
    this.getTask();
    this.tasksLength = this.tasks.length;
  }

  getTask() {
    this.updatedTaskList$.next(this.tasks.slice());
    return of(this.tasks.slice());
  }

  addTask(task: Task) {
    // task.id = String(this.tasks.length + 1);
    const newTask = { ...task, id: String(this.tasksLength + 1) };
    this.tasks.push(newTask);
    this.updatedTaskList$.next(this.tasks.slice());
    return of(newTask);
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
    return of(this.tasks.slice());
  }
}
