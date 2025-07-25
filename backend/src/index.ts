import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from '../src/infrastructure/db/mongoose.js';
import { ROOT_CONSTANTS } from '../src/infrastructure/constants/root.constants.js';


import authRouter from './apps/auth/routes/auth.routes.js';
import bookRouter from './apps/book/routes/book.routes.js';
import { errorHandler } from '../src/infrastructure/middleware/error.middleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use(ROOT_CONSTANTS.PATHS.AUTH, authRouter);
app.use(ROOT_CONSTANTS.PATHS.BOOK, bookRouter);

// Root health check
app.get(ROOT_CONSTANTS.PATHS.ROOT_PATH, (_req, res) => {
  res.send('📚 Book Review Platform Backend Running');
});

// Error middleware
app.use(errorHandler);

// Connect DB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀${ROOT_CONSTANTS.SERVER_RUNNING_MESSAGE} ${PORT}`);
  });
});


