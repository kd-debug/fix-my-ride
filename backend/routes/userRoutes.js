
const express = require('express');
const { 
  loginUser, 
  registerUser, 
  getUserProfile, 
  updateUserProfile,
  getUsers 
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.get('/', protect, admin, getUsers);

module.exports = router;
