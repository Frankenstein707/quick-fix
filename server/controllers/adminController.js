import { User } from '../models/User.js';
import Mechanic from '../models/Mechanic.js';
import RegularUser from '../models/RegularUser.js';

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'user' }).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all mechanics
// @route   GET /api/admin/mechanics
// @access  Private/Admin
export const getAllMechanics = async (req, res) => {
  try {
    const mechanics = await Mechanic.find().select('-password');
    res.json(mechanics);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Toggle mechanic approval status
// @route   PUT /api/admin/mechanics/:id/approve
// @access  Private/Admin
export const toggleMechanicApproval = async (req, res) => {
  try {
    const mechanic = await Mechanic.findById(req.params.id);
    if (!mechanic) {
      return res.status(404).json({ message: 'Mechanic not found' });
    }

    mechanic.isApproved = req.body.isApproved;
    const updatedMechanic = await mechanic.save();
    console.log('Updated mechanic:', updatedMechanic); // Debug log

    res.json(updatedMechanic);
  } catch (error) {
    console.error('Error updating mechanic approval:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get hire history
// @route   GET /api/admin/hire-history
// @access  Private/Admin
export const getHireHistory = async (req, res) => {
  try {
    const users = await RegularUser.find()
      .populate('hireHistory.mechanicId', 'name specialization')
      .select('hireHistory');

    const history = users.flatMap(user => 
      user.hireHistory.map(hire => ({
        ...hire.toObject(),
        userId: {
          name: user.name,
          email: user.email
        }
      }))
    );

    res.json(history);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}; 