import { title } from 'process';

export enum TodoStatus {
  IN_PROGRESS = 'in progress',
  DONE = 'done',
  UNDONE = 'undone'
}

export const todoStatuses = [
  {
    id: 1,
    status: TodoStatus.IN_PROGRESS,
    title: 'In progress'
  },
  {
    id: 2,
    status: TodoStatus.DONE,
    title: 'Done'
  },
  {
    id: 3,
    status: TodoStatus.UNDONE,
    title: 'Undone'
  },
]