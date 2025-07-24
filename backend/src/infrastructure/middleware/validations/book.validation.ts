import { body } from 'express-validator';

export const createBookValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('author').notEmpty().withMessage('Author is required'),
  body('genre').notEmpty().withMessage('Genre is required'),
];

