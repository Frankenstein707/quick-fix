import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const baseOptions = {
  discriminatorKey: 'role',
  collection: 'users',
};

const baseSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, baseOptions);

// Encrypt password using bcrypt
baseSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match password
baseSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', baseSchema);

export { User, baseSchema }; 