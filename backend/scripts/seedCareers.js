const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Career = require('../models/Career');

dotenv.config({ path: '../.env' });

const careers = [
  {
    career_name: 'Software Developer',
    description: 'Builds scalable software applications and services.',
    required_skills: ['Programming', 'Data Structures', 'Problem Solving', 'Database'],
    recommended_courses: ['CS50', 'Data Structures in Java', 'System Design Primer'],
    average_salary: '$95,000',
    growth_outlook: 'High'
  },
  {
    career_name: 'Data Scientist',
    description: 'Extracts insights from data and builds prediction models.',
    required_skills: ['Python', 'Statistics', 'Machine Learning', 'Data Visualization'],
    recommended_courses: ['IBM Data Science', 'Google Data Analytics'],
    average_salary: '$120,000',
    growth_outlook: 'Very High'
  },
  {
    career_name: 'Frontend Developer',
    description: 'Creates responsive and interactive user interfaces.',
    required_skills: ['Web Development', 'React', 'JavaScript', 'Communication'],
    recommended_courses: ['Meta Front-End Certificate', 'Advanced React'],
    average_salary: '$90,000',
    growth_outlook: 'High'
  },
  {
    career_name: 'Backend Developer',
    description: 'Designs APIs and server-side architecture.',
    required_skills: ['Node.js', 'Database', 'Problem Solving', 'Data Structures'],
    recommended_courses: ['Node.js API Masterclass', 'MongoDB University'],
    average_salary: '$100,000',
    growth_outlook: 'High'
  },
  {
    career_name: 'AI Engineer',
    description: 'Builds intelligent systems using machine learning and deep learning.',
    required_skills: ['Programming', 'Machine Learning', 'Deep Learning', 'Problem Solving'],
    recommended_courses: ['DeepLearning.AI', 'ML Ops Fundamentals'],
    average_salary: '$130,000',
    growth_outlook: 'Very High'
  },
  {
    career_name: 'Cybersecurity Analyst',
    description: 'Protects systems, networks, and data from cyber threats.',
    required_skills: ['Problem Solving', 'Communication', 'Database', 'Programming'],
    recommended_courses: ['Google Cybersecurity Certificate', 'CompTIA Security+'],
    average_salary: '$110,000',
    growth_outlook: 'High'
  },
  {
    career_name: 'Cloud Engineer',
    description: 'Designs and manages cloud infrastructure and services.',
    required_skills: ['Programming', 'Database', 'Problem Solving', 'Communication'],
    recommended_courses: ['AWS Solutions Architect', 'Azure Fundamentals'],
    average_salary: '$115,000',
    growth_outlook: 'Very High'
  }
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ai-career-framework');
    await Career.deleteMany();
    await Career.insertMany(careers);
    console.log('Career seed complete');
    process.exit(0);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

seed();
