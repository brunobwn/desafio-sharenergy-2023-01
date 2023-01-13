import { Router } from 'express';
import { AuthController } from './controllers/AuthController';
import { ClientController } from './controllers/ClientController';
import { authMiddleware } from './middlewares/authMiddleware';

const router = Router();

router.post('/create', new AuthController().create);
router.post('/login', new AuthController().login);

router.use(authMiddleware);
router.get('/client', new ClientController().getAll);
router.get('/client/:id', new ClientController().getOne);
router.post('/client', new ClientController().create);
router.delete('/client', new ClientController().delete);

export default router;
