import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(public storage: Storage) {}

  /** key must be unique */
  public async generateKey(): Promise<string> {
    let key = `todo${parseInt(`${Math.random() * 100}`)}`;
    return key;
  }

  /** on initialize */
  public async read(): Promise<Todo[]> {
    console.log('before get from storage');
    let todos: Array<Todo> = [];
    await this.storage.forEach((todo, key, i) => {
      if (key.startsWith('todo')) {
        todos.push(todo);
        console.log('this is from storage service', todos);
      }
    });
    return todos;
  }

  /** event triggered when user create todo */
  public async create(key: string, todo: Todo) {
    console.log('Create To Do:', todo);
    const result = await this.storage.set(key, todo);
    console.log('Created To Do:', result);
    return result;
  }

  /** to change from !completed to complete */
  public async update(key: string, todo: Todo) {
    return await this.storage.set(key, todo);
  }

  /** remove the todo from the list */
  public async delete(key: string) {
    return await this.storage.remove(key);
  }
}
