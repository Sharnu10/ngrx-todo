import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../service/todo.service';
import { Task } from '../../model/task.model';
import { NgClass } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [NgClass],
  templateUrl: './list.component.html',
  styleUrl: './list.component.sass',
})
export class ListComponent implements OnInit {
  tasks!: Task[];
  selectedItemId: number | null = null;

  constructor(
    private todoService: TodoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.tasks = this.todoService.getTask();

    this.todoService.updatedTaskList$.subscribe((task) => {
      this.tasks = task;
    });
  }

  onDelete(task: Task) {
    this.todoService.delete(task.id);
  }

  onEdit(task: Task) {
    this.todoService.edit(task);
  }

  selectItem(item: any): void {
    this.selectedItemId = item.id;
    this.router.navigate(['edit']);
  }
}
