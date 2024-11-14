import express from 'express';
import { protect, authorize } from '../middleware/authMiddleware.js';
import {
  getAllUsers,
  getAllMechanics,
  toggleMechanicApproval,
  getHireHistory,
} from '../controllers/adminController.js';

const router = express.Router();

router.use(protect, authorize('admin'));

router.get('/users', getAllUsers);
router.get('/mechanics', getAllMechanics);
router.put('/mechanics/:id/approve', toggleMechanicApproval);
router.get('/hire-history', getHireHistory);

export default router; 