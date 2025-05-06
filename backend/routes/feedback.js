const express = require('express');
const {
  createFeedback,
  getFeedback,
  getMyFeedback,
  deleteFeedback
} = require('../controllers/feedbackController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router
  .route('/')
  .post(protect, createFeedback)
  .get(protect, authorize('admin'), getFeedback);

router.route('/me').get(protect, getMyFeedback);

router
  .route('/:id')
  .delete(protect, authorize('admin'), deleteFeedback);

module.exports = router;
