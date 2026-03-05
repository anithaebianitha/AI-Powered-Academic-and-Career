const express = require('express');
const {
  getProfile,
  saveSkillAssessment,
  getRecommendations,
  getSkillGap,
  getRoadmap
} = require('../controllers/studentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/profile', protect, getProfile);
router.post('/skill-assessment', protect, saveSkillAssessment);
router.get('/recommend-careers', protect, getRecommendations);
router.get('/skill-gap', protect, getSkillGap);
router.get('/roadmap', protect, getRoadmap);

module.exports = router;
