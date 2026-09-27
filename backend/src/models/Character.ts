import mongoose, { Schema, Document } from 'mongoose';

export interface ICharacter extends Document {
  userId: string;
  name: string;
  role: string;
  personality: string;
  appearance: string;
  background: string;
  importance?: string;
  createdAt: Date;
}

const CharacterSchema: Schema = new Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  personality: { type: String, required: true },
  appearance: { type: String, required: true },
  background: { type: String, required: true },
  importance: { type: String, default: 'Supporting' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<ICharacter>('Character', CharacterSchema);
