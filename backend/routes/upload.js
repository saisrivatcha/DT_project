const express = require('express');
const path = require('path');
const upload = require('../middleware/upload');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/upload
// @desc    Upload a file
// @access  Private/Admin
router.post('/', protect, authorize('admin'), upload.single('image'), (req, res) => {
  try {
    res.json({
      success: true,
      filePath: `/${req.file.path.replace(/\\/g, '/').split('backend/')[1]}`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

module.exports = router;
