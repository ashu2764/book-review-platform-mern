import mongoose, { Schema, Document } from 'mongoose';

export interface IBook extends Document {
  title: string;
  author: string;
  genre: string;
  createdAt: Date;
}

const BookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
  },
  { timestamps: { createdAt: 'createdAt' } }
);

export const BookModel = mongoose.model<IBook>('Book', BookSchema);
