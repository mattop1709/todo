import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public todos: Array<Todo> = [];
  public message: string = '';

  constructor(public todoService: TodoService) {}

  async ngOnInit() {
    this.todos = await this.todoService.read();
    console.log('this storage from ts screen', this.todos);
  }

  getIcon(todo: Todo) {
    if (todo.completed) return 'checkmark-circle';
    else return 'stopwatch';
  }

  public InputTodo(param: string) {
    this.message = param;
  }

  public async createTodo() {
    alert(this.message);
    let key = await this.todoService.generateKey();
    console.log(key);
    let todo = {
      title: key,
      note: this.message,
      completed: false,
    };
    await this.todoService.create(key, todo);
    this.ngOnInit();
  }

  public toggleTodo(param: Todo) {
    let todo = {
      title: `${param.title}`,
      note: `${param.note}`,
      completed: !param.completed,
    };
    console.log('todo toggled', todo);
    this.todoService.update(param.title, todo);
    this.ngOnInit();
  }

  public removeTodo(param: string) {
    this.todoService.delete(param);
    this.ngOnInit();
  }
}
