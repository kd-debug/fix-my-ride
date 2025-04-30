const express = require('express');
const {
  applyAsMechanic,
  getMechanicApplications,
  updateApplicationStatus,
  getApprovedMechanics,
} = require('../controllers/mechanicController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/apply', protect, applyAsMechanic);
router.get('/applications', protect, admin, getMechanicApplications);
router.put('/applications/:id', protect, admin, updateApplicationStatus);
router.get('/', getApprovedMechanics);

module.exports = router;
