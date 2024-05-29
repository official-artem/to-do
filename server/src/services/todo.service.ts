import Task from '@models/task.model';
import TaskStatus from 'types/taskStatus.type';

export const getOne = (id: string) => {
  return Task.findById(id);
}

export const getAll = async (userId: string) => {
  return await Task.find({ userId });
}

export const createOne = (
  content: string,
  status: TaskStatus,
  priority: number,
  ) => {
  const createdTask = new Task({
    content,
    status,
    priority,
  });

  return createdTask.save();
}

export const updateOne = (
  taskId: string,
  content?: string,
  status?: TaskStatus,
  priority?: number,
  ) => {
  const updatedTask = Task.findByIdAndUpdate(taskId, {
    content,
    status,
    priority
  }, 
  { new: true });

  return updatedTask;
}

export const deleteOne = (taskId: string) => {
  Task.findByIdAndDelete(taskId);
}