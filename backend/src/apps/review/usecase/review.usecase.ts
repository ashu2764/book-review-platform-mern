import { Types } from 'mongoose';
import { ReviewRepository } from '../repository/review.repository.js';
import { IReview } from '../../../models/review.model.js';
import { ReviewError } from '../../../infrastructure/errors/review.error.js';

export class ReviewUsecase {
  constructor(private repo = new ReviewRepository()) {}

  async create(data: Partial<IReview>) {
    // Check if the user already reviewed this book
    const existing = await this.repo.findOne({ bookId: data.bookId, userId: data.userId });
    if (existing) {
      throw new ReviewError('You have already reviewed this book.');
    }
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
