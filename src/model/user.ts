import mongoose, { Schema, Document, models } from 'mongoose';


export interface IUser extends Document {
  email: string;
  password: string;
  name?: string;
  avatar?: string;
  preferences?: Record<string, any>;
  settings?: Record<string, any>;
  pantry?: string[];
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  avatar: { type: String },
  preferences: { type: Object, default: {} },
  settings: { type: Object, default: {} },
  pantry: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
});

export default models.User || mongoose.model<IUser>('User', UserSchema);
