
const express = require('express');
const {
  createServiceRequest,
  getUserServiceRequests,
  getPendingServiceRequests,
  getMechanicActiveRequests,
  getMechanicCompletedRequests,
  updateServiceRequestStatus,
  getAllServiceRequests,
} = require('../controllers/serviceController');
const { protect, mechanic, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createServiceRequest);
router.get('/user', protect, getUserServiceRequests);
router.get('/pending', protect, mechanic, getPendingServiceRequests);
router.get('/mechanic/active', protect, mechanic, getMechanicActiveRequests);
router.get('/mechanic/completed', protect, mechanic, getMechanicCompletedRequests);
router.put('/:id/status', protect, mechanic, updateServiceRequestStatus);
router.get('/', protect, admin, getAllServiceRequests);

module.exports = router;
