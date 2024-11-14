import Mechanic from '../models/Mechanic.js';
import RegularUser from '../models/RegularUser.js';

// @desc    Get approved mechanics
// @route   GET /api/mechanics/approved
// @access  Public
export const getApprovedMechanics = async (req, res) => {
  try {
    const mechanics = await Mechanic.find({ 
      isApproved: true 
    }).select('name specialization experience isApproved');
    
    console.log('Approved mechanics:', mechanics); // Debug log
    res.json(mechanics);
  } catch (error) {
    console.error('Error fetching approved mechanics:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get hire requests for a mechanic
// @route   GET /api/mechanics/requests
// @access  Private/Mechanic
export const getHireRequests = async (req, res) => {
  try {
    const mechanic = await Mechanic.findById(req.user._id)
      .populate('hiredBy.userId', 'name email');
    
    if (!mechanic) {
      return res.status(404).json({ message: 'Mechanic not found' });
    }

    res.json(mechanic.hiredBy);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update request status
// @route   PUT /api/mechanics/requests/:id
// @access  Private/Mechanic
export const updateRequestStatus = async (req, res) => {
  try {
    const mechanic = await Mechanic.findById(req.user._id);
    if (!mechanic) {
      return res.status(404).json({ message: 'Mechanic not found' });
    }

    const request = mechanic.hiredBy.id(req.params.id);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    request.status = req.body.status;
    await mechanic.save();

    res.json(request);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Hire a mechanic
// @route   POST /api/mechanics/hire
// @access  Private/User
export const hireMechanic = async (req, res) => {
  try {
    const mechanic = await Mechanic.findById(req.body.mechanicId);
    if (!mechanic) {
      return res.status(404).json({ message: 'Mechanic not found' });
    }

    if (!mechanic.isApproved) {
      return res.status(400).json({ message: 'Mechanic is not approved' });
    }

    // Update the user's currentHire status
    const user = await RegularUser.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.currentHire && user.currentHire.mechanicId) {
      return res.status(400).json({ message: 'You already have an active hire' });
    }

    // Set the current hire
    user.currentHire = {
      mechanicId: mechanic._id,
      status: 'active',
      startDate: new Date()
    };

    // Add to mechanic's hiredBy array
    mechanic.hiredBy.push({
      userId: user._id,
      status: 'accepted',
      date: new Date()
    });

    await Promise.all([user.save(), mechanic.save()]);
    res.status(201).json({ message: 'Hire request successful' });
  } catch (error) {
    console.error('Error hiring mechanic:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}; 