
const MechanicApplication = require('../models/MechanicApplication');
const User = require('../models/User');

// @desc    Submit mechanic application
// @route   POST /api/mechanics/apply
// @access  Private
const applyAsMechanic = async (req, res) => {
  try {
    const { name, email, phone, address, experience, certification } = req.body;

    // Check if already applied
    const existingApplication = await MechanicApplication.findOne({
      userId: req.user._id,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: 'You have already submitted an application',
      });
    }

    const application = await MechanicApplication.create({
      userId: req.user._id,
      name,
      email,
      phone,
      address,
      experience,
      certification,
      status: 'pending',
    });

    // Update user role to mechanic (but not approved yet)
    await User.findByIdAndUpdate(req.user._id, {
      role: 'mechanic',
      approved: false,
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all mechanic applications
// @route   GET /api/mechanics/applications
// @access  Private/Admin
const getMechanicApplications = async (req, res) => {
  try {
    const applications = await MechanicApplication.find({}).sort({
      createdAt: -1,
    });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update mechanic application status
// @route   PUT /api/mechanics/applications/:id
// @access  Private/Admin
const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const application = await MechanicApplication.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    application.status = status;
    await application.save();

    // If approved, update the user's approved status
    if (status === 'approved') {
      await User.findByIdAndUpdate(application.userId, { approved: true });
    } else if (status === 'rejected') {
      // If rejected, revert user role to regular user
      await User.findByIdAndUpdate(application.userId, {
        role: 'user',
        approved: true,
      });
    }

    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all approved mechanics
// @route   GET /api/mechanics
// @access  Public
const getApprovedMechanics = async (req, res) => {
  try {
    const mechanics = await User.find({
      role: 'mechanic',
      approved: true,
    }).select('-password');
    res.json(mechanics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  applyAsMechanic,
  getMechanicApplications,
  updateApplicationStatus,
  getApprovedMechanics,
};
