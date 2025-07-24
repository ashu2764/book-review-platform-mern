import { BaseRepository } from '../../../base/base.repository.js';
import { IReview, ReviewModel } from '../../../models/review.model.js';

export class ReviewRepository extends BaseRepository<IReview> {
  constructor() {
    super(ReviewModel);
  }

  async findByBook(bookId: string) {
    return this.model.find({ bookId }).populate('userId', 'username email').sort({ createdAt: -1 });
  }

  async createReview(data: Partial<IReview>) {
    return this.model.create(data);
  }
  
  async findOne(filter: Partial<IReview>) {
    return this.model.findOne(filter);
  }
}
