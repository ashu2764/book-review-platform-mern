import { Router } from 'express';
import { AuthController } from '../controller/auth.controller.js'; 

const router = Router();
const controller = new AuthController();

router.post('/signup', controller.signup);
router.post('/login', controller.login);

export default router;
