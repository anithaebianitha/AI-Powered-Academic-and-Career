const mongoose = require('mongoose');

const skillAssessmentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    skills: {
      programming: { type: Number, min: 1, max: 5, required: true },
      webDevelopment: { type: Number, min: 1, max: 5, required: true },
      dataStructures: { type: Number, min: 1, max: 5, required: true },
      database: { type: Number, min: 1, max: 5, required: true },
      communication: { type: Number, min: 1, max: 5, required: true },
      problemSolving: { type: Number, min: 1, max: 5, required: true },
      aiMlBasics: { type: Number, min: 1, max: 5, required: true }
    },
    averageScore: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('SkillAssessment', skillAssessmentSchema);
