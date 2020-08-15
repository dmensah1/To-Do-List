import { Component } from '@angular/core';
import { ToDoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'To-Do';

  constructor(public todoService: ToDoService) {}
}
