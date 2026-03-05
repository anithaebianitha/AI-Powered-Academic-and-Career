const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema(
  {
    career_name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    required_skills: [{ type: String, required: true }],
    recommended_courses: [{ type: String, required: true }],
    average_salary: { type: String, required: true },
    growth_outlook: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Career', careerSchema);
