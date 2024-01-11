import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TodoService } from '../../service/todo.service';
import { Store } from '@ngrx/store';
import { addTask, updateTasks } from '../list/store/list.action';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.sass',
})
export class AddComponent implements OnInit {
  taskForm!: FormGroup;
  editMode = false;
  id: string = '';

  constructor(
    private fb: FormBuilder,
    private todoService: TodoService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.todoService.selectedTask$.subscribe((taskData) => {
      if (taskData) {
        this.initializeForm(taskData['task']);
        this.id = taskData.id;
        this.editMode = true;
      } else {
        this.initializeForm('');
      }
    });
  }

  initializeForm(taskData: string) {
    this.taskForm = this.fb.group({
      task: [taskData, Validators.required],
    });
  }

  addToList() {
    let taskData = {
      task: this.taskForm.value.task,
      id: this.id,
    };

    if (!this.editMode && this.taskForm.valid) {
      // this.todoService.addTask(taskData);
      this.store.dispatch(addTask({ newTask: taskData }));
    } else {
      // this.todoService.editTask(taskData);
      this.store.dispatch(updateTasks({ updatedTask: taskData }));
    }

    this.editMode = false;
    this.taskForm.reset();
  }
}
