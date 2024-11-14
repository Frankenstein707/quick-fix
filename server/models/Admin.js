import mongoose from 'mongoose';
import { User, baseSchema } from './User.js';

const Admin = User.discriminator('admin', new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  adminLevel: {
    type: String,
    enum: ['super', 'regular'],
    default: 'regular'
  },
}));

export default Admin; 