import { BaseRepository } from "../../../base/base.repository.js";
import { IBook,BookModel } from '../../../models/book.model.js';
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
    const result = await this.model.aggregate([
      { $match: { bookId: new mongoose.Types.ObjectId(bookId) } },
      {
        $group: {
          _id: '$bookId',
          averageRating: { $avg: '$rating' },
        },
      },
    ]);

    return result[0]?.averageRating ?? 0;
  }
}
