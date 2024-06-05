import { Sort } from '@/components/Filtering/Filter';
import { TodoStatus } from '@/data/todoStatus';
import { TodoType } from '@/types/todo/todo.type';

export class sortAndFilterTodos {
  constructor(protected todos: TodoType[]) {
    this.todos = todos;
  }

  sort(sort: Sort) {
    switch (sort) {
      case Sort.ASC:
        return this.todos.sort((firstTodo, secondTodo) => firstTodo.priority - secondTodo.priority);

      case Sort.DESC:
        return this.todos.sort((firstTodo, secondTodo) => secondTodo.priority - firstTodo.priority);

      default:
        return this.todos;
    }
  }

  filter(status: TodoStatus | 'all') {
    if (status === 'all') {
      return this.todos;
    }
    return this.todos.filter(item => item.status === status);
  }
}