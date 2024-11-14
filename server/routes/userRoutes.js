import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getUserStatus, completeWork } from '../controllers/userController.js';

const router = express.Router();

router.use(protect);
router.get('/status', getUserStatus);
router.post('/complete-work', completeWork);

export default router; 