import TodoController from '@controllers/todo.controller';
import express from 'express';
import { AuthController } from '@controllers/auth.controller';

const todoRouter = express.Router();

todoRouter.use(AuthController.verification)

todoRouter.get('/', TodoController.getAll);

todoRouter.get('/:id', TodoController.getOne);

todoRouter.post('/', TodoController.createOne);

todoRouter.patch('/:id', TodoController.updateOne)

todoRouter.delete('/:id', TodoController.removeOne);

export default todoRouter;

