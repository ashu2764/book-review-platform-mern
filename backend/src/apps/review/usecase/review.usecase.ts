import { Types } from 'mongoose';
import { ReviewRepository } from '../repository/review.repository.js';
import { IReview } from '../../../models/review.model.js';

export class ReviewUsecase {
  constructor(private repo = new ReviewRepository()) {}

  async create(data: Partial<IReview>) {
    const review = await this.repo.createReview({
      ...data,
      bookId: new Types.ObjectId(data.bookId),
      userId: new Types.ObjectId(data.userId),
    });
    return review;
  }

  async getReviewsByBook(bookId: string) {
    return this.repo.findByBook(bookId);
  }
}
