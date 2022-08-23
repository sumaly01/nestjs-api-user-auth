import * as mongoose from 'mongoose';

//Not in typescript but JS
export const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

//in ts
export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}
