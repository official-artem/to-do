import { TodoBody } from '@appTypes/todo.type';
import Todo from '@models/todo.model';

const getOne = (id: string) => {
  return Todo.findById(id);
}

const getAll = async (userId: string) => {
  return await Todo.find({ userId });
}

const createOne = ({
  content,
  status,
  priority,
  userId
}: TodoBody) => {
  const createdTask = new Todo({
    content,
    status,
    priority,
    userId,
  });

  return createdTask.save();
}

interface UpdateOneProps {
  id: string,
  content: string,
  priority: number,
  status: string
}

const updateOne = ({
  id,
  content,
  priority,
  status
}: UpdateOneProps) => {
  const updatedTask = Todo.findByIdAndUpdate(id, {
    content,
    status,
    priority
  }, 
  { new: true });

  return updatedTask;
}

const removeOne = async (todoId: string) => {
  await Todo.findByIdAndDelete(todoId);
}

const removeMany = (userId: string) => {
  Todo.deleteMany({
    userId,
  })
}

const TodoService = {
  getOne,
  getAll,
  createOne,
  updateOne,
  removeOne,
  removeMany
};

export default TodoService;