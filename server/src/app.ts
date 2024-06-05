import User from '@models/user.model';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { authRouter } from '@routes/auth.route';
import connectDB from './config/db';
import todoRouter from '@routes/todo.route';
import cookies from 'cookie-parser';

const port = process.env.PORT ?? 5001;
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
console.log(1, process.env.PORT)
connectDB();

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookies());
app.use(authRouter);
app.use('/todos', todoRouter);
app.get('/', async (req: Request, res: Response) => {
  res.send(await User.find())
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err.stack)
  res.status(500).send('Smt went wrong');
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
})