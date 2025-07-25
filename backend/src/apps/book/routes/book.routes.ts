import express from 'express';
import { BookController } from '../controller/book.controller.js';
import { authenticate } from '../../../infrastructure/middleware/auth.middleware.js';
import { createBookValidation } from '../../../infrastructure/middleware/validations/book.validation.js';
import { validateRequest } from '../../../infrastructure/middleware/validateRequest.middleware.js';
import { ReviewController } from '../controller/review.controller.js';

const router = express.Router();
const controller = new BookController();
const reviewController = new ReviewController();

router.post('/', authenticate, createBookValidation, validateRequest, controller.createBook);
router.get('/', controller.getBooks);
router.get('/:id/raw', controller.getBookById);
router.get('/:id', controller.getById);

// Review Routes (Book embedded)
router.post('/:id/review', authenticate, reviewController.createReview);
router.get('/:id/reviews', reviewController.getPaginatedReviews);

export default router;
