export class Todo {
  // model for the to-do list
  id: number;
  content: string;
  completed: boolean;
  editing: boolean;

  constructor(id: number, content: string, check: boolean, edit: boolean) {
    this.id = id;
    this.content = content;
    this.completed = check;
    this.editing = edit;
  }
}
