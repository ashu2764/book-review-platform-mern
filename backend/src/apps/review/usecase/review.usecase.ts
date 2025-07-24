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

  async getReviewsByBookPaginated(
    bookId: string,
    page: number,
    limit: number,
    sortBy?: string,
    order?: 'asc' | 'desc'
  ) {
    const reviews = await this.repo.findByBookPaginated(bookId, page, limit,sortBy, order);
    const total = await this.repo.countByBook(bookId);
    return {
      reviews,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
