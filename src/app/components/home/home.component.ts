import { Component } from '@angular/core';
import { AddComponent } from '../add/add.component';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AddComponent, ListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass',
})
export class HomeComponent {}
