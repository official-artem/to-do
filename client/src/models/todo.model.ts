import { TodoStatus } from '@/data/todoStatus';

export class TodoSchema {
  constructor(
    protected content: string,
    protected priority: number = 1,
    protected status: TodoStatus = TodoStatus.UNDONE
  ) {
  
    this.content = content;
    this.priority = priority;
    this.status = status;

  }
}