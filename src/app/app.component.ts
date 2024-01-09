import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent {
  title = 'ngrx-todo';

  // command to publish
  //  https://Sharnu10.github.io/ngrx-todo/
  // npx angular-cli-ghpages --dir=dist/ngrx-todo/browser
}
