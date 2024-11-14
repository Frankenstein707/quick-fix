import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import Mechanic from '../models/Mechanic.js';
import RegularUser from '../models/RegularUser.js';
import { User } from '../models/User.js';

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
  try {
    const { email, password, role, name, ...additionalData } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    let user;

    // Create user based on role
    switch (role) {
      case 'admin':
        user = await Admin.create({
          name,
          email,
          password,
          adminLevel: additionalData.adminLevel || 'regular',
        });
        break;
      case 'mechanic':
        user = await Mechanic.create({
          name,
          email,
          password,
          specialization: additionalData.specialization,
          experience: additionalData.experience,
        });
        break;
      case 'user':
        user = await RegularUser.create({
          name,
          email,
          password,
          phone: additionalData.phone,
        });
        break;
      default:
        return res.status(400).json({ message: 'Invalid role' });
    }

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}; 