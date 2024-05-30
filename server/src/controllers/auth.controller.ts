import { Request, Response } from 'express';
import User from '@models/user.model';

type ControllerFunc = (req: Request, res: Response) => any;

const registration: ControllerFunc = async (req, res) => {
  const { name, email, password } = req.body;

  const createdUser = await new User({
    name,
    email,
    password
  })
  .save();

  res.send(createdUser);
};

export const AuthController = {
  registration
};