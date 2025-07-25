import { BaseRepository } from '../../../base/base.repository.js';
import { IBook, BookModel } from '../../../models/book.model.js';
import mongoose from 'mongoose';

export class BookRepository extends BaseRepository<IBook> {
  constructor() {
    super(BookModel);
  }

  async findWithFilters(filter: any, sort: any, page: number, limit: number) {
    const skip = (page - 1) * limit;
    return this.model.find(filter).sort(sort).skip(skip).limit(limit);
  }

  async countWithFilters(filter: any) {
    return this.model.countDocuments(filter);
  }

  async findById(id: string): Promise<IBook | null> {
    return this.model.findById(id);
  }

  async getAverageRating(bookId: string): Promise<number> {
    const book = await this.model.findById(bookId);
    if (!book || book.reviews.length === 0) return 0;

    const total = book.reviews.reduce((acc:any, r:any) => acc + r.rating, 0);
    return total / book.reviews.length;
  }

  async addReview(bookId: string, review: any) {
    const book = await this.model.findById(bookId);
    if (!book) throw new Error('Book not found');

    const alreadyReviewed = book.reviews.find(
      (r: any) => r.userId.toString() === review.userId.toString()
    );
    if (alreadyReviewed) throw new Error('Already reviewed');

    book.reviews.push(review);

    const ratings = book.reviews.map((r: any) => r.rating);
    book.averageRating = ratings.reduce((a: number, b: number) => a + b, 0) / ratings.length;

    return book.save();
  }

  async getReviewsPaginated(
    bookId: string,
    page = 1,
    limit = 5,
    sortBy = 'createdAt',
    order: 'asc' | 'desc' = 'desc'
  ) {
    const book = await this.model.findById(bookId).lean();
    if (!book) throw new Error('Book not found');

    const sortedReviews = [...book.reviews].sort((a, b) => {
      const first = a[sortBy as keyof typeof a];
      const second = b[sortBy as keyof typeof b];
      return order === 'asc' ? (first as any) - (second as any) : (second as any) - (first as any);
    });

    const start = (page - 1) * limit;
    const paginated = sortedReviews.slice(start, start + limit);

    return {
      reviews: paginated,
      total: book.reviews.length,
      page,
      limit,
      totalPages: Math.ceil(book.reviews.length / limit),
    };
  }

  async findAllReviews(bookId: string) {
    const book = await this.model.findById(bookId);
    return book?.reviews || [];
  }
}
