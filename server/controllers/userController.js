import RegularUser from '../models/RegularUser.js';

export const getUserStatus = async (req, res) => {
  try {
    const user = await RegularUser.findById(req.user._id)
      .populate('currentHire.mechanicId', 'name specialization');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('User status:', user.currentHire); // Debug log
    res.json({ currentHire: user.currentHire });
  } catch (error) {
    console.error('Error getting user status:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const completeWork = async (req, res) => {
  try {
    const user = await RegularUser.findById(req.user._id);
    
    if (!user || !user.currentHire.mechanicId) {
      return res.status(400).json({ message: 'No active hire found' });
    }

    // Add to history
    user.hireHistory.push({
      mechanicId: user.currentHire.mechanicId,
      startDate: user.currentHire.startDate,
      status: 'completed'
    });

    // Clear current hire
    user.currentHire = { mechanicId: null };
    await user.save();

    res.json({ message: 'Work completed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}; 