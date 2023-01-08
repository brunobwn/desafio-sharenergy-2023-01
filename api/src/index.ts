import 'express-async-errors';
import express from 'express';
import routes from './routes';
import { errorMiddleware } from './middlewares/error';

const mangoose = require('mangoose');

mangoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    const app = express();

    app.use(express.json());

    app.use(routes);

    // app.use(errorMiddleware);
    app.listen(process.env.PORT, () =>
      console.log(`Servidor rodando em: http://localhost:${process.env.PORT} 🔥`)
    );
  })
  .catch((err: Error) => console.log(err));
