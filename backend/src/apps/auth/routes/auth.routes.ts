import { Router } from 'express';
import { AuthController } from '../controller/auth.controller.js'; 
import { signupValidation, loginValidation } from '../../../infrastructure/middleware/validations/auth.validation.js';
import { validateRequest } from '../../../infrastructure/middleware/validateRequest.middleware.js';

const router = Router();
const controller = new AuthController();

router.post('/signup', signupValidation, validateRequest, controller.signup);
router.post('/login',loginValidation, validateRequest, controller.login);

export default router;
