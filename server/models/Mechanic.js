import mongoose from 'mongoose';
import { User, baseSchema } from './User.js';

const Mechanic = User.discriminator('mechanic', new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  specialization: {
    type: String,
    required: [true, 'Please add specialization'],
  },
  experience: {
    type: Number,
    required: [true, 'Please add years of experience'],
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  hiredBy: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending'
    },
    date: {
      type: Date,
      default: Date.now
    }
  }]
}));

export default Mechanic; 