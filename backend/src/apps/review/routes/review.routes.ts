import { Router } from 'express';
import { ReviewController } from '../controller/review.controller.js';
import { authenticate } from '../../../infrastructure/middleware/auth.middleware.js';

const router = Router();
const controller = new ReviewController();

router.post('/books/:id', authenticate, controller.create);
router.get('/books/:id', controller.getByBook);

export default router;
