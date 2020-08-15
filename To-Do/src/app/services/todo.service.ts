import { Injectable } from '@angular/core';
import { Todo } from '../model/todo-model';


@Injectable()
export class ToDoService {

  private nextId: number;

  constructor() {
    let todoList = this.getTodos();

    // retrieving the correct value for nextId
    if (todoList.length === 0) {
      this.nextId = 0;
    } else {
      let maxId = todoList[todoList.length - 1].id;
      this.nextId = maxId + 1;
    }
  }

  // function to retrieve the entire to-do list from local storage
  getTodos(): Todo[] {
    let localStorageItem = JSON.parse(localStorage.getItem('todos'));

    // empty array returned if local storage is empty
    return localStorageItem == null ? [] : localStorageItem.todos;
  }

  addTodo(content: string) {
    // creating new todo, pushing it onto the existing list
    let todo = new Todo(this.nextId, content, false, false);
    let todos = this.getTodos();
    todos.push(todo);

    // update the existing list in local storage
    this.setLocalStorageList(todos);
    this.nextId++;
  }

  // updates the to-do list in local storage
  setLocalStorageList(list: Todo[]) {
    localStorage.setItem('todos', JSON.stringify({ todos: list }));
  }

  // find the to-do item by its id in local storage and remove it
  removeTodo(id: number) {
    let currList = this.getTodos();
    currList = currList.filter((todo) => todo.id !== id);

    // update to-do list in memory once the item is removed
    this.setLocalStorageList(currList);
  }

  editTodo(id: number, newContent: string) {
    let listItems = this.getTodos();

    // iterating through items of to-do list until we find the item with matching id
    for (var i = 0; i < listItems.length; i++) {
      if (id === listItems[i].id) {
        // updating content of to-do item
        listItems[i].content = newContent;
        break;
      }
    }

    // update list in local storage once the to-do item is edited
    this.setLocalStorageList(listItems);
  }

  updateComplete(id: number) {
    let listItems = this.getTodos();
    for (var i = 0; i < listItems.length; i++) {
      if (id === listItems[i].id) {
        listItems[i].completed = !listItems[i].completed;
        break;
      }
    }
    this.setLocalStorageList(listItems);
  }

  toggleEdit(id: number) {
    let listItems = this.getTodos();
    for (var i = 0; i < listItems.length; i++) {
      if (id === listItems[i].id) {
        listItems[i].editing = !listItems[i].editing;
        break;
      }
    }
    this.setLocalStorageList(listItems);
  }

}
