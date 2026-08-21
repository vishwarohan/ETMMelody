import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from './models/index.js';

const email = (process.env.ADMIN_EMAIL || 'admin@etnmelody.in').trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD || 'Admin@123';

if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is required. Add it to backend/.env.');
if (password.length < 8) throw new Error('ADMIN_PASSWORD must contain at least 8 characters.');

try {
  await mongoose.connect(process.env.MONGODB_URI);
  await User.findOneAndUpdate(
    { email },
    { name: 'ETN Admin', email, password: await bcrypt.hash(password, 12), role: 'admin' },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );
  console.log(`Admin account is ready: ${email}`);
} finally {
  await mongoose.disconnect();
}
