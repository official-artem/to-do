import User from '@models/user.model';
import TodoService from './todo.service';
import { UserType } from '@appTypes/user.type';

const removeOne = (id: string) => {
  TodoService.removeMany(id);

  User.findByIdAndDelete(id);
}

const createOne = ({email, password, name}: UserType) => {
  const createdUser = new User({
  name,
  email,
  password
  });
  
  return createdUser.save();
}


const getOne = (email: string) => {
  const user = User.findOne({ email });

  return user;
};

export const UserService = {
  removeOne,
  getOne,
  createOne
}

