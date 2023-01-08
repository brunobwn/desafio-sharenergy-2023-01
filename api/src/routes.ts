import { Router } from 'express';
import { AuthController } from './app/controllers/AuthController';
import { authMiddleware } from './middlewares/authMiddleware';

const router = Router();

router.post('/create', new AuthController().create);

router.use(authMiddleware);

export default router;
