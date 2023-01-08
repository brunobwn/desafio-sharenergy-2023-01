import { Router } from 'express';
import { AuthController } from './controllers/AuthController';
import { authMiddleware } from './middlewares/authMiddleware';

const router = Router();

router.post('/create', new AuthController().create);
router.post('/login', new AuthController().login);

router.use(authMiddleware);

export default router;
