import { Request, Response } from 'express';
import { ReviewUsecase } from '../usecase/review.usecase.js';
import { Types } from 'mongoose';

export class ReviewController {
  private usecase = new ReviewUsecase();

  create = async (req: Request, res: Response) => {
    const { review_text, rating } = req.body;
    const { id } = req.params;

    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const review = await this.usecase.create({
      review_text,
      rating,
      bookId: new Types.ObjectId(id),
      userId: req.user._id,
    });

    res.status(201).json({ message: 'Review created', review });
  };

  getByBook = async (req: Request, res: Response) => {
    const { id: bookId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const sortBy = (req.query.sortBy as string) || 'createdAt';
    const order = (req.query.order as 'asc' | 'desc') || 'desc';

    const data = await this.usecase.getReviewsByBookPaginated(bookId, page, limit, sortBy, order);
    res.json(data);
  };
}
