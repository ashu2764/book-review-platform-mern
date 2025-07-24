import { body } from 'express-validator';

export const createReviewValidation = [
  body('review_text').notEmpty().withMessage('Review text is required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be an integer between 1 and 5'),
];
