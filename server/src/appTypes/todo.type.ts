export enum TodoStatus {
  IN_PROGRESS = "in progress",
  DONE = "done",
  UNDONE = "undone"
}

export interface TodoBody {
  content: string;
  status?: TodoStatus;
  priority: number;
  userId: string;
}

