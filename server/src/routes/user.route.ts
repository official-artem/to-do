import express from 'express';
import UserController from '@controllers/user.controller';
import TodoController from '@controllers/todo.controller';

const router = express.Router();

router.get('/:id', TodoController.getOne)

router.post('/', TodoController.getOne)

router.delete('/:id', UserController.removeOne);

export default router;

