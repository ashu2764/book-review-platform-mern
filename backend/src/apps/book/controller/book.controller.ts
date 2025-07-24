import { Request, Response } from 'express';
import { BookUsecase } from '../usecases/book.usecases.js';

export class BookController {
  constructor(private usecase = new BookUsecase()) {}

  createBook = async (req: Request, res: Response) => {
    const book = await this.usecase.createBook(req.body);
    res.status(201).json({ message: 'Book created successfully', book });
  };

  getBooks = async (req: Request, res: Response) => {
    const data = await this.usecase.getBooks(req.query);
    res.json(data);
  };

  getBookById = async (req: Request, res: Response) => {
    const book = await this.usecase.getBookById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  };

  getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { book, averageRating, reviews } = await this.usecase.getById(id);

      res.status(200).json({
        message: 'Book details fetched successfully',
        book,
        averageRating,
        totalReviews: reviews.length,
        reviews,
      });
    } catch (err: any) {
      res.status(404).json({ message: err.message || 'Something went wrong' });
    }
  };
}
