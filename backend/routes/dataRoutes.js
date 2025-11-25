import express from 'express';
import {
  getMineData,
  getMineStatistics,
  proxyClimatiqRequest,
  proxyAmbeeRequest,
} from '../controller/dataController.js';

const router = express.Router();

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Mine data routes
router.get('/mines', getMineData);
router.get('/statistics', getMineStatistics);

// Climatiq API proxy
router.post('/climatiq/estimate', proxyClimatiqRequest);

// Ambee API proxy
router.get('/ambee/latest', proxyAmbeeRequest);

export default router;