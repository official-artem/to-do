import { RouteCallBack } from '@appTypes/route.type';
import { UserService } from '@services/user.service';

const removeOne: RouteCallBack = (req, res) => {
  const { id } = req.body;

  if (!id) {
    res.sendStatus(404);
  }

  try {
    UserService.removeOne(id);
    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
  }
}

const UserController = {
  removeOne,
}

export default UserController;