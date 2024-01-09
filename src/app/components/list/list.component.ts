import { Component, OnInit } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { TodoService } from '../../service/todo.service';
import { Task } from '../../model/task.model';
import { loadTasks } from './store/list.action';
import { getTasks } from './store/list.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './list.component.html',
  styleUrl: './list.component.sass',
})
export class ListComponent implements OnInit {
  tasks!: Observable<Task[]>;
  // tasks!: Task[];
  selectedItemId: string = '';

  constructor(
    private todoService: TodoService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit(): void {
    // this.tasks = this.todoService.getTask();

    // this.todoService.updatedTaskList$.subscribe((task) => {
    //   this.tasks = task;
    // });

    this.tasks = this.store.select(getTasks);
    this.store.dispatch(loadTasks());
  }

  onDelete(task: Task) {
    this.todoService.delete(task.id);
  }

  onEdit(task: Task) {
    this.selectedItemId = task.id;
    this.todoService.selectedTask(this.selectedItemId);
  }
}
