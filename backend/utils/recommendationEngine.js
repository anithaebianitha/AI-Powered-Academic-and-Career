const SKILL_THRESHOLD = 3;

const skillMap = {
  programming: ['Programming', 'Python', 'Java', 'JavaScript', 'C++'],
  webDevelopment: ['Web Development', 'React', 'HTML', 'CSS', 'Node.js'],
  dataStructures: ['Data Structures', 'Algorithms'],
  database: ['Database', 'SQL', 'MongoDB'],
  communication: ['Communication'],
  problemSolving: ['Problem Solving'],
  aiMlBasics: ['AI / ML basics', 'Machine Learning', 'Deep Learning', 'Data Visualization', 'Statistics']
};

const normalize = (value) => value.toLowerCase().replace(/\s|\//g, '');

const getStudentSkillLabels = (skills) => {
  const labels = [];
  Object.entries(skills).forEach(([key, score]) => {
    if (score >= SKILL_THRESHOLD && skillMap[key]) {
      labels.push(...skillMap[key]);
    }
  });
  return labels.map(normalize);
};

const calculateCareerMatches = (studentSkills, careers) => {
  const normalizedStudentSkills = getStudentSkillLabels(studentSkills);

  return careers
    .map((career) => {
      const required = career.required_skills.map((s) => normalize(s));
      const matched = required.filter((skill) => normalizedStudentSkills.includes(skill));
      const missing = career.required_skills.filter((skill) => !matched.includes(normalize(skill)));
      const matchScore = required.length ? (matched.length / required.length) * 100 : 0;

      return {
        careerId: career._id,
        career_name: career.career_name,
        description: career.description,
        average_salary: career.average_salary,
        growth_outlook: career.growth_outlook,
        required_skills: career.required_skills,
        recommended_courses: career.recommended_courses,
        matched_skills: matched.length,
        total_required_skills: required.length,
        match_score: Number(matchScore.toFixed(2)),
        missing_skills: missing
      };
    })
    .sort((a, b) => b.match_score - a.match_score)
    .slice(0, 3);
};

const roadmapTemplates = {
  'Machine Learning': {
    steps: [
      'Learn Python for Data Science',
      'Study Statistics Basics',
      'Learn Machine Learning Algorithms',
      'Build ML Projects',
      'Explore Deep Learning'
    ],
    courses: ['Andrew Ng ML Specialization', 'Hands-On ML with Scikit-Learn'],
    videos: ['StatQuest', 'Krish Naik ML Playlist'],
    projects: ['House price prediction', 'Spam classifier']
  },
  default: {
    steps: ['Learn fundamentals', 'Practice with tutorials', 'Build mini project', 'Build production project', 'Revise and interview prep'],
    courses: ['Coursera Professional Certificate', 'freeCodeCamp Track'],
    videos: ['Traversy Media', 'CodeWithHarry'],
    projects: ['Portfolio project', 'Capstone aligned to career']
  }
};

const generateRoadmap = (careerName, missingSkills) =>
  missingSkills.map((skill) => {
    const template = roadmapTemplates[skill] || roadmapTemplates.default;
    return {
      career: careerName,
      missingSkill: skill,
      steps: template.steps,
      onlineCourses: template.courses,
      youtubeResources: template.videos,
      projectIdeas: template.projects
    };
  });

module.exports = { calculateCareerMatches, generateRoadmap };
