import { BookRepository } from '../repository/book.repository.js';
import { IBook } from '../../../models/book.model.js';

interface CreateBookDTO {
  title: string;
  author: string;
  genre: string;
}

export class BookUsecase {
  constructor(private repo = new BookRepository()) {}

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
    const reviews = await this.repo.findAllReviews(bookId);
    const avgRating = await this.repo.getAverageRating(bookId);

    return {
      book,
      averageRating: avgRating,
      reviews,
    };
  }

  createReview(bookId: string, review: any) {
    return this.repo.addReview(bookId, review);
  }

  getPaginatedReviews(
    bookId: string,
    page: number,
    limit: number,
    sortBy: string,
    order: 'asc' | 'desc'
  ) {
    return this.repo.getReviewsPaginated(bookId, page, limit, sortBy, order);
  }
}
