import { Request, Response } from 'express';
import { BookUsecase } from '../usecases/book.usecases.js';
import { Types } from 'mongoose';

export class ReviewController {
  private usecase = new BookUsecase();

  createReview = async (req: Request, res: Response) => {
    const { id: bookId } = req.params;
    const { review_text, rating } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const review = await this.usecase.createReview(bookId, {
        userId: new Types.ObjectId(req.user._id),
        review_text,
        rating,
      });

      res.status(201).json({ message: 'Review created', review });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  getPaginatedReviews = async (req: Request, res: Response) => {
    const { id: bookId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    const sortBy = (req.query.sortBy as string) || 'createdAt';
    const order = (req.query.order as 'asc' | 'desc') || 'desc';

    try {
      const data = await this.usecase.getPaginatedReviews(bookId, page, limit, sortBy, order);
      res.status(200).json(data);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };
}
