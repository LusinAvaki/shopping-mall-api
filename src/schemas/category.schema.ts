import * as mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
}, {
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret._id;
      },
    },
    toObject: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret._id;
      },
    },
});

export interface Category extends mongoose.Document {
  id: number;
  title: string;
  description: string;
}