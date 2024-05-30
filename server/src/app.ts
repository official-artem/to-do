import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { authRouter } from '@routes/auth.route';
import connectDB from './config/db';

const port = process.env.PORT ?? 3000;
const app = express();

connectDB();
app.use(cors());
app.use(express.json());
app.use(authRouter);

app.get('/', (_, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
})