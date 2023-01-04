import express, { Request, Response } from 'express';
import routes from './routes';
import { AppDataSource } from './data-source';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log('Servidor iniciado em http://localhost:3333');
});
