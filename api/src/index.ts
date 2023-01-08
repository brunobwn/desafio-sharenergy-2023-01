import 'express-async-errors';
import express from 'express';
import routes from './routes';
import { AppDataSource } from './data-source';
import { errorMiddleware } from './middlewares/error';

AppDataSource.initialize().then(() => {
  const app = express();

  app.use(express.json());

  app.use(routes);

  app.use(errorMiddleware);
  return app.listen(process.env.PORT, () =>
    console.log(`Servidor rodando em: http://localhost:${process.env.PORT} 🔥`)
  );
});
