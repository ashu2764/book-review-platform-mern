// src/apps/books/routes/book.routes.ts
import express from 'express';
import { BookController } from '../controller/book.controller.js';
import { authenticate } from '../../../infrastructure/middleware/auth.middleware.js';
import { createBookValidation } from '../../../infrastructure/middleware/validations/book.validation.js';
import { validateRequest } from '../../../infrastructure/middleware/validateRequest.middleware.js';

const router = express.Router();
const controller = new BookController();

router.post('/', authenticate, createBookValidation, validateRequest, controller.createBook);
router.get('/', controller.getBooks);
router.get('/:id/raw', controller.getBookById);
router.get('/:id', controller.getById);

export default router;
