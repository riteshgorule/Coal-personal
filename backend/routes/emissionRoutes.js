import express from 'express';
import {
  analyzeImage,
  analyzeImageUrl,
  getEmissions,
  getEmissionById,
  deleteEmission,
  getEmissionTrends,
} from '../controller/emissionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getEmissions);
router.post('/analyze', protect, analyzeImage);
router.post('/analyze-url', protect, analyzeImageUrl);
router.get('/trends', protect, getEmissionTrends);
router.route('/:id').get(protect, getEmissionById).delete(protect, deleteEmission);

export default router;
