import mongoose, { Schema, Document } from 'mongoose';

interface Review {
  userId: mongoose.Types.ObjectId;
  review_text: string;
  rating: number;
  createdAt: Date;
}

export interface IBook extends Document {
  title: string;
  author: string;
  genre: string;
  reviews: Review[];
  averageRating: number;
  createdAt: Date;
}

const ReviewSubSchema = new Schema<Review>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    review_text: { type: String, required: true },
    rating: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const BookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    reviews: [ReviewSubSchema],
    averageRating: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: 'createdAt' } }
);

export const BookModel = mongoose.model<IBook>('Book', BookSchema);
