const mongoose = require('mongoose');

const roadmapSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    career: { type: mongoose.Schema.Types.ObjectId, ref: 'Career', required: true },
    missingSkill: { type: String, required: true },
    steps: [{ type: String, required: true }],
    onlineCourses: [{ type: String, required: true }],
    youtubeResources: [{ type: String, required: true }],
    projectIdeas: [{ type: String, required: true }]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Roadmap', roadmapSchema);
