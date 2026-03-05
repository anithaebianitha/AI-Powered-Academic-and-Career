const SkillAssessment = require('../models/SkillAssessment');
const Career = require('../models/Career');
const Roadmap = require('../models/Roadmap');
const { calculateCareerMatches, generateRoadmap } = require('../utils/recommendationEngine');

const getProfile = async (req, res) => {
  res.json(req.user);
};

const saveSkillAssessment = async (req, res) => {
  try {
    const skills = req.body;
    const values = Object.values(skills);
    const averageScore = values.reduce((sum, score) => sum + Number(score || 0), 0) / values.length;

    const assessment = await SkillAssessment.findOneAndUpdate(
      { user: req.user._id },
      { user: req.user._id, skills, averageScore },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(201).json(assessment);
  } catch (error) {
    res.status(500).json({ message: 'Failed to save assessment' });
  }
};

const getRecommendations = async (req, res) => {
  try {
    const assessment = await SkillAssessment.findOne({ user: req.user._id });
    if (!assessment) {
      return res.status(404).json({ message: 'Please submit skill assessment first' });
    }

    const careers = await Career.find();
    const recommendations = calculateCareerMatches(assessment.skills, careers);
    res.json({ recommendations });
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate recommendations' });
  }
};

const getSkillGap = async (req, res) => {
  try {
    const assessment = await SkillAssessment.findOne({ user: req.user._id });
    const careers = await Career.find();

    if (!assessment) {
      return res.status(404).json({ message: 'No assessment found' });
    }

    const recommendations = calculateCareerMatches(assessment.skills, careers);
    const skillGap = recommendations.map((career) => ({
      career: career.career_name,
      yourSkills: assessment.skills,
      requiredSkills: career.required_skills,
      missingSkills: career.missing_skills
    }));

    res.json({ skillGap });
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate skill gap analysis' });
  }
};

const getRoadmap = async (req, res) => {
  try {
    const assessment = await SkillAssessment.findOne({ user: req.user._id });
    const careers = await Career.find();

    if (!assessment) {
      return res.status(404).json({ message: 'No assessment found' });
    }

    const recommendations = calculateCareerMatches(assessment.skills, careers);
    const roadmapData = recommendations.flatMap((career) =>
      generateRoadmap(career.career_name, career.missing_skills)
    );

    await Roadmap.deleteMany({ user: req.user._id });
    const storedRoadmaps = await Roadmap.insertMany(
      roadmapData.map((item) => ({
        user: req.user._id,
        career: recommendations.find((r) => r.career_name === item.career).careerId,
        missingSkill: item.missingSkill,
        steps: item.steps,
        onlineCourses: item.onlineCourses,
        youtubeResources: item.youtubeResources,
        projectIdeas: item.projectIdeas
      }))
    );

    res.json({ roadmaps: storedRoadmaps });
  } catch (error) {
    res.status(500).json({ message: 'Failed to build learning roadmap' });
  }
};

module.exports = {
  getProfile,
  saveSkillAssessment,
  getRecommendations,
  getSkillGap,
  getRoadmap
};
