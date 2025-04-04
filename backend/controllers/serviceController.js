
const ServiceRequest = require('../models/ServiceRequest');

// @desc    Create a new service request
// @route   POST /api/services
// @access  Private
const createServiceRequest = async (req, res) => {
  try {
    const {
      customerName,
      vehicleType,
      vehicleModel,
      issue,
      location,
      additionalDetails,
    } = req.body;

    const serviceRequest = await ServiceRequest.create({
      userId: req.user._id,
      customerName,
      vehicleType,
      vehicleModel,
      issue,
      location,
      additionalDetails,
      status: 'pending',
    });

    res.status(201).json(serviceRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all service requests for a user
// @route   GET /api/services/user
// @access  Private
const getUserServiceRequests = async (req, res) => {
  try {
    const serviceRequests = await ServiceRequest.find({
      userId: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(serviceRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all pending service requests
// @route   GET /api/services/pending
// @access  Private/Mechanic
const getPendingServiceRequests = async (req, res) => {
  try {
    const serviceRequests = await ServiceRequest.find({
      status: 'pending',
    }).sort({ createdAt: -1 });

    res.json(serviceRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all active service requests for a mechanic
// @route   GET /api/services/mechanic/active
// @access  Private/Mechanic
const getMechanicActiveRequests = async (req, res) => {
  try {
    const serviceRequests = await ServiceRequest.find({
      assignedMechanicId: req.user._id,
      status: 'in-progress',
    }).sort({ createdAt: -1 });

    res.json(serviceRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all completed service requests for a mechanic
// @route   GET /api/services/mechanic/completed
// @access  Private/Mechanic
const getMechanicCompletedRequests = async (req, res) => {
  try {
    const serviceRequests = await ServiceRequest.find({
      assignedMechanicId: req.user._id,
      status: 'completed',
    }).sort({ createdAt: -1 });

    res.json(serviceRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update service request status
// @route   PUT /api/services/:id/status
// @access  Private/Mechanic
const updateServiceRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const serviceRequest = await ServiceRequest.findById(req.params.id);

    if (!serviceRequest) {
      return res.status(404).json({ message: 'Service request not found' });
    }

    // Update the status
    serviceRequest.status = status;

    // If moving to in-progress, assign mechanic
    if (status === 'in-progress' && !serviceRequest.assignedMechanicId) {
      serviceRequest.assignedMechanicId = req.user._id;
    }

    // If completing, set completedAt
    if (status === 'completed') {
      serviceRequest.completedAt = new Date();
    }

    await serviceRequest.save();
    res.json(serviceRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all service requests
// @route   GET /api/services
// @access  Private/Admin
const getAllServiceRequests = async (req, res) => {
  try {
    const serviceRequests = await ServiceRequest.find({}).sort({ createdAt: -1 });
    res.json(serviceRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createServiceRequest,
  getUserServiceRequests,
  getPendingServiceRequests,
  getMechanicActiveRequests,
  getMechanicCompletedRequests,
  updateServiceRequestStatus,
  getAllServiceRequests,
};
