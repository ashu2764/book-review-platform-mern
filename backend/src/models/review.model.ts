import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IReview extends Document {
  review_text: string;
  rating: number;
  bookId: Types.ObjectId;
  userId: Types.ObjectId;
  createdAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    review_text: { type: String, required: true },
    rating: { type: Number, required: true },
    bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const ReviewModel = mongoose.model<IReview>('Review', ReviewSchema);
