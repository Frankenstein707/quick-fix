import mongoose from 'mongoose';
import { User, baseSchema } from './User.js';

const RegularUser = User.discriminator('user', new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  phone: {
    type: String,
    required: [true, 'Please add phone number'],
  },
  currentHire: {
    mechanicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    status: {
      type: String,
      enum: ['active', 'completed'],
      default: 'active'
    },
    startDate: {
      type: Date,
      default: Date.now
    }
  },
  hireHistory: [{
    mechanicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      enum: ['completed'],
      default: 'completed'
    },
    startDate: Date,
    endDate: {
      type: Date,
      default: Date.now
    }
  }]
}));

export default RegularUser; 