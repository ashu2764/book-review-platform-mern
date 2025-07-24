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
    const { id } = req.params;
    const data = await this.usecase.getById(id);
    res.json(data);
  };
}
