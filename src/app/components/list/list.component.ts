import { Component, HostListener, OnInit } from '@angular/core';
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

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event): void {
    // Check if the clicked element is not inside the selected item
    if (!this.isElementInsideSelected(event.target)) {
      this.selectedItemId = null; // Clear selected item
    }
  }

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
    // this.router.navigate(['edit']);
  }

  private isElementInsideSelected(target: EventTarget | null): boolean {
    // Check if the clicked element or any of its ancestors is the selected item
    while (target) {
      if (
        target instanceof HTMLElement &&
        target.classList.contains('bg-primary')
      ) {
        return true;
      }
      target = (target as Node).parentNode as EventTarget;
    }
    return false;
  }
}
