import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db';

dotenv.config({ path: '.env.local' });

const port = process.env.PORT ?? 3000;
const app = express();

connectDB();
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
})