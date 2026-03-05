const Career = require('../models/Career');
const User = require('../models/User');
const SkillAssessment = require('../models/SkillAssessment');

const addCareer = async (req, res) => {
  try {
    const career = await Career.create(req.body);
    res.status(201).json(career);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add career' });
  }
};

const updateCareer = async (req, res) => {
  try {
    const career = await Career.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!career) return res.status(404).json({ message: 'Career not found' });
    res.json(career);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update career' });
  }
};

const deleteCareer = async (req, res) => {
  try {
    const career = await Career.findByIdAndDelete(req.params.id);
    if (!career) return res.status(404).json({ message: 'Career not found' });
    res.json({ message: 'Career deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete career' });
  }
};

const getStudentReports = async (req, res) => {
  const reports = await User.find({ role: 'student' })
    .select('-password')
    .lean();

  const assessments = await SkillAssessment.find().lean();
  const assessmentByUser = assessments.reduce((acc, item) => {
    acc[item.user.toString()] = item;
    return acc;
  }, {});

  res.json(
    reports.map((student) => ({
      ...student,
      assessment: assessmentByUser[student._id.toString()] || null
    }))
  );
};

module.exports = { addCareer, updateCareer, deleteCareer, getStudentReports };
