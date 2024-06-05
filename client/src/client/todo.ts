import { TodoStatus } from '@/data/todoStatus';
import { createFetchConfig } from '@/helpers/createFetchConfig';
import { TodoSchema } from '@/models/todo.model';
import { TodoType } from '@/types/todo/todo.type';

export class TodoClient extends TodoSchema {
  private SERVER_URI = process.env.NEXT_PUBLIC_SERVER_URI + '/';

  constructor(
    protected content: string,
    protected priority: number = 1,
    protected status: TodoStatus,
    protected id?: string
  ) {
    super(content, priority, status);
  }

  async createOne() {
    try {
      const createdTodo = await fetch(this.SERVER_URI + 'todos', createFetchConfig({
        method: 'POST',
        body: {
          content: this.content,
          priority: this.priority,
          status: this.status,
        }
      }));

      return createdTodo.status;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async updateOne() {
    try {
      await fetch(this.SERVER_URI + `todos/${this.id}`, createFetchConfig<Omit<TodoType, '_id'>>({
        method: 'PATCH',
        body: {
          content: this.content,
          priority: this.priority,
          status: this.status,
        }
      }));
    } catch (err: any) {
      throw new Error(err);
    }
  }

}

export class TodoService {
  private SERVER_URI = process.env.NEXT_PUBLIC_SERVER_URI + '/';

  async getAll(): Promise<TodoType[]> {
    try {
      const response = await fetch(`${this.SERVER_URI}todos`, {
        method: 'GET',
        credentials: 'include',
      });

      const todos: Promise<TodoType[]> = response.json();

      return todos;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async getOne(todoId: string) {
    try {
      const response = await fetch(`${this.SERVER_URI}todos?=${todoId}`, {
        method: 'GET',

      });

      const todo: Promise<TodoType> = response.json();

      return todo;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async deleteOne(todoId: string) {
    try {
      await fetch(`${this.SERVER_URI}todos/${todoId}`, {
        method: 'DELETE',
        credentials: 'include'
      });
    } catch (err: any) {
      throw new Error(err);
    }
  }
}