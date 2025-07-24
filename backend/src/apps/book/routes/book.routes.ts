// src/apps/books/routes/book.routes.ts
import express from 'express';
import { BookController } from '../controller/book.controller.js';
import { authenticate } from '../../../infrastructure/middleware/auth.middleware.js';

const router = express.Router();
const controller = new BookController();

router.post('/', authenticate, controller.createBook);
router.get('/', controller.getBooks);
router.get('/:id', controller.getBookById);

export default router;
