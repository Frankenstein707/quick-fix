import express from 'express';
import { protect, authorize } from '../middleware/authMiddleware.js';
import {
  getApprovedMechanics,
  getHireRequests,
  updateRequestStatus,
  hireMechanic,
} from '../controllers/mechanicController.js';

const router = express.Router();

// Public routes
router.get('/approved', getApprovedMechanics);

// Protected routes
router.use(protect);
router.post('/hire', authorize('user'), hireMechanic);
router.get('/requests', authorize('mechanic'), getHireRequests);
router.put('/requests/:id', authorize('mechanic'), updateRequestStatus);

export default router; 