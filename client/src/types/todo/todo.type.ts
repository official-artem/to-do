import { TodoStatus } from '@/data/todoStatus';

export interface TodoType {
  _id: string,
  content: string,
  priority: number,
  status: TodoStatus,
}