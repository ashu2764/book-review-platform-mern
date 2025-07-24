import { Router } from 'express';
import { ReviewController } from '../controller/review.controller.js';
import { authenticate } from '../../../infrastructure/middleware/auth.middleware.js';
import { createReviewValidation } from '../../../infrastructure/middleware/validations/review.validation.js';
import { validateRequest } from '../../../infrastructure/middleware/validateRequest.middleware.js';

const router = Router();
const controller = new ReviewController();

router.post('/books/:id', authenticate, createReviewValidation, validateRequest, controller.create);
router.get('/books/:id', controller.getByBook);

export default router;
