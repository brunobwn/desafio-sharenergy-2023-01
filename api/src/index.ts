import 'dotenv/config';
import 'express-async-errors';
import cors from 'cors';
import mongoose from 'mongoose';
import express from 'express';
import routes from './routes';
import { errorMiddleware } from './middlewares/error';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);
app.use(errorMiddleware);

mongoose.set('strictQuery', false);

const db_user = process.env.DB_USER || 'admin';
const db_password = encodeURIComponent(process.env.DB_PASSWORD || '');
const db_host = process.env.DB_HOST || 'localhost';
const db_name = process.env.DB_NAME || 'database';

mongoose
  .connect(
    `mongodb+srv://${db_user}:${db_password}@${db_host}/${db_name}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(process.env.SERVER_PORT ?? 3000, () =>
      console.log(`Servidor rodando em: http://localhost:${process.env.SERVER_PORT ?? 3000} 🔥`)
    );
  })
  .catch((err: Error) => console.log(err));
