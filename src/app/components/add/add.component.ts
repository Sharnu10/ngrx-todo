import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TodoService } from '../../service/todo.service';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.sass',
})
export class AddComponent implements OnInit {
  taskForm!: FormGroup;

  constructor(private fb: FormBuilder, private todoService: TodoService) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      task: ['', Validators.required],
    });
  }

  addToList() {
    if (this.taskForm.valid) {
      console.log(this.taskForm.value);
      this.todoService.addTask(this.taskForm.value);
      this.taskForm.reset();
    }
  }
}
