import { Component, OnInit, Input } from '@angular/core';
import { ToDoService } from 'src/app/services/todo.service';
import { Todo } from 'src/app/model/todo-model';

@Component({
  selector: 'app-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class ToDoListComponent implements OnInit{

  toDoItem: string;
  todoList: Todo[];
  editedItem: string;

  constructor(private todoService: ToDoService) {
    this.toDoItem = '';
    this.editedItem = '';
  }

  ngOnInit() {
    this.todoList = this.todoService.getTodos();
  }

  addToDo() {
    this.todoService.addTodo(this.toDoItem);
    this.toDoItem = '';
    this.todoList = this.todoService.getTodos();
  }

  removeTodo(id: number) {
    this.todoService.removeTodo(id);
    this.todoList = this.todoService.getTodos();
  }

  updateCompleted(id: number) {
    this.todoService.updateComplete(id);
  }

  toggleEdit(id: number) {
    this.todoService.toggleEdit(id);
    this.todoList = this.todoService.getTodos();
  }

  onEdit(id: number) {
    this.todoService.editTodo(id, this.editedItem);
    this.editedItem = '';
    this.todoService.toggleEdit(id);
    this.todoList = this.todoService.getTodos();
  }
}
