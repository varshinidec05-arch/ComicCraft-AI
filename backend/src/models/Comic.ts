import mongoose, { Schema, Document } from 'mongoose';

export interface IComic extends Document {
  userId: string;
  title: string;
  tagline?: string;
  genre: string;
  style: string;
  tone?: string;
  summary: string;
  coverColor?: string;
  characters: any[];
  scenes: any[];
  panels: any[];
  ending?: string;
  status: 'Draft' | 'Completed' | 'Published';
  pagesCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const ComicSchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    tagline: { type: String },
    genre: { type: String, required: true },
    style: { type: String, required: true },
    tone: { type: String },
    summary: { type: String, required: true },
    coverColor: { type: String, default: 'from-purple-900 via-indigo-900 to-slate-950' },
    characters: { type: Array, default: [] },
    scenes: { type: Array, default: [] },
    panels: { type: Array, default: [] },
    ending: { type: String },
    status: { type: String, enum: ['Draft', 'Completed', 'Published'], default: 'Draft' },
    pagesCount: { type: Number, default: 1 }
  },
  { timestamps: true }
);

export default mongoose.model<IComic>('Comic', ComicSchema);
