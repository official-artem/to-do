import { RouteCallBack } from '@appTypes/route.type';
import { TodoStatus } from '@appTypes/todo.type';
import TodoService from '@services/todo.service';

const getOne: RouteCallBack = async (req, res) => {
  const userId = res.locals.userId;

  const todo = await TodoService.getOne(userId);

  res.send(todo);
};

const getAll: RouteCallBack = async (req, res) => {
  const userId = res.locals.userId;

  const todo = await TodoService.getAll(userId);

  res.send(todo);
};

const createOne: RouteCallBack = async (req, res) => {
  const {
    content,
    status = TodoStatus.UNDONE,
    priority = 1,
  } = req.body;

  const userId = res.locals.userId;

  if (!content && !userId) {
    res.sendStatus(404);
  }

  const createdTodo = await TodoService.createOne({
    content,
    status,
    priority,
    userId
  });

  res.send(createdTodo);
};

const updateOne: RouteCallBack = async (req, res) => {
  const { id } = req.params;
  const { content, priority, status } = req.body;

  if (!id) {
    res.sendStatus(404);
  }

  try {
    const updatedTodo = await TodoService.updateOne({
      id,
      content,
      priority,
      status
    });


    res.send(updatedTodo);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const removeOne: RouteCallBack = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(404);
  }

  try {
    await TodoService.removeOne(id);

    res.sendStatus(204);
  } catch (err: any) {
    res.sendStatus(500);
    throw new Error(err);
  }
};

const TodoController = {
  getOne,
  createOne,
  getAll,
  removeOne,
  updateOne
};

export default TodoController;