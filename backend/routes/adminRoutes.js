const express = require('express');
const {
  addCareer,
  updateCareer,
  deleteCareer,
  getStudentReports
} = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/career', protect, adminOnly, addCareer);
router.put('/career/:id', protect, adminOnly, updateCareer);
router.delete('/career/:id', protect, adminOnly, deleteCareer);
router.get('/admin/reports', protect, adminOnly, getStudentReports);

module.exports = router;
