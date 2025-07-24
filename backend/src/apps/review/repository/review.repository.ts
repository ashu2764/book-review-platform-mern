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
  
  async findByBookPaginated(bookId: string, page = 1, limit = 10,sortBy = 'createdAt', order: 'asc' | 'desc' = 'desc') {
    const skip = (page - 1) * limit;
     const sort: any = {};
     sort[sortBy] = order === 'asc' ? 1 : -1;
    const reviews =await this.model
      .find({ bookId })
      .populate('userId', 'username email')
      .sort(sort)
      .skip(skip)
      .limit(limit);

      const total = await this.model.countDocuments({ bookId });
      return { reviews, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async countByBook(bookId: string) {
    return this.model.countDocuments({ bookId });
  }
}
