import { BookRepository } from "../repository/book.repository.js";
import { ReviewRepository } from "apps/review/repository/review.repository.js";
import { IBook } from '../../../models/book.model.js';

interface CreateBookDTO {
  title: string;
  author: string;
  genre: string;
}

export class BookUsecase {
  constructor(
    private repo = new BookRepository(),
    private reviewRepo = new ReviewRepository()
  ) {}

  async createBook(data: CreateBookDTO): Promise<IBook> {
    return this.repo.create(data);
  }

  async getBooks(query: any) {
    const { genre, author, sortBy = 'createdAt', order = 'desc', page = 1, limit = 10 } = query;

    const filter: any = {};
    if (genre) filter.genre = genre;
    if (author) filter.author = author;

    const sort: any = {};
    sort[sortBy] = order === 'asc' ? 1 : -1;

    const books = await this.repo.findWithFilters(filter, sort, Number(page), Number(limit));
    const total = await this.repo.countWithFilters(filter);

    return { books, total };
  }

  async getBookById(id: string) {
    return this.repo.findById(id);
  }

  async getById(bookId: string) {
    const book = await this.repo.findById(bookId);
    // 💡 Make sure this method exists in ReviewRepository
    const reviews = await this.reviewRepo.findByBook(bookId);

    const avgRating = await this.repo.getAverageRating(bookId);

    return {
      book,
      averageRating: avgRating,
      reviews,
    };
  }
}
