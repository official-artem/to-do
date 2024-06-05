import User from '@models/user.model';
import { RouteCallBack } from '@appTypes/route.type';
import { jwtService } from '@services/jwt.service';
import { comparePassword,  } from 'utils/hashPassword';
import { UserService } from '@services/user.service';
import bcrypt from 'bcrypt';

const registration: RouteCallBack = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.sendStatus(400)
  }
  const createdUser = await new User({
    name,
    email,
    password: await bcrypt.hash(password, 10),
  })
  .save();

  try {
    const JWTCode = jwtService.sign({
      id: createdUser.id,
      email: createdUser.email
    });

    res.cookie('todo', JWTCode, {
      secure: false,
      domain: 'localhost',
      sameSite: 'lax',
      httpOnly: true
    });
    res.sendStatus(201);
  } catch (err: any) {
    res.sendStatus(500);

    throw new Error(err);
  }
};

const verification: RouteCallBack = (req, res, next) => {
  const jwtCode = req.cookies.todo;

  const user = jwtService.verify(jwtCode);

  if (!user) {
    res
      .clearCookie('todo', { path: '/'}).sendStatus(401)
      .sendStatus(401);
    return;
  }

  res.locals.userId = user.id;

  next()
}

const login: RouteCallBack = async (req, res) => {
  const { email, password } = req.body;

  try {
  const user = await UserService.getOne(email);

  console.log('user:', user)

  if (!user) {
    res.sendStatus(404);

    return;
  }

  const isPasswordCompare = await comparePassword({
    hash: user?.password,
    pass: password
    })



    if (!isPasswordCompare) {
    res.sendStatus(401);
    }

  
    const JWTCode = jwtService.sign({
      id: user.id,
      email: user.email
    });

    res.cookie('todo', JWTCode, {
      secure: false,
      domain: 'localhost',
      sameSite: 'lax',
      httpOnly: true
    });
    res.sendStatus(201);
  } catch (err: any) {
    res.sendStatus(500);

    throw new Error(err);
  }
}

export const AuthController = {
  registration,
  verification,
  login
};